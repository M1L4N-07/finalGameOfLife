let side = 10
let matrixSize = 50
localIsRaining = false
const socket = io()

function main() {

    socket.on("send matrix", drawMatrix)
    socket.on("isRaining", (inputIsRaining) => {
        localIsRaining = inputIsRaining
        if (localIsRaining == true) {
            document.getElementById("isRaining").innerHTML = "it is raining"
        } else {
            document.getElementById("isRaining").innerHTML = "it is not raining"
        }
    })

    document.getElementById("newGame"          ).addEventListener("click", function () { socket.emit("newGame") })
    document.getElementById("killAllGrasses"   ).addEventListener("click", function () { socket.emit("killAllGrasses") })
    document.getElementById("killAllGrazers"   ).addEventListener("click", function () { socket.emit("killAllGrazers") })
    document.getElementById("killAllCarnivores").addEventListener("click", function () { socket.emit("killAllCarnivores") })
    document.getElementById("killAllToadstools").addEventListener("click", function () { socket.emit("killAllToadstools") })
}

function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1)
    background("darkgrey")
}

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill("lightgrey")
            if (matrix[y][x] == 0) {
                fill("white")
            } else if (matrix[y][x] == 1) {
                if (localIsRaining == true) {
                    fill("forestgreen")
                } else {
                    fill("lawngreen")
                }
            } else if (matrix[y][x] == 2) {
                if (localIsRaining == true) {
                    fill("goldenrod")
                } else {
                    fill("gold")
                }
            } else if (matrix[y][x] == 3) {
                if (localIsRaining == true) {
                    fill("darkred")
                } else {
                    fill("red")
                }
            } else if (matrix[y][x] == 4) {
                if (localIsRaining == true) {
                    fill("hotpink")
                } else {
                    fill("pink")
                }
            }
            rect(x * side, y * side, side, side)

            fill("black")
        }
    }
}

window.onload = main
