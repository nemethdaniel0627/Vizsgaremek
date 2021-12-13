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
  let date = new Date("2021-12-06");

  // menu.forEach(async (day, index) => {
  //   date = await databaseUpload.insertDay(day, date);
  // });

  try {
    for await (const day of menu) {
      date = await databaseUpload.insertDay(day, date);
    }
  } catch (error) {
    res.status(404);
    res.send("Error")
    throw error;

  }

  res.send("Kész");
});

app.post("/add", async (req, res) => {
  let data = await user.readFile('users.txt');
  for (let i = 0; i < data.length; i++) {
    await user.add(data[i]);
  }
  res.send("kész");
})

app.put("/update", async (req, res) => {
  const count = await user.modify('felhasznaloNev = 123456789', 'felhasznaloNev = 723011004754');
  res.send(`${count} record(s) updated`);
})

app.delete("/delete", async (req, res) => {
  const count = await user.delete('nev = "Teszt Elek1"');
  res.send(`${count} record(s) deleted`);
})

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
