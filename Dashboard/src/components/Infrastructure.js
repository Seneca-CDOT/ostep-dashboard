import React from 'react';
import zap from './assets/zap.svg';
import zapOff from './assets/zap-off.svg';
import Panel from './common/Panel';
import Container from './common/Container';
const COMPONENT_NAME = "infrastructure";

class Infrastructure extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    let component, servers, workstations, dns;

    if (this.state.data) {
      const upSort = (a, b) => a.Status === 'up';
      component = "infrastructure";
      servers = this.state.data.Servers.sort(upSort);
      workstations = this.state.data.Workstations.sort(upSort);
      dns = this.state.data.DNS;
    }

    return (
      <div>
        <Panel title={COMPONENT_NAME}>
          {this.state.data &&
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
          }
        </Panel>
      </div>
    );
  };
}

export default Infrastructure;