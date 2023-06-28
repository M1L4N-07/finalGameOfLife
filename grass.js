const LivingCreature = require("./livingCreature.js")

module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    mul() {
        this.multiply++
        if (isRaining) {
            if (this.multiply >= 3) {
                let emptyCells = this.chooseCell(0)
                let theChosenField = emptyCells[Math.floor(Math.random() * emptyCells.length)]
                if (theChosenField) {
                    let newGrassObj = new Grass(theChosenField[0], theChosenField[1])
                    grassArr.push(newGrassObj)
                    matrix[theChosenField[1]][theChosenField[0]] = 1
                }
                this.multiply = 0
            }
        }
        else if (this.multiply >= 6) {
            let emptyCells = this.chooseCell(0)
            let theChosenField = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (theChosenField) {
                let newGrassObj = new Grass(theChosenField[0], theChosenField[1])
                grassArr.push(newGrassObj)
                matrix[theChosenField[1]][theChosenField[0]] = 1
            }
            this.multiply = 0
        }
    }
}
