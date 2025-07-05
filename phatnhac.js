// âm thanh 
const amThanhNen = document.getElementById("bg-music");
amThanhNen.volume = 0.8;
const nutChuyenAmThanh = document.getElementById("toggle-music");

let dangPhatAmThanh = localStorage.getItem("dangPhatAmThanh") !== "false";

if (!dangPhatAmThanh) {
  amThanhNen.pause();
  nutChuyenAmThanh.textContent = "🔇";
} else {
  const thoiGianDaLuu = sessionStorage.getItem("thoiGianAmThanh");
  if (thoiGianDaLuu) {
    amThanhNen.currentTime = parseFloat(thoiGianDaLuu);
  }
  amThanhNen.play();
  nutChuyenAmThanh.textContent = "🔊";
}

nutChuyenAmThanh.addEventListener("click", function () {
  dangPhatAmThanh = !dangPhatAmThanh;
  if (dangPhatAmThanh) {
    amThanhNen.play();
    nutChuyenAmThanh.textContent = "🔊";
  } else {
    amThanhNen.pause();
    nutChuyenAmThanh.textContent = "🔇";
  }
  localStorage.setItem("dangPhatAmThanh", dangPhatAmThanh);
});

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("thoiGianAmThanh", amThanhNen.currentTime);
});