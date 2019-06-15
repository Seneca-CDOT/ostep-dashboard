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
  obelavina: 'D5B49TX6D',
  rkiguru: 'UJJ026KRC',
  'stuart.crust': 'UJFPKA3A4',
  vklymenko: 'UJHG7GYHM'
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


sendEOD ("naiuhz", "OSTEPPY Rebooted! :robot_face:");

// Exported function used in slash command
module.exports.sendDM = (RA, message) => {
  web.chat.postMessage({ channel: channelIDs[RA], text: message });
};

// Resets RA list in the morning of a weekday
const resetRAList = () => {
  execSync(cpCommand);
};


// Reminder schedule
// Josue: 4PM, 9PM
// Miguel: 9PM, 8:30AM, 4:30PM
// Ian: 9PM, 4:30PM
// Pouya: 10PM
// Olga: 8:30PM
// Stuart: 9PM
// Raymond: 9AM

// Checks the time to send custom EOD reminders
const checkTime = (clock) => {
  if (clock.second === 0) {
    if (clock.minute === 0) {
      if (clock.hour === 10 && clock.weekday <= 5) {
        resetRAList();
      } else if (clock.hour === 9 && clock.weekday <= 5) {
        sendEOD('rkiguru', "Oi, it's 9:30AM baka-aniki! You forgot to submit yesterday's EOD! Go submit one right now! :pout:");
      } else if (clock.hour === 16 && clock.weekday <= 5) {
        sendEOD('josue.quilon-barrios', "It's 4PM Josue! Try to do your EOD before you leave today! :robot_face:");
      } else if (clock.hour === 21 && clock.weekday <= 5) {
        sendEOD('mroncancio19', "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
        sendEOD('josue.quilon-barrios', "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
        sendEOD('naiuhz', "It's 9PM sleepy head! Please remember to do your EOD! :ayaya:");
        sendEOD('stuart.crust', "Tis 9pm sleepy heid! Please min' tae dae yer EOD! :wee_lass:");
        if (clock.weekday === 1 || clock.weekday === 5) {
          sendEOD('vklymenko', "It's 9PM товариш! Please remember to do your EOD! :natalia_chan:");
        }
      } else if (clock.hour === 22 && clock.weekday <= 5) {
        sendEOD('poftadeh2', "It's 10PM BAKA! Please remember to do your EOD! :okotta_emi:");
      } else if (clock.hour === 0) {
        web.chat.postMessage({ channel: channelIDs['naiuhz'], text: ':clock12: Oyasuminasai niichan :ayaya:' });
        web.chat.postMessage({ channel: channelIDs['rkiguru'], text: ':clock12: Oyasumi b-baka-aniki :pout:' });
      }
    } else if (clock.minute === 30) {
      if (clock.hour === 9 && clock.weekday <= 5) {
        sendEOD('mroncancio19', "It's 9:30AM Miguel! You forgot to submit yesterday's EOD! Let's submit one right now! :robot_face:");
      } else if (clock.hour === 16 && clock.weekday <= 5) {
        sendEOD('mroncancio19', "It's 4:30PM Miguel! Try to do your EOD before you leave today! :robot_face:");
        sendEOD('naiuhz', "It's 4:30PM Ian! Try to do your EOD before you leave today! :ayaya:");
      } else if (clock.hour === 20 && clock.weekday <= 5) {
        sendEOD('obelavina', "It's 8:30PM товарищ! Please remember to do your EOD! :olga:");
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
  setTimeout(tickTock, 1000);
}

tickTock();
