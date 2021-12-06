const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const menuConvert = require('./modules/menuConvert');
const databaseUpload = require('./modules/databaseUpload');
const sqlQueries = require('./modules/sqlQueries');
const databaseDownload = require('./modules/databaseDownload');
const user = require('./modules/user');

const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.get("/etlap", async (req, res) => {
  const menu = await databaseDownload.getMenu(new Date());
  // const menu = await menuConvert.dayUpload();
  res.json(menu);
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
  let date = new Date("2021-11-29");
  date = await databaseUpload.insertDay(day1, date);
  date = await databaseUpload.insertDay(day2, date);
  date = await databaseUpload.insertDay(day3, date);
  date = await databaseUpload.insertDay(day4, date);
  date = await databaseUpload.insertDay(day5, date);

  res.send("Kész");
});

app.post("/test", async (req, res) => {
  let data = await user.readFile('users.txt');
  for (let i = 0; i < data.length; i++) {
    await user.add(data[i]);
  }
  res.send("kész");
})

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
