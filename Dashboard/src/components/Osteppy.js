import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import slack from './assets/slack.svg';
import ReactMarkdown from 'react-markdown';
const COMPONENT_NAME = "osteppy";

class Osteppy extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    const { data } = this.state;
    let currentEods = {}
    let oldEods = {}

    if (this.state.data) {
      Object.keys(data).forEach((username) => {
        if (new Date(data[username].time).toDateString() === new Date().toDateString()) {
          currentEods[username] = data[username]
        } else {
          oldEods[username] = data[username]
        }
      });
    }

    return (
      <Panel
        title={COMPONENT_NAME}
        refreshData={this.refreshData}
      >
        {this.state.data &&
          <div>
            {Object.keys(currentEods).length !== 0 && <h3>Today's EODs</h3>}
            {Object.keys(currentEods).map((username, i) => (
              <div className="github-entry" key={username + i}>
                <div className="slack-title">
                  <img className="slack-icon" src={slack} alt={"Slack icon"} />
                  <span className="github-name">{username}</span>
                  <p className="slack-post"> posted EOD in channel </p>
                  <div className="github-repo">{`#${currentEods[username].channel}`}</div>:
            </div>
                <ReactMarkdown source={currentEods[username].text} />
              </div>
            ))}
            {Object.keys(oldEods).length !== 0 && <h3>Past EODs</h3>}
            {Object.keys(oldEods).map((username, i) => (
              <div className="github-entry" key={username + i}>
                <div className="slack-title">
                  <img className="slack-icon" src={slack} alt={"Slack icon"} />
                  <span className="github-name">{username}</span>
                  <p className="slack-post"> posted EOD in channel </p>
                  <span className="github-repo"> {`#${oldEods[username].channel}`}</span>:
            </div>
                <ReactMarkdown 
                  source={oldEods[username].text} 
                  className="slack-message"
                />
              </div>
            ))}
          </div>
        }
      </Panel>
    );
  }
}

export default Osteppy;