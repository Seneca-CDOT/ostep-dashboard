var fs = require('fs');

const clock_path = __dirname + '/clock.txt';

let checkEODClock = () =>{
    if (fs.existsSync(clock_path)) { 
        var contents = fs.readFileSync(clock_path, 'utf8');
        return (contents);
    } else {
        return ("Error: Clock does not exist!")
    }
}

console.log(checkEODClock());