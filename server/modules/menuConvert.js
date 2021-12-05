var https = require("https");
var fs = require("fs");
const path = require('path');
const xlxs = require("node-xlsx");

class menuConvert {
    _menu;    

    testLog() {
        this.readFromExcel();
        console.log(this.arrayColumn(this._menu, 4));
    }

    logMenu() {
        this.readFromExcel();
        console.log(this._menu);
    }

    arrayColumn(arr, n) {
        return arr.map(x => x[n]);
    }

    readFromExcel() {
        this._menu = xlxs.parse(__dirname + "\\..\\etlap3.xlsx")[0].data;
    }

    async dayUpload() {
        if (!this._menu) this.readFromExcel();
        let weeklyMenu = [];
        let dayMenu = [];
        let columnNumbers = [];
        this._menu[1].forEach((day, column) => {
            if (day !== undefined) {
                columnNumbers.push(column + 1);
            }
        });
        for (let i = 0; i < columnNumbers.length; i++) {
            let day = this.arrayColumn(this._menu, columnNumbers[i]);
            let dayName = day[1];
            let type = 1;
            let mealType = [];
            dayMenu = [];
            // eslint-disable-next-line no-loop-func
            day.forEach((cell, rowNumber) => {
                if (cell !== undefined && day[rowNumber - 2] === "Cukor") {
                    let tmpAllergen = cell;
                    mealType.push(tmpAllergen);
                    dayMenu.push(mealType);
                    mealType = [];
                    type++;
                }
                else if (cell !== undefined && cell !== dayName) {
                    if (cell === "Zsír") {
                        mealType.push(type);
                        mealType.push(this._menu[rowNumber - 2][columnNumbers[i] - 1]) //Étel
                        let energia = this._menu[rowNumber - 1][columnNumbers[i] - 1];
                        mealType.push(energia.split(":")[1].trim())                    //Energia
                        mealType.push(this._menu[rowNumber + 1][columnNumbers[i] - 1]) //Fehérje
                        mealType.push(day[rowNumber + 1]);                             //Zsír
                        mealType.push(this._menu[rowNumber + 1][columnNumbers[i] + 1]) //Zsírsav
                    }
                    else if (cell === "Cukor") {
                        mealType.push(this._menu[rowNumber + 1][columnNumbers[i] - 1]) //Szénhidrát
                        mealType.push(day[rowNumber + 1]);                             //Cukor
                        mealType.push(this._menu[rowNumber + 1][columnNumbers[i] + 1]) //Só
                    }
                }
                else if (cell === undefined && day[rowNumber - 2] === "Cukor") {
                    let tmpAllergen;
                    if (this._menu[rowNumber][columnNumbers[i] - 1] !== undefined) {
                        tmpAllergen = this._menu[rowNumber][columnNumbers[i] - 1];
                    }
                    else tmpAllergen = this._menu[rowNumber][columnNumbers[i] + 1];
                    mealType.push(tmpAllergen);
                    dayMenu.push(mealType);
                    mealType = [];
                    type++;
                }
            });
            weeklyMenu.push(dayMenu);
        }
        return weeklyMenu;
    }
}

module.exports = new menuConvert()