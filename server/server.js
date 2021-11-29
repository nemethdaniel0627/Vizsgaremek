const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const menuConvert = require('./modules/menuConvert');
const databaseUpload = require('./modules/databaseUpload');

const app = express();



const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.post("/menuConvert", (req, res) => {
  menuConvert.convert();
});

app.get("/etlap", async (req, res) => {
  const etlap = menuConvert.dayUpload();

  etlap.map(d => {
    console.log(d);
  })

  const date = new Date();
  // const responseDays = await sqlQueries.insert("days", "datum, hetkoznap", `"2021-11-21", "${date.getDay()}"`);
  // await sqlQueries.CreatConnection();
  // await sqlQueries.insert("days", "datum, hetkoznap", `NOW(), ${date.getDay()}`);
  // await sqlQueries.insert("meal", "id, nev", `${20211128}${1}, "ünnep"`);
  // await sqlQueries.insert("meal", "id, nev", `${20211128}${2}, "ünnep"`);
  // await sqlQueries.insert("meal", "id, nev", `${20211128}${3}, "ünnep"`);
  // const select = await sqlQueries.select("days", "days.id", `days.datum = "2021-11-28"`);
  // const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = 20211128`);
  // console.log(selectMealsIds);
  // console.log(select);
  // await sqlQueries.EndConnection();
  // console.log(selectMealsIds);
  res.send("Üzenet");
});



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
  let date = new Date();
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
