const LivingCreature = require("./livingCreature.js")

module.exports = class Grazer extends LivingCreature {
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

                matrix[newY][newX] = 2
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

        for (let i in grazerArr) {
            let grzObj = grazerArr[i]
            if (grzObj.x === this.x && grzObj.y === this.y) {
                grazerArr.splice(i, 1);
                break;
            }
        }
    }

    eat() {
        let grassCells = this.chooseCell(1)
        if (grassCells.length !== 0) {
            let theChosenField = grassCells[Math.floor(Math.random() * grassCells.length)]
                
            let newX = theChosenField[0]
            let newY = theChosenField[1]

            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            for (let i in grassArr) {
                let grassObj = grassArr[i]
                if (grassObj.x === newX && grassObj.y === newY) {
                    grassArr.splice(i, 1);
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
                    let newGrazerObj = new Grazer(theChosenField[0], theChosenField[1])
                    grazerArr.push(newGrazerObj)
                    matrix[theChosenField[1]][theChosenField[0]] = 2
                }
                this.multiply = 0
            }
        } else {
            if (this.multiply >= 6) {
                let emptyCells = this.chooseCell(0)
                let theChosenField = emptyCells[Math.floor(Math.random() * emptyCells.length)]
                if (theChosenField) {
                    let newGrazerObj = new Grazer(theChosenField[0], theChosenField[1])
                    grazerArr.push(newGrazerObj)
                    matrix[theChosenField[1]][theChosenField[0]] = 2
                }
                this.multiply = 0
            }
        }
        
    }
}
