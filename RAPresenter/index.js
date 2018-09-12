var express = require('express');
var app = express();
var scraper = require('table-scraper');

//creates object for sending the rows
var newObj = {"rows":[]};

app.get('/', (req, res)=>{
    //scrapes table data from wiki.cdot website
    scraper
    .get('https://wiki.cdot.senecacollege.ca/wiki/CDOT_Fall_2018_Weekly_Presentation_Schedule#Presentation_Dates')
    .then(function(tableData){
        //turns tableData array into object
        for (let i = 0; i < tableData[0].length; i++){
            newObj.rows.push(tableData[0][i]); 
        }       
        res.send(newObj);
        console.log(newObj);  
    })
});

app.listen(8083, ()=>{
    console.log("app listening on port 8080")
})


