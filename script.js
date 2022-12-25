const canvas = document.getElementById("canvas")

var bodyRect = document.body.getBoundingClientRect(),
    rect = canvas.getBoundingClientRect(),
    offset = rect.top - bodyRect.top;

canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;

const ctx = canvas.getContext("2d")

let prevX = null
let prevY = null

ctx.lineWidth = 5
ctx.strokeStyle = "#FFF"

let draw = false

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.style.backgroundColor
        ctx.lineWidth = clr.dataset.width

        if (clr.classList.contains("eraser")) {
          ctx.globalCompositeOperation = "destination-out";
        }
        else {
          ctx.globalCompositeOperation = "source-over";
        }
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    // ctx.beginPath();
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.stroke();

    ctx.clearRect(0, 0, canvas.width, canvas.height)
})


window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    bodyRect = document.body.getBoundingClientRect(),
    rect = canvas.getBoundingClientRect(),
    offset = rect.top - bodyRect.top;

    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX - rect.left
        prevY = e.clientY - offset
        return
    }

    let currentX = e.clientX - rect.left
    let currentY = e.clientY - offset

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

//
// let loadimg = document.querySelector(".AAA")
// loadimg.addEventListener("click", () => {
//   var dataURL = localStorage.getItem("one");
//   var img = document.getElementById("canvasload");
//   img.src = dataURL;
//
//   img.onload = function () {
//       ctx.drawImage(img, 0, 0);
//   };
//
//
// })




const canvasobj = document.getElementById("draw")
const buttontext = document.getElementById("buttontext")

var currentPage = 0
var currentDraw = "character"

var hideCanvas = [1, 3]
var drawLabels = {
  0: "character",
  2: "scarecrow"
}

var drawings = {
}

// shared elements
let done = document.querySelector(".done")
done.addEventListener("click", () => {
  drawings[currentDraw] = canvas.toDataURL();
  // localStorage.setItem(currentDraw, canvas.toDataURL());
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // open next page?

  currentPage += 1
  showNextPage()

})


function showNextPage(){
  if (currentPage > 0) {
    var hides = document.getElementsByClassName("pg-" + (currentPage - 1))
    for (var i = 0; i < hides.length; i ++){
      hides[i].classList.add("hide")
    }
  }

  if (currentPage in drawLabels){
    currentDraw = drawLabels[currentPage]
  }

  var shows = document.getElementsByClassName("pg-" + (currentPage))
  for (var i = 0; i < shows.length; i ++){
    shows[i].classList.remove("hide")
  }

  if (hideCanvas.includes(currentPage)) {
    canvasobj.classList.add("hide")
    buttontext.innerHTML = "ok! &gt;"
  } else {
    canvasobj.classList.remove("hide")
    buttontext.innerHTML = "done! &gt;"
  }

  var loads = document.getElementsByClassName("load-" + (currentPage))

  for (var i = 0; i < loads.length; i++){

    var dataURL = drawings[loads[i].dataset.load];
    loads[i].src = dataURL

  }



}



window.addEventListener("load", (event) => {
  showNextPage()
});

// Saving drawing as image
// let saveBtn = document.querySelector(".save")
// saveBtn.addEventListener("click", () => {
//   localStorage.setItem("one", canvas.toDataURL());
// })
//


function downloadDrawingeh
(){
  let data = canvas.toDataURL("imag/png")
  let a = document.createElement("a")
  a.href = data
  // what ever name you specify here
  // the image will be saved as that name
  a.download = "sketch.png"
  a.click()
}
