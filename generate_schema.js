const fs = require('fs');
const http = require('http');

const request = (method, path, body) => new Promise((resolve, reject) => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                resolve(data);
            }
        });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
});

async function run() {
    let markdown = `# 📊 Cấu trúc Database VP_2014 & VTSYS\n\n`;
    markdown += `> Tự động trích xuất cấu trúc bảng của VP_2014 và VTSYS\n\n`;

    const dbs = ['VP_2014', 'VTSYS'];
    for (const db of dbs) {
        console.log(`Processing ${db}...`);
        await request('POST', '/api/use-database', { database: db });
        const sql = `SELECT t.TABLE_SCHEMA as [schema], t.TABLE_NAME as name, t.TABLE_TYPE as type FROM INFORMATION_SCHEMA.TABLES t WHERE t.TABLE_TYPE = 'BASE TABLE' ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME`;
        const result = await request('POST', '/api/query', { sql });
        console.log("Query result keys:", Object.keys(result));
        if (result.error) console.error(result.error);
        const baseTables = result.recordset || [];
        
        markdown += `## 🗄️ Database: ${db}\n\n`;
        markdown += `**Tổng số bảng:** ${baseTables.length}\n\n`;
        markdown += `### Danh sách các bảng\n\n`;
        markdown += `| STT | Schema | Tên Bảng | Số Dữ Liệu (Rows) |\n`;
        markdown += `|-----|--------|----------|-------------------|\n`;
        
        let i = 1;
        for (const t of baseTables) {
            markdown += `| ${i++} | ${t.schema} | **${t.name}** | ${t.rowCount || 0} |\n`;
        }
        markdown += `\n---\n\n`;
        markdown += `### Chi tiết cấu trúc từng bảng (${db})\n\n`;

        for (const t of baseTables) {
            const columns = await request('GET', `/api/columns/${t.schema}/${t.name}`);
            markdown += `#### Bảng: \`${t.schema}.${t.name}\`\n`;
            markdown += `**Số dòng:** ${t.rowCount || 0} rows\n\n`;
            
            markdown += `| Cột | Kiểu | Độ dài | Nullable | PK | FK |\n`;
            markdown += `|-----|------|--------|----------|----|----|\n`;
            
            for (const c of columns) {
                const pk = c.isPK ? '✅' : '';
                let fk = c.isFK ? `🔗 ${c.fkTable}(${c.fkColumn})` : '';
                const maxLen = c.maxLen === -1 ? 'MAX' : (c.maxLen ? c.maxLen : '—');
                markdown += `| ${c.name} | ${c.type} | ${maxLen} | ${c.nullable} | ${pk} | ${fk} |\n`;
            }
            markdown += `\n---\n\n`;
        }
    }

    fs.writeFileSync('c:\\Users\\Administrator\\Desktop\\sqlviewer\\vp2014_schema.md', markdown, 'utf8');
    console.log('Successfully generated vp2014_schema.md');
}

run().catch(console.error);
