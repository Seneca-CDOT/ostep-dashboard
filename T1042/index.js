const express = require("express");
const app = express();
const tabletojson = require("tabletojson");

const PORT = 8080;
let bookings;

tabletojson.convertUrl(
  'https://wiki.cdot.senecacollege.ca/wiki/Meeting_Room_T1042',
  function(tableAsJson) {
    bookings = tableAsJson[0];
  }
);

app.get("/", (req, res) => {
  let today = new Date();
  bookings = bookings.filter(row => {
    let splitDateTime = row["Date and time"].split(' ');
    let date = splitDateTime[0];
    let time = splitDateTime[1];
    date = date.split("-");
    time = time.split("-");
    let startTime = time[0];
    let endTime = time[1];
    let year = Number(date[0]);
    // offset month by 1 because Date object in Javascript is from 0-11
    let month = Number(date[1]) - 1;
    let day = Number(date[2]);
    let bookingDate = new Date(year, month, day);
    console.log("JSON Value: " + JSON.stringify(bookingDate));
    console.log("Booking: " + row["Date and time"] + " | " + row["Purpose"] + " | " + row["Contact person"]);
    console.log("Today's Date:    " + today.getDate() + "   Booking's Date:    " + bookingDate.getDate());
    console.log("Today's Month:   " + today.getMonth() + "    Booking's Month:   " + bookingDate.getMonth());
    console.log("----------------------------------------");
    
    return today.getDate() == bookingDate.getDate() && today.getMonth() == bookingDate.getMonth() && today.getFullYear() == bookingDate.getFullYear();
  });

  let filteredTable = {rows: bookings};
  res.json(filteredTable);
});

app.listen(PORT);
console.log(`Running on localhost:${PORT}`);