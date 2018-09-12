import React from 'react';
import logo from './assets/logo.png';
import LampStatus from './LampStatus';

class Header extends React.Component {
  render() {
    return (
      <div className="main-heading">
        <div className="title">
          <img className="logo" src={logo} alt={"CDOT logo"}/>
          <h1>{this.props.name.toUpperCase()} </h1>
        </div>
      <LampStatus />
      </div>
    );
  }
}

export default Header;