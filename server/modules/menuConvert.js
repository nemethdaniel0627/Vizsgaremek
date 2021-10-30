var https = require("https");
var fs = require("fs");
const path = require('path');
const xlxs = require("node-xlsx");
class menuConvert {
    _etlap;

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
        console.log(this.arrayColumn(this._etlap[0].data, 4));
    }

    arrayColumn(arr, n) {
        return arr.map(x => x[n]);
    }

    readFromExcel() {
        this._etlap = xlxs.parse(__dirname + "\\..\\result.xlsx");
    }

    dayUpload() {
        const lastRow = this._etlap.length - 1;
        for (let i = 4; i < this._etlap[lastRow].length; i += 3) {
            let day = this.arrayColumn(this._etlap, i);
            let dayName = day[1];
            let dayMenu = [];
            let fajta = 1;
            let mealString = "";
            day.forEach((cell, rowNumber) => {
                if (cell !== undefined && cell !== dayName) {
                    if (cell !== "Zsír") {
                        mealString += `${cell}, `;
                    }
                    else if (cell === "Zsír") {
                        mealString.trimEnd();
                        mealString[mealString.length - 1] = "";
                        dayMenu.push(mealString);
                        mealString = "";
                        dayMenu.push(this._etlap[i - 1][rowNumber + 1]) //Fehérje
                        dayMenu.push(day[rowNumber + 1]);           //Zsír
                        dayMenu.push(this._etlap[i + 1][rowNumber + 1]) //Zsírsav
                    }
                    else if (cell === "Cukor") {
                        dayMenu.push(this._etlap[i - 1][rowNumber + 1]) //Szénhidrát
                        dayMenu.push(day[rowNumber + 1]);           //Cukor
                        dayMenu.push(this._etlap[i + 1][rowNumber + 1]) //Só
                    }
                }
                else if (cell === undefined && day[rowNumber - 2] === "Cukor") {
                    //TODO fajtat növelni, allergéneket elmenteni
                }
            });
        }

    }
}

module.exports = new menuConvert()