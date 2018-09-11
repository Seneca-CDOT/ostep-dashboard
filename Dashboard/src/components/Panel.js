import React from 'react';
import refresh from './assets/refresh.svg'

class Panel extends React.Component {
  formatOutput(panelType) {
    switch (this.props.title) {
      case "github": 
        formatGithub();
        break;
      case "infrastructure":
        formatInfrastructure();
        break;
      case "ra presentations":
        formatRAPresentations();
        break;
      case "slack":
        formatSlack();
        break;
      case "lamp":
        formatLamp();
        break;
      case "room 1042":
        formatRoom1042();
        break;
      default:
        throw new Error(`${panelType} is not a valid panel type!`);
    }
  }

  formatRAPresentations() {

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
          {this.formatOutput(this.props.title)}
        </div>
      </div>
    );
  }
}

export default Panel;