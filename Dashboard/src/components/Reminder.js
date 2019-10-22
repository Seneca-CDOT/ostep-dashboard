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
      { format: 'day', value: timeDifference.days() },
      { format: 'hour', value: timeDifference.hours() },
      { format: 'minute', value: timeDifference.minutes() },
      { format: 'second', value: timeDifference.seconds() },
    ];

    return durations.find(({ value }) => value);
  };

  findPullRequestPriority = ({ labels }) => {
    let priorityLevel;

    const { name: priorityLabel } = labels.find(label =>
      /priority/i.test(label.name),
    );

    if (!priorityLabel) {
      priorityLevel = 'medium';
    } else {
      priorityLevel = priorityLabel.split(' ').pop();
    }

    return priorityLevel.toLowerCase();
  };

  render() {
    const { data } = this.state;
    return (
      <Panel title="PR Reminder" refreshData={this.refreshData}>
        {data &&
          data.map(pullRequest => {
            const { format, value } = this.findPullRequestAge(pullRequest);
            const priority = this.findPullRequestPriority(pullRequest);

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
                    <span className="github-pullRequest__time">{`${value} ${format}${
                      value > 1 ? 's' : ''
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
