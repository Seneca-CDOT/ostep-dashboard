import React from 'react';
import refresh from './assets/refresh.svg';
import bulbOn from './assets/bulb-on.svg';
import bulbOff from './assets/bulb-off.svg';
import github from './assets/github.svg';
import outlet from './assets/outlet.svg';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.formatGithub = this.formatGithub.bind(this);
    this.formatOutput = this.formatOutput.bind(this);
  }

  formatOutput(panelType) {
    switch (panelType) {
      case "github":
        return this.formatGithub();
        break;
      case "infrastructure":
        return this.formatInfrastructure();
        break;
      case "ra presentations":
        return this.formatRAPresentations();
        break;
      case "eods":
        return this.formatEOD();
        break;
      case "the lamp":
        return this.formatLamp();
        break;
      case "room 1042":
        return this.formatRoom1042();
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

  }

  formatLamp() {
    const status = this.props.data ? "on" : "off";
    const message = status === "on" ?
      "Chris Tyler is on campus!" : "DB 1036 is dark.";
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

  formatRoom1042() {

  }

  formatRAPresentations() {

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
          <div className="refresh-container">
            <img className="refresh" src={refresh}></img>
          </div>
        </div>
        <div className="panel-content">
          {this.props.data && this.formatOutput(this.props.title) || this.loadSpinner()}
        </div>
      </div>
    );
  }
}

export default Panel;