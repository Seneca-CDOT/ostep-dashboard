import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';
import axios from 'axios';
import * as fs from 'fs';

let app = express();
const data_file = './eods.json';
const eodNames = __dirname + '/sleepyRAs.txt';
let RAs = fs.readFileSync(eodNames).toString().split("\n");
const clock_path = __dirname + '/clock.txt';
const execSync = require('child_process').execSync;
let execEODReminder = __dirname + "/remindEOD.py"
const { spawn } = require('child_process');
  
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

/** Reached by Slack API */

// Slash command for submitting EOD's
app.post('/eod', (req, res) => {
    const slack_request = req.body;

	//console.log(slack_request);
	const slack_response = {
		"response_type": "in_channel",
		"text": `:checkered_flag: EOD was submitted by *${slack_request.user_name}*`,
		"attachments": [
			{
				"text": `${slack_request.text}`
			}
		]
    };

	axios.post(slack_request.response_url, slack_response).then(() => {
		console.log("Sending a request to slack api")
		let report_data = JSON.parse(fs.readFileSync(data_file, 'utf8'));
		report_data[slack_request.user_name] = {
			'time': new Date(),
			'text': slack_request.text,
			'channel': slack_request.channel_name 
		};

		fs.writeFileSync(data_file, JSON.stringify(report_data), 'utf8');

    }).catch(error => {
        console.log("error: " + error);
	});
    
    // Remove RA's name from EOD reminder list
    readRAs();
    submitEOD(slack_request.user_name);
    writeRAs();
    printRAs();
	res.status(200).send();
});

// Slash command for checking who have yet to submit EOD's
app.post('/eod_left', (req, res) => {
    const slack_request = req.body;

    readRAs();
    let message = "";
    RAs.forEach((name) => {
        message += name + '\n';
    }); 
    console.log(message);

	const slack_response = {
		"response_type": "in_channel",
        "text": `Sleepy RAs who haven't submitted their EODs:`, //"text": `Current time is: ` + clock + `\nSleepy RAs who haven't submitted their EODs:`
        "attachments": [
			{
				"text": `${message}`
			}
		]
    };

    axios.post(slack_request.response_url, slack_response).catch(error => {
        console.log("error: " + error);
	});

    printRAs();
	res.status(200).send();
});


// Slash command for checking if remindEOD.py script is still running or not
app.post('/check_py_script', (req, res) => {
    const slack_request = req.body;

    //let stdout = checkPythonScript()
    let message = checkPythonScript();

	const slack_response = {
		"response_type": "in_channel",
        "text": `ps aux | grep remindEOD.py:`,
        "attachments": [
			{
				"text": `${message}` //py_script
			}
		]
    };

    axios.post(slack_request.response_url, slack_response).catch(error => {
        console.log("error: " + error);
	});
	res.status(200).send();
});

// Slash command for checking remindEOD.py's time
app.post('/check_eod_time', (req, res) => {
    const slack_request = req.body;

    let time = checkEODClock();

	const slack_response = {
		"response_type": "in_channel",
        "text": `EOD Reminder Bot's clock:`,
        "attachments": [
			{
				"text": `${time}`
			}
		]
    };

    axios.post(slack_request.response_url, slack_response).catch(error => {
        console.log("error: " + error);
	});
	res.status(200).send();
});

// Slash command for sending bash commands to docker, only allows Ian to use this
app.post('/bash', (req, res) => {
    const slack_request = req.body;

    let cmd_output = "";

    if (slack_request.user_name == "naiuhz"){
        //cmd_output = runBashCommand(slack_request.text);
    } else {
        cmd_output = "Error: " + slack_request.user_name + " does not have permission to use this slash command."
    }

	const slack_response = {
		"response_type": "in_channel",
        "text": `$ ` + slack_request.text + `:`,
        "attachments": [
			{
				"text": `${cmd_output}`
			}
		]
    };

    axios.post(slack_request.response_url, slack_response).catch(error => {
        console.log("error: " + error);
	});
	res.status(200).send();
});

// Update and overwrite the list of RAs who haven't submit their EODs
let writeRAs = () => {
    fs.writeFile(eodNames, "", (err) => {
        if(err) {
            return console.log(err);
        }
    });

    for (let i = 0; i < RAs.length; i++){
        if (RAs[i].length > 0)
            fs.appendFile(eodNames, RAs[i] + "\n", (err) => {
                if(err) {
                    return console.log(err);
                }
            });
    }
};

// Read the updated list of RAs
let readRAs = () => {
    RAs = fs.readFileSync(eodNames).toString().split("\n");
}

// Print the RAs who have submit their EODs yet for debugging
let printRAs = () => {
    console.log ("Remaining RAs:")
    for (let i = 0; i < (RAs.length - 1); i++){
        console.log (i + ": " + RAs[i]);
    }
}

// Remove name from EOD reminder list
let submitEOD = (RA) => {
    RAs = RAs.filter(name => name!=RA);
    console.log(RA + " has submitted EOD")
}

// Runs command to check if python script is running or not
let checkPythonScript = () => {
    let message = execSync('ps aux | grep remindEOD.py');
    return message;
}

// Reads clock.txt to return the time
let checkEODClock = () =>{
    if (fs.existsSync(clock_path)) { 
        var contents = fs.readFileSync(clock_path, 'utf8');
        return (contents);
    } else {
        return ("Error: Clock does not exist!")
    }
}

// Execute given bash command
let runBashCommand = (cmd) => {
    let message = execSync (cmd);
    return message;
}


/** Get EODs */
app.get('/eod', (req, res) => {
	const report_data = JSON.parse(fs.readFileSync(data_file, 'utf8'));
	res.status(200).json(report_data);
});

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
    readRAs();
    //printRAs();
});

export default app;

// Execute remindEOD.py script
const subprocess = spawn(execEODReminder);
// Terminates python script when server is shut down
subprocess.unref();