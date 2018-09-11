import React from 'react';
import logo from './assets/logo.png';

class Title extends React.Component {
  render() {
    return (
      <div className="title">
        <img className="logo" src={logo}></img>
        <h1>{this.props.name.toUpperCase()} </h1>
      </div>
    );
  }
}

export default Title;