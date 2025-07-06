const loginBtn = document.getElementById("login-btn");
const loggedInUser = JSON.parse(sessionStorage.getItem("currentUser"));
const container = document.getElementById("game-container");
const mainTitle = document.getElementById("main-title");
if (!loggedInUser) {
    document.querySelector(".download-buttons").style.display = "none";
    mainTitle.textContent = "“Chiến Trường Rồng Thiêng Đang Gọi!”";
    showToast("⚠️ Chiến Binh! Đăng nhập là bước đầu tiên để khai phóng sức mạnh và bước vào cuộc chiến định mệnh!");
    const loginSection = loginBtn.parentElement;
    const infoTitle = document.createElement("h2");
    infoTitle.textContent = "Bước vào thế giới của những chiến binh huyền thoại!";
    infoTitle.style.marginTop = "20px";
    infoTitle.style.fontWeight = "bold";

    const infoDesc = document.createElement("p");
    infoDesc.textContent = "Chỉ cần một bước đăng nhập, bạn sẽ khai mở toàn bộ sức mạnh và khám phá cuộc chiến đỉnh cao!";
    infoDesc.style.fontStyle = "italic";
    
    const thea = document.createElement("a");
    thea.classList.add("t")
    thea.textContent="Xem thêm trước khi chiến đấu"
    thea.href = "huongdanchoi.html"
    loginSection.appendChild(infoTitle);
    loginSection.appendChild(infoDesc);
    loginSection.appendChild(thea)
    loginBtn.classList.remove("hidden");
    loginBtn.addEventListener("click", function () {
        window.location.href = "dangnhap.html";
    });} else {
    // Hiện tên người chơi + nút đăng xuất
    const userBar = document.createElement("div");
    userBar.style.display = "flex";
    userBar.style.alignItems = "center";
    userBar.style.justifyContent = "space-between";
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = users.find(u => u.email === loggedInUser.email);
    let tongZeni = 0;
    try {
        for (let i = 0; i < userData.history.length; i++) {
            tongZeni += userData.history[i].zeni; 
        }
    } catch (e) {
        tongZeni = 0; 
    }

    const vipMoc = [0, 1000, 5000, 10000, 20000, 50000, 100000, 200000, 300000, 500000];
    let vip = 0;
    for (let i = 0; i < vipMoc.length; i++) {
        if (tongZeni >= vipMoc[i]) {
            vip = i;
        } else {
            break;
        }
    }

    const avatarSrc = vip <= 8 ? `../images/avt${vip + 1}.webp` : "../images/vip10.1.avif";
    const frameClass = vip <= 8 ? `vip-frame-${vip}` : "legendary-frame";
    const danhHieu = [
    "Base Form", "SSJ 1 ⚡", "SSJ 2 ⚡", "SSJ 3 ⚡", "SSJ GOD 🔥",
    "SSJ BLUE 🔥", "SSJ ROSE 🔥", "UI -Sign- 🔷", "True UI 🔷", "MUI 💠"
    ];

    userBar.innerHTML = `
    <div class="info"style="display: flex; align-items: center; gap: 12px;">
        <img src="${avatarSrc}" class="avatar-frame ${frameClass}" style="width: 65px; height: 65px;">
        <div>
            <p style="margin: 0; font-weight: bold;">chiến binh <span class="vip userz" >${loggedInUser.username}</span></p>
            <p style="margin: 0; font-size: 13px;"><span class="vip" style="font-weight: bold">VIP ${vip}</span> <span class="badge">${danhHieu[vip]}</span></p>
        </div>
    </div>
    <div class="nut">
        <button onclick="logout()" style="padding: 6px 12px;">Đăng xuất</button>
    </div>
    `;

    container.appendChild(userBar);
    
    // Thêm iframe game + nút fullscreen
    const gameWrapper = document.createElement("div");
    gameWrapper.style.marginTop="10px"
    gameWrapper.innerHTML = `
    <iframe id="game-frame" src="../game/chienbinhrongthieng.html" style="width:100%; aspect-ratio: 2 / 1; border:none"></iframe>
    <div class="download-buttons nut" style="margin-top:10px;text-align:right">
        <button onclick="toggleFullScreen()" style="padding:7px 9px">Toàn màn hình</button>
    </div>
    `;
    container.appendChild(gameWrapper);

    // Hiện toast thông báo đang tải
    showToast("🔄 Vui lòng chờ... Game đang được tải!");
    setTimeout(()=>{
    showToast("✅ Game đã sẵn sàng. Chiến thôi!")
    },7000)
    setTimeout(()=>{
    showToast("💡 Mẹo: Chiến binh có thể ấn toàn màn hình để có trải nghiệm tốt hơn!")
    },15000)
    
}
function toggleFullScreen() {
    const iframe = document.getElementById("game-frame");
    iframe.requestFullscreen()
}
function logout() {
    sessionStorage.removeItem("currentUser");
    showToast("✅ Đăng xuất thành công!");
    setTimeout(() => location.reload(), 1000);
}