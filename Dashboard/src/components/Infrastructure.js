import React from 'react';
import zap from './assets/zap.svg';
import zapOff from './assets/zap-off.svg';
import Panel from './Panel';

const Infrastructure = (props) => {
  const endpoint = "infrastructure";
  const upSort = (a, b) => a.Status === 'up';
  const servers = this.state.data.Servers.sort(upSort);
  const workstations = this.state.data.Workstations.sort(upSort);
  const dns = this.state.data.DNS;

  const format = () => (
      <div>
        <div className="infra-wrapper">
          <div className="infra-column">
            <div className="infra-box"><h3>Servers</h3></div>
            {servers.map((server, i) => (
              <div
                key={"servers-" + i}
                className="infra-box"
              >
                <img className="ip-icon" src={server.Status === "up" ? zap : zapOff} alt={"IP icon"} />
                <span> {server.Name} </span>
              </div>
            ))}
          </div>
          <div className="infra-column">
            <div className="infra-box"><h3>Workstations</h3> </div>
            {workstations.map((server, i) => (
              <div
                key={"workstation-" + i}
                className="infra-box"
              >
                <img className="ip-icon" src={server.Status === "up" ? zap : zapOff} alt={"IP icon"} />
                <span> {server.Host} </span>
              </div>
            ))}
          </div>
          <div className="infra-column">
            <div className="infra-box"><h3>DNS</h3></div>
            {dns.map((server, i) => (
              <div
                key={"dns" + i}
                className="infra-box"
              >
                <img className="ip-icon" src={zap} alt={"IP icon"} />
                <span >{server.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  
    return (
      <Panel 
        endpoint={endpoint}
        fetchData={props.fetchData}
        format={format}
      />
    );
}

export default Infrastructure;