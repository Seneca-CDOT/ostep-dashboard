#!/usr/bin/env node

/** ****************************************************
 * OSTEP Dashboard Osteppy API
 * EODreminder.cpp
 * Date Created: 2019/03/07
 * Author: Yiran Zhu
 * Email: yzhu132@myseneca.ca
 * Description: Slack API sends custom EOD reminders to
 * OSTEP Research Assistants
 **************************************************** */

// Javascript version of remindEOD.py

const { DateTime } = require('luxon');

DateTime.local().setZone('America/Toronto');

const { execSync } = require('child_process');
const fs = require('fs');
const { WebClient } = require('@slack/client');

const clockPath = `${__dirname}/clock.txt`;
const channelIDs = {
  naiuhz: 'UCQFB9TEX',
  'josue.quilon-barrios': 'UF88F1XNG',
  mroncancio19: 'UF90J8E6Q',
  poftadeh2: 'U8WLH35U2',
  ylei11: 'UF8DGNTSP',
  obelavina: 'D5B49TX6D',
  dray1: 'UGNN3DF2P',
};
const cpCommand = `cp ${__dirname}/RAs.txt ${__dirname}/sleepyRAs.txt`;
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

// Sends EOD message to RA if they haven't already submitted their EOD that work day
const sendEOD = (RA, message) => {
  const names = fs.readFileSync(`${__dirname}/sleepyRAs.txt`).toString().split('\n');
  names.forEach((name) => {
    if (name === RA) {
      web.chat.postMessage({ channel: channelIDs[RA], text: message });
    }
  });
};
// sendEOD ("josue.quilon-barrios", "Test message. :robot_face:");

// Exported function used in slash command
module.exports.sendDM = (RA, message) => {
  web.chat.postMessage({ channel: channelIDs[RA], text: message });
};

// Resets RA list in the morning of a weekday
const resetRAList = () => {
  execSync(cpCommand);
};
// resetRAList();

// Reminder schedule
// Josue: 4PM, 9PM
// Miguel: 9PM, 8:30AM, 4:30PM
// Daniel: 9PM
// Ian: 9PM, 4:30PM
// Pouya: 10PM
// Yan: 9:30PM, 4:55PM
// Olga: 8:30PM

// Checks the time to send custom EOD reminders
const checkTime = (clock) => {
  if (clock.second === 0) {
    if (clock.minute === 0) {
      if (clock.hour === 10 && clock.weekday <= 5) {
        resetRAList();
      } else if (clock.hour === 16 && clock.weekday <= 5) {
        sendEOD('josue.quilon-barrios', "It's 4PM Josue! Try to do your EOD before you leave today! :robot_face:");
      } else if (clock.hour === 21 && clock.weekday <= 5) {
        sendEOD('mroncancio19', "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
        sendEOD('josue.quilon-barrios', "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
        sendEOD('dray1', "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
        sendEOD('naiuhz', "It's 9PM sleepy head! Please remember to do your EOD! :ayaya:");
      } else if (clock.hour === 22 && (clock.weekday === 2 || clock.weekday === 3
        || clock.weekday === 5)) {
        sendEOD('poftadeh2', "It's 10PM sleepy head! Please remember to do your EOD! :pouya:");
      } else if (clock.hour === 0) {
        sendEOD('naiuhz', ':clock12: Oyasuminasai niichan :ayaya:');
        sendEOD('ylei11', ':clock12: Oyasuminasai Yan-niichan :ayaya:');
      }
    } else if (clock.minute === 30) {
      if (clock.hour === 9 && clock.weekday <= 5) {
        sendEOD('mroncancio19', "It's 9:30AM Miguel! You forgot to submit yesterday's EOD! Let's submit one right now! :robot_face:");
      } else if (clock.hour === 16 && clock.weekday <= 5) {
        sendEOD('mroncancio19', "It's 4:30PM Miguel! Try to do your EOD before you leave today! :robot_face:");
        sendEOD('naiuhz', "It's 4:30PM Ian! Try to do your EOD before you leave today! :ayaya:");
      } else if (clock.hour === 21 && clock.weekday <= 5) {
        sendEOD('ylei11', "It's 9:30PM Yan-nii! Please remember to do your EOD! :ayaya:");
      } else if (clock.hour === 21 && clock.weekday <= 5) {
        sendEOD('obelavina', "It's 8:30PM товарищ! Please remember to do your EOD! :olga:");
      }
    } else if (clock.minute === 55) {
      if (clock.hour === 16 && clock.weekday <= 5) {
        sendEOD('ylei11', "It's 4:55PM Yan-nii! Try to do your EOD before you leave today! :ayaya:");
      }
    }
  }
};

// Writes the formatted time into a text file
const writeTime = (clock) => {
  let time = '[EOD Reminder Bot Running] 24 Hour Clock: ';
  if (clock.hour < 10) {
    time += `0${clock.hour}`;
  } else {
    time += clock.hour;
  }
  time += ':';
  if (clock.minute < 10) {
    time += `0${clock.minute}`;
  } else {
    time += clock.minute;
  }
  time += ':';
  if (clock.second < 10) {
    time += `0${clock.second}`;
  } else {
    time += clock.second;
  }
  time += `|${clock.weekday}`;
  fs.writeFileSync(clockPath, time, 'utf8');
};

// Ticks each second, checks if appropriate time to send EOD and writes the time to text file
function tickTock() {
  const clock = DateTime.local();
  writeTime(clock);
  checkTime(clock);
  // console.clear();
  // console.log(time);
  setTimeout(tickTock, 1000);
}

tickTock();
