const path = require('path');
var https = require("https");
var fs = require("fs");
const axios = require('axios');
const cors = require('cors');
const express = require('express');
// const menuConvert = require('./modules/menuConvert');
const pdf2excel = require('pdf-to-excel');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.post("/menuConvert",(req,res) => {
  // menuConvert.convert();
  try {
    pdf2excel.genXlsx("etlap.pdf", "etlap.xlsx");
    res.send({suc: "success"});
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req,res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});



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