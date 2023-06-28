const Grass = require("./grass.js")
const Grazer = require("./grazer.js")
const Carnivores = require("./carnivores.js")
const Toadstool  = require("./toadstool.js")

const express = require("express")
const app = express()

let httpServer = require("http").Server(app)
let { Server } = require("socket.io")
const io = new Server(httpServer)

app.use(express.static("./"))

app.get("./", function (req, res) {
    res.redirect("index.html")
})

matrix = randMatrix(50, 50)
isRaining = false
let interval = 200
let port = 3000

grassArr = []
grazerArr = []
carnivoreArr = []
toadstoolArr = []

function randMatrix(x, y) {
    let matrix = []
    for (let i = 0; i < y; i++) {
        matrix[i] = []
        for (let j = 0; j < x; j++) {
            let randInt = Math.floor(Math.random() * 6) +1
            if(randInt == 1) {
                matrix[i][j] = 1
            } else if(randInt == 2) {
                if (Math.floor(Math.random() * 2) == 1) {
                    matrix[i][j] = 2
                } else {
                    matrix[i][j] = 0
                }
            } else if(randInt == 3) {
                if (Math.floor(Math.random() * 8) == 1) {
                    matrix[i][j] = 3
                } else {
                    matrix[i][j] = 0
                }
            } else if(randInt == 4) {
                if (Math.floor(Math.random() * 24) == 1) {
                    matrix[i][j] = 4
                } else {
                    matrix[i][j] = 0
                }
            }  else if(randInt == 5 || randInt == 6) {
                matrix[i][j] = 0
            }
        }
    }
    return matrix
}

function killAllGrasses() {
    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i]
        matrix[grassObj.y][grassObj.x] = 0
    }
    grassArr = []
}

function killAllGrazers() {
    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i]
        matrix[grazerObj.y][grazerObj.x] = 0
    }
    grazerArr = []
}

function killAllCarnivores() {
    for (let i = 0; i < carnivoreArr.length; i++) {
        let carnivoreObj = carnivoreArr[i]
        matrix[carnivoreObj.y][carnivoreObj.x] = 0
    }
    carnivoreArr = []
}

function killAllToadstools() {
    for (let i = 0; i < toadstoolArr.length; i++) {
        let toadstoolObj = toadstoolArr[i]
        matrix[toadstoolObj.y][toadstoolObj.x] = 0
    }
    toadstoolArr = []
}

function newGame() {
    matrix = randMatrix(50, 50)

    grassArr = []
    grazerArr = []
    carnivoreArr = []
    toadstoolArr = []

    initGame()
}

function initGame() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let value = matrix[y][x]
            if (value == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (value == 2) {
                let grazer = new Grazer(x, y)
                grazerArr.push(grazer)
            } else if (value == 3) {
                let carnivore = new Carnivores(x, y)
                carnivoreArr.push(carnivore)
            } else if (value == 4) {
                let toadstool = new Toadstool(x, y)
                toadstoolArr.push(toadstool)
            }
        }
    }
}

function updateGame() {
    for (let i in grassArr) {
        let grassObj = grassArr[i]
        grassObj.mul()
    }
    for (let i in grazerArr) {
        let grazerObj = grazerArr[i]
        grazerObj.eat()
        grazerObj.mul()
    }
    for (let i in carnivoreArr) {
        let carnivoreObj = carnivoreArr[i]
        carnivoreObj.eat()
        carnivoreObj.mul()
    }
    for (let i in toadstoolArr) {
        let toadstoolObj = toadstoolArr[i]
        toadstoolObj.eat()
    }
    
    io.emit("send matrix", matrix)
    io.emit("isRaining", isRaining)
}

io.on("connection", function (socket) {
    console.log("client ws connection established...")
    io.emit("send matrix", matrix)
    io.emit("isRaining", isRaining)

    socket.on("killAllGrasses", function (data) {
        console.log("client clicked killAllGrasses-button...")
        killAllGrasses()
    })

    socket.on("killAllGrazers", function (data) {
        console.log("client clicked killAllGrazers-button...")
        killAllGrazers()
    })

    socket.on("killAllCarnivores", function (data) {
        console.log("client clicked killAllCarnivores-button...")
        killAllCarnivores()
    })

    socket.on("killAllToadstools", function (data) {
        console.log("client clicked killAllToadstools-button...")
        killAllToadstools()
    })

    socket.on("newGame", function (data) {
        console.log("client clicked newGame-button")
        newGame()
    })
})

initGame()
setInterval(() => {
    updateGame()
    if (isRaining) {
        interval = 600
    } else {
        interval = 200
    }
}, interval)
updateGame()

setInterval(function () {
    isRaining = !isRaining
    console.log("isRaining: " + isRaining)
    io.on("connection", (socket) => {
        socket.emit("isRaining", isRaining)
    })
}, 8000)

httpServer.listen(port, function () {
    console.log("Server läuft auf Port 3000...")
})
