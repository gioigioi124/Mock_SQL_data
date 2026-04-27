const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── DEFAULT CONFIG (có thể đổi qua UI) ───────────────────────────────────
let dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 14333,
  database: process.env.DB_DATABASE || 'VTSYS',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 15000,
    requestTimeout: 30000,
  },
};

let pool = null;

// ─── KẾT NỐI ──────────────────────────────────────────────────────────────
async function getPool(config = null) {
  const cfg = config || dbConfig;
  if (pool && !config) return pool;
  if (pool) await pool.close().catch(() => {});
  pool = await new sql.ConnectionPool(cfg).connect();
  if (!config) dbConfig = cfg;
  return pool;
}

// ─── API: TEST / CONNECT ───────────────────────────────────────────────────
app.post('/api/connect', async (req, res) => {
  try {
    const { server, port, database, user, password } = req.body;
    const cfg = {
      server,
      port: parseInt(port),
      database,
      user,
      password,
      options: { encrypt: false, trustServerCertificate: true, enableArithAbort: true },
    };
    const p = await getPool(cfg);
    dbConfig = cfg;
    pool = p;
    res.json({ ok: true, message: `Kết nối thành công tới ${database} @ ${server}` });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
});

// ─── API: DANH SÁCH DATABASE ───────────────────────────────────────────────
app.get('/api/databases', async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query(`
      SELECT name FROM sys.databases
      WHERE name NOT IN ('master','tempdb','model','msdb')
      ORDER BY name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── API: ĐỔI DATABASE ────────────────────────────────────────────────────
app.post('/api/use-database', async (req, res) => {
  try {
    const { database } = req.body;
    const newCfg = { ...dbConfig, database };
    pool = await new sql.ConnectionPool(newCfg).connect();
    dbConfig = newCfg;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── API: DANH SÁCH BẢNG ──────────────────────────────────────────────────
app.get('/api/tables', async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query(`
      SELECT 
        t.TABLE_SCHEMA as [schema],
        t.TABLE_NAME as name,
        t.TABLE_TYPE as type,
        p.rows as rowCount
      FROM INFORMATION_SCHEMA.TABLES t
      LEFT JOIN sys.partitions p
        ON p.object_id = OBJECT_ID(t.TABLE_SCHEMA + '.' + t.TABLE_NAME)
        AND p.index_id IN (0,1)
      ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── API: CẤU TRÚC CỘT ────────────────────────────────────────────────────
app.get('/api/columns/:schema/:table', async (req, res) => {
  try {
    const p = await getPool();
    const { schema, table } = req.params;
    const result = await p.request()
      .input('schema', sql.NVarChar, schema)
      .input('table', sql.NVarChar, table)
      .query(`
        SELECT
          c.COLUMN_NAME as name,
          c.DATA_TYPE as type,
          c.CHARACTER_MAXIMUM_LENGTH as maxLen,
          c.IS_NULLABLE as nullable,
          c.COLUMN_DEFAULT as defaultVal,
          CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 1 ELSE 0 END as isPK,
          CASE WHEN fk.COLUMN_NAME IS NOT NULL THEN 1 ELSE 0 END as isFK,
          fk.FK_TABLE as fkTable,
          fk.FK_COLUMN as fkColumn
        FROM INFORMATION_SCHEMA.COLUMNS c
        LEFT JOIN (
          SELECT ku.TABLE_SCHEMA, ku.TABLE_NAME, ku.COLUMN_NAME
          FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
          JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
            ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
          WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
        ) pk ON pk.TABLE_SCHEMA = c.TABLE_SCHEMA 
             AND pk.TABLE_NAME = c.TABLE_NAME 
             AND pk.COLUMN_NAME = c.COLUMN_NAME
        LEFT JOIN (
          SELECT 
            kcu1.TABLE_SCHEMA, kcu1.TABLE_NAME, kcu1.COLUMN_NAME,
            kcu2.TABLE_NAME as FK_TABLE, kcu2.COLUMN_NAME as FK_COLUMN
          FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc
          JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu1
            ON rc.CONSTRAINT_NAME = kcu1.CONSTRAINT_NAME
          JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu2
            ON rc.UNIQUE_CONSTRAINT_NAME = kcu2.CONSTRAINT_NAME
        ) fk ON fk.TABLE_SCHEMA = c.TABLE_SCHEMA 
             AND fk.TABLE_NAME = c.TABLE_NAME 
             AND fk.COLUMN_NAME = c.COLUMN_NAME
        WHERE c.TABLE_SCHEMA = @schema AND c.TABLE_NAME = @table
        ORDER BY c.ORDINAL_POSITION
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── API: XEM DỮ LIỆU ─────────────────────────────────────────────────────
app.get('/api/data/:schema/:table', async (req, res) => {
  try {
    const p = await getPool();
    const { schema, table } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const safeSchema = schema.replace(/[^a-zA-Z0-9_]/g, '');
    const safeTable = table.replace(/[^a-zA-Z0-9_]/g, '');

    const countResult = await p.request().query(
      `SELECT COUNT(*) as total FROM [${safeSchema}].[${safeTable}]`
    );
    const total = countResult.recordset[0].total;

    const dataResult = await p.request().query(
      `SELECT * FROM [${safeSchema}].[${safeTable}]
       ORDER BY (SELECT NULL)
       OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`
    );

    res.json({
      data: dataResult.recordset,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── API: CHẠY QUERY TÙY Ý ────────────────────────────────────────────────
app.post('/api/query', async (req, res) => {
  try {
    const p = await getPool();
    const { sql: userSql } = req.body;
    if (!userSql) return res.status(400).json({ error: 'No SQL provided' });

    const start = Date.now();
    const result = await p.request().query(userSql);
    const elapsed = Date.now() - start;

    res.json({
      recordset: result.recordset || [],
      rowsAffected: result.rowsAffected,
      elapsed,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─── API: FOREIGN KEY RELATIONSHIPS ───────────────────────────────────────
app.get('/api/relationships', async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query(`
      SELECT
        fk.name AS fk_name,
        tp.name AS parent_table,
        cp.name AS parent_column,
        tr.name AS ref_table,
        cr.name AS ref_column
      FROM sys.foreign_keys fk
      JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
      JOIN sys.tables tp ON fkc.parent_object_id = tp.object_id
      JOIN sys.columns cp ON fkc.parent_object_id = cp.object_id AND fkc.parent_column_id = cp.column_id
      JOIN sys.tables tr ON fkc.referenced_object_id = tr.object_id
      JOIN sys.columns cr ON fkc.referenced_object_id = cr.object_id AND fkc.referenced_column_id = cr.column_id
      ORDER BY tp.name
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── API: THỐNG KÊ DB ──────────────────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
  try {
    const p = await getPool();
    const result = await p.request().query(`
      SELECT
        (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE') as tableCount,
        (SELECT COUNT(*) FROM INFORMATION_SCHEMA.VIEWS) as viewCount,
        (SELECT COUNT(*) FROM sys.foreign_keys) as fkCount,
        (SELECT SUM(p.rows) FROM sys.partitions p 
         JOIN sys.tables t ON p.object_id = t.object_id
         WHERE p.index_id IN (0,1)) as totalRows
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 SQL Viewer chạy tại: http://localhost:${PORT}\n`);
});
