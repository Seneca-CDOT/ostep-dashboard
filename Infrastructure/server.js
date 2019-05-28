
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

const PORT = 2005;

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    next();
});

app.get('/', (req, res)=> {
     
    let numPassed = 0;
     object.forEach(async (item) => {
        new Promise(resolve => { 
    
            ping.sys.probe(item.IPAddress, function(isAlive){
                item.Status = isAlive ? 'up' : 'down';
                resolve()
            })
        }).then(() => {
            numPassed++;
            if (object.length === numPassed) {
                
                // Ping is completed

                numPassed = 0;
                
                servers.forEach( async (item) => {
                    // if (item.Description = '')
                    console.log("server ssh fetching")
                    new Promise(resolve =>  { cmd.get(
                        'ssh -o "StrictHostKeyChecking no" -i id_rsa -p '+ item.Port+ ' arif@'+item.Domain + ' hostname',
                        function(err, data, stderr) {
                            if (data='bbetty'||'ccharlie'||'aarchie.cdot.systems'||'xerxes.cdot.systems'){
                                item.Status = 'up'

                            }
                            else{
                                item.Status = 'down'
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
     
});

app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`);
});
