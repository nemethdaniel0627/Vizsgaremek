const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const menuConvert = require('./modules/menuConvert');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.post("/menuConvert", (req, res) => {
  menuConvert.convert();
});

app.get("/read", (req, res) => {
  const etlap = menuConvert.dayUpload();

  etlap.map(d => {
    console.log(d);
  })
  res.send("asd");
});

app.get("/", (req, res) => {
  res.send("<div>Hello world</div>")
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});



