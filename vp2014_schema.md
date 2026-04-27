# 📊 Cấu trúc Database VP_2014

> **Database**: VP_2014  
> **Tổng**: 41 bảng | 846 cột | **3.358.252** tổng rows | 0 Foreign Keys định nghĩa  
> *(Chỉ đọc — không sửa, không xóa)*

---

## Tổng quan các bảng

| STT | Tên Bảng | Số Cột | Mô tả chức năng |
|-----|----------|--------|-----------------|
| 1 | **BG** | 13 | Báo giá (header) |
| 2 | **BG0** | 6 | Báo giá (chi tiết dòng) |
| 3 | **CdCt** | 17 | Công nợ chi tiết (header) |
| 4 | **CdCt0** | 8 | Công nợ chi tiết (dòng bút toán) |
| 5 | **CdK** | 11 | Cân đối kế toán (kỳ) |
| 6 | **CdkN** | 11 | Cân đối kế toán (năm) |
| 7 | **CdNTXT** | 13 | Cân đối nhập tồn xuất tồn (header) |
| 8 | **CdNTXT0** | 6 | Cân đối nhập tồn xuất tồn (chi tiết) |
| 9 | **CdZ** | 13 | Cân đối Z (sản phẩm theo tháng) |
| 10 | **CtBH** | 46 | Chứng từ bán hàng (header) |
| 11 | **CtBH0** | 34 | Chứng từ bán hàng (chi tiết vật tư) |
| 12 | **CtMH** | 46 | Chứng từ mua hàng (header) |
| 13 | **CtMH0** | 28 | Chứng từ mua hàng (chi tiết vật tư) |
| 14 | **CtT** | 29 | Phiếu thu/chi (header) |
| 15 | **CtT0** | 12 | Phiếu thu/chi (chi tiết bút toán) |
| 16 | **CtX** | 46 | Chứng từ xuất kho (header) |
| 17 | **CtX0** | 22 | Chứng từ xuất kho (chi tiết) |
| 18 | **DmBp** | 5 | Danh mục bộ phận |
| 19 | **DmDt** | 26 | Danh mục đối tượng (khách hàng/nhà cung cấp) |
| 20 | **DmDvCs** | 6 | Danh mục đơn vị cơ sở |
| 21 | **DmHD** | 8 | Danh mục hợp đồng |
| 22 | **DmKho** | 7 | Danh mục kho |
| 23 | **DmNgSp** | 4 | Danh mục ngành sản phẩm |
| 24 | **DmNhVt** | 4 | Danh mục nhóm vật tư |
| 25 | **DmSpGia** | 7 | Danh mục sản phẩm – giá |
| 26 | **DmTk** | 13 | Danh mục tài khoản kế toán |
| 27 | **DmTte** | 6 | Danh mục tiền tệ |
| 28 | **DmVm** | 7 | Danh mục vùng miền |
| 29 | **DmVt** | 30 | Danh mục vật tư / hàng hóa |
| 30 | **DmXe** | 5 | Danh mục xe |
| 31 | **DmYt** | 4 | Danh mục yếu tố |
| 32 | **Options** | ? | Cấu hình hệ thống |
| 33 | **SoCai** | 30 | Sổ cái (bút toán tổng hợp) |
| 34 | **SoCaiVT** | 66 | Sổ cái vật tư (nhập/xuất/tồn) |
| 35 | **SPHang** | ? | Sản phẩm hàng hóa |
| 36 | **TkCoKh** | ? | Tài khoản có khách hàng |
| 37 | **TkNoKh** | ? | Tài khoản nợ khách hàng |
| 38 | **Users** | ? | Người dùng hệ thống |
| 39 | **VtKho** | ? | Vật tư theo kho |
| 40 | **XeHang** | ? | Xe hàng |
| 41 | **ZBH** | ? | Bảng tổng hợp bán hàng |

---

## Chi tiết cấu trúc từng bảng

### 1. BG — Báo giá (Header)
**PK**: `Stt`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| Stt | char | 20 | NO | ✅ |
| Ma_DvCs | char | 2 | NO | |
| Ngay_Ct | datetime | — | NO | |
| So_Ct | char | 20 | YES | |
| Ma_Dt | char | 16 | YES | |
| Ma_Vm | char | 8 | YES | |
| Ma_Tte | char | 3 | NO | |
| Ty_Gia | numeric(26,4) | — | NO | |
| Ngay_Ct1 | datetime | — | YES | |
| Ngay_Ct2 | datetime | — | YES | |
| UserName | char | 16 | YES | |
| Confirmed | bit | — | YES | |
| Closed | char | 1 | YES | |

---

### 2. BG0 — Báo giá (Chi tiết dòng)
**PK**: `Stt0`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| Stt0 | char | 20 | NO | ✅ |
| Stt | char | 20 | NO | |
| Ma_Vt | char | 16 | YES | |
| Dvt | varchar | 8 | YES | |
| Gia | numeric(26,4) | — | YES | |
| CK | numeric(5,2) | — | YES | |

---

### 3. CdCt — Công nợ chi tiết (Header)
**PK**: `Stt_Tt`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| Stt_Tt | char | 20 | NO | ✅ |
| Ma_DvCs | char | 2 | NO | |
| Ngay_Ct | datetime | — | NO | |
| So_Ct | char | 20 | YES | |
| Ngay_LC | datetime | — | YES | |
| So_LC | char | 20 | YES | |
| Dien_Giai1 | nvarchar | 128 | YES | |
| Dien_Giai2 | nvarchar | 128 | YES | |
| Ma_Dt | char | 16 | YES | |
| Tk | char | 16 | YES | |
| Han_Tt | int(10,0) | — | YES | |
| Ma_Tte | char | 3 | NO | |
| Ty_Gia | numeric(26,4) | — | YES | |
| Ps_No_Nt | numeric(26,4) | — | YES | |
| Ps_No | numeric(26,4) | — | YES | |
| Ps_Co_Nt | numeric(26,4) | — | YES | |
| Ps_Co | numeric(26,4) | — | YES | |

---

### 4. CdCt0 — Công nợ chi tiết (Dòng bút toán)
**PK**: `Htt0ID`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| Htt0ID | bigint | — | NO | ✅ |
| No_Co | char | 1 | NO | |
| Tk | char | 16 | NO | |
| Ma_Dt | char | 16 | YES | |
| Stt_Tt | char | 20 | NO | |
| Stt_Tt0 | char | 20 | NO | |
| Tien_Nt | numeric(26,4) | — | YES | |
| Tien | numeric(26,4) | — | YES | |

---

### 5. CdK — Cân đối kế toán (Kỳ)
**PK**: `CdkID`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| CdkID | bigint | — | NO | ✅ |
| Ma_DvCs | char | 2 | NO | |
| Tk | char | 16 | NO | |
| Ma_Dt | char | 16 | YES | |
| Ma_Tte | char | 3 | NO | |
| Du_No | numeric(26,4) | — | YES | |
| Du_Co | numeric(26,4) | — | YES | |
| Du_No_Nt | numeric(26,4) | — | YES | |
| Du_Co_Nt | numeric(26,4) | — | YES | |
| Du_No0 | numeric(26,4) | — | YES | |
| Du_Co0 | numeric(26,4) | — | YES | |
| Du_No_Nt0 | numeric(26,4) | — | YES | |
| Du_Co_Nt0 | numeric(26,4) | — | YES | |

---

### 6. CdkN — Cân đối kế toán (Năm)
**PK**: `CdkNID`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| CdkNID | bigint | — | NO | ✅ |
| Ma_DvCs | char | 2 | NO | |
| Tk | char | 16 | NO | |
| Ma_Tte | char | 3 | NO | |
| Du_No | numeric(26,4) | — | YES | |
| Du_No_Nt | numeric(26,4) | — | YES | |
| Du_Co | numeric(26,4) | — | YES | |
| Du_Co_Nt | numeric(26,4) | — | YES | |
| Du_No0 | numeric(26,4) | — | YES | |
| Du_No_Nt0 | numeric(26,4) | — | YES | |
| Du_Co0 | numeric(26,4) | — | YES | |
| Du_Co_Nt0 | numeric(26,4) | — | YES | |

---

### 7. CdNTXT — Cân đối Nhập-Tồn-Xuất-Tồn (Header)
**PK**: `Stt0`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| Stt0 | char | 20 | NO | ✅ |
| Ma_DvCs | char | 2 | YES | |
| Ma_Tte | char | 3 | YES | |
| Ma_Kho | char | 16 | YES | |
| Ma_Vt | char | 16 | YES | |
| Dvt | varchar | 8 | YES | |
| He_So9 | numeric(26,4) | — | YES | |
| So_Luong9 | numeric(26,6) | — | YES | |
| So_Luong | numeric(26,6) | — | YES | |
| Tien | numeric(26,4) | — | YES | |
| Tien_Nt | numeric(26,4) | — | YES | |
| Ngay_Ct | datetime | — | YES | |

---

### 8. CdNTXT0 — Cân đối NTXT (Chi tiết xuất)
**PK**: `CdNTXT0ID`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| CdNTXT0ID | bigint | — | NO | ✅ |
| Stt0 | char | 20 | YES | |
| Stt0_PX | char | 20 | YES | |
| So_Luong | numeric(26,6) | — | YES | |
| Tien | numeric(26,4) | — | YES | |
| Tien_Nt | numeric(26,4) | — | YES | |

---

### 9. CdZ — Cân đối Z (Sản phẩm theo tháng)
**PK**: `CdZID`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| CdZID | bigint | — | NO | ✅ |
| Ma_Dvcs | char | 2 | NO | |
| Nam | int | — | YES | |
| Thang | int | — | YES | |
| Ma_Sp | char | 16 | YES | |
| Ma_Yt | char | 16 | YES | |
| Ma_Dm_Sp | char | 16 | YES | |
| Ma_Vt_Nh | char | 1 | YES | |
| SL_Xuat | numeric(26,6) | — | YES | |
| Tien_Xuat | numeric(26,4) | — | YES | |
| Ton_Cuoi | numeric(26,6) | — | YES | |
| Du_Cuoi | numeric(26,4) | — | YES | |
| Loai_DD | char | 1 | YES | |

---

### 10. CtBH — Chứng từ Bán hàng (Header — 46 cột)
**PK**: `Stt`

| Cột | Kiểu | Độ dài | Nullable | PK |
|-----|------|--------|----------|---|
| Stt | char | 20 | NO | ✅ |
| Ma_DvCs | char | 2 | NO | |
| Ma_Ct | char | 2 | NO | |
| Nh_Ct | char | 1 | NO | |
| Ma_Tte | char | 3 | NO | |
| Ty_Gia | numeric(26,4) | — | NO | |
| Ngay_Ps | datetime | — | NO | |
| Ngay_Ct | datetime | — | NO | |
| So_Ct | char | 20 | YES | |
| Ma_Xe | char | 8 | YES | |
| Ma_Bp | char | 16 | YES | |
| Ma_HD | char | 16 | YES | |
| Ma_Dt | char | 16 | NO | |
| Ma_Nx | char | 16 | YES | |
| Tk2 | char | 16 | YES | |
| Tk3 | char | 16 | YES | |
| Tk_Du3 | char | 16 | YES | |
| Tk4 | char | 16 | YES | |
| Ong_Ba | nvarchar | 64 | YES | |
| Dia_Chi | nvarchar | 64 | YES | |
| Dien_Giai0 | nvarchar | 128 | YES | |
| Desc_EN0 | nvarchar | 128 | YES | |
| Ma_Thue | char | 8 | YES | |
| TTien_Nt | numeric(26,4) | — | YES | |
| TTien | numeric(26,4) | — | YES | |
| Thue_GTGT_Nt | numeric(26,4) | — | YES | |
| Thue_GTGT | numeric(26,4) | — | YES | |
| T_TT_Nt | numeric(26,4) | — | YES | |
| T_TT | numeric(26,4) | — | YES | |
| So_HD | char | 20 | YES | |
| Ngay_HD | datetime | — | YES | |
| Ma_Httt | char | 8 | YES | |
| UserName | char | 16 | YES | |
| Confirmed | bit | — | YES | |
| Closed | char | 1 | YES | |
| Ref | char | 20 | YES | |
| RefDate | datetime | — | YES | |
| Ma_Kho0 | char | 16 | YES | |
| Lu_Ket | bit | — | YES | |
| HT_Giao | nvarchar | 64 | YES | |
| Tr_Truoc | numeric(26,4) | — | YES | |
| CK_HD | numeric(5,2) | — | YES | |
| T_CK_HD | numeric(26,4) | — | YES | |
| T_CK_HD_Nt | numeric(26,4) | — | YES | |
| Ma_Dv_Boc | char | 16 | YES | |
| Ma_Bp_Sale | char | 16 | YES | |

---

### 11. CtBH0 — Bán hàng chi tiết vật tư (34 cột)
**PK**: `Stt0`

| Cột | Kiểu | Độ dài | Nullable |
|-----|------|--------|----------|
| Stt0 | char | 20 | NO (PK) |
| Stt | char | 20 | NO |
| Ma_Vt | char | 16 | YES |
| Dvt | varchar | 8 | YES |
| He_So | numeric(26,4) | — | YES |
| So_Luong | numeric(26,6) | — | YES |
| Gia_Nt | numeric(26,4) | — | YES |
| Gia | numeric(26,4) | — | YES |
| CK | numeric(5,2) | — | YES |
| Tien_Nt | numeric(26,4) | — | YES |
| Tien | numeric(26,4) | — | YES |
| Ma_Thue | char | 8 | YES |
| Thue_Suat | numeric(5,2) | — | YES |
| Thue_Nt | numeric(26,4) | — | YES |
| Thue | numeric(26,4) | — | YES |
| Tk | char | 16 | YES |
| Tk_Du | char | 16 | YES |
| Tk_Thue | char | 16 | YES |
| Ma_Kho | char | 16 | YES |
| Ma_Bp | char | 16 | YES |
| Ma_Nx | char | 16 | YES |
| Ma_Sp | char | 16 | YES |
| Ma_Yt | char | 16 | YES |
| Dien_Giai | nvarchar | 128 | YES |
| Desc_EN | nvarchar | 128 | YES |
| Gia9 | numeric(26,4) | — | YES |
| Gia9_Nt | numeric(26,4) | — | YES |
| Ma_Lo | char | 16 | YES |
| HSD | datetime | — | YES |
| Ma_Dm_Sp | char | 16 | YES |
| T_CK | numeric(26,4) | — | YES |
| T_CK_Nt | numeric(26,4) | — | YES |
| Gia_Nt2 | numeric(26,4) | — | YES |
| SL_Hop | numeric(26,6) | — | YES |

---

### 12. CtMH — Chứng từ Mua hàng (Header — 46 cột)
**PK**: `Stt`  
*(Cấu trúc tương tự CtBH với các trường: Ngay_Ct, So_Ct, Ma_Dt, Ma_Tte, Ty_Gia, TTien_Nt, Thue_GTGT, UserName, Confirmed, Closed, Ma_Thue, So_HD, Ngay_HD, Ma_Httt, v.v.)*

---

### 13. CtMH0 — Mua hàng chi tiết vật tư (28 cột)
**PK**: `Stt0`  
*(Cấu trúc tương tự CtBH0: Stt0, Stt, Ma_Vt, Dvt, He_So, So_Luong, Gia_Nt, Gia, Tien_Nt, Tien, Ma_Thue, Thue_Suat, Thue_Nt, Thue, Tk, Tk_Du, Tk_Thue, Ma_Kho, Ma_Bp, Ma_Nx, Ma_Sp, Ma_Yt, Dien_Giai, Ma_Lo, HSD, Ma_Dm_Sp, T_CK, T_CK_Nt)*

---

### 14. CtT — Phiếu Thu/Chi (Header — 29 cột)
**PK**: `Stt`

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| Stt | char(20) | PK |
| Ma_DvCs | char(2) | Đơn vị cơ sở |
| Ma_Ct | char(2) | Loại chứng từ |
| Nh_Ct | char(1) | Nhóm chứng từ |
| Ma_Tte | char(3) | Tiền tệ |
| Ty_Gia | numeric(26,4) | Tỷ giá |
| Ngay_Ct | datetime | Ngày chứng từ |
| So_Ct | char(20) | Số chứng từ |
| So_Seri | char(20) | Số serial |
| Ma_Dt0 | char(16) | Đối tượng |
| Ong_Ba | nvarchar(64) | Họ tên |
| Dia_Chi | nvarchar(64) | Địa chỉ |
| Ly_Do | nvarchar(128) | Lý do |
| TTien_Nt | numeric(26,4) | Tổng tiền ngoại tệ |
| TTien | numeric(26,4) | Tổng tiền VND |
| Ma_Httt | char(8) | Hình thức TT |
| UserName | char(16) | Người nhập |
| Confirmed | bit | Đã xác nhận |
| Closed | char(1) | Đã khóa |

---

### 15. CtT0 — Thu/Chi chi tiết bút toán (12 cột)
**PK**: `CtT0ID`

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| CtT0ID | bigint | PK |
| Stt | char(20) | Header FK |
| Tk | char(16) | Tài khoản |
| Tk_Du | char(16) | TK đối ứng |
| Ma_Dt | char(16) | Đối tượng |
| Dien_Giai | nvarchar(128) | Diễn giải |
| Tien_Nt | numeric(26,4) | Tiền ngoại tệ |
| Tien | numeric(26,4) | Tiền VND |

---

### 16. CtX / CtX0 — Chứng từ Xuất kho
**CtX** (Header, 46 cột, PK `Stt`): Tương tự CtBH  
**CtX0** (Chi tiết, 22 cột, PK `Stt0`): Tương tự CtBH0 không có thuế

---

### 17. SoCai — Sổ cái (30 cột)
**PK**: `SoCaiID`

| Cột | Kiểu | Ghi chú |
|-----|------|---------|
| SoCaiID | bigint | PK |
| Ma_DvCs | char(2) | |
| Ma_Ct | char(2) | |
| Nh_Ct | char(1) | |
| Ma_Tte | char(3) | |
| Ty_Gia | numeric(26,4) | |
| Ngay_Ps | datetime | |
| Ngay_Ct | datetime | |
| So_Ct | char(20) | |
| Stt | char(20) | |
| Tk_No | char(16) | TK Nợ |
| Tk_Co | char(16) | TK Có |
| Ma_Dt_No | char(16) | Đối tượng Nợ |
| Ma_Dt_Co | char(16) | Đối tượng Có |
| Tien_Nt | numeric(26,4) | |
| Tien | numeric(26,4) | |
| Ma_Bp | char(16) | |
| Ma_Nx | char(16) | |
| Ma_Sp | char(16) | |
| Ma_Yt | char(16) | |
| Ma_HD | char(16) | |
| Dien_Giai | nvarchar(128) | |
| UserName | char(16) | |
| Confirmed | bit | |
| Closed | char(1) | |
| Ref | char(20) | |

---

### 18. SoCaiVT — Sổ cái Vật tư (66 cột — bảng lớn nhất)
**PK**: `Stt`, `Stt0`  
*(Ghi lại đầy đủ nhập/xuất/tồn từng vật tư: So_Luong, Gia, Tien, Tk, Tk_Du, Ma_Kho, Ma_Lo, HSD, Ma_Sp, Ma_Yt, ...)*

---

### 19–21. Danh mục chính (DmXxx)

#### DmDt — Đối tượng (26 cột)
**PK**: `Ma_Dt`

| Cột tiêu biểu | Kiểu |
|---------------|------|
| Ma_Dt | char(16) — PK |
| Ten_Dt | nvarchar(64) |
| Dia_Chi | nvarchar(128) |
| Dien_Thoai | varchar(32) |
| Fax | varchar(32) |
| Ma_So_Thue | varchar(16) |
| Email | varchar(64) |
| Loai_Dt | char(1) |
| Tk_No | char(16) |
| Tk_Co | char(16) |
| Tk_Ung | char(16) |
| Han_Tt | int |
| Ha_Muc | numeric(26,4) |
| Ong_Ba | nvarchar(64) |
| Ma_Vung | char(8) |
| Ma_Vm | char(8) |
| UserName | char(16) |

#### DmVt — Vật tư / Hàng hóa (30 cột)
**PK**: `Ma_Vt`

| Cột tiêu biểu | Kiểu |
|---------------|------|
| Ma_Vt | char(16) — PK |
| Ten_Vt | nvarchar(128) |
| Dvt | varchar(8) |
| He_So | numeric(26,4) |
| Dvt1 | varchar(8) |
| Tk | char(16) |
| Tk_Gv | char(16) |
| Tk_Dt | char(16) |
| Ma_Nhvt | char(16) |
| Ma_Sp | char(16) |
| Ma_Yt | char(16) |
| Ma_Dm_Sp | char(16) |
| Gia9 | numeric(26,4) |
| Ma_Thue | char(8) |
| Loai_Vt | char(1) |

#### DmTk — Tài khoản kế toán (13 cột)
**PK**: `Tk`

| Cột | Kiểu |
|-----|------|
| Tk | char(16) — PK |
| Ten_Tk | nvarchar(128) |
| Loai_Tk | char(1) |
| Bac_Tk | int |
| Tk_Me | char(16) |
| Du_No_Co | char(1) |
| Co_Dt | char(1) |
| Co_Ngoai_Te | char(1) |
| Co_Ma_Vt | char(1) |
| Co_Kho | char(1) |

#### DmTte — Tiền tệ (6 cột)

| Cột | Kiểu |
|-----|------|
| Ma_Tte | char(3) — PK |
| Ten_Tte | nvarchar(32) |
| Ky_Hieu | char(4) |
| Ty_Gia | numeric(26,4) |
| Loai_Tte | char(1) |

#### DmKho — Kho (7 cột)

| Cột | Kiểu |
|-----|------|
| Ma_Kho | char(16) — PK |
| Ten_Kho | nvarchar(64) |
| Ma_DvCs | char(2) |
| Dia_Chi | nvarchar(128) |

#### DmBp — Bộ phận (5 cột)

| Cột | Kiểu |
|-----|------|
| Ma_Bp | char(16) — PK |
| Ten_Bp | nvarchar(64) |
| Ma_Bp_Me | char(16) |

#### DmHD — Hợp đồng (8 cột)

| Cột | Kiểu |
|-----|------|
| Ma_HD | char(16) — PK |
| Ten_HD | nvarchar(64) |
| Ngay_HD | datetime |
| Ma_Dt | char(16) |
| Gia_Tri | numeric(26,4) |

#### DmXe — Xe (5 cột)

| Cột | Kiểu |
|-----|------|
| Ma_Xe | char(8) — PK |
| Ten_Xe | nvarchar(64) |
| Bien_So | varchar(16) |

#### DmVm — Vùng miền (7 cột)

| Cột | Kiểu |
|-----|------|
| Ma_Vm | char(8) — PK |
| Ten_Vm | nvarchar(64) |

#### DmDvCs — Đơn vị cơ sở (6 cột)

| Cột | Kiểu |
|-----|------|
| Ma_DvCs | char(2) — PK |
| Ten_DvCs | nvarchar(128) |
| Dia_Chi | nvarchar(128) |

---

## Nhận xét cấu trúc

> [!NOTE]
> **Hệ thống kế toán dạng chứng từ kép (Double-entry)**  
> Mỗi nghiệp vụ có bảng Header (Stt) + bảng Detail (Stt0). 
> Ví dụ: CtBH ↔ CtBH0, BG ↔ BG0, CtT ↔ CtT0

> [!TIP]
> **Quy tắc đặt tên cột nhất quán trên toàn hệ thống:**
> - `Ma_*` = Mã (char, FK logic)
> - `Tk_*` = Tài khoản kế toán (char 16)
> - `Tien_Nt` = Tiền ngoại tệ | `Tien` = Tiền VND
> - `Ngay_Ct` = Ngày chứng từ | `So_Ct` = Số chứng từ
> - `Stt` = STT header | `Stt0` = STT chi tiết (PK dạng char 20)
> - `UserName` = Người nhập liệu
> - `Confirmed` (bit) + `Closed` (char 1) = Trạng thái duyệt/khóa

> [!IMPORTANT]
> **Không có Foreign Key vật lý** được khai báo trong DB.  
> Các mối quan hệ được duy trì theo quy ước: `CtBH0.Stt = CtBH.Stt`, `BG0.Stt = BG.Stt`, v.v.  
> Kiểu số tiền: `numeric(26,4)` cho tiền tệ, `numeric(26,6)` cho số lượng.
