const users = JSON.parse(localStorage.getItem("users")) || [];
const currentSession = JSON.parse(sessionStorage.getItem("currentUser"));
const container = document.getElementById("danh-sach-huy-hieu");
if (!currentSession) {
    container.innerHTML = '<p style="text-align:center;grid-column: 1 / -1;">⚠️ Bạn cần đăng nhập để xem huy hiệu của mình.</p>';
} else {
    const user = users.find(u => u.email === currentSession.email);
    const tongZeni = user.history?.reduce((sum, h) => sum + h.zeni, 0);
    const items = user.items?.length ;
    const soNgay = demSoNgayOnline(user.email);
    user.thanhTich = user.thanhTich || [];
    let html = "";

    if (tongZeni >= 100000 && !user.thanhTich.includes("rongvang")) {
        html += `
        <div class="huy-hieu-card locked" id="card-rongvang">
            💎 Rồng Vàng<br/>
            Nạp trên 100.000 Zeni<br/>
            <button onclick="nhanThuong('rongvang', 20000, 'gold')">Nhận thưởng</button>
        </div>`;
    } else if (user.thanhTich.includes("rongvang")) {
        html += `
        <div class="huy-hieu-card gold">
            💎 Rồng Vàng<br/>Nạp trên 100.000 Zeni<br/>✅ Hoàn thành
        </div>`;
    } else {
        html += `
        <div class="huy-hieu-card locked">
            💎 Rồng Vàng<br/>Cần thêm ${(100000 - tongZeni).toLocaleString()} Zeni
        </div>`;
    }

    if (items >= 10 && !user.thanhTich.includes("hunter10")) {
    html += `
        <div class="huy-hieu-card locked" id="card-hunter10">
        🛍️ Thợ Săn Vật Phẩm<br/>
        Đã mua 10 vật phẩm<br/>
        <button onclick="nhanThuong('hunter10', 300000, 'silver')">
            Nhận thưởng
        </button>
        </div>`;
    } else if (user.thanhTich.includes("hunter10")) {
        html += `
        <div class="huy-hieu-card silver">
            🛍️ Thợ Săn Vật Phẩm<br/>Đã mua 10 vật phẩm<br/>✅ Hoàn thành
        </div>`;
    } else {
        html += `
        <div class="huy-hieu-card locked">
            🛍️ Thợ Săn Vật Phẩm<br/>Còn ${10 - items} món nữa
        </div>`;
    }

    if (soNgay >= 2 && !user.thanhTich.includes("login5")) {
        html += `
        <div class="huy-hieu-card locked" id="card-login5">
            📅 Chiến Binh Chăm Chỉ<br/>
            Đăng nhập 2 ngày<br/>
            <button onclick="nhanThuong('login5', 200000, 'bronze')">
            Nhận thưởng
            </button>
        </div>`;
    } else if (user.thanhTich.includes("login5")) {
        html += `
        <div class="huy-hieu-card bronze">
            📅 Chiến Binh Chăm Chỉ<br/>Đăng nhập 2 ngày<br/>✅ Hoàn thành
        </div>`;
    } else {
        html += `
        <div class="huy-hieu-card locked">
            📅 Chiến Binh Chăm Chỉ<br/>Còn ${2 - soNgay} ngày nữa
        </div>`;
    }

    if (tongZeni >= 500000 && !user.thanhTich.includes("vipmax")) {
        html += `
        <div class="huy-hieu-card locked" id="card-vipmax">
            🐉 Thần Rồng Gọi Tên<br/>
            VIP cấp cao nhất<br/>
            <button onclick="nhanThuong('vipmax', 500000, 'dragon-god')">
            Nhận thưởng VIP
            </button>
        </div>`;
    } else if (user.thanhTich.includes("vipmax")) {
        html += `
        <div class="huy-hieu-card dragon-god">
            🐉 Thần Rồng Gọi Tên<br/>VIP cấp cao nhất<br/>👑 TOP NẠP 👑
        </div>`;
    } else {
        html += `
        <div class="huy-hieu-card locked">
            🐉 Thần Rồng Gọi Tên<br/>Cần thêm ${(500000 - tongZeni).toLocaleString()} Zeni
        </div>`;
    }

    if (items >= 17 && !user.thanhTich.includes("hunter17")) {
        html += `
        <div class="huy-hieu-card locked" id="card-hunter17">
            🎁 Mở Rương Nhiều Nhất<br/>
            Đã mua 17 vật phẩm<br/>
            <button onclick="nhanThuong('hunter17', 170000, 'silver')">
            Nhận thưởng VIP
            </button>
        </div>`;
    } else if (user.thanhTich.includes("hunter17")) {
        html += `
        <div class="huy-hieu-card silver">
            🎁 Mở Rương Nhiều Nhất<br/>Đã mua 17 vật phẩm<br/>✅ Hoàn thành
        </div>`;
    } else {
        html += `
        <div class="huy-hieu-card locked">
            🎁 Mở Rương Nhiều Nhất<br/>Cần thêm ${17 - items} món nữa
        </div>`;
    }


    if (soNgay >= 5 && !user.thanhTich.includes("login15")) {
        html += `
        <div class="huy-hieu-card locked" id="card-login15">
            ⏱️ Chăm Online<br/>
            Đăng nhập 5 ngày<br/>
            <button onclick="nhanThuong('login15', 300000, 'bronze')">
            Nhận thưởng VIP
            </button>
        </div>`;
    } else if (user.thanhTich.includes("login15")) {
        html += `
        <div class="huy-hieu-card bronze">
            ⏱️ Chăm Online<br/>Đăng nhập 5 ngày<br/>✅ Hoàn thành
        </div>`;
    } else {
        html += `
        <div class="huy-hieu-card locked">
            ⏱️ Chăm Online<br/>Cần thêm ${5 - soNgay} ngày nữa
        </div>`;
    }
    container.innerHTML=html
}

function demSoNgayOnline(email) {
    const key = `onlineTimeData_${email}`;
    const data = JSON.parse(localStorage.getItem(key)) || {};
    return Object.keys(data).length;
}

function getHuyHieuHTML(ma) {
    switch(ma) {
    case "rongvang":
    return "💎 Rồng Vàng<br/>Nạp trên 100.000 Zeni";
    case "hunter10":
    return "🛍️ Thợ Săn Vật Phẩm<br/>Đã mua 10 vật phẩm";
    case "login5":
    return "📅 Chiến Binh Chăm Chỉ<br/>Đăng nhập 5 ngày";
    case "vipmax":
    return "🐉 Thần Rồng Gọi Tên<br/>VIP cấp cao nhất";
    case "hunter17":
    return "🎁 Mở Rương Nhiều Nhất<br/>Đã mua 17 vật phẩm";
    case "login15":
    return "⏱️ Chăm Online<br/>Đăng nhập 15 ngày";
    }
}

function nhanThuong(ma, soTien, cap) {
    const user = users.find(u => u.email === currentSession.email);
    user.thanhTich = user.thanhTich || [];
    user.kimcuong += soTien;
    user.thanhTich.push(ma);
    localStorage.setItem("users", JSON.stringify(users));
    showToast(`✅ Nhận ${soTien.toLocaleString()} Zeni từ thành tích!`);
    const card = document.getElementById("card-" + ma);
    card.classList.remove("locked");
    card.classList.add(cap); 
    card.innerHTML = getHuyHieuHTML(ma) + "<br/>✅ Hoàn thành";
}

function getVipLevel(zeni) {
    if (zeni < 1000) return 0;
    if (zeni < 5000) return 1;
    if (zeni < 10000) return 2;
    if (zeni < 20000) return 3;
    if (zeni < 50000) return 4;
    if (zeni < 100000) return 5;
    if (zeni < 200000) return 6;
    if (zeni < 300000) return 7;
    if (zeni < 500000) return 8;
    if (zeni < 9999999) return 9;
    return 10; 
}

function getTitle(vip) {
    const titles = [
        "⚪ Tân Binh",                 // VIP 0
        "🔰 Chiến Binh Z",             // VIP 1
        "💥 Chiến Binh Tối Thượng",         // VIP 2
        "🌟 Hộ Vệ Vũ Trụ",            // VIP 3
        "💠 Kaioshin Tập Sự",              // VIP 4
        "🔥 Kaioshin Tối Cao",             // VIP 5
        "🔥 Vương Thần Sơ Khai",             // VIP 6
        "🔷 Thần Hủy Diệt",       // VIP 7
        "🔷 Thần Thiên Sứ",  // VIP 8
        "💠 Đại Thiên Sứ",            // VIP 9
        "<strong>👑 Chiến Binh Truyền Thuyết</strong>" // VIP 10+
    ];
    return titles[vip];
}

function renderBangXepHang() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tbody = document.querySelector("#top-users tbody");

    const sorted = users.map(u => {
    const tongZeni = u.history?.reduce((sum, h) => sum + h.zeni, 0) || 0;
    return { username: u.username, zeni: tongZeni };
    }).sort((a, b) => b.zeni - a.zeni).slice(0, 10);

    let html = "";
    sorted.forEach((u, i) => {
    const vip = getVipLevel(u.zeni);
    const title = getTitle(vip);
    let avatarURL = vip >= 0 && vip <= 8
        ? `../images/avt${vip + 1}.webp`
        : "../images/vip10.1.avif";
    let frameClass = vip >= 0 && vip <= 8
        ? `vip-frame-${vip}`
        : "legendary-frame";
    let topClass = i === 0 ? "top-1" : i === 1 ? "top-2" : i === 2 ? "top-3" : "";
    html += `
        <tr class="${topClass}">
        <td>Top ${i + 1}</td>
        <td>
            <table style="margin:auto">
            <tr>
                <td style="padding: 0;border:none">
                <img src="${avatarURL}" class="avatar-frame ${frameClass}" style="width:40px;height:40px;vertical-align:middle;">
                </td>
                <td style="padding-left: 8px; white-space: nowrap; vertical-align: middle;border:none">
                ${u.username}
                </td>
            </tr>
            </table>
        </td>
        <td>${u.zeni.toLocaleString()}</td>
        <td>VIP ${vip}</td>
        <td>${title}</td>
        </tr>`;
    });
    tbody.innerHTML = html;
}
renderBangXepHang();

function renderThanhTichAn() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentSession = JSON.parse(sessionStorage.getItem("currentUser"));
    const container = document.getElementById("ds-thanh-tich-an");

    if (!currentSession) {
    container.innerHTML = '<p style="text-align:center;grid-column: 1 / -1;">⚠️ Vui lòng đăng nhập để xem mục tiêu cá nhân.</p>';
    return;
    }

    const user = users.find(u => u.email === currentSession.email);
    const tongZeni = user.history?.reduce((sum, h) => sum + h.zeni, 0) || 0;
    const items = user.items?.length || 0;
    const soNgay = user.ngayDangNhap || 1;
    user.thanhTich = user.thanhTich || [];
    let html = "";

    if (tongZeni < 200000) {
    html += `<div class="thanh-tich-card">
        🔥 Cần nạp thêm ${(200000 - tongZeni).toLocaleString()} Zeni<br/>
        để đạt cấp <b>Rồng Lửa</b>
    </div>`;
    } else {
        if (!user.thanhTich.includes("ronglua")) {
            user.kimcuong += 50000;
            user.thanhTich.push("ronglua");
            localStorage.setItem("users", JSON.stringify(users));
            showToast("✅ Nhận 50.000 Zeni từ thành tích Rồng Lửa!");
        }
    }

    if (items < 12) {
    html += `<div class="thanh-tich-card">
        🛍️ Mua thêm ${12 - items} vật phẩm<br/>
        để mở khóa <b>Sưu Tầm Siêu Cấp</b>
    </div>`;
    } else{
        if (!user.thanhTich.includes("collector")) {
        user.kimcuong += 40000;
        user.thanhTich.push("collector");
        localStorage.setItem("users", JSON.stringify(users));
        showToast("✅ Nhận 40.000 Zeni từ thành tích Sưu Tầm Siêu Cấp!");
    }
    }

    if (soNgay < 10) {
    html += `<div class="thanh-tich-card">
        📅 Đăng nhập thêm ${10 - soNgay} ngày<br/>
        để trở thành <b>Chiến Binh Trung Thành</b>
    </div>`;
    } else {
        if (!user.thanhTich.includes("trungthanh")) {
            user.kimcuong += 30000;
            user.thanhTich.push("trungthanh");
            localStorage.setItem("users", JSON.stringify(users));
            showToast("✅ Nhận 30.000 Zeni từ Chiến Binh Trung Thành!")
    }}

    if (html === "") {
    html = `<p style="font-style:italic;">✅ Bạn đã hoàn thành tất cả thành tích hiện tại!</p>`;
    }

    container.innerHTML = html;
}
renderThanhTichAn();