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

const today = new Date();
const recency = 24 * 60 * 60 * 1000;

module.exports.getRepos = () => {
  const branchUrls = [];
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: repoUrl,
        headers: { 'User-Agent': 'request' },
      },
      (err, res, data) => {
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(new Error('Unable to get repos.'));
        } else {
          const reposX = JSON.parse(data);
          reposX.forEach(repo => {
            repo.branches_url = repo.branches_url.slice(
              0,
              repo.branches_url.indexOf('{/branch}'),
            );
            repo.branches_url = `${
              repo.branches_url
            }?per_page=100&access_token=${key}`;
            if (today - new Date(repo.pushed_at) < recency) {
              branchUrls.push({
                name: repo.name,
                url: repo.branches_url,
              });
            }
          });
          resolve(branchUrls);
        }
      },
    );
  });
};

const getCommits = commitObject => {
  let simplifiedCommit = {};
  const commitsPerBranch = [];
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://api.github.com/repos/Seneca-CDOT/${
          commitObject.repo
        }/commits?sha=${commitObject.br.sha}&per_page=100&access_token=${key}`,
        headers: { 'User-Agent': 'request' },
      },
      (err, res, data) => {
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(new Error('Unable to get commits.'));
        } else {
          JSON.parse(data).forEach(singleCommit => {
            const {
              commit: { author },
            } = singleCommit;
            if (today - new Date(author.date) < recency) {
              const time = new Date(author.date);
              simplifiedCommit = {
                author: {
                  name: author.name,
                  date: time.toLocaleString('en-US', {
                    timeZone: 'America/Toronto',
                  }),
                },
                message: singleCommit.commit.message,
                repoName: commitObject.repo,
                branchName: commitObject.br.name,
              };
              commitsPerBranch.push(simplifiedCommit);
            }
          });
          resolve(commitsPerBranch);
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
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(new Error('Unable to get branches.'));
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

module.exports.getAllCommitsTogether = branches => {
  const arrayToSendBack = [];
  return new Promise((resolve, reject) => {
    let promises = [];
    branches.forEach(branchUrl => {
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
          .then(arraysOfCommits => {
            arraysOfCommits.forEach(arrayOfCommits => {
              if (arrayOfCommits.length !== 0) {
                arrayOfCommits.forEach(commit => {
                  arrayToSendBack.push(commit);
                });
              }
            });
            arrayToSendBack.sort((firstCommit, secondCommit) => {
              return (
                new Date(secondCommit.author.date) -
                new Date(firstCommit.author.date)
              );
            });
            resolve(arrayToSendBack);
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
