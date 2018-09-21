import React from 'react';
import Meetings from './schedule/Meetings';
import Presentations from './schedule/Presentations';
import Panel from './common/Panel';
const COMPONENT_NAME = "schedule";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationData: null,
      meetingData: null,
    }
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    setInterval(() => { this.fetchData(); }, 30 * 1000);
  }

  fetchData() {
    this.props.fetchData("presentations", (presentationData) => {
      this.setState({ presentationData });
    });

    this.props.fetchData("meetings", (meetingData) => {
      this.setState({ meetingData });
    });

  }

  refreshData() {
    this.setState(() => ({
      presentationData: null,
      meetingData: null
    }));

    this.fetchData();
  }

  render() {
    return (
      <Panel
        title={COMPONENT_NAME}
        refreshData={this.refreshData}
      >
        {this.state.presentationData && this.state.meetingData &&
          <div>
            <Presentations
              fetchData={this.props.fetchData}
              data={this.state.presentationData}
            />
            <Meetings
              fetchData={this.props.fetchData}
              data={this.state.meetingData}
            />
          </div>
        }
      </Panel>
    );
  }
}

export default Schedule;