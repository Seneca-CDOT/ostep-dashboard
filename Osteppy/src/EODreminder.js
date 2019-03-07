#!/usr/bin/env node


// Javascript version of remindEOD.py

var { DateTime } = require('luxon');
DateTime.local().setZone('America/Toronto');
const fs = require('fs');
const clock_path = __dirname + '/clock.txt';

function returnClock() {
    var clock = DateTime.local();
    //console.log (clock.second);
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
    console.clear();
    console.log(time);
    setTimeout(returnClock, 1000);
}

returnClock();

// Reminder schedule
// josue.quilon-barrios: 4PM, 9PM
// mroncancio19: 9PM, 8:30AM, 4:30PM
// dray1: 9PM
// naiuhz: 9PM, 4:30PM
// poftadeh2: 10PM
// ylei11: 9:30PM, 4:55PM
// obelavina: 8:30PM

