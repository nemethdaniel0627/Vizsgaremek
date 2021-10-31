const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const xlxs = require("node-xlsx");
const XLSX = require("xlsx");
const menuConvert = require('./modules/menuConvert');
// const menuConvert = require('./modules/menuConvert');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.post("/menuConvert", (req, res) => {
  menuConvert.convert();
});

app.get("/read", (req, res) => {
  // var obj = xlxs.parse(__dirname + "/result.xlsx");
  // obj.map(r => {
  //   console.log(r);
  // })


  // const twoDimensionalArray = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ];

  // console.log(obj[0].data);  
  const etlap = menuConvert.dayUpload();
  console.log(etlap);
  etlap.map(d => {
    console.log(d);
  })
  // menuConvert.testLog();
  // console.log(menuConvert.testLog());
  res.send("asd");
});


// console.log(menuConvert.logMenu());

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});



