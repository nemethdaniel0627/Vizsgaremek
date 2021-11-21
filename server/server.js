const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const menuConvert = require('./modules/menuConvert');
const sqlQueries = require("./modules/sqlQueries");

const app = express();



const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.post("/menuConvert", (req, res) => {
  menuConvert.convert();
});

app.get("/etlap", async (req, res) => {
  // const etlap = menuConvert.dayUpload();

  // etlap.map(d => {
  //   console.log(d);
  // })
  // res.send("asd");
  const date = new Date();
  const responseDays = await sqlQueries.insert("days", "datum, hetkoznap", `"2021-11-21", "${date.getDay()}"`);
  const select = await sqlQueries.select("days", "days.id", `days.datum = "2021-11-21"`);
  console.log(select);
  res.send("Üzenet");
});

app.post("/etlap", async (req, res) => {
  // const menu = req.body.menu;

  const menu = menuConvert.dayUpload();
  const date = new Date();
  const idPrefix = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;

  menu.forEach(async (day) => {
    if (day.length === 0) {
      for (let i = 1; i <= 5; i++) {
        const response = await sqlQueries.insert("meal", "id, nev", `${idPrefix}${i}, ünnep`);
        console.log(response);

      }
      const responseDays = sqlQueries.insert("days", "datum, hetkoznap", `NOW(), ${date.getDay()}`);
      const select = sqlQueries.select("days", "id", `datum = ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
      const response2 = sqlQueries.insert("menu", "nev", `ünnep`);
    }
    day.forEach( async (meal) => {
      const response = sqlQueries.insert(
        "meal",
        "id," +
        "nev," +
        "energia," +
        "feherje," +
        "zsir," +
        "tZsir," +
        "szenhidrat," +
        "cukor," +
        "so," +
        "allergenek",
        `${idPrefix}${meal[0]},${meal[1]},${meal[2]},${meal[3]},${meal[4]},${meal[5]},${meal[6]},${meal[7]},${meal[8]},${meal[9]}`);
      console.log(response);
    })
  })


});

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});



