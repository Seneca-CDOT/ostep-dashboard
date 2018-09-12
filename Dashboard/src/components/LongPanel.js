import React from 'react';
import refresh from './assets/refresh.svg'

class LongPanel extends React.Component {
  render() {
    return (
      <div className="long-panel">
      <div className="panel-title">
          <h3>
            {this.props.title.toUpperCase()}
          </h3>
          <div className="refresh-container">
           <img className="refresh" src={refresh} alt={"refresh animation"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default LongPanel;