var https = require("https");
var fs = require("fs");
const path = require('path');
const xlxs = require("node-xlsx");

class menuConvert {
    _menu;

    convert() {
        // The authentication key (API Key).
        // Get your own by registering at https://app.pdf.co/documentation/api
        const API_KEY = "nem.dani0627@gmail.com_a787af92cf6b318681bc9f7735c4144779b2";


        // Direct URL of source PDF file.
        const SourceFileUrl = "http://www.gek.hu/images/Eattrend/2021/Eatrend-2021-42-het-RTEUV.pdf";
        // Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
        const Pages = "";
        // PDF document password. Leave empty for unprotected documents.
        const Password = "";
        // Destination XLSX file name
        const DestinationFile = "./result.xlsx";


        // Prepare request to `PDF To XLSX` API endpoint
        var queryPath = `/v1/pdf/convert/to/xlsx`;

        // JSON payload for api request
        var jsonPayload = JSON.stringify({
            name: path.basename(DestinationFile), password: Password, pages: Pages, url: SourceFileUrl
        });

        var reqOptions = {
            host: "api.pdf.co",
            method: "POST",
            path: queryPath,
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(jsonPayload, 'utf8')
            }
        };
        // Send request
        var postRequest = https.request(reqOptions, (response) => {
            response.on("data", (d) => {
                // Parse JSON response
                var data = JSON.parse(d);
                if (data.error == false) {
                    // Download XLSX file
                    var file = fs.createWriteStream(DestinationFile);
                    https.get(data.url, (response2) => {
                        response2.pipe(file)
                            .on("close", () => {
                                console.log(`Generated XLSX file saved as "${DestinationFile}" file.`);
                            });
                    });
                }
                else {
                    // Service reported error
                    console.log(data.message);
                }
            });
        }).on("error", (e) => {
            // Request error
            console.log(e);
        });

        // Write request data
        postRequest.write(jsonPayload);
        postRequest.end();
    }

    testLog() {
        this.readFromExcel();
        // console.log(this._etlap[0].data);
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
        this._menu = xlxs.parse(__dirname + "\\..\\result.xlsx")[0].data;
    }

    dayUpload() {
        if (!this._menu) this.readFromExcel();
        const lastRow = this._menu.length - 1;
        let weeklyMenu = [];
        let dayMenu = [];
        for (let i = 4; i < this._menu[lastRow].length; i += 3) {
            let day = this.arrayColumn(this._menu, i);
            let dayName = day[1];
            let type = 1;
            let mealType = [];
            dayMenu = [];
            // dayMenu[type-1].push([]);
            let mealString = "";
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
                        mealString = mealString.trimEnd();
                        mealString = mealString.substr(0, mealString.length - 1);
                        mealType.push(type);
                        mealType.push(mealString);
                        mealString = "";
                        mealType.push(this._menu[rowNumber - 1][i - 1]) //Energia
                        mealType.push(this._menu[rowNumber + 1][i - 1]) //Fehérje
                        mealType.push(day[rowNumber + 1]);               //Zsír
                        mealType.push(this._menu[rowNumber + 1][i + 1]) //Zsírsav
                    }
                    else if (cell === "Cukor") {
                        mealType.push(this._menu[rowNumber + 1][i - 1]) //Szénhidrát
                        mealType.push(day[rowNumber + 1]);               //Cukor
                        mealType.push(this._menu[rowNumber + 1][i + 1]) //Só
                    }
                    else if (cell !== "Zsír" && isNaN(Number(cell[0])) && cell.split(" ")[0] !== "Heti") {
                        mealString += `${cell}, `;
                    }
                }
                else if (cell === undefined && day[rowNumber - 2] === "Cukor") {
                    let tmpAllergen;
                    if (this._menu[rowNumber][i - 1] !== undefined) {
                        tmpAllergen = this._menu[rowNumber][i - 1];
                    }
                    else tmpAllergen = this._menu[rowNumber][i + 1];
                    //TODO allergén hibákat javítani
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