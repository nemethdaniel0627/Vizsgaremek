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
const bcrypt = require('bcrypt')

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
  const userOrders = await order.selectOrdersWithDateByUserId(userWithDetails[0].id);
  userWithDetails[0].orders = userOrders;
  res.json(userWithDetails);
})

app.post("/user", auth.tokenAutheticate, async (req, res) => {
  const userId = req.body.userId;
  const userResult = await user.getBy("*", `id = "${userId}"`, false);
  const orderResult = await order.doesUserHaveOrderForDate(userId, new Date())
  console.log(orderResult);
  if (!orderResult) userResult[0].befizetve = false;
  else userResult[0].befizetve = true;
  console.log(userResult);
  if (userResult) res.send(userResult);
  else res.notFound();
});

app.get("/alluser", auth.tokenAutheticate, async (req, res) => {
  const allUser = await user.getAll(false);
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
  const newUser = await user.add(`${tmpUser[0].omAzon};${tmpUser[0].jelszo};${tmpUser[0].nev};${tmpUser[0].iskolaOM};${tmpUser[0].osztaly};${tmpUser[0].email}`, false);
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
  const testOrders = await test.orders('2022-02-04', 15);
  res.send(testOrders);
})

app.post("/userdelete", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const currentUser = await user.getBy('*', `omAzon = ${omAzon}`, false, false);
  if (currentUser.length === 0) res.notFound();
  else {
    await user.delete(`omAzon = ${omAzon}`, false);
    res.ok();
  }
})

app.post("/useradd", auth.tokenAutheticate, async (req, res) => {
  const newUser = req.body.user;
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  const data = Object.values(newUser).join(';');
  const added = await user.add(data, false);
  if (added) res.created();
  else res.conflict();
})

app.post("/usermodify", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const updatedUser = req.body.user;
  const users = await user.getAll(false);
  let unique = true;
  const currentUser = await user.getBy('*', `omAzon = ${omAzon}`, false, false);

  if (currentUser.length === 0) res.notFound();
  else {
    users.forEach(user => {
      if (updatedUser.omAzon === user.omAzon || updatedUser.email === user.email) unique = false;
    });

    if (!unique) res.conflict();
    else {
      await user.modify(`omAzon = ${updatedUser.omAzon}, nev = '${updatedUser.name}', schoolsId = '${updatedUser.schoolsId}', 
                         osztaly = '${updatedUser.osztaly}', email = '${updatedUser.email}'`, `omAzon = ${omAzon}`);
      res.ok();
    }
  }
})

app.post("/passwordmodify", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const userData = await user.getBy('omAzon, jelszo', `omAzon = ${omAzon}`, false, false);
  if (userData.length === 0) res.notFound();
  else {
    const match = bcrypt.compareSync(oldPassword, userData[0].jelszo);
    if (match) {
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      await user.modify(`jelszo = '${newPasswordHash}'`, `omAzon = ${omAzon}`);
      res.ok();
    }
    else {
      res.conflict();
    }
  }
})

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
