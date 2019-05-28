const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var data = require("./service.js");
const PORT = 2002;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});

//APPLICATION

app.get('/', (req, res) => {
    data.getStatus().then((data) => {
      res.json(data);
    }).catch(() => {
      console.log("Failed to retrieve data.");
    });
});

app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
