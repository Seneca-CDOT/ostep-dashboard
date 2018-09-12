const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var data = require("./service.js");
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const listen = function() {
    console.log("Now listening on port: " + HTTP_PORT);
}

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

app.listen(HTTP_PORT, listen);