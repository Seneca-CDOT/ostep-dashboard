import React from 'react';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import clipboard from '../assets/clipboard.svg';
import calendar from '../assets/calendar.svg';

class Presentations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formatDate = (presenterDate) => {
      const date = new Date(presenterDate);
      const month = date.toDateString().split(' ')[1];
      const day = Number(date.toDateString().split(' ')[2]) + 1;
      return `${month} ${day}`;
    };

    return (
      <div>
          <h3 className="schedule-heading">Upcoming Presentations:</h3>
          {!this.props.data && <div>No Presentations Found.</div>}
          {this.props.data && this.props.data.rows.map((row, i) => (
            <div key={row + i} className="presenter-entry">
              {new Date(row.Date) > Date.now() &&
                <div className="presenter-row">
                  <div className="presenter-name presenter-section"><img className="meeting-icons" src={user} alt={"presenter icon"} />
                    <span className="presenter-text">{row.Presenter}</span>
                  </div>
                  <div className="meeting-topic presenter-section"><img className="meeting-icons" src={clipboard} alt={"presentation topic icon"} />
                    <span className="presenter-text">{row.Topic}</span>
                  </div>
                  <div className="presenter-info presenter-section"> <img className="meeting-icons" src={calendar} alt={"presentation date icon"} />
                    <span className="presenter-text">{formatDate(row.Date)}</span>
                  </div>
                  <div className="meeting-time presenter-section"> <img className="meeting-icons" src={clock} alt={"presentation time icon"} />
                    <span className="presenter-text">{row.Time.split("-")[0]}</span>
                  </div>
                </div>
              }
            </div>
          ))
          }
      </div>
    );
  }
}

export default Presentations;