import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import pullRequestIcon from './assets/pull-request_wh.svg';
import moment from 'moment';

/**
 * We use '%2F' instead of '/' for COMPONENT_NAME since
 * forward slashes need to be urlencoded so the request in Service.js will work
 */
const COMPONENT_NAME = 'github%2Fpull-requests';

export default class Reminder extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  findPullRequestAge = ({ created }) => {
    const now = moment();
    const createdDate = moment(created);
    const timeDifference = moment.duration(now.diff(createdDate));
    const durations = [
      { format: 'day', count: timeDifference.days() },
      { format: 'hour', count: timeDifference.hours() },
      { format: 'minute', count: timeDifference.minutes() },
      { format: 'second', count: timeDifference.seconds() },
    ];

    return durations.find(({ count }) => count);
  };

  findPullRequestPriority = ({ labels }) => {
    let priorityLevel;

    const { name: priorityLabel } = labels.find(label =>
      /priority/i.test(label.name),
    );

    if (!priorityLabel) {
      priorityLevel = 'medium';
    } else {
      priorityLevel = priorityLabel
        .split(' ')
        .pop()
        .toLowerCase();
    }

    return priorityLevel;
  };

  isGreaterPriority = (firstPR, secondPR) => {
    const priorityEnum = { low: 0, medium: 1, high: 2, critical: 3 };
    return priorityEnum[firstPR.priority] > priorityEnum[secondPR.priority];
  };

  isDateAfter = (firstDate, secondDate) => {
    moment(firstDate.created).isAfter(moment(secondDate.created));
  };

  sortPullRequests = pullRequests => {
    return pullRequests
      .map(pullRequest => {
        pullRequest.priority = this.findPullRequestPriority(pullRequest);
        pullRequest.age = this.findPullRequestAge(pullRequest);
        return pullRequest;
      })
      .sort((a, b) => {
        if (this.isGreaterPriority(a, b)) {
          return -1;
        } else if (this.isDateAfter(a, b)) {
          return 1;
        } else {
          return 0;
        }
      });
  };

  render() {
    const { data } = this.state;
    return (
      <Panel title="PR Reminder" refreshData={this.refreshData}>
        {data &&
          this.sortPullRequests(data).map(pullRequest => {
            const {
              priority,
              age: { format },
              age: { count },
            } = pullRequest;
            return (
              <div key={`${pullRequest.title}`} className="github-pullRequest">
                <div className="github-pullRequest__content">
                  <div className="github-pullRequest__details">
                    <img
                      className="github-pullRequest__icon"
                      src={pullRequestIcon}
                      alt="Pull Request icon"
                    />
                    <span className="github-pullRequest__repo github-pullRequest__label">
                      {`[${pullRequest.repoName}]`}
                    </span>
                    <span
                      className={`github-pullRequest__priority-${priority} github-pullRequest__label`}
                    >
                      {`[${priority}]`}
                    </span>
                    <span className="github-pullRequest__name github-pullRequest__label">
                      {`#${pullRequest.number}: ${pullRequest.title}`}
                    </span>
                  </div>
                  <div className="github-pullRequest__status">
                    <span className="github-pullRequest__time">{`${count} ${format}${
                      count > 1 ? 's' : ''
                    } old - waiting on`}</span>
                    {pullRequest.reviewers.map(reviewer => (
                      <span
                        key={reviewer.avatar}
                        className="github-pullRequest__reviewer"
                      >
                        <img
                          className="github-pullRequest__avatar"
                          src={reviewer.avatar}
                          title={reviewer.name}
                          alt={`${reviewer.name}'s avatar'`}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </Panel>
    );
  }
}
