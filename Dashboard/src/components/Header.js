import React from 'react';
import logo from './assets/ostep_logo_white.png';
import bulbOn from './assets/bulb-on.svg';
import bulbOff from './assets/bulb-off.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { onCampus: false }
    };
  }

  componentWillMount() {
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 30 * 1000);
  }

  fetchData() {
    this.props.fetchData('lamp', data => {
      this.setState({ data });
    });
  }

  refreshData() {
    this.setState({ lampStatus: null });
    this.fetchData();
  }

  render() {
    const { data } = this.state;
    return (
      <header>
        <div className="title">
          <img className="logo" src={logo} alt={'CDOT logo'} />
          <h1 className="title-text">{this.props.name} </h1>
        </div>
        <h3 className="lamp-content">
          <span className="lamp-text">LAMP: </span>
          <img
            className="bulb"
            src={data && data.onCampus ? bulbOn : bulbOff}
            alt="lamp"
          />
        </h3>
      </header>
    );
  }
}

export default Header;
