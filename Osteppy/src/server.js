#!/usr/bin/env node

/** ********************************************************
// OSTEP Dashboard Osteppy API
// server.cpp
// Date Created: 2018/09/11
// Author: Olga Belavina and Yiran Zhu
// Email: yzhu132@myseneca.ca
// Description: Slack API triggered by and responds to
// slash commands such as /eod and /eod_left.
********************************************************* */

import cp from 'child_process';
import http from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from 'fs';

import EODList from './EODList';

import config from './config.json';

const clockPath = path.join(__dirname, 'clock.txt');

const EOD = new EODList();

// Checks if EOD reminder JavaScript is running or not
function checkJSScript() {
  const message = cp.execSync('ps aux | grep EODreminder.js');
  return message;
}

// Reads clock.txt to return the time
function checkEODClock() {
  if (fs.existsSync(clockPath)) {
    const contents = fs.readFileSync(clockPath, 'utf8');
    return (contents);
  }
  return ('Error: Clock does not exist!');
}

cp.fork(`${__dirname}/EODreminder.js`);

const app = express();

app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));

/** Reached by Slack API */

// Slash command for submitting EOD's
app.post('/eod', (req, res) => {
  const slackRequest = req.body;

  const slackResponse = {
    response_type: 'in_channel',
    text: `:checkered_flag: EOD was submitted by *${slackRequest.user_name}*`,
    attachments: [
      {
        text: `${slackRequest.text}`,
      },
    ],
  };

  axios
    .post(slackRequest.response_url, slackResponse)
    .then(() => EOD.submit(slackRequest.user_name, {
      time: new Date(),
      text: slackRequest.text,
      channel: slackRequest.channel_name,
    })).catch((error) => {
      console.log(`error: ${error}`);
    });

  res.status(200).send();
});

// Slash command for checking who have yet to submit EOD's
app.post('/eod_left', (req, res) => {
  const slackRequest = req.body;

  const message = EOD.missing().join('\n');

  const slackResponse = {
    response_type: 'in_channel',
    text: 'Sleepy RAs who haven\'t submitted their EODs:',
    attachments: [
      {
        text: `${message}`,
      },
    ],
  };

  axios
    .post(slackRequest.response_url, slackResponse)
    .catch((error) => {
      console.log(`error: ${error}`);
    });

  res.status(200).send();
});

// Slash command for checking if remindEOD.js script is still running or not
app.post('/check_js_script', (req, res) => {
  const slackRequest = req.body;
  const message = checkJSScript();

  const slackResponse = {
    response_type: 'in_channel',
    text: 'ps aux | grep EODreminder.js:',
    attachments: [
      {
        text: `${message}`, // py_script
      },
    ],
  };

  axios
    .post(slackRequest.response_url, slackResponse)
    .catch((error) => {
      console.log(`error: ${error}`);
    });

  res.status(200).send();
});

// Slash command for checking remindEOD.py's time
app.post('/check_eod_time', (req, res) => {
  const slackRequest = req.body;

  const time = checkEODClock();

  const slackResponse = {
    response_type: 'in_channel',
    text: 'EOD Reminder Bot\'s clock:',
    attachments: [
      {
        text: `${time}`,
      },
    ],
  };

  axios
    .post(slackRequest.response_url, slackResponse)
    .catch((error) => {
      console.log(`error: ${error}`);
    });

  res.status(200).send();
});

/** Get EODs */
app.get('/eod', (req, res) => {
  res.json(EOD.report());
});

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
  EOD.load().catch(console.log);
});

export default app;
