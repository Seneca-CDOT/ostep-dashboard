import React from 'react';
import Panel from './common/Panel';
import Container from './common/Container';
import clock from './assets/clock.svg';
import user from './assets/user.svg';
import clipboard from './assets/clipboard.svg';
import calendar from './assets/calendar.svg';
const COMPONENT_NAME = "presentations";

class Presentations extends Container {
  constructor(props) {
    super(props, COMPONENT_NAME);
  }

  render() {
    const formatDate = (presenterDate) => {
      const date = new Date(presenterDate);
      const month = date.toDateString().split(' ')[1];
      const day = date.toDateString().split(' ')[2];
      return `${month} ${day}`;
    };

    return (
      <div>
        <Panel 
          title={COMPONENT_NAME}
          refreshData={this.refreshData}
        >
          {this.state.data && this.state.data.rows.map((row, i) => (
            <div key={row + i} className="presenter-entry">
              {new Date(row.Date) > Date.now() &&
                <div className="presenter-row">
                  <div className="presenter-name presenter-section"><img className="meeting-icons" src={user} alt={"presenter icon"} />
                    <span className="presenter-text">{row.Presenter}</span>
                  </div>
                  <div className="presenter-info presenter-section"><img className="meeting-icons" src={clipboard} alt={"presentation topic icon"} />
                    <span className="presenter-text">{row.Topic}</span>
                  </div>
                  <div className="presenter-info presenter-section"> <img className="meeting-icons" src={calendar} alt={"presentation date icon"} />
                    <span className="presenter-text">{formatDate(row.Date)}</span>
                  </div>
                  <div className="presenter-info presenter-section"> <img className="meeting-icons" src={clock} alt={"presentation time icon"} />
                    <span className="presenter-text">{row.Time.split("-")[0]}</span>
                  </div>
                </div>
              }
            </div>
          ))
          }
        </Panel>
      </div>
    );
  }
}

export default Presentations;