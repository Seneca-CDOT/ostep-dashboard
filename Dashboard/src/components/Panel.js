import React from 'react';
import refresh from './assets/refresh.svg';
import bulbOn from './assets/bulb-on.svg';
import bulbOff from './assets/bulb-off.svg';
import github from './assets/github.svg';
import slack from './assets/Slack_Mark.svg';
import outlet from './assets/outlet.svg';
import Service from '../Service.js';
const service = new Service();


class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.formatGithub = this.formatGithub.bind(this);
    this.formatOutput = this.formatOutput.bind(this);
    this.refreshData = this.refreshData.bind(this);


    this.state = {
      data: {},
    }
  }

  componentWillMount() {
    this.fetchData();
  }


  fetchData() {
    service.getData(this.props.title, (data) => {
      this.setState({ data });
    });
  }

  refreshData() {
    this.setState({ data: null });
    this.fetchData();
  }

  formatOutput(panelType) {
    switch (panelType) {
      case "github":
        return this.formatGithub();
        break;
      case "infrastructure":
        return this.formatInfrastructure();
        break;
      case "presentations":
        return this.formatPresentations();
        break;
      case "eods":
        return this.formatEOD();
        break;
      case "lamp":
        return this.formatLamp();
        break;
      case "db1042":
        return this.formatDB1042();
        break;
      default:
        throw new Error(`${panelType} is not a valid panel type!`);
    }
  }

  formatGithub() {
    return (
      this.props.data.map((commit, i) => (
        <div key={commit + i} className="github-entry">
          <img className="github-icon" src={github}></img>
          <span className="github-name">John Kimble</span> committed to
          <span className="github-repo"> TSCompare</span>: "Add flexbox to some long repo message that is really way too long to fit."
        </div>
      ))
    );
  }

  formatInfrastructure() {
    return (
      <div>
        {this.props.data.map((ip, i) => (
          <div
            key={ip}
            className="ip-entry"
          >
            <img className="ip-icon" src={outlet}></img>
            <span className="ip-name">Workstation1006</span> located at
            192.168.122.112 is <span className="ip-up">UP!</span>
          </div>
        ))}
      </div>
    );
  }

  formatEOD() {
    const { data } = this.state;
    let currentEods = {}
    let oldEods = {}

    Object.keys(data).forEach((username) => {
      if (new Date(data[username].time).toDateString() == new Date().toDateString()) {
        currentEods[username] = data[username]
      } else {
        oldEods[username] = data[username]
      }
    });

    return (
      <div>
        <h3>Today's EODs</h3>
        {Object.keys(currentEods).map((username) => (
          <div className="github-entry">
            <span></span>
            <img className="slack-icon" src={slack}></img>
            <span className="github-name">{username}</span> posted EOD in channel
            <span className="github-repo"> {currentEods[username].channel}</span>:
            <p>{currentEods[username].text}</p>
          </div>
        ))}
        <h3>Past EODs</h3>
        {Object.keys(oldEods).map((username) => (
          <div className="github-entry">
            <span></span>
            <img className="slack-icon" src={slack}></img>
            <span className="github-name">{username}</span> posted EOD in channel
              <span className="github-repo"> {oldEods[username].channel}</span>:
              <p>{oldEods[username].text}</p>
          </div>
        ))}
      </div>
    );
  }

  formatLamp() {
    
    const status = this.state.data.onCampus ? "on" : "off";
    const message = status === "on" ?
      "Chris Tyler is on campus!" : "DB 1036 is dark and full of terrors";
    return (
      <div className="lamp-container">
        <img
          className="bulb-off"
          src={status === "on" ? bulbOn : bulbOff}
        >
        </img>
        <div className="lamp-message">{message}</div>
      </div>
    );
  }

  formatDB1042() {
    const { db1042 } = this.state;

    return (
      this.props.data.map((row, i) => (
        <div key={row + i} className="github-entry">
          <img className="github-icon" src={github}></img>
          <span className="github-name">John Kimble</span> committed to
          <span className="github-repo"> TSCompare</span>: "Add flexbox to some long repo message that is really way too long to fit."
        </div>
      ))
    );
  }

  formatPresentations() {

  }

  loadSpinner() {
    return (
      <div className="spinner-container">
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }

  render() {
    return (
      <div className="panel-body">
        <div className="panel-title">
          <h3>
            {this.props.title.toUpperCase()}
          </h3>
          <div className="refresh-container" onClick={this.refreshData}>
            <img className="refresh" src={refresh}></img>
          </div>
        </div>
        <div className="panel-content">
          {this.state.data && this.formatOutput(this.props.title) || this.loadSpinner()}
        </div>
      </div>
    );
  }
}

export default Panel;