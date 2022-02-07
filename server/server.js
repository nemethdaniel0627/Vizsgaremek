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
const exception = require('./exceptions/exceptions');
const order = require('./modules/order');

const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());
app.use(exception.exception)

app.get("/etlap", async (req, res) => {
  const menu = await databaseDownload.getMenu(new Date());  
  res.json(menu);
});

app.post("/etlap", async (req, res) => {  
  let excelRows = req.body.excelRows;
  const setDate = req.body.date;

  if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
  const selectDaysId = await sqlQueries.select("days", "id", `datum = "${setDate}"`);
  if (selectDaysId.length === 0) {
    await sqlQueries.EndConnection();
    const menu = await menuConvert.convert(excelRows);
    
    let date = new Date(setDate);

    try {
      for await (const day of menu) {
        date = await databaseUpload.insertDay(day, date);
      }
    } catch (error) {
      res.notFound();
    }
    res.send("Kész");
  }
  else {
    res.conflict();    
  }
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

app.post("/user", auth.tokenAutheticate, async (req, res) => {
  const userId = req.body.userId;
  const userResult = await user.getBy("*", `id = "${userId}"`, false);
  if (userResult) res.send(userResult);
  else res.notFound();
})

app.post("/token", auth.tokenAutheticate, (req, res) => {
  res.json({ message: "Ok" });
})

app.post("/register", async (req, res) => {
  const user = req.body.user;
  const authResult = await auth.register(user);
  if (!authResult) {
    res.status(409);
    res.send("Felhasználó már létezik");
  }
  else {
    res.setHeader("Authorization", [auth.createCookie(authResult.tokenData)]);
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
    res.setHeader("Authorization", [auth.createCookie(authResult.tokenData)]);
    res.send(authResult.user);
  }
});

app.put("/update", async (req, res) => {
  const count = await user.modify('omAzon = 72339825529', 'omAzon = 72339825529');
  res.send(`${count} record(s) updated`);
})

app.delete("/delete", async (req, res) => {
  const count = await user.delete('omAzon = 72339825529');
  res.send(`${count} record(s) deleted`);
})

app.post("/order", async (req, res) => {
  const o = await order.order(6, [true, false, true, false, true], '2022-01-31');
  res.send(o);
})

app.post("/cancel", async (req, res) => {
  const o = await order.cancelOrder(6, [1, 0, 0, 0, 1], '2022-01-31');
  res.send(o);
})

app.post("/test", async (req, res) => {
  // const create = await test.generate('users2.txt', 82);
  // res.send(create);
  const mealsCount = await order.ordersCountByDate('2022-01-31');
  res.send(mealsCount);
})

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
