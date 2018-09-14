var config = require("./config.js");

var branches = [];
var commits = [];
var recentCommits = [];
var todayCommits = [];
var request = require("request");
var key = config.configKey.SECRET_KEY;
var repoUrl = 'https://api.github.com/orgs/Seneca-CDOT/repos?per_page=100&access_token=' + key;
console.log(key);
var repoUrls = [];



var today = new Date();
const oneDay = 24 * 60 * 60 * 1000;
const recency = oneDay;

module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        today = new Date();
        branches = [];
        commits = [];
        recentCommits = [];
        todayCommits = [];
        repoUrls = [];
        resolve();
    });
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
                //console.log("DEBUG getRepos. reposX.length: " + reposX.length);
                for (var i = reposX.length-1; i > 1; i--){

                    if ((today - new Date(reposX[i].pushed_at)) < recency) {
                        repoUrls.push({
                            'name': reposX[i].name,
                            'url': reposX[i].url + "/branches?access_token=" + key
                        });
                        //console.log("DEBUG reposX[i].url" + reposX[i].url);
                    } else {
                        i = 0;
                    }
                    

                }
                //console.log("DEBUG getRepos");
                resolve();
              }
        });
    });
}

//-------------------------------------------------------------------------------------------

var getBranches = function(branchUrlX, repoName) {
    return new Promise ((resolve, reject) => {
        request.get({
            url: branchUrlX,
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
                        url: branches[i].commit.url + "?access_token=" + key,
                        headers: {'User-Agent': 'request'},
                    }, (err, res, data) => {
                        if (err) {
                            console.log('Error:', err);
                            reject("Unable to access repo url.");
                          } else {
                            var subbranch = JSON.parse(data);
                            subbranch.commit.branchName = branches[i].name;
                            subbranch.commit.repoName = repoName;
                                commits.push(subbranch.commit);
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

    });
}

module.exports.getCommits = function() {
    return new Promise((resolve, reject) => {
        //console.log(commits);
        for (let i in commits) {
            var tempUrl = commits[i].url + '&access_token=' + key;
            var repoName = commits[i].repoName;
            var branchName = commits[i].branchName;
            //console.log("DEBUG getCommits. tempurl1: " + tempUrl);
            tempUrl = [tempUrl.slice(0, tempUrl.lastIndexOf("git/")), tempUrl.slice(tempUrl.lastIndexOf("commits/"))].join('');
            //console.log("DEBUG getCommits. tempurl2: " + tempUrl);
            var newUrl = [tempUrl.slice(0, tempUrl.lastIndexOf("/")), "?per_page=100&sha=", tempUrl.slice(tempUrl.lastIndexOf("/") + 1)].join('');
            //console.log("DEBUG getCommits. newUrl: " + newUrl);
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
                        for (let x in temp) {
                            temp[x].commit.branchName = branchName;
                            temp[x].commit.repoName = repoName;
                            recentCommits.push(temp[x].commit);
                        }
                  }
            });
        }

        resolve(JSON.stringify(recentCommits));
 
    });
    
}

module.exports.getRecentCommits = function() {
    return new Promise((resolve,reject) => {
        //sort by date
        recentCommits.sort((a) => {
            var currentDate = new Date();
            if (new Date(a.author.date) >= new Date(currentDate.setDate(currentDate.getDate() - 1))) {
                todayCommits.push(a);
            }
        });
        todayCommits.sort((a,b) => {
            var c = new Date(a.author.date);
            var d = new Date(b.author.date);
            return d - c;
        });
        resolve(todayCommits);
    });
}

module.exports.getAllBranchUrls = function() {
    return new Promise((resolve,reject) => {
        //console.log("DEBUG getAllBranchUrls. repoUrls.length: " + repoUrls.length);
        for (var i = 0; i < repoUrls.length; i++) {
            //console.log("DEBUG getAllBranchUrls. repoUrls[i].url: " + repoUrls[i].url);
            getBranches(repoUrls[i].url, repoUrls[i].name);

        }
        resolve();
    });
}

module.exports.delay = function(t, v) {
    return new Promise((resolve) => {
        setTimeout(resolve.bind(null, v), t);
    });
}