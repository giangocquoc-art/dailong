# Kiểm kê catalog Gốm sứ Đại Long — 2026-10-15

## Nguồn & bảo toàn dữ liệu

- Production đang hiện 10 sản phẩm tĩnh từ `lib/content.ts`.
- Payload CMS công khai tại `admin.gomsudailong.vn/api/products`: **19/19 published**.
- Sao lưu dữ liệu gốc: `docs/catalog-recovery/payload-products-snapshot-2026-10-15.json` (read-only API export).
- Tổng 29 mã sản phẩm riêng biệt trên hai nguồn; **0 mã trùng chính xác, 0 tên trùng chính xác**. Điều này KHÔNG chứng minh 29 sản phẩm vật lý khác nhau.
- **16/19 ảnh đại diện CMS trả HTTP 404**, 3 ảnh trả HTTP 200 nhưng là ảnh tĩnh dùng chung với sản phẩm mặc định.
- **14/14 ảnh gallery bổ sung cũng trả HTTP 404** (kiểm tra trực tiếp từng URL). Tổng cộng 30/33 đường dẫn ảnh lưu trong CMS bị lỗi 404.
- CMS `/api/media` trả 0 bản ghi, ảnh catalog thuộc `/images/catalog/` vắng mặt trong nhánh Git đang triển khai. Không xóa, không sửa database/production.

Các mã 404 trong bảng bên dưới là **tình trạng đường dẫn cũ trên production trước khi khôi phục**; URL dự phòng Blob tương ứng hiện trả 200 trên bản preview.

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

## Trạng thái phục hồi ảnh và điều kiện phát hành

1. **ĐÃ PHỤC HỒI:** 33/33 tệp ảnh gốc (19 ảnh đại diện + 14 gallery), tổng cộng **95.549.114 bytes**. Đọc từ deployment Vercel 23/09/2026 và chép nguyên byte vào **Vercel Blob hiện có của dự án**, namespace `dailong-recovery-2026-10-15`. Không dùng ảnh AI hay ảnh thay thế.
2. **ĐÃ XÁC MINH:** HEAD cả 33 Blob URL trả HTTP 200, `Content-Length` khớp byte gốc, MIME `image/*`. Manifest SHA-256 của từng tệp: [`recovered-media-manifest-2026-10-15.json`](./recovered-media-manifest-2026-10-15.json).
3. **ĐÃ TEST:** Bản preview trên nhánh `codex/dai-long-cms-catalog-recovery` đang hiển thị 29 mã (10 mặc định + 19 CMS), các URL CMS đã chuyển sang ảnh Blob; website chính **chưa thay đổi**.
4. **CHỜ RÀ SOÁT NGHIỆP VỤ:** 3 cặp dùng chung ảnh (`RS-001`/`DL-RP01`, `NMHG`/`DL-NVM01`, `ĐTSXD`/`DL-DV01`) có thể là sản phẩm khác nhau; không tự động xóa/gộp nếu chưa xác nhận.
5. **CHƯA PHÁT HÀNH:** Merge/promotion và cờ production `DAI_LONG_ENABLE_PAYLOAD_CATALOG=1` chưa được thực hiện. Cần kiểm tra ảnh trực quan và sự trùng mẫu thực tế trước khi đưa lên website chính.

## Thiết kế kỹ thuật trên nhánh kiểm thử

- `lib/payload-catalog.ts`: đọc danh sách sản phẩm Payload qua API, lấy nhiều trang nếu cần; không ghi CMS.
- `lib/content.ts`: chỉ dùng Payload trên nhánh `codex/dai-long-cms-catalog-recovery` hoặc khi `DAI_LONG_ENABLE_PAYLOAD_CATALOG=1` trong Vercel. Production hiện tại KHÔNG bật cờ.
- `next.config.ts`: alias Cloudflare Worker bindings cho môi trường Vercel để preview biên dịch; Cloudflare Worker thực tế không thay đổi.
- `lib/recovered-cms-media.ts`: ánh xạ **chỉ 33 URL ảnh được kiểm chứng** sang Vercel Blob; không ảnh hưởng ảnh mặc định, cũng không đổi ảnh sản phẩm CMS sẽ thêm về sau.
- Giữ nguyên các trang JSX/CSS hiện tại. Có fallback 10 sản phẩm khi CMS không truy cập được.

## Phát hiện mới: bản deploy ngày 23/09/2026 còn giữ ảnh gốc

- Đã truy tìm deployment Vercel production cũ `dpl_Am2mPAKbqbBczeGjdFTvVePyaYbA` (23/09/2026, nhánh `feature/admin-cms-builder`, commit lúc deploy `a9371c0cab010ed5880b241d7615efee5ffa1798`).
- API Vercel xác nhận thư mục nguồn `src/public/images/catalog` của deployment này **còn 27 tệp**. Số này khớp chính xác 27 đường dẫn ảnh `/images/catalog/*` CMS đang tham chiếu và website mới trả 404; 3 tệp `*-hover.png` thuộc thư mục cha `src/public/images` cũng hiện diện.
- Đã kiểm tra trực tiếp một số ảnh gốc qua URL của deployment cũ và nhận HTTP 200, như `ngoi-am-duong-gom-anh-1.jpg`, `ao-kim-dsc-5365-copy.jpg`, `ho-lo-chong-set-dsc-5359.jpg`, `ngoi-bo-noc-750-5242.jpg`, `gach-hoa-gom-gach-hoa-buoi-30-gom-3.jpg` và `den-vuon-hover.png`.
- **ĐÃ KHẮC PHỤC:** Tất cả 33 ảnh nhị phân đã được sao chép nguyên vẹn sang Vercel Blob. Ảnh được phục vụ trực tiếp từ Blob URL riêng, không phụ thuộc URL `.vercel.app` cũ có Deployment Protection.
- Dữ liệu CMS 19 bản ghi vẫn an toàn. **Production vẫn giữ 10 sản phẩm; bản preview phục hồi 29 mã và ảnh CMS đã phục hồi đầy đủ.**
