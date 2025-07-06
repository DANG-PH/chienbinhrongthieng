document.querySelector('.img-btn').addEventListener('click', function(){
    document.querySelector('.cont').classList.toggle('s-signup')
});
function handleResetPassword() {
    const email = document.getElementById("reset-email").value.trim();
    const oldpass = document.getElementById("reset-oldpass").value;
    const newpass = document.getElementById("reset-newpass").value;
    const confirm = document.getElementById("reset-confirm").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email===email);
    if (!email || !oldpass || !newpass || !confirm) {
        showToast("⚠️ Thiếu dữ liệu! Hãy hoàn thiện thông tin để tái lập sức mạnh.");
        return;
    }

    if (!user || user.password !== oldpass) {
        showToast("❌ Kết nối thất bại – thông tin không khớp với chiến binh trước đó.");
        return;
    }

    if (newpass !== confirm) {
        showToast("⚠️ Sức mạnh không ổn định – mật khẩu xác nhận chưa trùng khớp.");
        return;
    }

    user.password = newpass;
    localStorage.setItem("users", JSON.stringify(users));
    showToast("✅ Sức mạnh tái sinh thành công! Đã đến lúc quay lại chiến trường!");
    setTimeout(()=>{
        window.location.href = "dangnhap.html";
    },2000)
}

function handleForgotPassword() {
    const username = document.getElementById("forgot-username").value.trim();
    const email = document.getElementById("forgot-email").value.trim();

    if (!username || !email) {
        showToast("⚠️ Thiếu thông tin! Chiến binh cần nhập đầy đủ để khôi phục sức mạnh.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.email === email);

    if (!user) {
        showToast("❌ Không tìm thấy chiến binh nào khớp với thông tin trên!");
        return;
    }

    showToast(`✅ Mật khẩu của chiến binh ${user.username} là: ${user.password}`);
    setTimeout(()=>{
        showToast("✅ Xác thực thành công – Chiến binh, hãy thiết lập mật khẩu mới để sẵn sàng bước vào trận chiến kế tiếp!")
        document.querySelector('.cont').classList.add('s-signup'); 
    },4000)
}
