const LivingCreature = require("./livingCreature.js")

module.exports = class Carnivores extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.directions = []
    }

    chooseCell(creature) {
        this.getNewCoordinates()
        return super.chooseCell(creature)
    }
    
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    move() {
        let emptyCells = this.chooseCell(0)
        if (this.energy > 0){
            if (emptyCells.length !== 0) {
                let theChosenField = emptyCells[Math.floor(Math.random() * emptyCells.length)]
                
                let newX = theChosenField[0]
                let newY = theChosenField[1]

                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0

                this.x = newX
                this.y = newY

                this.energy--
            }
        } else if (this.energy <= 0) {
            this.die()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in carnivoreArr) {
            let carnObj = carnivoreArr[i]
            if (carnObj.x === this.x && carnObj.y === this.y) {
                carnivoreArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {
        let grazerCells = this.chooseCell(2)
        if (grazerCells.length !== 0) {
            let theChosenField = grazerCells[Math.floor(Math.random() * grazerCells.length)]
                
            let newX = theChosenField[0]
            let newY = theChosenField[1]

            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            for (let i in grazerArr) {
                let grazerObj = grazerArr[i]
                if (grazerObj.x === newX && grazerObj.y === newY) {
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            this.multiply++
        } else {
            this.move()
            this.multiply = 0
        }
    }

    mul() {
        if (isRaining) {
            if (this.multiply >= 12) {
                let emptyCells = this.chooseCell(0)
                let theChosenField = emptyCells[Math.floor(Math.random() * emptyCells.length)]
                if (theChosenField) {
                    let newCarnivoresObj = new Carnivores(theChosenField[0], theChosenField[1])
                    carnivoreArr.push(newCarnivoresObj)
                    matrix[theChosenField[1]][theChosenField[0]] = 3
                }
                this.multiply = 0
            }
        } else {
            if (this.multiply >= 6) {
                let emptyCells = this.chooseCell(0)
                let theChosenField = emptyCells[Math.floor(Math.random() * emptyCells.length)]
                if (theChosenField) {
                    let newCarnivoresObj = new Carnivores(theChosenField[0], theChosenField[1])
                    carnivoreArr.push(newCarnivoresObj)
                    matrix[theChosenField[1]][theChosenField[0]] = 3
                }
                this.multiply = 0
            }
        }
    }
}
