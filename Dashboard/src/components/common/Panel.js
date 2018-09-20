import React from 'react';

class Panel extends React.Component {
  constructor(props) {
    console.log("PANEL==")
    super(props);
    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    console.log("IN MOUNT")
    this.fetchData();
    setInterval(() => { this.fetchData(); }, 30 * 1000);
  }

  fetchData() {
    console.log("IN FETCH DATA")
    this.props.fetchData(this.title, (data) => {
      console.log("SETTING STATE TO", data)
      this.setState({ data });
    });
  }

  refreshData() {
    this.setState({ data: null });
    this.fetchData();
  }
}

export default Panel;