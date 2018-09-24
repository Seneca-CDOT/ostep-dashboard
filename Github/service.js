/***********************************************************
// OSTEP Dashboard Github API
// service.cpp
// Date: 2018/09/22
// Author: Yiran Zhu And Lewis Kim
// Email: yzhu132@myseneca.ca
// Description: Github API that gets all the sorted recent 
// commits from an organization/user
***********************************************************/


var request = require("request");
var key = process.env.GITHUB_TOKEN;
var repoUrl = 'https://api.github.com/orgs/Seneca-CDOT/repos?per_page=100&access_token=' + key;
console.log(key);
var repoUrls = [];         // Attributes: 'name', 'url'
var branchURLs = [];       // Attributes: 'branchName', 'branchCommitsUrl', 'repoName'
var recentCommits = []; // Attributes: 'branchName', 'repoName', 'commit'
var fs = require('fs');

var today = new Date();
const oneDay = 24 * 60 * 60 * 1000;
var recency = oneDay;

module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        fs.appendFileSync('output.txt', "INITIALIZE \n");
        today = new Date();
        repoUrls = [];
        branchURLs = [];
        recentCommits = [];
        resolve();
    });
}

//1. getRepos
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
                for (var i = reposX.length-1; i > 1; i--){
                    if (new Date(today - new Date(reposX[i].pushed_at)) < new Date(recency)) {
                        repoUrls.push({
                            'name': reposX[i].name,
                            'url': reposX[i].url + "/branches?access_token=" + key
                        });
                        fs.appendFileSync('output.txt', "repo name [" + i + "]: " + reposX[i].name + '\n');
                    }
                }
                fs.appendFileSync('outputArrays.txt', "REPO URLs:\n");
                for (var i = 0; i < repoUrls.length; i++) {
                    fs.appendFileSync('outputArrays.txt', repoUrls[i].name + ": " + repoUrls[i].url + "\n");
                } 
                resolve();
              }
        });
    });
}

//2. getAllBranchUrls
module.exports.getAllBranchUrls = function() {
    return new Promise((resolve,reject) => {
        for (var i = 0; i < repoUrls.length; i++) {
            getBranches(repoUrls[i].url, repoUrls[i].name);
        }
        resolve();
    });
}

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
                var branch = JSON.parse(data);
                fs.appendFileSync('output.txt', "DEBUG getBranches branchUrlX: " + branchUrlX + '\n');
                fs.appendFileSync('output.txt', "DEBUG getBranches. branch.length: " + branch.length + '\n');
                fs.appendFileSync('output.txt', "DEBUG getBranches repoName: " + repoName + '\n');               
                for (var j = 0; j < branch.length; j ++){
                    fs.appendFileSync('output.txt', "DEBUG getBranches branch[" + j + "] name: " + JSON.stringify(branch[j].name) + '\n');
                    fs.appendFileSync('output.txt', "DEBUG getBranches branch[" + j + "] commit url: " + JSON.stringify(branch[j].commit.url) + '\n');
                    checkBranch(branch[j].commit.url, branch[j].name, branchURLs, repoName);
                }
                fs.appendFileSync('output.txt', '\n');
                resolve();
              }
        });
    });
} 


var checkBranch = function(branchCommitsUrl, branchName, branchURLs, repoName) {
    return new Promise ((resolve, reject) => {
        request.get({
            url: branchCommitsUrl + "?access_token=" + key,
            headers: {'User-Agent': 'request'},
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject("Unable to access branches.");
              } else {
                var branchCommit = JSON.parse(data);
                fs.appendFileSync('output.txt', "DEBUG checkBranch: " + branchName + " => " + JSON.stringify(branchCommit.commit.committer.name) + ", time: " + branchCommit.commit.committer.date);
                if (new Date(today - new Date(branchCommit.commit.committer.date)) < new Date(recency)) {
                    fs.appendFileSync('output.txt', " IS ADDED ----" + '\n');
                    branchURLs.push({
                        'branchName': branchName,
                        'branchCommitsUrl': branchCommitsUrl + "?access_token=" + key,
                        'repoName' : repoName
                    });
                    //console.log(" ADDED BRANCH: " + JSON.stringify(branchCommit.commit.committer.name) + "'s " + branchName + '\n');
                    fs.appendFileSync('outputArrays.txt', branchURLs.length + " ADDED BRANCH: " + branchName + '\n');
                    resolve();
                }/* else {
                    fs.appendFileSync('output.txt', " IS REJECTED" + '\n');
                    reject();
                }*/
            }
        });
    });
} 

//3. getCommits
module.exports.getAllCommitUrls = () => {
    return new Promise((resolve,reject) => {
        fs.appendFileSync('outputArrays.txt', "getAllCommitUrls BRANCH URLs: " + branchURLs.length + "\n");
        for (var i = 0; i < branchURLs.length; i++) {
            fs.appendFileSync('outputArrays.txt', branchURLs[i].branchName + ": " + branchURLs[i].branchCommitsUrl + "\n");
        }
        for (var i = 0; i < branchURLs.length; i++) {
            getTheRecentCommits(branchURLs[i].branchCommitsUrl, branchURLs[i].branchName, branchURLs[i].repoName);
        }

        resolve(recentCommits);
    });
}

var getTheRecentCommits = function(branchCommitsUrl, branchName, repoName) {
    var newUrl = [branchCommitsUrl.slice(0, branchCommitsUrl.lastIndexOf("/")), "?per_page=100&sha=", branchCommitsUrl.slice(branchCommitsUrl.lastIndexOf("/") + 1)].join('');
    newUrl = newUrl.replace("?access", "&access");
    fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits newUrl: " + newUrl + '\n');
    return new Promise ((resolve, reject) => {
        request.get({
            url: newUrl,
            headers: {'User-Agent': 'request'},
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject("Unable to access branches.");
              } else {
                var branchCommits = JSON.parse(data);
                fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits branchCommitsUrl: " + newUrl + '\n');
                fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits. branchCommits.length: " + branchCommits.length + '\n');
                fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits branchName: " + branchName + '\n');
                for (var j = 0; j < branchCommits.length; j ++){
                    if (new Date(today - new Date(branchCommits[j].commit.committer.date)) < new Date(recency)){
                        fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits added branchCommits[" + j + "] name: " + JSON.stringify(branchCommits[j].commit.committer.name) + '\n');
                        fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits added branchCommits[" + j + "] message: " + JSON.stringify(branchCommits[j].commit.message) + '\n');
                        fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits added branchCommits[" + j + "] date: " + JSON.stringify(branchCommits[j].commit.committer.date) + '\n');
                        fs.appendFileSync('output.txt', "DEBUG getTheRecentCommits added branchCommits[" + j + "] repo-branch: " + repoName + "-" + branchName + '\n');
                        recentCommits.push ({
                            'repoName': repoName,
                            'branchName': branchName,
                            'commit': branchCommits[j].commit
                        });
                    } else {
                        j = branchCommits.length;
                    }
                }
                fs.appendFileSync('output.txt', '\n');
                resolve();
              }
        });
    });
} 

// 4. sortRecentCommits
module.exports.sortRecentCommits = () => {
    return new Promise((resolve, reject) => {
        recentCommits.sort((a,b) => {
            var c = new Date(a.commit.committer.date);
            var d = new Date(b.commit.committer.date);
            return d - c;
        });
        fs.appendFileSync('outputArrays.txt', "sortRecentCommits sorted recent commits: " + recentCommits.length + "\n");
        for (var i = 0; i < recentCommits.length; i++) {
            fs.appendFileSync('outputArrays.txt', recentCommits[i].repoName + ":" + recentCommits[i].branchName + " - " + recentCommits[i].commit.message + "\n");
        }
        resolve(recentCommits);
    });
}

module.exports.delay = function(t, v) {
    return new Promise((resolve) => {
        setTimeout(resolve.bind(null, v), t);
    });
}