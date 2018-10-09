/***********************************************************
// OSTEP Dashboard Github API
// server.cpp
// Date: 2018/09/22
// Author: Yiran Zhu And Lewis Kim
// Email: yzhu132@myseneca.ca
// Description: Github API that gets all the sorted recent 
// commits from an organization/user
***********************************************************/


const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var data = require("./service.js");
const PORT = process.env.PORT || 2006;
var delayTime = 1000;

app.use(bodyParser.json());

//APPLICATION

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});

app.get('/', (req, res) => {
  data.initialize().then(() => {
    data.delay(delayTime).then(() => {
      data.getRepos().then(() => {
        data.delay(delayTime).then(() => {
          data.getAllBranchUrls().then(() => {
            data.delay(delayTime).then(() => {
              data.getAllCommitUrls().then(() => {
                data.delay(delayTime).then(() => {
                  data.sortRecentCommits().then((data) =>{
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

/*app.get('/', (req, res) => {
  data.initialize().then((data) =>{
    res.json(data);
  }).catch((err) => {
      console.log(err);
  });
});*/

app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(PORT);
console.log(`Running on localhost:${PORT}`);
