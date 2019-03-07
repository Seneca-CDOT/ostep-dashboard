#!/usr/bin/env node

// Javascript version of remindEOD.py
// Sends custom EOD reminders to OSTEP RA's

const { DateTime } = require('luxon');
DateTime.local().setZone('America/Toronto');

const request = require('request');
const execSync = require('child_process').execSync;
const fs = require('fs');

const clock_path = __dirname + '/clock.txt';
const webhooks = JSON.parse(fs.readFileSync(__dirname + "/secret_webhooks.json"));
const cp_command = "cp " + __dirname + "/RAs.txt " + __dirname + "/sleepyRAs.txt"


function sendEOD (RA, message) {
    //console.log(name + ":" + webhooks[name])
    var names = fs.readFileSync(__dirname + "/sleepyRAs.txt").toString().split("\n");
    for(let name of names) {
        if (name == RA) {
            request.post(
                webhooks[RA],
                { json: { text: message } }
            );
        }
    }
}
//sendEOD ("Ian", ":robot_face:");


function resetRAList (){
    execSync(cp_command);
}
//resetRAList();

// Reminder schedule
// Josue: 4PM, 9PM
// Miguel: 9PM, 8:30AM, 4:30PM
// Daniel: 9PM
// Ian: 9PM, 4:30PM
// Pouya: 10PM
// Yan: 9:30PM, 4:55PM
// Olga: 8:30PM

function checkTime(clock) {
    if (clock.second == 0) {
        if (clock.minute == 0) {
            if (clock.hour == 10 && clock.weekday <=5) {
                resetRAList();
            } else if (clock.hour == 16 && clock.weekday <=5) {
                sendEOD("Josue", "It's 4PM Josue! Try to do your EOD before you leave today! :robot_face:");
            } else if (clock.hour == 21 && clock.weekday <=5) {
                sendEOD("Miguel", "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
                sendEOD("Josue", "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
                sendEOD("Daniel", "It's 9PM sleepy head! Please remember to do your EOD! :robot_face:");
                sendEOD("Ian", "It's 9PM sleepy head! Please remember to do your EOD! :ayaya:");
            } else if (clock.hour == 22 && (clock.weekday == 2 || clock.weekday == 3 || clock.weekday == 5)) {
                sendEOD("Pouya", "It's 10PM sleepy head! Please remember to do your EOD! :pouya:");
            } else if (clock.hour == 0) {
                sendEOD("Ian", ":clock12: Oyasuminasai niichan :ayaya:");
                sendEOD("Yan", ":clock12: Oyasuminasai Yan-niichan :ayaya:");
            }
        } else if (clock.minute == 30) {
            if (clock.hour == 9 && clock.weekday <=5) {
                sendEOD("Miguel", "It's 9:30AM Miguel! You forgot to submit yesterday's EOD! Let's submit one right now! :robot_face:");
            } else if (clock.hour == 16 && clock.weekday <=5) {
                sendEOD("Miguel", "It's 4:30PM Miguel! Try to do your EOD before you leave today! :robot_face:");
                sendEOD("Ian", "It's 4:30PM Ian! Try to do your EOD before you leave today! :ayaya:");
            } else if (clock.hour == 21 && clock.weekday <=5) {
                sendEOD("Yan", "It's 9:30PM Yan-nii! Please remember to do your EOD! :ayaya:");
            } else if (clock.hour == 21 && clock.weekday <=5) {
                sendEOD("Olga", "It's 8:30PM товарищ! Please remember to do your EOD! :olga:");
            }
        } else if (clock.minute == 55) {
            if (clock.hour == 16 && clock.weekday <= 5) {
                sendEOD("Yan", "It's 4:55PM Yan-nii! Try to do your EOD before you leave today! :ayaya:");
            }
        }
    }
}

function writeTime(clock) {
    var time = "[EOD Reminder Bot Running] 24 Hour Clock: ";
    if (clock.hour < 10){
        time += '0' + clock.hour;
    }
    else {
        time += clock.hour;
    }
    time += ':';
    if (clock.minute < 10){
        time += '0' + clock.minute;
    }
    else {
        time += clock.minute;
    }
    time += ':';
    if (clock.second < 10){
        time += '0' + clock.second;
    }
    else {
        time += clock.second;
    }
    time += '|' + clock.weekday
    fs.writeFileSync(clock_path, time, 'utf8');
}

function tickTock() {
    var clock = DateTime.local();
    writeTime(clock);
    checkTime(clock);
    //console.clear();
    //console.log(time);
    setTimeout(tickTock, 1000);
}

tickTock();
