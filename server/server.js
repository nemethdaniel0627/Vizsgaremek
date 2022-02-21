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
const email = require('./modules/emailSend');
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
  const override = req.body.override;  

  if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection(true);
  const selectDaysId = await sqlQueries.select("days", "id", `datum = "${setDate}"`);
  if (selectDaysId.length === 0 || override) {
    await sqlQueries.EndConnection();    
    const menu = await menuConvert.convert(excelRows);
    let date = new Date(setDate);

    if (override === false) {
      try {
        for await (const day of menu) {
          date = await databaseUpload.insertDay(day, date);
        }
      } catch (error) {
        res.notFound();
      }
    }
    else {      
      try {
        for await (const day of menu) {
          date = await databaseUpload.updateDay(day, date);
        }
      } catch (error) {
        res.notFound();
      }
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
      let added = await user.add(data[i], false);
      if (added) count++;
    }
    res.send(`${count} record(s) added`);
  } catch (error) {
    console.log(error);
    res.send("No such file");
  }
})

app.post("/userdetails", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const userWithDetails = await user.getBy("*", `user.omAzon = ${omAzon}`, false);
  const iskolaOM = await sqlQueries.select("schools", "iskolaOM", `id = ${userWithDetails[0].schoolsId}`, false);
  const userOrders = await order.selectOrdersWithDateByUserId(userWithDetails[0].id);
  userWithDetails[0].iskolaOM = iskolaOM[0].iskolaOM;
  userWithDetails[0].orders = userOrders;
  res.json(userWithDetails);
})

app.get("/schoollist", async (req, res) => {
  const schools = await sqlQueries.selectAll("schools", "*", false);
  res.json(schools);
})

app.post("/user", auth.tokenAutheticate, async (req, res) => {
  const userId = req.body.userId;
  const userResult = await user.getBy("*", `id = "${userId}"`, false);
  const iskolaOM = await sqlQueries.select("schools", "iskolaOM", `id = ${userResult[0].schoolsId}`, false);
  await sqlQueries.EndConnection();
  const orderResult = await order.doesUserHaveOrderForDate(userId, new Date())
  userResult[0].iskolaOM = iskolaOM[0].iskolaOM;
  if (!orderResult) userResult[0].befizetve = false;
  else userResult[0].befizetve = true;
  if (userResult) res.send(userResult);
  else res.notFound();
});

app.get("/alluser", auth.tokenAutheticate, async (req, res) => {
  const allUser = await user.getAll(false);
  // console.log(allUser);
  if (allUser.length === 0) res.notFound();
  res.json(allUser)
});

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
    res.created();
  }
});

app.get("/pending", auth.tokenAutheticate, async (req, res) => {
  const pending = await sqlQueries.selectAll("user_pending", "*", false);
  res.json(pending);
});

app.post("/acceptpending", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const tmpUser = await user.getBy("*", `omAzon = '${omAzon}'`, false, true);
  await user.delete(`omAzon = ${omAzon}`, true);
  const newUser = await user.add(`${tmpUser[0].omAzon};${tmpUser[0].jelszo};${tmpUser[0].nev};${tmpUser[0].schoolsId};${tmpUser[0].osztaly};${tmpUser[0].email}`, false);
  if (newUser.length === 0) res.conflict();
  res.created();
});

app.post("/rejectpending", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const result = await user.delete(`omAzon = ${omAzon}`, true);
  res.send("Ok");

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
  // const mealsCount = await order.ordersCountByDate('2022-01-31');
  // res.send(mealsCount);
  const testOrders = await test.orders('2022-02-04', 15);
  res.send(testOrders);

})

app.post("/email", async (req, res) => {

  const emailSpecs = req.body;
  switch (emailSpecs.type) {
    case 'report':
      const o = await email.EmailSendingForReport(emailSpecs);
      const o2 = await email.ReplyEmailSendingForReport(emailSpecs);
      res.send(o);
      break;
    case 'register':
      o = await email.EmailSendingForRegisterBefore(emailSpecs);
      o2 = await email.ReplyEmailSendingForRegister(emailSpecs);
      res.send(o);
      break;
    case 'registerAccepted':
      o = await email.EmailSendingForRegisterAccepted(emailSpecs);
      res.send(o);
      break;
  }


})

app.post("/emailRegister", async (res) => {

  const emailSpecs = {
    subject: "Regisztráció",
    toEmail: "rozsnono@gmail.com",
    fromEmail: "'FoodE' <foodwebusiness@gmail.com>",
    name: "Teszt Elek",
    class: "12.A",
    om: "11223344",
    text: "Sikeresen regisztált a Food-E weboldalon. <br /> A továbbiakban a regisztrációnál megadott OM azonosítóval illetve a jelvszavaddal tudsz bejelentkezni."
  }

  console.log(await email.EmailSendingForRegister(emailSpecs));
})

app.post("/emailReport", async (res) => {

  const emailSpecs = {
    subject: "Hiba jelentés",
    fromEmail: "rozsnono@gmail.com",
    name: "Teszt Elek",
    class: "12.A",
    om: "11223344",
  }

  console.log(await email.EmailSendingForReport(emailSpecs));
  console.log(await email.ReplyEmailSendingForReport(emailSpecs));
})

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
