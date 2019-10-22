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

  computeDurations = ({created}) => {
    const now = moment();
    const createdDate = moment(created);
    const timeDifference = moment.duration(now.diff(createdDate));
    return {
      days: timeDifference.days(),
      hours: timeDifference.hours(),
      minutes: timeDifference.minutes(),
      seconds: timeDifference.seconds(),
    };
  };

  render() {
    return (
      <Panel title="PR Reminder" refreshData={this.refreshData}>
        {this.state.data &&
          this.state.data.map(pullRequest => {
            const { days, hours, minutes, seconds } = this.computeDurations(pullRequest);
            return (
              <div className="github-pullRequest">
                <div
                  key={`${pullRequest.repoName}`}
                  className="github-pullRequest__content"
                >
                  <div className="github-pullRequest__details">
                    <img
                      className="github-pullRequest__icon"
                      src={pullRequestIcon}
                      alt="Pull Request icon"
                    />
                    <span className="github-pullRequest__repo github-pullRequest__label">
                      {`[${pullRequest.repoName}]`}
                    </span>
                    <span className="github-pullRequest__priority--high github-pullRequest__label">
                      {'[High]'}
                    </span>
                    <span className="github-pullRequest__name github-pullRequest__label">
                      {`#${pullRequest.number}: ${pullRequest.title}`}
                    </span>
                  </div>
                  <div className="github-pullRequest__status">
                    <span className="github-pullRequest__time">
                      {days}
                    </span>
                    days old - waiting on{' '}
                    {pullRequest.reviewers.map(reviewer => (
                      <span className="github-pullRequest__reviewer">
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
