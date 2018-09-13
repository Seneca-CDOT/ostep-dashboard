var object = [
    {Description:'Workstation', Serial:'1000', Location:'1045B-SW', Jack:'1726', MAC:'00:14:D1:17:5E:06', IPAddress:'206.47.241.3 ', Employee:'Thomas Luu', Team:'TNE', Status:'unknown'},
    {Description:'Workstation', Serial:'1001', Location:'1045B-SE', Jack:'1728', MAC:'D4:3D:7E:02:67:48', IPAddress:'206.47.241.4', Employee:'Joshua Mavers', Team:'TNE', Status:'unknown'},
    {Description:'Workstation', Serial:'1002', Location:'1045B-NE', Jack:'1730', MAC:'D4:3D:7E:37:04:CF', IPAddress:'206.47.241.5', Employee:'Jerry Shueh', Team:'TNE', Status:'unknown'},
    {Description:'Workstation', Serial:'1003', Location:'1045B-NW', Jack:'1732', MAC:'D8:CB:8A:57:11:FA', IPAddress:'206.47.241.6', Employee:'Oleksandr Kirsey', Team:'TNE', Status:'unknown'},
    {Description:'Workstation', Serial:'1004', Location:'1045C-SW', Jack:'1740', MAC:'10:FE:ED:02:3C:87', IPAddress:'206.47.241.9', Employee:'Matt Marangoni', Team:'OSTEP', Status:'unknown'},
    {Description:'Workstation', Serial:'1005', Location:'1045C-SE', Jack:'1741', MAC:'E0:69:95:D1:99:38', IPAddress:'206.47.241.10', Employee:'Olga Belavina', Team:'OSTEP', Status:'unknown'},
    {Description:'Workstation', Serial:'1006', Location:'1045C-NE', Jack:'1744', MAC:'E0:69:95:62:CE:A7', IPAddress:'206.47.241.11', Employee:'Pouya Oftadeh', Team:'OSTEP', Status:'unknown'},
    {Description:'Workstation', Serial:'1007', Location:'1045C-NW', Jack:'1746', MAC:'D4:3D:7E:2A:00:B7', IPAddress:'206.47.241.12 ', Employee:'Lucas Blotta', Team:'OSTEP', Status:'unknown'},
    {Description:'Workstation', Serial:'1008', Location:'T1036', Jack:'1748', MAC:'00:1C:C0:B1:C7:25', IPAddress:'206.47.241.13', Employee:'Chris Tyler', Team:'OSTEP', Status:'unknown'},
    {Description:'Workstation', Serial:'1009', Location:'1045D-SE', Jack:'1754', MAC:'64:51:06:57:28:5A', IPAddress:'206.47.241.14', Status:'unknown'},
    {Description:'Workstation', Serial:'1010', Location:'1045D-NE', Jack:'1756', MAC:'70:71:BC:E3:E4:07', IPAddress:'206.47.241.15', Employee:'Chris Johnson', Team:'OSTEP', Status:'unknown'},
    {Description:'Workstation', Serial:'1011', Location:'1045D-NW', Jack:'1759', MAC:'D4:3D:7E:37:05:69', IPAddress:'206.47.241.16', Employee:'Kert Browne', Team:'BigBlueButton', Status:'unknown'},
    {Description:'Workstation', Serial:'1012', Location:'1045E-SW', Jack:'1763', MAC:'D4:3D:7E:19:53:E4', IPAddress:'206.47.241.17', Employee:'Oleksandr Zhurbenko', Team:'BigBlueButton', Status:'unknown'},
    {Description:'Workstation', Serial:'1013', Location:'1045E-SE', Jack:'1766', MAC:'70:71:BC:E3:E5:4A', IPAddress:'206.47.241.18', Status:'unknown'},
    {Description:'Workstation', Serial:'1014', Location:'1045E-NE', Jack:'1767', MAC:'E0:69:95:D1:B7:30', IPAddress:'206.47.241.19', Employee:'Chad Pilkey', Team:'BigBlueButton', Status:'unknown'},
    {Description:'Workstation', Serial:'1015', Location:'1045E-NW', Jack:'1769', MAC:'28:D2:44:49:78:E8', IPAddress:'206.47.241.20', Team:'', Status:'unknown'},
]

var servers = [
    {Description:'Server', Name:'aarchie', Domain:'ehl.cdot.systems', Port:'2200', Status:'unknown'},
    {Description:'Server', Name:'bbetty', Domain:'ehl.cdot.systems', Port:'2202', Status:'unknown'},
    {Description:'Server', Name:'ccharlie', Domain:'ehl.cdot.systems', Port:'2205', Status:'unknown'},
    {Description:'Server', Name:'xerxes', Domain:'xerxes.cdot.systems', Port:'22', Status:'unknown'},
]

//pings workstations
var ping = require('ping');
// ssh into servers using cmdline
var cmd=require('node-cmd');
var dig=require('node-dig-dns');
var http = require('http');


http.createServer(function(req,res) {
     
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
                
                dig(['cdot.systems', 'ns'])
                .then((result) => {
      
                    // for (let i in result.answer) {
                    //     console.log(result.answer[i].value)
                    // }
                    console.log(result.answer)

                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Request-Method', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
                    res.setHeader('Access-Control-Allow-Headers', '*');
                    
                    res.writeHead(200, {'Content-Type':'application/json'});
                    res.end(JSON.stringify({Workstations:object , Servers:result.answer}));

                    numPassed = 0;
                })
                .catch((err) => {
                    console.log('Error:', err);
                });
    
                // servers.forEach( async (item) => {
                //     // if (item.Description = '')
                //     console.log("server ssh fetching")
                //     new Promise(resolve =>  { cmd.get(
                //         'ssh -p '+ item.Port+ ' ' + item.Domain + ' hostname',
                //         function(err, data, stderr) {
                //             resolve(data);
                //             // console.log(data)
                //         }
                //     );
                //     }).then((data) => {
                //         numPassed++;
                //         if (object.length === numPassed) {
                //             console.log("Finished ssh!");
                //         }
                //     });
                // });            
                
            }
        })
       
    });
     
 }).listen(3200);








