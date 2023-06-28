module.exports = class LivingCreature {
    
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 10
    }

    chooseCell(creature) {
        let found = []

        for (let i in this.directions) {
            let posCellArr = this.directions[i]
            let x = posCellArr[0]
            let y = posCellArr[1]

            if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
                if (matrix[y][x] == creature) {
                    found.push(posCellArr)
                }
            }
        }
        return found
    }
}
