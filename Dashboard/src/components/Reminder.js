import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import pullRequestIcon from './assets/pull-request_wh.svg';
import moment from 'moment';

const COMPONENT_NAME = 'reminder';

export default class Reminder extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    return (
      <Panel title='PR Reminder' refreshData={this.refreshData}>
        {this.state.data &&
          this.state.data.map(pullRequest => {
            const creationDate = moment(pullRequest.created).format("MMM DD@HH:mm");
            return (
              <div
                key={`${pullRequest.repoName}`}
                className='github-pullRequest'>
                <div className='github-pullRequest__details'>
                  <img
                    className='github-pullRequest__icon'
                    src={pullRequestIcon}
                    alt='Pull Request icon'
                  />
                  <span className='github-pullRequest__number'>
                    #{pullRequest.number}{' '}
                  </span>
                  <span className='github-pullRequest__name'>{' "'}{pullRequest.title}{'" '}</span>
                  {' in repository '}
                  <span className='github-pullRequest__repo'>{`${
                    pullRequest.repoName
                    }`}</span>
                  <span className='github-pullRequest__time'>{' ('}{
                    creationDate}
                    {') '}</span>
                  <span>
                    {pullRequest.reviewers.map(reviewer => (
                      <img
                        className='github-pullRequest__avatar'
                        src={`${reviewer.avatar}`}
                        title={`${reviewer.name}`}
                      />
                    ))}
                  </span>
                </div>
                <div className='github-pullRequest__labels'>
                  {pullRequest.labels.map(label => {
                    const text = this.textColor(label.color);
                    const inLineStyle = {
                      background: `#${label.color}`,
                      color: `${text}`
                    };
                    return <span style={inLineStyle} className='github-pullRequest__label'>
                      {`${label.name}`}
                    </span>
                  })}
                </div>
                <div>
                  <span className='github-pullRequest__description' title={pullRequest.description}>{' "'}{`${
                    pullRequest.description
                    }`}{' "'}</span>
                </div>
              </div>
            );
          })}
      </Panel>
    );
  }

  textColor = colour => {
    const red = parseInt(colour.substr(0, 2), 16);
    const green = parseInt(colour.substr(2, 2), 16);
    const blue = parseInt(colour.substr(4, 2), 16);

    return (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff';
  }
}