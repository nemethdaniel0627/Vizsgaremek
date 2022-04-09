const path = require('path');
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
const bcrypt = require('bcrypt');
const functions = require('./modules/functions');

const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());
app.use(exception.exception)

app.get("/menu", async (req, res) => {
  const menu = await databaseDownload.getMenu(new Date());
  const nextWeekDate = new Date();
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);
  const nextWeek = await databaseDownload.getMenu(nextWeekDate);
  res.json({ menu: menu, nextWeek: nextWeek.length !== 0 ? true : false });
});

app.put("/menu", auth.tokenAutheticate, async (req, res) => {
  let excelRows = req.body.excelRows;
  const setDate = req.body.date;
  const override = req.body.override;
  const selectDaysId = await sqlQueries.select("days", "id", `datum = "${setDate}"`);
  if (selectDaysId.length === 0 || override) {
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
          let returnData = await databaseUpload.updateDay(day, date);
          if (returnData.length !== undefined) {
            date.setDate(date.getDate() - 1);
            date = await databaseUpload.insertDay(returnData, date);
          }
          else date = returnData;
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
      const newUser = {
        omAzon: data[i].split(';')[0],
        jelszo: data[i].split(';')[1],
        nev: data[i].split(';')[2],
        schoolsId: data[i].split(';')[3],
        osztaly: data[i].split(';')[4],
        email: data[i].split(';')[5]
      }
      let added = await user.add(newUser, false);
      if (added) count++;
    }
    res.send(`${count} record(s) added`);
  } catch (error) {
    res.send(error.message);
  }
})

app.post("/menu/pagination", auth.tokenAutheticate, async (req, res) => {
  const date = new Date(req.body.date);
  const nextWeekDate = new Date(functions.convertDateWithDash(date));
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);
  const menu = await databaseDownload.getMenu(date);
  const nextWeek = await databaseDownload.getMenu(nextWeekDate);
  res.json({ menu: menu, nextWeek: nextWeek.length !== 0 ? true : false });
})

app.post("/user/details", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const userWithDetails = await user.getBy("*", `user.omAzon = ${omAzon}`, false);
  if (userWithDetails.length > 0) {
    const iskolaOM = await sqlQueries.select("schools", "iskolaOM", `id = ${userWithDetails[0].schoolsId}`, false);
    const userOrders = await order.selectOrdersWithDateByUserId(userWithDetails[0].id);
    userWithDetails[0].iskolaOM = iskolaOM[0].iskolaOM;
    userWithDetails[0].orders = userOrders;
    res.json(userWithDetails);
  }
  else res.notFound();
})

app.post("/user", auth.tokenAutheticate, async (req, res) => {
  const userId = req.body.userId;
  const userResult = await user.getBy("*", `id = "${userId}"`, false);
  const iskola = await sqlQueries.select("schools", "iskolaOM, nev", `id = ${userResult[0].schoolsId}`, false);
  const orderResult = await order.doesUserHaveOrderForDate(userId, new Date())
  userResult[0].iskolaOM = iskola[0].iskolaOM;
  userResult[0].iskolaNev = iskola[0].nev;
  if (!orderResult) userResult[0].befizetve = false;
  else userResult[0].befizetve = true;
  if (userResult) res.send(userResult);
  else res.notFound();
});

app.get("/schoollist", async (req, res) => {
  const schools = await sqlQueries.selectAll("schools", "*", false);
  res.json(schools);
})

app.post("/token", auth.tokenAutheticate, (req, res) => {
  res.ok();
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

app.put("/pending/accept", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const tmpUser = (await user.getBy("*", `omAzon = '${omAzon}'`, false, true))[0];
  await user.delete(`omAzon = ${omAzon}`, true);
  const newUser = await user.add(tmpUser, false);
  if (newUser.length === 0) res.conflict();
  res.created();
});

app.delete("/pending/reject", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const result = await user.delete(`omAzon = ${omAzon}`, true);
  result === 1 ? res.ok() : res.conflict();
});

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const authResult = await auth.login(user);
  if (!authResult) res.unauthorized();
  else {
    res.setHeader("Authorization", [auth.createCookie(authResult.tokenData)]);
    res.send(authResult.user);
  }
});

app.post("/order", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const userId = (await user.getBy('id', `omAzon = ${omAzon}`, false, false))[0].id;
  const meals = req.body.meals;
  const dates = req.body.dates;
  const errorDates = [];
  for (let i = 0; i < dates.length; i++) {
    const ordered = await order.order(userId, meals, dates[i]);
    if (!ordered) errorDates.push(dates[i]);
  }
  if (errorDates.length === 0) res.ok();
  else res.status(207).send(`Not paid dates: ${errorDates}`);
})

app.patch("/cancel", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const userId = (await user.getBy('id', `omAzon = ${omAzon}`, false, false))[0].id;
  const dates = req.body.dates;
  let notCancelledDates = [];
  let cancelled;
  for (let i = 0; i < dates.length; i++) {
    cancelled = await order.cancelOrder(userId, dates[i]);
    if (cancelled === false) {
      notCancelledDates.push(dates[i]);
    }
  }
  if (notCancelledDates.length === 0) {
    res.ok();
  }
  else if (dates.length === notCancelledDates.length) {
    res.badRequest();
  }
  else {
    res.status(207).json({ notCancelled: notCancelledDates });
  }
})

app.post("/scan", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const userId = await user.getBy("id", `omAzon = ${omAzon}`, false, false);
  if (userId.length === 0) res.notFound();
  else {
    const befizetve = await order.doesUserHaveOrderForDate(userId[0].id, new Date());
    res.json({ befizetve: befizetve === false ? false : true });
  }
})

app.delete("/user/delete", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const currentUser = await user.getBy('*', `omAzon = ${omAzon}`, false, false);
  if (currentUser.length === 0) res.notFound();
  else {
    await user.delete(`omAzon = ${omAzon}`, false) === 1 ? res.ok() : res.conflict();
  }
})

app.post("/user/add", auth.tokenAutheticate, async (req, res) => {
  const newUser = req.body.user;
  const schoolsId = await sqlQueries.select("schools", "id", `iskolaOM = ${newUser.iskolaOM}`, false);
  const jelszo = await test.randomString(10);
  const tmpUser = {
    omAzon: newUser.omAzon,
    jelszo: jelszo,
    nev: newUser.nev,
    schoolsId: schoolsId[0].id,
    osztaly: newUser.osztaly,
    email: newUser.email,
    jog: newUser.jog
  }
  await email.RegisterInDatabase(tmpUser);
  tmpUser.jelszo = bcrypt.hashSync(tmpUser.jelszo, 10);
  const added = await user.add(tmpUser, false);
  if (added) res.created();
  else res.conflict();
});

app.put("/user/modify", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const updatedUser = req.body.user;
  const schoolsId = await sqlQueries.select("schools", "id", `iskolaOM = ${updatedUser.iskolaOM}`, false);
  if (schoolsId.length === 0) res.notFound();
  else {
    const users = await user.getAll(false);
    let unique = true;
    const currentUser = await user.getBy('*', `omAzon = ${omAzon}`, false, false);
    if (currentUser.length === 0) res.notFound();
    else if (currentUser[0].omAzon === updatedUser.omAzon || updatedUser.email === currentUser[0].email) {
      const modified = await user.modify(
        `omAzon = ${updatedUser.omAzon}, 
         nev = '${updatedUser.nev}', 
         schoolsId = '${schoolsId[0].id}', 
         osztaly = '${updatedUser.osztaly}', 
         email = '${updatedUser.email}'`,
        `omAzon = ${omAzon}`);
      const userId = (await sqlQueries.select("user", "id", `omAzon = ${omAzon}`, true));
      await sqlQueries.update("user_role", `roleId = ${updatedUser.jog}`, `userId = ${userId}`);
      modified === 1 ? res.json({ email: updatedUser.email, omAzon: updatedUser.omAzon }) : res.conflict();
    }
    else {
      users.forEach(user => {
        if (updatedUser.omAzon === user.omAzon || updatedUser.email === user.email) unique = false;
      });
      if (!unique) res.conflict();
      else {
        const modified = await user.modify(
          `omAzon = ${updatedUser.omAzon}, 
           nev = '${updatedUser.nev}', 
           schoolsId = '${schoolsId[0].id}', 
           osztaly = '${updatedUser.osztaly}', 
           email = '${updatedUser.email}'`,
          `omAzon = ${omAzon}`);
        modified === 1 ? res.json({ email: updatedUser.email, omAzon: updatedUser.omAzon }) : res.conflict();
      }
    }
  }
})

app.put("/password/modify", auth.tokenAutheticate, async (req, res) => {
  const omAzon = req.body.omAzon;
  const regiJelszo = req.body.regiJelszo;
  const ujJelszo = req.body.ujJelszo;
  const userData = await user.getBy('omAzon, jelszo', `omAzon = ${omAzon}`, false, false);
  if (userData.length === 0) res.notFound();
  else {
    const match = bcrypt.compareSync(regiJelszo, userData[0].jelszo);
    if (match) {
      const ujJelszoHash = bcrypt.hashSync(ujJelszo, 10);
      await user.modify(`jelszo = '${ujJelszoHash}'`, `omAzon = ${omAzon}`);
      res.ok();
    }
    else {
      res.conflict();
    }
  }
})

app.post("/email", async (req, res) => {

  const emailSpecs = req.body;
  let o;
  let o2;
  switch (emailSpecs.type) {
    case 'report':
      o = await email.EmailSendingForReport(emailSpecs);
      o2 = await email.ReplyEmailSendingForReport(emailSpecs);
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
    case 'registerFromDB':
      o = await email.EmailSendingForRegisterAcceptedFromDataBase(emailSpecs);
      res.send(o);
      break;

    default:

      break;

  }
  res.ok();
})

app.post("/cancel/dates", auth.tokenAutheticate, async (req, res) => {
  const userId = await user.getBy("id", `omAzon = ${req.body.omAzon}`, true, false);
  if (userId.length === 0) res.notFound()
  else {
    const cancelledDays = await order.getCancelledDates(userId);
    res.send({
      dates: cancelledDays
    })
  }
})

app.post("/pagination", auth.tokenAutheticate, async (req, res) => {
  const limit = req.body.limit || 10;
  const offset = req.body.offset || 0;
  const pending = req.body.pending || false;
  const searchValue = req.body.searchValue || "";
  const tableName = pending ? 'user_pending' : 'user';
  const userCount = (await sqlQueries.selectAll(`${tableName} ` +
    `INNER JOIN schools ON ${tableName}.schoolsId = schools.id ` +
    `${tableName === "user" ? `INNER JOIN user_role ON user_role.userId = ${tableName}.id INNER JOIN roles ON user_role.roleId = roles.id ` : ""} ` +
    `WHERE ${tableName === "user" ? `roles.nev = 'user' AND ` : ""}` +
    `(${tableName}.omAzon REGEXP '${searchValue}' OR ` +
    `${tableName}.nev REGEXP '${searchValue}' OR ` +
    `schools.iskolaOM REGEXP '${searchValue}' OR ` +
    `${tableName}.osztaly REGEXP '${searchValue}' OR ` +
    `${tableName}.email REGEXP '${searchValue}') `, `${tableName}.id`, false)).length;
  const users = await user.getAll(false, limit, offset, tableName, searchValue);
  res.send({
    pending: pending,
    pages: Math.ceil(userCount / limit),
    users: users
  });
})

app.post("/user/upload", auth.tokenAutheticate, async (req, res) => {
  const userRows = req.body.userRows.split("\n");
  let notAddedUsers = [];

  for (let i = 1; i < userRows.length - 1; i++) {
    const schoolsId = await user.convert(userRows[i].split(';')[2]);
    const tmpPassword = userRows[i].split(';')[1].toLowerCase().split(' ').join('.').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const password = bcrypt.hashSync(tmpPassword.trim(), 10);
    const newUser = {
      omAzon: userRows[i].split(';')[0],
      jelszo: password,
      nev: userRows[i].split(';')[1],
      schoolsId: schoolsId,
      osztaly: userRows[i].split(';')[3],
      email: userRows[i].split(';')[4]
    }
    if (newUser.schoolsId === -1) notAddedUsers.push(`${newUser.omAzon} - ${newUser.nev}`);
    else {
      const added = await user.add(newUser, false);
      if (added === false)
        notAddedUsers.push(`${newUser.omAzon} - ${newUser.nev}`);
    }
  }
  if (notAddedUsers.length === 0) res.ok();
  else if (userRows.length - 2 !== notAddedUsers.length) res.status(207).json({ users: notAddedUsers });
  else res.badRequest();
})

app.get("/user/download", auth.tokenAutheticate, async (req, res) => {
  const title = "OM azonosító;Név;Iskola OM azonosító;Osztály;Email cím";
  const data = await user.getUsers();
  let users = "";
  users += title + "\n";
  data.forEach(user => {
    users += user.join(";");
    users += "\n";
  });
  data.unshift(title);
  res.json({ users: users });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
