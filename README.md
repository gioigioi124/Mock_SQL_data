# ⬡ SQL Table Viewer

Ứng dụng web xem dữ liệu SQL Server — chạy local trên máy của bạn.

## Yêu cầu
- Node.js >= 16 (tải tại https://nodejs.org)

## Cài đặt & Chạy

```bash
# 1. Giải nén và vào thư mục
cd sqlviewer

# 2. Cài dependencies
npm install

# 3. Khởi động server
npm start
```

Sau đó mở trình duyệt: **http://localhost:3000**

## Tính năng

| Tab | Mô tả |
|-----|-------|
| **Data** | Xem dữ liệu bảng, phân trang, xuất CSV |
| **Schema** | Xem cấu trúc cột, PK, FK, kiểu dữ liệu |
| **Query** | Chạy SQL tùy ý (F5 để chạy) |
| **Relationships** | Sơ đồ Foreign Key giữa các bảng |

## Đổi kết nối
Nhấn nút **⚙** góc trên phải để đổi thông tin kết nối.

## Lưu ý bảo mật
- Ứng dụng chỉ chạy local, không expose ra internet
- Đang dùng tài khoản `sa` (admin) — tránh DELETE/DROP dữ liệu gốc
- Nên tạo schema riêng cho việc phân tích: `CREATE SCHEMA analysis;`
