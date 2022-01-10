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
        this._menu = xlxs.parse(__dirname + "\\..\\etlap6.xlsx")[0].data;
    }

    // async dayUpload() {
    //     if (!this._menu) this.readFromExcel();
    //     let weeklyMenu = [];
    //     let dayMenu = [];
    //     let columnNumbers = [];
    //     this._menu[1].forEach((day, column) => {
    //         if (day !== undefined) {
    //             columnNumbers.push(column + 1);
    //         }
    //     });
    //     for (let i = 0; i < columnNumbers.length; i++) {
    //         let day = this.arrayColumn(this._menu, columnNumbers[i]);
    //         let dayName = day[1];
    //         let type = 1;
    //         let mealType = [];
    //         dayMenu = [];
    //         // eslint-disable-next-line no-loop-func
    //         day.forEach((cell, rowNumber) => {
    //             if (cell !== undefined && day[rowNumber - 2] === "Cukor") {
    //                 let tmpAllergen = cell;
    //                 mealType.push(tmpAllergen); //allergen - utolso elem
    //                 dayMenu.push(mealType); //étkezés a nap arraybe -- utolso lépés
    //                 mealType = [];
    //                 type++;
    //             }
    //             else if (cell !== undefined && cell !== dayName) {
    //                 if (cell === "Zsír") {
    //                     mealType.push(type); //Tipus - elso lépés
    //                     mealType.push(this._menu[rowNumber - 2][columnNumbers[i] - 1]) //Étel
    //                     let energia = this._menu[rowNumber - 1][columnNumbers[i] - 1];
    //                     mealType.push(energia.split(":")[1].trim())                   //Energia
    //                     mealType.push(this._menu[rowNumber + 1][columnNumbers[i] - 1]) //Fehérje
    //                     mealType.push(day[rowNumber + 1]);                             //Zsír
    //                     mealType.push(this._menu[rowNumber + 1][columnNumbers[i] + 1]) //Zsírsav
    //                 }
    //                 else if (cell === "Cukor") {
    //                     mealType.push(this._menu[rowNumber + 1][columnNumbers[i] - 1]) //Szénhidrát
    //                     mealType.push(day[rowNumber + 1]);                             //Cukor
    //                     mealType.push(this._menu[rowNumber + 1][columnNumbers[i] + 1]) //Só
    //                 }
    //             }
    //             else if (cell === undefined && day[rowNumber - 2] === "Cukor") {
    //                 let tmpAllergen;
    //                 if (this._menu[rowNumber][columnNumbers[i] - 1] !== undefined) {
    //                     tmpAllergen = this._menu[rowNumber][columnNumbers[i] - 1];
    //                 }
    //                 else tmpAllergen = this._menu[rowNumber][columnNumbers[i] + 1];
    //                 mealType.push(tmpAllergen);
    //                 dayMenu.push(mealType);
    //                 mealType = [];
    //                 type++;
    //             }
    //         });
    //         weeklyMenu.push(dayMenu);
    //     }
    //     return weeklyMenu;
    // }

    async convert(rows) {
        let type = 0;
        let dayMenu = [];
        let tmpMeal = [];
        let rowNumber = 0;
        let unnepJelzo = 0;
        rows.forEach((row, index) => {
            if (index > 34) return;
            const keys = Object.keys(row);
            if (row.__EMPTY !== undefined) {
                type++;
            }
            switch (rowNumber) {
                case 0:
                    var y = unnepJelzo;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            if (!dayMenu[y]) dayMenu[y] = [];
                            if (row[keyName] !== "ÜNNEP" && row[keyName] !== "SZÜNET") {
                                dayMenu[y].push([type, row[keyName]])
                                y++;
                            }
                            else {
                                dayMenu[y].push(undefined)
                                unnepJelzo++;
                                y++;
                            }

                        }
                    }
                    rowNumber++;
                    break;
                case 1:
                    var y = unnepJelzo;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            let energia = row[keyName];
                            dayMenu[y][type - 1].push(energia.split(":")[1].trim())
                            y++;
                        }
                    }
                    rowNumber++;
                    break;
                case 2:
                    rowNumber++;
                    break;
                case 3:
                    var y = unnepJelzo;
                    var szamlalo = 0;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            dayMenu[y][type - 1].push(row[keyName]);
                            szamlalo++;
                        }
                        if (szamlalo === 3) {
                            y++;
                            szamlalo = 0;
                        }
                    }
                    rowNumber++;
                    break;
                case 4:
                    rowNumber++;
                    break;
                case 5:
                    var y = unnepJelzo;
                    var szamlalo = 0;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            dayMenu[y][type - 1].push(row[keyName]);
                            szamlalo++;
                        }
                        if (szamlalo === 3) {
                            y++;
                            szamlalo = 0;
                        }
                    }
                    rowNumber++;
                    break;
                case 6:
                    var y = unnepJelzo;
                    for (let i = 0; i < keys.length; i++) {
                        const keyName = keys[i];
                        if (keyName !== "__EMPTY" && keyName !== "__EMPTY_1") {
                            dayMenu[y][type - 1].push(row[keyName]);
                            y++;
                        }
                    }
                    rowNumber = 0;
                    break;

                default:
                    console.error("Hiba a switchben");
                    break;
            }
        })
        return dayMenu;
    }
}

module.exports = new menuConvert()