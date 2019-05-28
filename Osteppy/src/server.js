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
import * as fs from 'fs';
import config from './config.json';

const dataFile = path.join(__dirname, 'eods.json');
const eodNames = path.join(__dirname, 'sleepyRAs.txt');
const clockPath = path.join(__dirname, 'clock.txt');

let RAs = fs.readFileSync(eodNames).toString().split('\n');

// Update and overwrite the list of RAs who haven't submit their EODs
function writeRAs() {
  fs.writeFileSync(eodNames, '', 'utf8');

  for (let i = 0; i < RAs.length; i += 1) {
    if (RAs[i].length > 0) {
      fs.appendFile(eodNames, `${RAs[i]}\n`)
        .catch(err => console.log(err));
    }
  }
}

// Read the updated list of RAs
function readRAs() {
  RAs = fs.readFileSync(eodNames).toString().split('\n');
}

// Print the RAs who have submit their EODs yet for debugging
function printRAs() {
  console.log('Remaining RAs:');
  for (let i = 0; i < (RAs.length - 1); i += 1) {
    console.log(`${i}: ${RAs[i]}`);
  }
}

// Remove name from EOD reminder list
function submitEOD(RA) {
  RAs = RAs.filter(name => name !== RA);
  console.log(`${RA} has submitted EOD`);
}

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
    .then(() => {
      const reportData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      reportData[slackRequest.user_name] = {
        time: new Date(),
        text: slackRequest.text,
        channel: slackRequest.channel_name,
      };

      fs.writeFileSync(dataFile, JSON.stringify(reportData), 'utf8');
    }).catch((error) => {
      console.log(`error: ${error}`);
    });

  // Remove RA's name from EOD reminder list
  readRAs();
  submitEOD(slackRequest.user_name);
  writeRAs();
  printRAs();
  res.status(200).send();
});

// Slash command for checking who have yet to submit EOD's
app.post('/eod_left', (req, res) => {
  const slackRequest = req.body;

  readRAs();
  let message = '';
  RAs.forEach((name) => {
    message += `${name}\n`;
  });

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

  printRAs();
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
  const reportData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  res.status(200).json(reportData);
});

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
  readRAs();
});

export default app;
