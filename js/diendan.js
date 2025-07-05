// Hiển thị các thảo luận đã lưu
function displayDiscussions() {
const list = document.getElementById("discussionList");
list.innerHTML = "";
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (!currentUser) return;
const email = currentUser.email; 
const discussions = JSON.parse(localStorage.getItem(`discussions_${email}`)) || [];
discussions.forEach((text) => {
    const div = document.createElement("div");
    div.className = "thaoluan";
    div.innerHTML = `
    <h4>📝 [Thảo luận từ bạn]</h4>
    <p>Đăng bởi: <strong>${currentUser.username}</strong> | <span>0 phản hồi</span></p>
    <p>${text}</p>
    <a href="#">>> Vào thảo luận</a>
    `;
    list.appendChild(div);
});
}

document.getElementById("postDiscussion").addEventListener("click", function () {
const input = document.getElementById("discussionInput");
const text = input.value.trim();

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (!currentUser) {
    alert("Bạn cần đăng nhập để gửi thảo luận.");
    window.location.href = 'dangnhap.html';
    return;
}

if (text) {
    const email = currentUser.email;
    const discussions = JSON.parse(localStorage.getItem(`discussions_${email}`)) || [];
    discussions.push(text);
    localStorage.setItem(`discussions_${email}`, JSON.stringify(discussions));
    input.value = "";
    displayDiscussions();
} else {
    alert("Bạn chưa nhập nội dung thảo luận!");
}
});

// Khi tải trang
displayDiscussions();
document.getElementById("clearAllBtn").addEventListener("click", () => {
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (!currentUser) return;

if (confirm("Bạn có chắc muốn xóa toàn bộ bình luận của mình?")) {
    const email = currentUser.email;
    localStorage.removeItem(`discussions_${email}`);
    displayDiscussions();
}
});
document.getElementById("searchInput").addEventListener("input", function () {
const keyword = this.value.toLowerCase();
const allDiscussions = document.querySelectorAll(".thaoluan");
allDiscussions.forEach((div) => {
const text = div.innerText.toLowerCase();
if (text.includes(keyword)) {
    div.style.display = "block";
} else {
    div.style.display = "none";
}
});
});