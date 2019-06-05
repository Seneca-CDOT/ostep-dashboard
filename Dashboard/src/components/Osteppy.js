import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import slack from './assets/slack.svg';
import ReactMarkdown from 'react-markdown';
import Moment from 'moment';

const COMPONENT_NAME = "osteppy";

// Reformat Slack messages based on:
// https://api.slack.com/messaging/composing/formatting#retrieving-messages
function reformatSlackMentions(text) {
  return text.replace(/<(.*?)>/g, (match, p1) => {
    switch(p1.slice(0, 2)) {
      case '@U': // content starting with `@U` or `@W` is a user mention
      case '@W':
        return `**${p1.split('|')[1]}**`;
      case '#C': // content starting with `#C` is a channel link
        return `**#${p1.split('|')[1]}**`
      default: // content we don't yet know how to format
        console.warn(`Unknown mention: ${match}`);
        return match
    }
  });
}

function EODList(props) {
 return (
   <>
    <h3>{props.title}</h3>
    {props.eods.map((eod, i) => (
      <div key={eod.username + i}>
        <div className="slack-title">
          <img className="slack-icon" src={slack} alt="Slack icon" />
          <span className="github-name">{eod.username}</span>
          <p className="slack-post"> posted EOD in channel </p>
          <span className="github-repo"> {`#${eod.channel}`}</span>:
        </div>
        <ReactMarkdown
          source={reformatSlackMentions(eod.text)}
          className="slack-message"
        />
      </div>
    ))}
   </>
 )
}

class Osteppy extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    const { data } = this.state;
    let currentEods = [];
    let oldEods = [];
    const now = Moment();

    if (data) {
      Object.keys(data).forEach(username => {
        const eod = data[username];
        eod.username = username;

        if (Moment(data[username].time).isSame(now, 'day')) {
          currentEods.push(eod);
        } else {
          oldEods.push(eod);
        }
      });
    }

    return (
        <Panel
          title={this.constructor.name}
          refreshData={this.refreshData}
        >
          {data &&
            <div className="eod-list">
              {currentEods.length > 0 &&
                <EODList title="Today's EODs" eods={currentEods} />
              }

              {oldEods.length > 0 &&
                <EODList title="Past EODs" eods={oldEods} />
              }
            </div>
          }
        </Panel>
    );
  }
}

export default Osteppy;
