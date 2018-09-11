import React from 'react';

class Panel extends React.Component {
  render() {
    return (
      <div className="panel-body">
        <h3 className="panel-title">{this.props.title.toUpperCase()}</h3>
      </div>
    );
  }
}

export default Panel;