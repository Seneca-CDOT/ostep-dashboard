import React from 'react';
import refresh from '../assets/refresh.svg';
import Spinner from './Spinner';

export default class Panel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content_visible: true,
      width: window.innerWidth,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  render() {
    return (
      <div className="panel-container" >
        <div className="panel-header">
          <h3 className="panel-title" onClick={this.toggleDropdown}>
            {this.props.title}
          </h3>
          <div className="refresh-container" onClick={this.props.refreshData}>
            <img className="refresh" src={refresh} alt={"refresh icon"} />
          </div>
        </div>
        <div className="panel-content" style={{display: this.state.content_visible ? 'block' : 'none'}}>
          {this.props.children || <Spinner />}
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({width: window.innerWidth});
  }

  componentDidUpdate(){
    if (this.state.width >= 950 && !this.state.content_visible)
      this.setState({ content_visible: !this.state.content_visible })
  }

  toggleDropdown() {
    if (window.innerWidth < 950) {
      this.setState({ content_visible: !this.state.content_visible });
    }
  }
}