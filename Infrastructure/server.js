
var object= require('./workstations.json')
var servers= require('./servers.json')

//pings workstations
var ping = require('ping');
// ssh into servers using cmdline
var cmd=require('node-cmd');
var dig=require('node-dig-dns');
var http = require('http');
const express = require('express')

const app = express();

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    next();
});

app.get('/', (req, res)=> {
     
    let numPassed = 0;
     object.forEach(async (item) => {
        // console.log(item.IPAddress)
       
        new Promise(resolve => { 
    
            ping.sys.probe(item.IPAddress, function(isAlive){
                item.Status = isAlive ? 'alive' : 'dead';
                console.log(item.IPAddress+' '+item.Status);
                resolve()
            })
        }).then(() => {
            numPassed++;
            if (object.length === numPassed) {
                
                // Ping is completed
                console.log("Done fetching the data!");
                // console.log(object)
    
                numPassed = 0;
                
                servers.forEach( async (item) => {
                    // if (item.Description = '')
                    console.log("server ssh fetching")
                    new Promise(resolve =>  { cmd.get(
                        'ssh -p '+ item.Port+ ' arif@'+item.Domain + ' hostname',
                        function(err, data, stderr) {
                            if (data='bbetty'||'ccharlie'||'aarchie.cdot.systems'||'xerxes.cdot.systems'){
                                item.Status = 'alive'

                            }
                            else{
                                item.Status = 'dead'
                            }
                         
                            resolve(data);
                        }
                    );
                    }).then((data) => {
                        numPassed++;
                        if (object.length === numPassed) {
                            console.log("Finished ssh!");
                        }
                        dig(['cdot.systems', 'ns'])
                        .then((result) => {
              
                            // for (let i in result.answer) {
                            //     console.log(result.answer[i].value)
                            // }
                            console.log(result.answer)
        
                            // res.setHeader('Access-Control-Allow-Origin', '*');
                            // res.setHeader('Access-Control-Request-Method', '*');
                            // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
                            // res.setHeader('Access-Control-Allow-Headers', '*');
                            
                            // res.writeHead(200, {'Content-Type':'application/json'});
                            res.end(JSON.stringify({Workstations:object , DNS:result.answer, Servers:servers}));
        
                            numPassed = 0;
                        })
                        .catch((err) => {
                            console.log('Error:', err);
                        });
                    });
                }); 


    
           
                
            }
            
        })
       
    });
     
}).listen(3000);