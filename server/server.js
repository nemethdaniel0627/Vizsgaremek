const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const menuConvert = require('./modules/menuConvert');
const databaseUpload = require('./modules/databaseUpload');
const sqlQueries = require('./modules/sqlQueries');
const databaseDownload = require('./modules/databaseDownload');
const user = require('./modules/user');
const test = require('./modules/test');
const auth = require('./modules/auth');
const Exception = require('./exceptions/Exceptions');

const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());
app.use(Exception.exception)

app.get("/etlap", async (req, res) => {
  const menu = await databaseDownload.getMenu(new Date());
  // const menu = await menuConvert.dayUpload();
  res.json(menu);
});

app.post("/etlap", async (req, res) => {
  // console.log(req.body);
  let excelRows = req.body.excelRows;
  // menuConvert._menu = menu;
  // await menuConvert.readFromExcel();
  const menu = await menuConvert.convert(excelRows);

  let day1 = [];
  let day2 = [];
  let day3 = [];
  let day4 = [];
  let day5 = [];
  let date = new Date("2022-01-10");

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
  try {
    const data = await user.readFile('users.txt');
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      let added = await user.add(data[i]);
      if (added) count++;
    }
    res.send(`${count} record(s) added`);
  } catch (error) {
    res.send("No such file");
  }
})

app.get("/user", auth.tokenAutheticate, async (req, res) => {
  // res.json({
  //   vNev: "Winch",
  //   kNev: "Eszter",
  //   osztaly: "12.A",
  //   befizetve: null,
  //   datum: "2021.12.01",
  //   om: "71767844485",
  //   iskolaOm: "771122",
  //   email: "asd@asd.com"
  // });
  // const userName = req.body.userName;
  // const userResult = await user.getBy("felhasznaloNev", `felhasznaloNev = "${userName}"`);
  // console.log(new NoUserFoundException());
  // res.send(userResult);

  res.unauthorized();

})

app.post("/register", async (req, res) => {
  const user = req.body.user;
  const authResult = await auth.register(user);
  if (!authResult) {
    res.status(409);
    res.send("Felhasználó már létezik");
  }
  else {
    res.setHeader("Set-Cookie", [auth.createCookie(authResult.tokenData)]);
    res.send(authResult.user);
  }
});

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const authResult = await auth.login(user);
  if (!authResult) {
    res.status(401);
    res.send("Unauthorized");
  }
  else {
    res.setHeader("Set-Cookie", [auth.createCookie(authResult.tokenData)]);
    res.send(authResult.user);
  }
});

app.put("/update", async (req, res) => {
  const count = await user.modify('felhasznaloNev = 123456789', 'felhasznaloNev = 723011004754');
  res.send(`${count} record(s) updated`);
})

app.delete("/delete", async (req, res) => {
  const count = await user.delete('nev = "Teszt Elek1"');
  res.send(`${count} record(s) deleted`);
})

app.post("/cancel", async (req, res) => {
  const dates = req.body.dates;
  dates.forEach(async date => {
    await user.cancelOrder(date, [1, 0, 1, 0, 1]);
  });
  res.send("Ok");
})

app.post("/test", async (req, res) => {
  const create = await test.generate('users.txt', 82);
  res.send(create);
})

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
