import React from 'react';
import Panel from './Panel.js';

class MergedPanel extends React.Component {
  render() {
    return (
      <div className="merged-panel">
        <Panel
          title={'presentations'}
          fetchData={this.props.fetchData}
        />
        <Panel
          title={'db1042'}
          fetchData={this.props.fetchData}
        />
      </div>
    );
  }
}

export default MergedPanel;