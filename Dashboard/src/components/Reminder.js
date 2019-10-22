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
    const computeTimeDifference = period => now.diff(createdDate, period);

    const durations = [
      { format: 'day', count: computeTimeDifference('days') },
      { format: 'hour', count: computeTimeDifference('hours') },
      { format: 'minute', count: computeTimeDifference('minutes') },
      { format: 'second', count: computeTimeDifference('seconds') },
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

  isDateBefore = (firstDate, secondDate) => {
    return moment(firstDate.created).isBefore(moment(secondDate.created));
  };

  comparePullRequests = (firstPR, secondPR) => {
    if (this.isGreaterPriority(firstPR, secondPR)) {
      return -1;
    } else if (this.isGreaterPriority(secondPR, firstPR)) {
      return 1;
    }

    if (this.isDateBefore(firstPR, secondPR)) {
      return -1;
    } else if (this.isDateBefore(secondPR, firstPR)) {
      return 1;
    }
    return 0;
  };

  sortPullRequests = pullRequests => {
    return pullRequests
      .map(pullRequest => {
        pullRequest.priority = this.findPullRequestPriority(pullRequest);
        pullRequest.age = this.findPullRequestAge(pullRequest);
        return pullRequest;
      })
      .sort(this.comparePullRequests);
  };

  getWaitedOn = pullRequest => {
    if (pullRequest.reviewers.length === 0) {
      const { avatar, name } = pullRequest.author;
      return (
        <span className="github-pullRequest__reviewer">
          <img
            className="github-pullRequest__avatar"
            src={avatar}
            title={name}
            alt={`${name}'s avatar'`}
          />
        </span>
      );
    } else {
      return pullRequest.reviewers.map(({ avatar, name }) => (
        <span key={avatar} className="github-pullRequest__reviewer">
          <img
            className="github-pullRequest__avatar"
            src={avatar}
            title={name}
            alt={`${name}'s avatar`}
          />
        </span>
      ));
    }
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
                    <a
                      href={pullRequest.url}
                      className="github-pullRequest__name github-pullRequest__label"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`#${pullRequest.number}: ${pullRequest.title}`}
                    </a>{' '}
                  </div>
                  <div className="github-pullRequest__status">
                    <span className="github-pullRequest__time">{`${count} ${format}${
                      count > 1 ? 's' : ''
                    } old - waiting on`}</span>
                    {this.getWaitedOn(pullRequest)}
                  </div>
                </div>
              </div>
            );
          })}
      </Panel>
    );
  }
}
