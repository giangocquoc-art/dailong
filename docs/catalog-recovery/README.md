# Kiểm kê catalog Gốm sứ Đại Long — 2026-10-15

## Nguồn & bảo toàn dữ liệu

- Production đang hiện 10 sản phẩm tĩnh từ `lib/content.ts`.
- Payload CMS công khai tại `admin.gomsudailong.vn/api/products`: **19/19 published**.
- Sao lưu dữ liệu gốc: `docs/catalog-recovery/payload-products-snapshot-2026-10-15.json` (read-only API export).
- Tổng 29 mã sản phẩm riêng biệt trên hai nguồn; **0 mã trùng chính xác, 0 tên trùng chính xác**. Điều này KHÔNG chứng minh 29 sản phẩm vật lý khác nhau.
- **16/19 ảnh đại diện CMS trả HTTP 404**, 3 ảnh trả HTTP 200 nhưng là ảnh tĩnh dùng chung với sản phẩm mặc định.
- CMS `/api/media` trả 0 bản ghi, ảnh catalog thuộc `/images/catalog/` vắng mặt trong nhánh Git đang triển khai. Không xóa, không sửa database/production.

## Danh sách CMS & ảnh đại diện

| # | Mã | Tên | HTTP ảnh | Cảnh báo |
|---:|---|---|---:|---|
| 1 | MS001 | Mảnh sành men lam | 404 | — |
| 2 | ĐS-001 | Đao voi nhỏ xanh đồng | 404 | — |
| 3 | HL-001 | Hồ lô sao nâu đỏ | 404 | — |
| 4 | BS-001 | Bò hoa chanh đặc nhỏ ghi ánh kim | 404 | — |
| 5 | NS-001 | Nghê ngồi men rạn | 404 | — |
| 6 | NG-001 | Nghê gốm nhỏ | 404 | — |
| 7 | RS-001 | Rồng vàng mini | 200 | Cùng ảnh với DL-RP01 |
| 8 | RG-001 | Rồng mini gốm | 404 | — |
| 9 | NMHS | Ngói miếu cổ Bái Đính | 404 | — |
| 10 | NMHG | Ngói mũi hài gốm | 200 | Cùng ảnh với DL-NVM01 |
| 11 | LCS001 | Lan can giọt lệ sứ | 404 | — |
| 12 | LCG001 | Lan can gốm | 404 | — |
| 13 | GCBT | Gạch cổ Bát Tràng | 404 | — |
| 14 | ĐTSXD | Đèn thỏ xanh đồng | 200 | Cùng ảnh với DL-DV01 |
| 15 | DGTC | Đèn gốm tứ cảnh | 404 | — |
| 16 | GH001 | Gạch hoa bưởi 30 xanh đồng | 404 | — |
| 17 | GH002 | Gạch hoa bưởi 30 gốm | 404 | — |
| 18 | NAD27XD | Ngói âm dương 27 xanh đồng | 404 | — |
| 19 | NAD27G | Ngói âm dương 27 gốm đỏ | 404 | — |

## Các mã mặc định đang hiển thị

- `DL-RP01` — Rồng chầu nguyệt men đa sắc
- `DL-GTG01` — Gạch thông gió Hoa Roi men xanh
- `DL-DV01` — Đèn vườn Ngàn Hoa
- `DL-LC01` — Lan can lục bình sứ trắng
- `DL-GTT01` — Gạch trang trí hoa văn cổ
- `DL-GL01` — Gạch lát sân gốm cổ
- `DL-NAD01` — Ngói âm dương men xanh giả đá
- `DL-NVM01` — Ngói Văn Miếu men xanh cổ vịt
- `DL-NPT01` — Nghê phong thủy men rạn
- `DL-DKN01` — Bò hoa chanh đôi men da lươn

## Rủi ro bắt buộc xử lý trước khi phát hành

1. Khôi phục **ảnh gốc** của ít nhất 16 sản phẩm CMS và các ảnh gallery đang thất lạc từ nguồn khách hàng, backup media hoặc hạ tầng lưu trữ cũ. Không thay bằng ảnh mặt hàng khác.
2. Rà thủ công 3 cặp dùng chung ảnh (`RS-001`/`DL-RP01`, `NMHG`/`DL-NVM01`, `ĐTSXD`/`DL-DV01`): có thể là sản phẩm khác nhau nhưng ảnh đại diện dùng chung.
3. Preview dùng adapter đọc CMS (không ghi) và gộp theo mã, slug, tên chính xác; kiểm tra giao diện, sản phẩm, SEO và API trước khi bật cờ trên production.
4. Chỉ phát hành khi ảnh được kiểm tra HTTP 200 và khách xác nhận các mẫu trùng thực tế. Không tự động xóa sản phẩm CMS.

## Thiết kế kỹ thuật trên nhánh kiểm thử

- `lib/payload-catalog.ts`: đọc danh sách sản phẩm Payload qua API, lấy nhiều trang nếu cần; không ghi CMS.
- `lib/content.ts`: chỉ dùng Payload trên nhánh `codex/dai-long-cms-catalog-recovery` hoặc khi `DAI_LONG_ENABLE_PAYLOAD_CATALOG=1` trong Vercel. Production hiện tại KHÔNG bật cờ.
- `next.config.ts`: alias Cloudflare Worker bindings cho môi trường Vercel để preview biên dịch; Cloudflare Worker thực tế không thay đổi.
- Giữ nguyên các trang JSX/CSS hiện tại. Có fallback 10 sản phẩm khi CMS không truy cập được.
