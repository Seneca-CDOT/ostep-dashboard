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

  render() {
    return (
      <Panel title="PR Reminder" refreshData={this.refreshData}>
        {this.state.data &&
          this.state.data.map(pullRequest => {
            const creationDate = moment(pullRequest.created).format(
              'MMM DD@HH:mm'
            );
            return (
              <div className="github-pullRequest">
                <img
                  className="github-pullRequest__icon"
                  src={pullRequestIcon}
                  alt="Pull Request icon"
                />
                <div
                  key={`${pullRequest.repoName}`}
                  className="github-pullRequest__content"
                >
                  <div className="github-pullRequest__details">
                    <span className="github-pullRequest__repo github-pullRequest__label">
                      {`[${pullRequest.repoName}]`}
                    </span>
                    <span className="github-pullRequest__priority--high github-pullRequest__label">
                      {'[High]'}
                    </span>
                    <span className="github-pullRequest__name">
                      {pullRequest.title}
                    </span>
                    <span className="github-pullRequest__time">
                      {' ('}
                      {creationDate}
                      {') '}
                    </span>
                  </div>
                  <div className="github-pullRequest__status">
                    <span className="github-pullRequest__time">5</span>days old
                    - Waiting on{' '}
                    <span>
                      {pullRequest.reviewers.map(reviewer => (
                        <img
                          className="github-pullRequest__avatar"
                          src={reviewer.avatar}
                          title={reviewer.name}
                        />
                      ))}
                    </span>
                    {/* {pullRequest.labels.map(label => {
                    const text = this.textColor(label.color);
                    const inLineStyle = {
                      background: `#${label.color}`,
                      color: `${text}`
                    };
                    return (
                      <span
                        style={inLineStyle}
                        className="github-pullRequest__label"
                      >
                        {`${label.name}`}
                      </span>
                    );
                  })} */}
                  </div>
                  {/* <div>
                    <span
                      className="github-pullRequest__description"
                      title={pullRequest.description}
                    >
                      {' "'}
                      {`${pullRequest.description}`}
                      {' "'}
                    </span>
                  </div> */}
                </div>
              </div>
            );
          })}
      </Panel>
    );
  }

  /*
    textColour uses this to determine if the label font should be white or black
    depending on the background colour
    https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color/3943023
  */
  textColor = colour => {
    const white = '#ffffff';
    const black = '#000000';

    const red = parseInt(colour.substr(0, 2), 16);
    const green = parseInt(colour.substr(2, 2), 16);
    const blue = parseInt(colour.substr(4, 2), 16);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? black : white;
  };
}
