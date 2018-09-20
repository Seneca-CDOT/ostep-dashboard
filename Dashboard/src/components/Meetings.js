import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import clock from './assets/clock.svg';
import user from './assets/user.svg';
import clipboard from './assets/clipboard.svg';
const COMPONENT_NAME = "meetings";

class Meetings extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
    this.sortedData;
  }

  sortDates() {
    this.sortedData = this.state.data;

    this.sortedData.rows.sort(function (a, b) {
      a = new Date(a["Date and time"]);
      b = new Date(b["Date and time"]);
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  render() {
    if (this.state.data) this.sortDates();

    return (
      <div>
        <Panel
          title={COMPONENT_NAME}
          refreshData={this.refreshData}
        >
          {!this.sortedData && <div>No upcoming meetings found for today.</div>}

          {
            this.sortedData && this.sortedData.rows.map((row, i) => (
              <div key={row + i} className="github-entry meeting">
                <span className="meeting-time">
                  <img className="meeting-icons" src={clock} alt={"meeting time icon"} />{row["Date and time"].split(' ')[1]}
                </span>
                <span className="meeting-topic">
                  <img className="meeting-icons" src={clipboard} alt={"meeting topic icon"} />{row["Purpose"]}
                </span>
                <span className="meeting-organizer">
                  <img className="meeting-icons" src={user} alt={"organizer icon"} />{row["Contact person"]}
                </span>
              </div>
            ))
          }
        </Panel>
      </div>
    );
  }
}

export default Meetings;