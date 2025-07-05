const nutxemchitiet=document.querySelectorAll(".dt button")
    nutxemchitiet.forEach((btn,index) => {
    btn.onclick = () => hienthipopup(index)
    })
    function hienthipopup(index){
    document.getElementById(`xemchitiet${index+1}`).style.display="block";
    document.getElementById("overlay-online").style.display = "block";
    } 
    const anchitiet=document.querySelectorAll(".xemchitiet > button")
    anchitiet.forEach((btn,index) => {
    btn.onclick = () => anpopup(index)
    })
    function anpopup(index){
    document.getElementById(`xemchitiet${index+1}`).style.display="none";
    document.getElementById("overlay-online").style.display = "none";
}