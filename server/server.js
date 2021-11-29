const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const menuConvert = require('./modules/menuConvert');
const databaseUpload = require('./modules/databaseUpload');
const sqlQueries = require('./modules/sqlQueries');
const databaseDownload = require('./modules/databaseDownload');

const app = express();



const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.post("/menuConvert", (req, res) => {
  menuConvert.convert();
});

app.get("/etlap", async (req, res) => {
  const menu = await databaseDownload.getMenu(new Date());

  res.json(menu);
});

// SELECT
// mealReggeli.nev,
//   mealTizorai.nev,
//   mealEbed.nev,
//   mealUszonna.nev,
//   mealVacsora.nev
// FROM menu
// "INNER JOIN days ON menu.daysId = days.id" +
//   "INNER JOIN meal AS mealReggeli ON menu.reggeliId = mealReggeli.id" +
//   "INNER JOIN meal AS mealTizorai ON menu.tizoraiId = mealTizorai.id" +
//   "INNER JOIN meal AS mealEbed ON menu.ebedId = mealEbed.id" +
//   "INNER JOIN meal AS mealUszonna ON menu.uzsonnaId = mealUszonna.id" +
//   "INNER JOIN meal AS mealVacsora ON menu.vacsoraId = mealVacsora.id"
// WHERE days.datum BETWEEN "2021-11-22" AND "2021-11-26"


app.post("/etlap", async (req, res) => {
  // const menu = req.body.menu;

  const menu = await menuConvert.dayUpload();

  let day1 = [];
  let day2 = [];
  let day3 = [];
  let day4 = [];
  let day5 = [];
  menu.forEach((day, index) => {
    switch (index) {
      case 0:
        day1 = day;
        break;
      case 1:
        day2 = day;
        break;
      case 2:
        day3 = day;
        break;
      case 3:
        day4 = day;
        break;
      case 4:
        day5 = day;
        break;
      default:
        break;
    }
  })
  let date = new Date("2021-11-22");
  date = await databaseUpload.insertDay(day1, date);
  date = await databaseUpload.insertDay(day2, date);
  date = await databaseUpload.insertDay(day3, date);
  date = await databaseUpload.insertDay(day4, date);
  date = await databaseUpload.insertDay(day5, date);

  res.send("Kész");
});

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
