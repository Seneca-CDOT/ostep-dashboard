import React from 'react';
import logo from './assets/logo.png';
import bulbOn from './assets/bulb-on.svg';
import bulbOff from './assets/bulb-off.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {onCampus: false},
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchData("lamp", (data) => {
      console.log(data)
      this.setState({ data });
    });
  }

  refreshData() {
    this.setState({ lampStatus: null });
    this.fetchData();
  }

  render() {
    return (
      <header>
        <div className="title">
          <img className="logo" src={logo} alt={"CDOT logo"} />
          <h1>{this.props.name.toUpperCase()} </h1>
        </div>
        <h3 className="lamp-content">
          <span>LAMP: </span>
          <img
            className="bulb"
            src={this.state.data.onCampus ? bulbOn : bulbOff}
            alt="lamp"
          />
        </h3>
      </header>

    );
  }
}

export default Header;