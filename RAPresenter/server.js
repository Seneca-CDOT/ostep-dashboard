var express = require('express');
var app = express();
var scraper = require('table-scraper');

const PORT = 80;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
  });

//creates object for sending the rows


app.get('/', (req, res)=>{
    //scrapes table data from wiki.cdot website
    var newObj = {"rows":[]};
    scraper
    .get('https://wiki.cdot.senecacollege.ca/wiki/CDOT_Summer_2019_Weekly_Presentation_Schedule')
    .then(function(tableData){
        //turns tableData array into object
        for (let i = 0; i < tableData[0].length; i++){
            newObj.rows.push(tableData[0][i]); 
        }       
        res.send(newObj);
    });
});

app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`);
});
