document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const allDiscussions = document.querySelectorAll(".bg-content1.anhdong");
    allDiscussions.forEach((div) => {
    const h3 = div.querySelector("h3");
    const text =h3.innerText.toLowerCase();
    if (text.includes(keyword)) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
    });
});