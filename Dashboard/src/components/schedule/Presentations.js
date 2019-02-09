import React from 'react';
import moment from 'moment';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import clipboard from '../assets/clipboard.svg';
import calendar from '../assets/calendar.svg';

class Presentations extends React.Component {
  render() {
    const formatDate = (presenterDate) => {
      const date = moment(presenterDate);
      return `${date.format("MMM")} ${date.format("D")}`;
    };

    return (
      <div>
        <h3 className="schedule-heading">Upcoming Presentations</h3>
        {!this.props.data && <div>No Presentations Found.</div>}
        {this.props.data && this.props.data.rows.map((row, i) => (
          <div key={row + i} >
            {
              new Date(row.Date) >= (Date.now() - (1000 * 60 * 60 * 24)) &&
              <div className="presenter-entry">
                <div className="presenter-row">
                  <div className="presenter-name presenter-section schedule-name"><img className="meeting-icons" src={user} alt={"presenter icon"} />
                    <span className="presenter-text ">{row.Presenter}</span>
                  </div>
                  <div className="meeting-topic presenter-section schedule-topic"><img className="meeting-icons" src={clipboard} alt={"presentation topic icon"} />
                    <span className="presenter-text">{row.Topic}</span>
                  </div>
                  <div className="presenter-info presenter-section  schedule-time"> <img className="meeting-icons" src={calendar} alt={"presentation date icon"} />
                    <span className="presenter-text">{formatDate(row.Date)}</span>
                  </div>
                  <div className="meeting-time presenter-section schedule-time"> <img className="meeting-icons" src={clock} alt={"presentation time icon"} />
                    <span className="presenter-text ">{row.Time}</span>
                  </div>
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