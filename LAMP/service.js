
let status = "";
var afterLoad = require("after-load");
var state = {
    status: "",
    onCampus: true
};

module.exports.getStatus = function() {
    return new Promise((resolve, reject) => {
        afterLoad('http://oncampus.chris.tylers.info/', function(html, $) {
            status = `${$('h1').text()}`;
            state.status = status;
            if (status.search("off") >= 0) {
                state.onCampus = false;
            } else {
                state.onCampus = true;
            }
            resolve(state);
        });
    });
    
}

module.exports.getData = function() {
    return new Promise((resolve, reject) => {
        if (state.status != "") {resolve(state)} else {
            reject("Failed.");
        };
    });
}