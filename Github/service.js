/* **********************************************************
// OSTEP Dashboard Github API
// service.cpp
// Date Created: 2018/09/22
// Author: Yiran Zhu, Lewis Kim and Josue Quilon Barrios
// Email: yzhu132@myseneca.ca
// Description: Github API that gets all the sorted recent 
// commits from an organization/user
********************************************************** */

const r = require('request');

const key = process.env.GITHUB_TOKEN;
const cdotUrl = 'https://api.github.com';
const request = r.defaults({
  headers: { 'User-Agent': 'request' },
  baseUrl: cdotUrl,
  qs: { per_page: 100, access_token: key },
});

const today = new Date();
const day = 24 * 60 * 60 * 1000;

module.exports.getRepos = recency => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: '/orgs/Seneca-CDOT/repos',
      },
      (err, res, data) => {
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(res.Error);
        } else {
          const reposNames = JSON.parse(data)
            .filter(rep => {
              return today - new Date(rep.pushed_at) < recency;
            })
            .map(repo => {
              return {
                name: repo.name,
                language: repo.language,
              };
            });
          resolve(reposNames);
        }
      },
    );
  });
};

const getCommits = branch => {
  // let simplifiedCommit = {};
  // const commitsPerBranch = [];
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `/repos/Seneca-CDOT/${branch.repo}/commits`,
        qs: { sha: `${branch.br.sha}` },
      },
      (err, res, data) => {
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(new Error('Unable to get commits.'));
        } else {
          const commitsPerBranch = JSON.parse(data)
            .filter(singleCommit => {
              const {
                commit: { author },
              } = singleCommit;
              return today - new Date(author.date) < day;
            })
            .map(sc => {
              const {
                commit: { author },
              } = sc;
              const time = new Date(author.date);
              return {
                author: {
                  name: author.name,
                  date: time.toLocaleString('en-US', {
                    timeZone: 'America/Toronto',
                  }),
                },
                message: sc.commit.message,
                repoName: branch.repo,
                branchName: branch.br.name,
              };
            });
          resolve(commitsPerBranch);
        }
      },
    );
  });
};

const getBranches = repo => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `/repos/Seneca-CDOT/${repo.name}/branches`,
      },
      (err, res, data) => {
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(new Error('Unable to get branches.'));
        } else {
          const listOfBranches = {
            repo: repo.name,
            branches: [],
          };
          listOfBranches.branches = JSON.parse(data).map(branch => {
            return {
              name: branch.name,
              sha: branch.commit.sha,
            };
          });
          resolve(listOfBranches);
        }
      },
    );
  });
};

module.exports.getAllCommitsTogether = branches => {
  return new Promise((resolve, reject) => {
    let promises = branches.map(branch => {
      return getBranches(branch);
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
            const arrayToSendBack = arraysOfCommits.flat();
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

const getIssuesFromRepo = repo => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `/repos/Seneca-CDOT/${repo.name}/issues`,
        qs: { labels: 'help wanted' },
      },
      (err, res, data) => {
        if (res.statusCode !== 200) {
          console.log('Error:', res.statusMessage);
          reject(new Error('Unable to get repos.'));
        } else {
          const filteredIssues = JSON.parse(data).map(issue => {
            let assigs = [];
            if (issue.assignees.length !== 0) {
              assigs = issue.assignees.map(assignee => {
                return {
                  name: assignee.login,
                  avatar: assignee.avatar_url,
                };
              });
            }
            const labelsInIssue = issue.labels.map(label => {
              return label.name;
            });

            return {
              ra: issue.user.login,
              repository: issue.repository_url.slice(
                issue.repository_url.lastIndexOf('/') + 1,
                issue.repository_url.length,
              ),
              number: issue.number,
              title: issue.title,
              description: issue.body,
              language: repo.language,
              labels: labelsInIssue,
              state: issue.state,
              assignees: assigs,
              milestone: issue.milestone,
              created: new Date(issue.created_at).toLocaleString('en-US', {
                timeZone: 'America/Toronto',
              }),
              updated: new Date(issue.updated_at).toLocaleString('en-US', {
                timeZone: 'America/Toronto',
              }),
            };
          });
          resolve(filteredIssues);
        }
      },
    );
  });
};

module.exports.getIssues = repos => {
  return new Promise((resolve, reject) => {
    const promises = repos.map(repo => {
      return getIssuesFromRepo(repo);
    });
    Promise.all(promises)
      .then(arraysOfIssues => {
        const issues = arraysOfIssues.flat();
        issues.sort((firstItem, secondItem) => {
          return new Date(secondItem.created) - new Date(firstItem.created);
        });
        resolve(issues);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
