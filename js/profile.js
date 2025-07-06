const user = JSON.parse(sessionStorage.getItem("currentUser"));
const nutDangNhap = document.getElementById("nut-dang-nhap");

if (!user) {
    document.getElementById("ten-nguoi-choi").textContent = "Chưa đăng nhập";
    document.getElementById("kc-hientai").textContent = "0";
    document.getElementById("cap-bac").textContent = "VIP 0";
    nutDangNhap.textContent = "Đăng nhập";
    nutDangNhap.onclick = () => {
    window.location.href = "dangnhap.html";
    };
} else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userr = users.find(u => u.email === user.email);
    document.getElementById("ten-nguoi-choi").textContent = user.username;
    document.getElementById("kc-hientai").textContent = userr.kimcuong || 0;
    nutDangNhap.textContent = "Đăng xuất";
    nutDangNhap.onclick = logout;
    userr.history = userr.history || [];
    let tongZeniDaNap = userr.history.reduce((sum, log) => sum + log.zeni, 0)  ;
    document.getElementById("cap-bac").textContent = getCapBac(tongZeniDaNap);
    // Cập nhật thanh VIP
    const capBacSpan = document.getElementById("cap-bac");
    const vipNext = document.getElementById("vip-next");

    const vipMoc = [0, 1000, 5000, 10000, 20000, 50000, 100000, 200000, 300000, 500000];
    let capHienTai = 0;
    for (let i = 0; i < vipMoc.length; i++) {
        if (tongZeniDaNap >= vipMoc[i]) {
            capHienTai = i;
        } else {
            break;
        }
    }
    const vipBadges = [
    "Base Form",         // VIP 0
    "SSJ 1 ⚡",         // VIP 1
    "SSJ 2 ⚡", // VIP 2
    "SSJ 3 ⚡",       // VIP 3
    "SSJ GOD 🔥",       // VIP 4
    "SSJ BLUE 🔥",       // VIP 5
    "SSJ ROSE 🔥",      // VIP 6
    "Ultra Instinct -Sign- 🔷",       // VIP 7
    "True Ultra Instinct 🔷",// VIP 8
    "Master Ultra Instinct 💠"     // Huyền thoại
    ];
    let danhHieu = [];
    danhHieu.push(vipBadges[capHienTai]);
    const danhHieuDiv = document.getElementById("danh-hieu");
    danhHieuDiv.innerHTML = `<span class="badge">${vipBadges[capHienTai]}</span>`;

    // Chọn avatar theo cấp VIP
    const avatar = document.getElementById("avatar-nguoi-choi");
    if (capHienTai >= 0 && capHienTai <= 8) {
        avatar.src = `../images/avt${capHienTai+1}.webp`;
    } else {
        avatar.src = "../images/vip10.1.avif"; 
    }

    capBacSpan.textContent = capHienTai >= vipMoc.length - 1 ? "👑 Huyền Thoại Rồng Thiêng" : `VIP ${capHienTai}`;
    if (capHienTai >= 0 && capHienTai <= 8) {
        avatar.classList.add(`vip-frame-${capHienTai}`);
    } else {
        avatar.classList.add("legendary-frame");
    }

    if (capHienTai < vipMoc.length - 1) {
        const mucHienTai = vipMoc[capHienTai];
        const mucTiepTheo = vipMoc[capHienTai + 1];
        const tienTrinh = ((tongZeniDaNap - mucHienTai) / (mucTiepTheo - mucHienTai)) * 100;
        document.getElementById("vip-bar").style.width = tienTrinh + "%";
        vipNext.textContent = `🔒 Bạn cần thêm ${(mucTiepTheo - tongZeniDaNap).toLocaleString()} Zeni để lên VIP ${capHienTai + 1}`;
    } else {
        document.getElementById("vip-bar").style.width = "100%";
        document.getElementById("vip-bar").style.background = "line-gradient(to right,#b2ebf2,#00e5ff)";
        vipNext.textContent = "🎉 Bạn đã trở thành chiến binh trong truyền thuyết!";
    }

    // Lịch sử nạp
    document.getElementById("lich-su-nap").innerHTML = userr.history.map(log => {
    const thoiGian = new Date(log.time).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh"
    });
    return `
    <tr>
    <td>${thoiGian}</td>
    <td>${log.zeni}</td>
    <td>${log.vnd.toLocaleString()}</td>
    </tr>`;
    }).join('');

    // Danh sách item đã mua
    userr.items = userr.items || [];
    const tbody = document.getElementById("lich-su-item");
    tbody.innerHTML = userr.items.map(i => `
    <tr>
    <td>${i.time}</td>
    <td>${i.id}</td>
    <td>${i.gia}</td>
    <td><button onclick="copyCode('${i.code}')">📋 Copy</button></td>
    </tr>
    `).join('');
}

function getCapBac(tong) {
    if (tong < 1000) return "VIP 0";
    if (tong < 5000) return "VIP 1";
    if (tong < 10000) return "VIP 2";
    if (tong < 20000) return "VIP 3";
    if (tong < 50000) return "VIP 4";
    if (tong < 100000) return "VIP 5";
    if (tong < 200000) return "VIP 6";
    if (tong < 300000) return "VIP 7";
    if (tong < 500000) return "VIP 8";
    return "👑 Huyền Thoại Rồng Thiêng";
}

function logout() {
    sessionStorage.removeItem("currentUser");
    showToast("✅ Đăng xuất thành công!");
    location.reload();
}

function copyCode(code) {
    navigator.clipboard.writeText(code);
    showToast(`✅ Đã copy mã: ${code}`);
}

function hienNhapCode() {
    document.getElementById("form-nhap-code").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function anNhapCode() {
    document.getElementById("form-nhap-code").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function doiCode() {
    const codeInput = document.getElementById("code-input");
    const code = codeInput.value.trim().toUpperCase(); 
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
    showToast("⚠️ Bạn cần đăng nhập để sử dụng mã code.");
    return;
    }
    if (code === "") {
    showToast("⚠️ Vui lòng nhập mã code.");
    return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === currentUser.email);

    if (!user.items) {
    showToast("❌ Không tìm thấy người dùng!");
    return;
    }

    const matchedItem = user.items.find(i => i.code === code);

    if (!matchedItem) {
    showToast("❌ Mã code không đúng hoặc không thuộc tài khoản bạn.");
    return;
    }

    if (matchedItem.used) {
    showToast("⚠️ Mã này đã được sử dụng rồi!");
    return;
    }

    matchedItem.used = true;
    localStorage.setItem("users", JSON.stringify(users));
    showToast(`✅ Bạn vừa nhận quà từ mã ${code}!`);
    codeInput.value = "";
    anNhapCode();
}
// Toggle popup chuông
document.getElementById("notification-bell").addEventListener("click", () => {
    const popup = document.getElementById("notification-popup");
    popup.style.display = popup.style.display === "none" ? "block" : "none";
});
function hienPopupOnline() {
    document.getElementById("overlay-online").style.display = "block";
    document.getElementById("popup-online").style.display = "block";
}
function anPopupOnline() {
    document.getElementById("overlay-online").style.display = "none";
    document.getElementById("popup-online").style.display = "none";
}
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currentUser) {
    const email = currentUser.email;
    const onlineKey = `onlineTimeData_${email}`;
    const nhanKey = `dd_nhan_${email}`;
    let data = JSON.parse(localStorage.getItem(onlineKey)) || {};
    const ngayHomNay = new Date().toISOString().split("T")[0];
    let startTime = data[ngayHomNay].start;

    function capNhatPhutOnline() {
        const minutes = Math.floor((Date.now() - startTime) / 60000);
        document.getElementById("online-time").textContent = `⏳ Đã online: ${minutes} phút hôm nay`;
        return minutes;
    }
    capNhatPhutOnline();

    // Cập nhật mỗi 10 mili giây
    setInterval(capNhatPhutOnline, 10);

    // Mốc thưởng
    const mocThuong = {
        10: 340,
        20: 690,
        40: 1400,
        70:1400,
        100:3550,
        140:3550,
        180: 7250
    };

    // Nhận thưởng
    function nhanThuongMoc(phut) {
        const minutesOnline = capNhatPhutOnline();
        if (minutesOnline < phut) {
            return showToast(`❌ Cần online ít nhất ${phut} phút để nhận mốc này!`);
        }

        const daNhan = JSON.parse(localStorage.getItem(nhanKey)) || {};
        const daHomNay = daNhan[ngayHomNay] || [];
        if (daHomNay.includes(phut)) {
            return showToast("❌ Bạn đã nhận mốc này hôm nay!");
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const me = users.find(u => u.email === email);
        me.kimcuong = (me.kimcuong || 0) + mocThuong[phut];
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("kc-hientai").textContent = me.kimcuong;

        daHomNay.push(phut);
        daNhan[ngayHomNay] = daHomNay;
        localStorage.setItem(nhanKey, JSON.stringify(daNhan));
        showToast(`✅ Bạn đã nhận ${mocThuong[phut].toLocaleString()} Zeni!`);
    }
} else {
    document.getElementById("online-time").textContent = "Chưa đăng nhập";
    function nhanThuongMoc(phut){
        return showToast("⚠️ Bạn cần đăng nhập để nhận quà online.")
    }
}

function hienNhiemvuHangNgay(){
    document.getElementById("nv-popup-online").style.display = "block";
    document.getElementById("nv-overlay-online").style.display = "block";
}

function anNhiemvuHangNgay(){
    document.getElementById("nv-popup-online").style.display = "none";
    document.getElementById("nv-overlay-online").style.display = "none";
}

document.querySelectorAll(".nv-nhan-thuong button").forEach((btn, index) => {
    btn.onclick = () => nhanThuongNV(index);
});

function nhanThuongNV(id){
    const userr = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!userr) return showToast("⚠️ Cần đăng nhập để nhận thưởng!");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const me = users.find(u => u.email === userr.email);
    const email = me.email
    const key = `nvhn_${email}`;
    const ngay = new Date().toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem(key)) || {};
    if (!data[ngay]) data[ngay] = [];

    if (data[ngay].includes(id)) {
        return showToast("❌ Nhiệm vụ này đã nhận hôm nay!");
    }

    const phanThuong = [2000, 3000, 2000, 5000, 2000, 10000];
    if (id === 5) {
        const daNap = (me.history || []).some(log => {
        const ngayLog = new Date(log.time).toISOString().split("T")[0];
        return ngayLog === ngay;
        });
        if (!daNap) {
        return showToast("❌ Bạn cần nạp tiền hôm nay mới nhận được nhiệm vụ này!");
        }
    }

    me.kimcuong = (me.kimcuong || 0) + phanThuong[id];
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("kc-hientai").textContent = me.kimcuong;
    data[ngay].push(id);
    localStorage.setItem(key, JSON.stringify(data));

    showToast(`✅ Đã nhận ${phanThuong[id].toLocaleString()} Zeni!`);
    capNhatTienTrinhNV();
}


function capNhatTienTrinhNV(){
    const email = JSON.parse(sessionStorage.getItem("currentUser")).email;
    const key = `nvhn_${email}`;
    const ngay = new Date().toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem(key)) || {};
    const daNhan = data[ngay];
    const progress = (daNhan.length / 6) * 100;
    document.getElementById("nv-bar").style.width = progress + "%";
    document.getElementById("nv-so-hoan-thanh").textContent = `${Math.floor(progress)}%`;
}
capNhatTienTrinhNV();
