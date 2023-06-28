let clickCount = 0;
function clickHandler(evt){
   clickCount++;
   console.log(evt);
   let str = "Thanks for clicking " + clickCount;
   this.innerText = str;
}

let p = document.getElementById("pElement")
p.addEventListener("click", clickHandler)

let myBtn = document.getElementById("btnElement")
myBtn.onclick = btnCallback

function btnCallback() {
   alert("Hello User")
}

function bodyClick(evt) {
    console.log("Body was clicked..." + "\nP( " + Math.round(evt.pageX) + " | " + Math.round(evt.pageY) + " )")
}

function loadCallback() {
   alert("Website is loaded...")
}

function keyCallback(evt) {
   console.log(evt)
}

function setup() {
   createCanvas(500, 500)
   background("red")
}

function bodyClick(evt) {
   console.log("Body was clicked... + " + "\nP ( " + Math.round(evt.pageX) + " | " + Math.round(evt.pageY) + " )")
}

window.onclick = bodyClick
window.onload = loadCallback
window.onkeydown = keyCallback()
