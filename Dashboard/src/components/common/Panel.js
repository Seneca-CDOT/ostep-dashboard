import React from 'react';
import refresh from '../assets/refresh.svg';
import Spinner from './Spinner';

const DROPDOWN_BREAKPOINT = 950;

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentVisible: true,
      width: window.innerWidth
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidUpdate() {
    if (this.state.width >= DROPDOWN_BREAKPOINT && !this.state.contentVisible)
      this.setState({ contentVisible: !this.state.contentVisible });
  }

  toggleDropdown() {
    if (window.innerWidth < DROPDOWN_BREAKPOINT) {
      this.setState({ contentVisible: !this.state.contentVisible });
    }
  }

  render() {
    return (
      <div
        className='panel-container'
        id={`${this.props.title.toLowerCase()}-panel`}
      >
        <div className='panel-header'>
          <h3 className='panel-title' onClick={this.toggleDropdown}>
            {this.props.title}
          </h3>
          <div className='refresh-container' onClick={this.props.refreshData}>
            <img className='refresh' src={refresh} alt={'refresh icon'} />
          </div>
        </div>
        <div
          className={`panel-content ${
            this.state.contentVisible ? 'visible' : 'hidden'
          }`}
        >
          {this.props.children || <Spinner />}
        </div>
      </div>
    );
  }
}
