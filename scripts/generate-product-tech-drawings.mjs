import { mkdir, writeFile } from 'node:fs/promises';

const out = new URL('../public/images/technical/', import.meta.url);
await mkdir(out, { recursive: true });

const frame = (title, subtitle, drawing) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" role="img" aria-labelledby="title desc">
<title id="title">${title}</title><desc id="desc">${subtitle}</desc>
<rect width="1200" height="680" fill="#faf8f1"/><path d="M56 76H1144M56 604H1144" stroke="#d9d2c1" stroke-width="2"/>
<text x="64" y="53" fill="#21477f" font-family="Arial,sans-serif" font-size="25" letter-spacing="2">GỐM SỨ ĐẠI LONG · BẢN VẼ THAM KHẢO</text>
<text x="64" y="650" fill="#716c60" font-family="Arial,sans-serif" font-size="21">Sơ đồ minh họa, không theo tỷ lệ · Kích thước và cấu tạo cần xác nhận theo mẫu Đại Long</text>
<g fill="none" stroke="#24487d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${drawing}</g>
<text x="600" y="128" text-anchor="middle" fill="#242f3e" font-family="Arial,sans-serif" font-size="34" font-weight="700">${title}</text>
<text x="600" y="166" text-anchor="middle" fill="#716c60" font-family="Arial,sans-serif" font-size="21">${subtitle}</text></svg>`;

const diagrams = {
  'rong-chau-nguyet': ['Rồng chầu nguyệt', 'Sơ đồ bố trí trang trí trên đỉnh mái', `<path d="M165 470 Q360 410 510 455 Q640 500 790 442 Q920 390 1035 430 M165 470 L130 500 M1035 430 L1070 460"/><circle cx="600" cy="325" r="92"/><path d="M392 405 Q430 342 503 363 Q539 372 551 397 Q512 420 470 409 Q432 402 405 435 M501 364 Q540 310 579 334 L602 360 M517 371 L481 336 M552 398 Q610 436 661 396 Q710 357 755 378 Q798 396 826 369 M647 397 Q704 435 751 417 M453 408 L426 446 M754 380 L792 350 M404 435 L387 451 M827 369 L855 350 M484 362 L471 346 M594 332 Q617 294 652 306 Q676 315 684 335"/><path d="M315 493H885" stroke-dasharray="13 14"/>`],
  'gach-thong-gio-hoa-roi': ['Gạch thông gió Hoa Roi', 'Mặt viên và sơ đồ ghép mảng tường thoáng', `<rect x="250" y="220" width="300" height="300" rx="8"/><path d="M400 245 C330 275 315 322 372 358 C318 392 342 448 400 480 C458 448 482 392 428 358 C485 322 470 275 400 245Z M400 250V466 M330 358H470"/><rect x="690" y="238" width="100" height="100"/><rect x="790" y="238" width="100" height="100"/><rect x="690" y="338" width="100" height="100"/><rect x="790" y="338" width="100" height="100"/><rect x="690" y="438" width="100" height="80"/><rect x="790" y="438" width="100" height="80"/><path d="M740 262 Q790 287 740 314 M840 262 Q890 287 840 314 M740 362 Q790 387 740 414 M840 362 Q890 387 840 414 M740 456 Q790 480 740 506 M840 456 Q890 480 840 506"/><path d="M180 360H225 M920 360H1020" stroke-dasharray="10 12"/>`],
  'den-ngan-hoa': ['Đèn vườn Ngàn Hoa', 'Hình dáng thân đèn và vùng ô thoáng phát sáng', `<path d="M455 224 Q600 188 745 224 L715 270 H485Z M485 270 L455 465 Q600 520 745 465 L715 270 M455 465 Q600 415 745 465 L760 505 Q600 565 440 505Z M520 224 L520 270 M680 224 L680 270"/><g stroke-width="4"><path d="M510 300l24-12 24 12v27l-24 12-24-12z M582 294l24-12 24 12v27l-24 12-24-12z M654 300l24-12 24 12v27l-24 12-24-12z M500 356l24-12 24 12v27l-24 12-24-12z M572 350l24-12 24 12v27l-24 12-24-12z M644 356l24-12 24 12v27l-24 12-24-12z M490 412l24-12 24 12v27l-24 12-24-12z M562 406l24-12 24 12v27l-24 12-24-12z M634 412l24-12 24 12v27l-24 12-24-12z"/></g><path d="M800 290q40-28 80 0t80 0M800 355q40-28 80 0t80 0M800 420q40-28 80 0t80 0" stroke="#b18b47" stroke-width="5"/>`],
  'lan-can-luc-binh': ['Lan can lục bình', 'Mặt đứng cấu kiện tay vịn – con tiện – chân đế', `<path d="M210 250H990 M210 292H990 M210 486H990 M210 525H990 M240 250V292 M960 250V292 M240 486V525 M960 486V525"/><g><path d="M330 292 C290 325 300 355 338 376 C304 405 304 435 330 462 L330 486 H390 V462 C416 435 416 405 382 376 C420 355 430 325 390 292Z M520 292 C480 325 490 355 528 376 C494 405 494 435 520 462 L520 486 H580 V462 C606 435 606 405 572 376 C610 355 620 325 580 292Z M710 292 C670 325 680 355 718 376 C684 405 684 435 710 462 L710 486 H770 V462 C796 435 796 405 762 376 C800 355 810 325 770 292Z M900 292 C860 325 870 355 908 376 C874 405 874 435 900 462 L900 486 H940 V462 C966 435 966 405 932 376 C970 355 980 325 940 292Z"/></g><path d="M300 548H970" stroke-dasharray="12 12"/>`],
  'gach-trang-tri-hoa-van': ['Gạch trang trí hoa văn cổ', 'Mặt viên gạch và mảng ghép lặp họa tiết', `<rect x="235" y="220" width="300" height="300"/><path d="M385 240 C385 300 325 310 255 370 C325 430 385 440 385 500 C385 440 445 430 515 370 C445 310 385 300 385 240Z M255 370H515 M385 240V500"/><g stroke-width="4"><rect x="680" y="225" width="150" height="150"/><rect x="830" y="225" width="150" height="150"/><rect x="680" y="375" width="150" height="150"/><rect x="830" y="375" width="150" height="150"/><path d="M755 245 C755 285 715 300 695 300 C715 300 755 315 755 355 C755 315 795 300 815 300 C795 300 755 285 755 245Z M905 245 C905 285 865 300 845 300 C865 300 905 315 905 355 C905 315 945 300 965 300 C945 300 905 285 905 245Z M755 395 C755 435 715 450 695 450 C715 450 755 465 755 505 C755 465 795 450 815 450 C795 450 755 435 755 395Z M905 395 C905 435 865 450 845 450 C865 450 905 465 905 505 C905 465 945 450 965 450 C945 450 905 435 905 395Z"/></g>`],
  'gach-lat-ngoai-that': ['Gạch lát sân gốm cổ', 'Sơ đồ mặt bằng lát gạch và mạch ghép', `<path d="M260 225H900L990 315V520H350L260 430Z"/><g stroke-width="4"><path d="M260 225L350 315H990 M260 327L350 417H990 M260 430L350 520 M420 225V315 M580 225V315 M740 225V315 M900 225V315 M350 315V417 M510 315V417 M670 315V417 M830 315V417 M350 417V520 M510 417V520 M670 417V520 M830 417V520"/></g><path d="M190 280L230 320 M190 365L230 405 M945 185L985 225" stroke="#b18b47" stroke-width="5"/>`],
  'ngoi-van-mieu-xanh': ['Ngói Văn Miếu', 'Sơ đồ xếp lớp ngói trên mặt mái', `<path d="M250 470L590 220L950 470 M320 470L590 272 M420 470L590 326 M520 470L590 380 M620 470L670 415 M720 470L770 415 M820 470L870 415"/><g><path d="M350 407 Q390 375 430 407V436H350Z M450 342 Q490 310 530 342V371H450Z M550 278 Q590 246 630 278V307H550Z M650 342 Q690 310 730 342V371H650Z M750 407 Q790 375 830 407V436H750Z"/><path d="M350 436H430 M450 371H530 M550 307H630 M650 371H730 M750 436H830"/></g><path d="M235 493H970" stroke-dasharray="12 12"/>`],
  'nghe-phong-thuy-men-ran': ['Nghê phong thủy', 'Hình chiếu dáng tượng và bệ đặt', `<path d="M300 470H900L850 510H350Z M370 510H830V535H370Z"/><path d="M410 454 Q370 430 390 400 L420 365 Q425 315 480 300 L540 275 Q575 240 625 270 L690 290 Q750 290 770 340 L820 375 Q850 405 810 440 L760 455 Q715 470 670 450 L600 468 L500 458Z"/><path d="M455 375Q500 335 545 360Q520 402 478 402 M620 333Q660 308 698 337 M760 366L815 345 M450 445L425 470 M700 445L730 470 M510 455V470 M650 455V470"/><path d="M840 325Q895 290 920 318Q890 345 850 350" stroke="#b18b47" stroke-width="5"/>`],
  'bo-hoa-chanh-doi': ['Bò hoa chanh đôi', 'Sơ đồ cấu kiện trang trí chạy theo đường nóc', `<path d="M170 465L600 230L1030 465 M220 490L600 275L980 490"/><path d="M300 418 Q330 350 395 370 Q425 335 465 365 L500 390 Q475 430 430 418 Q395 450 350 432Z M700 390 Q735 350 775 370 Q820 335 855 365 L900 395 Q875 430 830 418 Q795 450 750 432Z"/><path d="M380 372 Q410 330 445 340 L468 362 M780 372 Q810 330 845 340 L868 362 M350 432L335 455 M830 432L845 455"/><path d="M290 470H910" stroke-dasharray="12 12"/>`],
};

for (const [slug, [title, subtitle, drawing]] of Object.entries(diagrams)) {
  await writeFile(new URL(`${slug}.svg`, out), frame(title, subtitle, drawing));
}

const roof = (size, overall, length, width, cap) => frame(`Ngói âm dương · cỡ ${size}`, `Mặt cắt minh họa · thông số hình chiếu theo bảng kích thước tham khảo`, `
<path d="M250 400 Q420 250 600 400 Q780 550 950 400"/><path d="M250 400 Q420 335 600 400 Q780 465 950 400" stroke="#b18b47" stroke-width="5"/>
<path d="M280 440V500 M920 440V500 M280 480H920 M280 466L295 480L280 494 M920 466L905 480L920 494" stroke-width="3"/>
<path d="M310 270V320 M890 270V320 M310 290H890 M310 278L322 290L310 302 M890 278L878 290L890 302" stroke-width="3"/>
<path d="M340 520V555 M860 520V555 M340 540H860 M340 528L352 540L340 552 M860 528L848 540L860 552" stroke-width="3"/>
<text x="600" y="470" text-anchor="middle" fill="#24487d" stroke="none" font-family="Arial,sans-serif" font-size="24">${overall}</text>
<text x="600" y="282" text-anchor="middle" fill="#24487d" stroke="none" font-family="Arial,sans-serif" font-size="23">L ${length}</text>
<text x="600" y="575" text-anchor="middle" fill="#24487d" stroke="none" font-family="Arial,sans-serif" font-size="23">W ${width} · Ø ${cap}</text>
<path d="M480 365Q600 295 720 365V406Q600 355 480 406Z" stroke="#ac8151"/>`);

for (const [size, overall, length, width, cap] of [
  ['L', '200 × 195 × 100 mm', '180 mm', '190 mm', '95 mm'],
  ['M', '145 × 165 × 80 mm', '140 mm', '170 mm', '76 mm'],
  ['S', '102 × 117 × 60 mm', '102 mm', '117 mm', '70 mm'],
]) await writeFile(new URL(`ngoi-am-duong-${size.toLowerCase()}.svg`, out), roof(size, overall, length, width, cap));

const tileRoof = (size, module, yinLength, yinWidth, depth, yangLength, cap) => frame(
  "Ngói âm dương · cỡ " + size,
  "Mặt cắt ngói âm, ngói dương và cách xếp cặp trên mái",
  [
    '<path d="M600 195V570" stroke="#d9d2c1" stroke-width="2"/>',
    '<text x="330" y="215" text-anchor="middle" fill="#24487d" stroke="none" font-family="Arial,sans-serif" font-size="24" font-weight="700">MẶT CẮT NGANG</text>',
    '<text x="850" y="215" text-anchor="middle" fill="#24487d" stroke="none" font-family="Arial,sans-serif" font-size="24" font-weight="700">SƠ ĐỒ XẾP CẶP TRÊN MÁI</text>',
    '<text x="330" y="255" text-anchor="middle" fill="#242f3e" stroke="none" font-family="Arial,sans-serif" font-size="22">Ngói âm · lòng rãnh</text>',
    '<path d="M185 285V325 Q330 485 475 325V285 M208 290V320 Q330 455 452 320V290"/>',
    '<path d="M185 510V535 M475 510V535 M185 525H475 M185 517L197 525L185 533 M475 517L463 525L475 533" stroke-width="3"/>',
    '<text x="330" y="559" text-anchor="middle" fill="#24487d" stroke="none" font-family="Arial,sans-serif" font-size="21">W ' + yinWidth + ' · D' + depth + '</text>',
    '<text x="330" y="395" text-anchor="middle" fill="#716c60" stroke="none" font-family="Arial,sans-serif" font-size="20">L ' + yinLength + '</text>',
    '<text x="330" y="420" text-anchor="middle" fill="#242f3e" stroke="none" font-family="Arial,sans-serif" font-size="22">Ngói dương · nắp phủ</text>',
    '<path d="M248 450 Q330 370 412 450 L412 474 Q330 412 248 474Z" stroke="#ac8151"/>',
    '<path d="M248 480V495 M412 480V495 M248 490H412 M248 484L258 490L248 496 M412 484L402 490L412 496" stroke="#ac8151" stroke-width="3"/>',
    '<text x="330" y="510" text-anchor="middle" fill="#8a6738" stroke="none" font-family="Arial,sans-serif" font-size="19">L ' + yangLength + ' · Ø ' + cap + '</text>',
    '<path d="M700 275V485 M820 275V485 M940 275V485" stroke-width="13"/>',
    '<path d="M682 275V485 M802 275V485 M922 275V485 M718 275V485 M838 275V485 M958 275V485" stroke-width="3"/>',
    '<path d="M665 320 Q700 275 735 320V345 Q700 310 665 345Z M785 382 Q820 337 855 382V407 Q820 372 785 407Z M905 440 Q940 395 975 440V465 Q940 430 905 465Z" stroke="#ac8151" stroke-width="5"/>',
    '<path d="M660 500H980" stroke-dasharray="10 12" stroke-width="3"/>',
    '<text x="820" y="535" text-anchor="middle" fill="#242f3e" stroke="none" font-family="Arial,sans-serif" font-size="20">Ngói âm tạo rãnh · ngói dương phủ mối ghép</text>',
    '<text x="820" y="570" text-anchor="middle" fill="#716c60" stroke="none" font-family="Arial,sans-serif" font-size="18">Mô-đun tham khảo: ' + module + '</text>',
  ].join("")
);

for (const [size, module, yinLength, yinWidth, depth, yangLength, cap] of [
  ['L', '200 × 195 × 100 mm', '180 mm', '190 mm', '8 mm', '155 mm', '95 mm'],
  ['M', '145 × 165 × 80 mm', '140 mm', '170 mm', '8 mm', '120 mm', '76 mm'],
  ['S', '102 × 117 × 60 mm', '102 mm', '117 mm', '6 mm', '110 mm', '70 mm'],
]) await writeFile(new URL('ngoi-am-duong-' + size.toLowerCase() + '.svg', out), tileRoof(size, module, yinLength, yinWidth, depth, yangLength, cap));
