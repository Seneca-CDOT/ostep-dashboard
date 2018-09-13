var branches = [];
var commits = [];
var recentCommits = [];
var commitCompare = [];
var request = require("request");
var fs = require('fs');
var branchJSON = fs.readFileSync('branches.json', 'utf8');
//var token = process.env.GIT_TOKEN; 
//var token = "a3450eee9c0b49dc2fb5c62bb81a8ee2ae267e00";
//var branchUrl = 'https://api.github.com/repos/Seneca-CDOT/ostep-dashboard/branches?access_token=' + token; 
//var repoUrl = 'https://api.github.com/orgs/Seneca-CDOT/repos?per_page=100?access_token=' + token;
var repoUrl = 'https://api.github.com/orgs/Seneca-CDOT/repos?per_page=100&access_token=a3450eee9c0b49dc2fb5c62bb81a8ee2ae267e00';
//https://api.github.com/repos/Seneca-CDOT/ostep-dashboard/branches?access_token=a3450eee9c0b49dc2fb5c62bb81a8ee2ae267e00
var repoUrls = [];
var repos = [];
var filteredCommits = [];


var today = new Date();
const oneDay = 24 * 60 * 60 * 1000;
const recency = oneDay;
const recentDate = new Date(today - recency);
const oldDate = new Date(recentDate - oneDay);
const testDate = new Date(today - 2 * 60 * 60 * 1000)

function isJSON (data) {
    var ret = true;
    try {
       JSON.parse(data);
    }catch(e) {
       ret = false;
    }
    return ret;
 }

module.exports.getRepos = function() {
    return new Promise ((resolve, reject) => {
        request.get({
            url: repoUrl,
            headers: {'User-Agent': 'request'},
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject("Unable to get repos.");
              } else {
                var reposX = JSON.parse(data);
                console.log("DEBUG getRepos. reposX.length: " + reposX.length);
                for (var i = reposX.length-1; i > 1; i--){

                    if ((today - new Date(reposX[i].pushed_at)) < recency) {
                        repoUrls.push({
                            'name': reposX[i].name,
                            'url': reposX[i].url + "/branches?access_token=53f81e297545fe3803b07413bbdf4a744cc419ef" 
                        });
                        console.log("DEBUG reposX[i].url" + reposX[i].url);
                    } else {
                        i = 0;
                    }
                    

                }
                console.log("DEBUG getRepos");
                resolve();
              }
        });
    });
}

//-------------------------------------------------------------------------------------------

var getBranches = function(branchUrlX, repoName) {
    return new Promise ((resolve, reject) => {
        request.get({
            url: branchUrlX,// + '?access_token=53f81e297545fe3803b07413bbdf4a744cc419ef',// + token,
            headers: {'User-Agent': 'request'},
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject("Unable to access branches.");
              } else {
                var branches = JSON.parse(data);
                //console.log("DEBUG getBranches. branches:" + JSON.stringify(branches));

                for (var i in branches){
                    request.get({
                        url: branches[i].commit.url + "?access_token=53f81e297545fe3803b07413bbdf4a744cc419ef",
                        headers: {'User-Agent': 'request'},
                    }, (err, res, data) => {
                        if (err) {
                            console.log('Error:', err);
                            reject("Unable to access repo url.");
                          } else {
                            var subbranch = JSON.parse(data);
                            subbranch.commit.branchName = branches[i].name;
                            subbranch.commit.repoName = repoName;
                            //Checks if the commit is today.
                            //if (new Date(subbranch.commit.author.date).setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
                                commits.push(subbranch.commit);
                            //}
                          }
                    });
                }
                resolve();
              }
        });
    });
} 

//For debugging.
module.exports.debugBranch = function() {
    return new Promise((resolve, reject) => {
        request.get({
            url: branches[i].commit.url,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject(err);
              } else {
                  var temp = [];
                temp = JSON.parse(data);
                //console.log("DEBUG debugBranch. temp: " + temp);
                    for (let x in temp) {
                        commits.push(temp[x].commit);
                    }
              }
        });
        //resolve(JSON.stringify(commits));
    });
}

//https://api.github.com/repos/Seneca-CDOT/ostep-dashboard/git/commits/9e560054541916ae307761c446a39e68a5e04442
//https://api.github.com/repos/Seneca-CDOT/ostep-dashboard/git/commits/?per_page=100&sha=9e560054541916ae307761c446a39e68a5e04442
//https://api.github.com/repos/Seneca-CDOT/ostep-dashboard/commits?per_page=100&sha=1deb1369b1a97db887cbcd2dc923c70f6ddcfb97
module.exports.getCommits = function() {
    return new Promise((resolve, reject) => {
        //console.log(commits);
        for (let i in commits) {
            var tempUrl = commits[i].url + '&access_token=a3450eee9c0b49dc2fb5c62bb81a8ee2ae267e00';// + token;
            var repoName = commits[i].repoName;
            var branchName = commits[i].branchName;
            //console.log("DEBUG getCommits. tempurl1: " + tempUrl);
            tempUrl = [tempUrl.slice(0, tempUrl.lastIndexOf("git/")), tempUrl.slice(tempUrl.lastIndexOf("commits/"))].join('');
            //console.log("DEBUG getCommits. tempurl2: " + tempUrl);
            var newUrl = [tempUrl.slice(0, tempUrl.lastIndexOf("/")), "?per_page=100&sha=", tempUrl.slice(tempUrl.lastIndexOf("/") + 1)].join('');
            console.log("DEBUG getCommits. newUrl: " + newUrl);
            request.get({
                url: newUrl,
                headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
                if (err) {
                    console.log('Error:', err);
                    reject(err);
                  } else {
                      var temp = [];
                    temp = JSON.parse(data);
                    //console.log("DEBUG getCommits. temp: " + JSON.stringify(temp));
                        for (let x in temp) {
                            temp[x].commit.branchName = branchName;
                            temp[x].commit.repoName = repoName;
                            recentCommits.push(temp[x].commit);
                        }
                  }
            });
        }
        //if (recentCommits.length > 0) {
        console.log("getCommits[0]:" + recentCommits[0]);
        resolve(JSON.stringify(recentCommits));
        //} else {
            //reject("Unable to get data.");
        //}
    });
    
}

module.exports.getRecentCommits = function() {
    return new Promise((resolve,reject) => {
        resolve(recentCommits);
    });
}

module.exports.getAllBranchUrls = function() {
    return new Promise((resolve,reject) => {
        console.log("DEBUG getAllBranchUrls. repoUrls.length: " + repoUrls.length);
        for (var i = 0; i < repoUrls.length; i++) {
            console.log("DEBUG getAllBranchUrls. repoUrls[i].url: " + repoUrls[i].url);
            getBranches(repoUrls[i].url, repoUrls[i].name);

        }
        resolve();
    });
}

module.exports.getAllCommits = function() {
    return new Promise((resolve, reject) => {
        var checkedRepo = "";
        //Ian this does not work. Apparently this is most efficient way to compare each element with each other. 
        for (var i = 0; i < commits.length; i++) {
            for (var j = i + 1; j < commits.length; j++) {
            }
        }
        //console.log("Debug getAllCommits. commits: " + commits);
        resolve();
    });
}

module.exports.delay = function(t, v) {
    return new Promise((resolve) => {
        setTimeout(resolve.bind(null, v), t);
    });
}