import React from 'react';
import refresh from '../assets/refresh.svg';
import Spinner from './Spinner';

const Panel = (props) => {
  return (
    <div className="panel-body">
      <div className="panel-title">
        <h3>
          {props.title.toUpperCase()}
        </h3>
        <div className="refresh-container" onClick={this.refreshData}>
          <img className="refresh" src={refresh} alt={"refresh icon"} />
        </div>
      </div>
      <div className="panel-content">
        {props.children || <Spinner />}
      </div>
    </div>
  )
};

export default Panel;