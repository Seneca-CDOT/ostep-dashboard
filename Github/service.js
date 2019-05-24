/* **********************************************************
// OSTEP Dashboard Github API
// service.cpp
// Date Created: 2018/09/22
// Author: Yiran Zhu, Lewis Kim and Josue Quilon Barrios
// Email: yzhu132@myseneca.ca
// Description: Github API that gets all the sorted recent 
// commits from an organization/user
********************************************************** */

const request = require('request');

const key = process.env.GITHUB_TOKEN;
const repoUrl = `https://api.github.com/orgs/Seneca-CDOT/repos?per_page=100&access_token=${key}`;
console.log(key);
let branchUrls = [];
let recentCommits = [];

const today = new Date();
const recency = 24 * 60 * 60 * 1000;

module.exports.getRepos = () => {
  branchUrls = [];
  recentCommits = [];

  return new Promise((resolve, reject) => {
    request.get(
      {
        url: repoUrl,
        headers: { 'User-Agent': 'request' },
      },
      (err, res, data) => {
        if (err) {
          console.log('Error:', err);
          reject(new Error(`Unable to get repos.`));
        } else {
          const reposX = JSON.parse(data);
          reposX.forEach(repo => {
            repo.branches_url = repo.branches_url.slice(
              0,
              repo.branches_url.length - 9,
            );
            repo.branches_url = `${
              repo.branches_url
              }?per_page=100&access_token=${key}`;
            if (
              new Date(today - new Date(repo.pushed_at)) < new Date(recency)
            ) {
              branchUrls.push({
                name: repo.name,
                url: repo.branches_url,
              });
            }
          });
          resolve();
        }
      },
    );
  });
};

const getCommits = commitObject => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://api.github.com/repos/Seneca-CDOT/${
          commitObject.repo
        }/commits?sha=${commitObject.br.sha}&per_page=100&access_token=${key}`,
        headers: { 'User-Agent': 'request' },
      },
      (err, res, data) => {
        if (err) {
          console.log('Error:', err);
          reject(err);
        } else {
          JSON.parse(data).forEach(singleCommit => {
            if (
              new Date(today - new Date(singleCommit.commit.author.date)) <
              new Date(recency)
            ) {
              const time = new Date(singleCommit.commit.author.date);
              singleCommit.author = {
                name: singleCommit.commit.author.name,
                date: time.toLocaleString('en-US', {
                  timeZone: 'America/Toronto',
                }),
              };
              singleCommit.message = singleCommit.commit.message;
              singleCommit.repoName = commitObject.repo;
              singleCommit.branchName = commitObject.br.name;
              recentCommits.push(singleCommit);
            }
          });
          resolve();
        }
      },
    );
  });
};

const getBranches = branchObject => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: branchObject.url,
        headers: { 'User-Agent': 'request' },
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
          reject(err);
        } else {
          const listOfBranches = {
            repo: branchObject.name,
            branches: [],
          };
          JSON.parse(data).forEach(singleBranch => {
            singleBranch.repo = branchObject.name;
            listOfBranches.branches.push({
              name: singleBranch.name,
              sha: singleBranch.commit.sha,
            });
          });
          resolve(listOfBranches);
        }
      },
    );
  });
};

module.exports.getAllCommitsTogether = () => {
  return new Promise((resolve, reject) => {
    let promises = [];
    branchUrls.forEach(branchUrl => {
      promises.push(getBranches(branchUrl));
    });
    Promise.all(promises)
      .then(branchesPerRepo => {
        promises = [];
        branchesPerRepo.forEach(rep => {
          rep.branches.forEach(branch => {
            promises.push(getCommits({ repo: rep.repo, br: branch }));
          });
        });
        Promise.all(promises)
          .then(() => {
            recentCommits.sort((firstCommit, secondCommit) => {
              return (
                new Date(secondCommit.commit.author.date) -
                new Date(firstCommit.commit.author.date)
              );
            });
            resolve(recentCommits);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        reject(err);
      });
  });
};
