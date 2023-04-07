class Chut {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 50
        this.directions = []
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];

        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }

           
        }
        return found;
    }

    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell)
       console.log(this.energy + "energya");
        if (newCell ) {
            let newX = newCell[0];
            let newY = newCell[1];

            let chut = new Chut(newX, newY);
            matrix[newY][newX] = 4;
            chutArr.push(chut);

            this.energy = 10;
        }
    }


    eat() {

        let emptyCell = this.chooseCell(1);
        let newCell = random(emptyCell)
        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                   grassArr.splice(i, 1)
                    break;
                }
            }
          




            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

                if (this.energy >=65 ) {
                     this.mul()
                }
        }
        else{
            this.move()
        }



    }

    move() {

        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell)

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;


            this.x = newX;
            this.y = newY;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < chutArr.length; i++) {
            if (chutArr[i].x == this.x && chutArr[i].y == this.y) {
                chutArr.splice(i, 1)
            }
        }
    }
}
