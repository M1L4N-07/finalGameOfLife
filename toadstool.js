const LivingCreature = require("./livingCreature.js")

module.exports = class Toadstool extends LivingCreature {
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

    eat() {
        if (!isRaining) {
            let cells = this.directions
            for (let i in cells) {
                i = parseInt(i);
                let newX = cells[i][0]
                let newY = cells[i][1]

                if (typeof newX === 'undefined' || typeof newY === 'undefined' || typeof matrix[newY] === 'undefined') {
                    continue
                }

                if (matrix[newY][newX] == 1) {
                    for (let i = 0; i < grassArr.length; i++) {
                        let grassObj = grassArr[i];
                        if (grassObj.x == newX && grassObj.y == newY) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[newY][newX] == 2) {
                    for (let i = 0; i < grazerArr.length; i++) {
                        let grazerObj = grazerArr[i];
                        if (grazerObj.x == newX && grazerObj.y == newY) {
                            grazerArr.splice(i, 1);
                            break;
                        }
                    }


                }
                else if (matrix[newY][newX] == 3) {
                    for (let i = 0; i < carnivoreArr.length; i++) {
                        let carnObj = carnivoreArr[i];
                        if (carnObj.x == newX && carnObj.y == newY) {
                            carnivoreArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[newY][newX] == 4) {
                    for (let i = 0; i < toadstoolArr.length; i++) {
                        let toadstoolObj = toadstoolArr[i]
                        if (toadstoolObj.x == newX && toadstoolObj.y == newY) {
                            toadstoolArr.splice(i, 1)
                            break
                        }
                    }
                }

                matrix[cells[i][1]][cells[i][0]] = 0
            }
        }
    }
}
