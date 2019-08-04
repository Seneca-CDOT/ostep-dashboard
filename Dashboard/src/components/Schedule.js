import React from 'react';
import Presentations from './schedule/Presentations';
import Panel from './common/Panel';
const COMPONENT_NAME = 'schedule';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationData: null
    };
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 30 * 1000);
  }

  fetchData() {
    this.props.fetchData('presentations', presentationData => {
      this.setState({ presentationData });
    });
  }

  refreshData() {
    this.setState(() => ({
      presentationData: null
    }));

    this.fetchData();
  }

  render() {
    return (
      <Panel title={COMPONENT_NAME} refreshData={this.refreshData}>
        {this.state.presentationData && (
          <div className="schedule-content">
            <Presentations
              fetchData={this.props.fetchData}
              data={this.state.presentationData}
            />
          </div>
        )}
      </Panel>
    );
  }
}

export default Schedule;
