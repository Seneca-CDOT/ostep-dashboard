/* **********************************************************
// OSTEP Dashboard Github API
// server.cpp
// Date Created: 2018/09/22
// Author: Yiran Zhu, Lewis Kim and Josue Quilon Barrios
// Email: yzhu132@myseneca.ca
// Description: Github API that gets all the sorted recent 
// commits from an organization/user
********************************************************** */

const express = require('express');
const bodyParser = require('body-parser');
const data = require('./service.js');
const app = express();

const PORT = process.env.PORT || 2006;
let isTimedOut = false;
const TIMEOUT_SECONDS = 6 * 60;
let storedData;
const day = 24 * 60 * 60 * 1000;
const month = 30 * 24 * 60 * 60 * 1000;

app.use(bodyParser.json());

// APPLICATION

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  if (!isTimedOut) {
    data
      .getRepos(day)
      .then(branches => {
        data
          .getAllCommitsTogether(branches)
          .then(commits => {
            storedData = commits;
            isTimedOut = true;
            setTimeout(() => {
              isTimedOut = false;
            }, TIMEOUT_SECONDS * 1000);
            res.json(commits);
          })
          .catch(err => {
            res.status(err.statusCode).send(err.statusMessage);
          });
      })
      .catch(err => {
        res.status(err.statusCode).send(err.statusMessage);
      });
  } else {
    res.json(storedData);
  }
});

app.get('/help-wanted', (req, res) => {
  data
    .getRepos(month)
    .then(repos => {
      data
        .getIssues(repos)
        .then(issues => {
          res.json(issues);
        })
        .catch(err => {
          res.status(err.statusCode).send(err.statusMessage);
        });
    })
    .catch(err => {
      res.status(err.statusCode).send(err.statusMessage);
    });
});

app.get('/pull-requests', (req, res) => {
  data
    .getRepos(month)
    .then(repos => {
      data
        .getPullRequests(repos)
        .then(pullRequests => {
          res.json(pullRequests);
        })
        .catch(err => {
          res.status(err.statusCode).send(err.statusMessage);
        });
    })
    .catch(err => {
      res.status(err.statusCode).send(err.statusMessage);
    });
});

app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
