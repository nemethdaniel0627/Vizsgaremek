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
  const etlap = menuConvert.dayUpload();

  etlap.map(d => {
    console.log(d);
  })
  // res.send("asd");
  const date = new Date();
  // const responseDays = await sqlQueries.insert("days", "datum, hetkoznap", `"2021-11-21", "${date.getDay()}"`);
  // const select = await sqlQueries.select("days", "days.id", `days.datum = "2021-11-21"`);
  // const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = 20211121`);
  // await sqlQueries.insert("days", "datum, hetkoznap", `NOW(), ${date.getDay()}`);
  // console.log(selectMealsIds);
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
      await sqlQueries.insert("days", "datum, hetkoznap", `"${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}", "${date.getDay()}"`);
      const selectDaysId = await sqlQueries.select("days", "id", `datum = "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}"`);
      const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = "${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}"`);
      await sqlQueries.insert(
        "menu",
        "daysId, reggeliId, tizoraiId, ebedId, uzsonnaId, vacsoraId",
        `${selectDaysId[0].id}, ${selectMealsIds[0].id}, ${selectMealsIds[1].id}, ${selectMealsIds[2].id}, ${selectMealsIds[3].id}, ${selectMealsIds[4].id}`);
      date.setDate(date.getDate() + 1);
    }
    else {
      day.forEach(async (meal) => {
        await sqlQueries.insert(
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
          `${idPrefix}${meal[0]},"${meal[1]}","${meal[2]}","${meal[3]}","${meal[4]}","${meal[5]}","${meal[6]}","${meal[7]}","${meal[8]}","${meal[9]}"`);
      })
      await sqlQueries.insert("days", "datum, hetkoznap", `"${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}", "${date.getDay()}"`);
      const selectDaysId = await sqlQueries.select("days", "id", `datum = "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}"`);
      const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = "${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}"`);
      await sqlQueries.insert(
        "menu",
        "daysId, reggeliId, tizoraiId, ebedId, uzsonnaId, vacsoraId",
        `${selectDaysId[0].id}, ${selectMealsIds[0].id}, ${selectMealsIds[1].id}, ${selectMealsIds[2].id}, ${selectMealsIds[3].id}, ${selectMealsIds[4].id}`);
      date.setDate(date.getDate() + 1);
    }
  })


});

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});



