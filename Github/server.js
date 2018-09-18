const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var data = require("./service.js");
const PORT = process.env.PORT || 2006;
var delayTime = 1000;

app.use(bodyParser.json());

//APPLICATION

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});

app.get('/', (req, res) => {
  data.initialize().then(function() {
    data.delay(delayTime).then(function() {
      data.getRepos().then(function() {
        data.delay(delayTime).then(function() {
          data.getAllBranchUrls().then(function() {
            data.delay(delayTime).then(function() {
              data.getCommits().then(() => {
                data.delay(delayTime).then(function() {
                  data.getRecentCommits().then((data) =>{
                    res.json(data);
                  });
                });
              });
            }); 
          });
        });
      });
    });
  }).catch((err) => {
      console.log(err);
  });
});

app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(PORT);
console.log(`Running on localhost:${PORT}`);
