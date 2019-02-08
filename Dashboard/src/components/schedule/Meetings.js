import React from 'react';
import moment from 'moment';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import clipboard from '../assets/clipboard.svg';
import calendar from '../assets/calendar.svg';

class Meetings extends React.Component {
  sortDates() {
    this.sortedData = this.props.data;
    this.sortedData.rows.sort(function (a, b) {
      a = new Date(a["Date and time"]);
      b = new Date(b["Date and time"]);
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  render() {
    if (this.props.data) this.sortDates();
    const formatDate = (presenterDate) => {
      const date = moment(presenterDate);
      return `${date.format("MMM")} ${date.format("D")}`;
    };

    return (
      <div className="u-margin-top-small">
        <h3 className="schedule-heading">DB 1042 Bookings</h3>
        {this.sortedData.rows.length === 0 && <div>No upcoming meetings found for today.</div>}

        {this.sortedData && this.sortedData.rows.map((row, i) => (
          <div key={row + i} className="presenter-entry">
              <div className="presenter-row">
                <div className="presenter-name presenter-section schedule-name"><img className="meeting-icons" src={user} alt={"presenter icon"} />
                  <span className="presenter-text ">{row["Contact person"]}</span>
                </div>
                <div className="meeting-topic  presenter-section schedule-topic"><img className="meeting-icons" src={clipboard} alt={"presentation topic icon"} />
                  <span className="presenter-text ">{row["Purpose"]}</span>
                </div>
                <div className="presenter-info presenter-section schedule-time"> <img className="meeting-icons" src={calendar} alt={"presentation date icon"} />
                  <span className="presenter-text ">{formatDate(row["Date and time"].split(' ')[0])}</span>
                </div>
                <div className="meeting-time presenter-section schedule-time"> <img className="meeting-icons" src={clock} alt={"presentation time icon"} />
                  <span className="presenter-text">{row["Date and time"].split(' ')[1]}</span>
                </div>
              </div>
          </div>
        ))
        }
      </div>

    );
  }

}

export default Meetings;