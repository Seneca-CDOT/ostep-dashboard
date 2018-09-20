import React from 'react';

class Container extends React.Component {
  constructor(props, componentName) {
    super(props);
    this.componentName = componentName;
    console.log("IN CONTAINER CONSTRUCTOR==")
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    console.log("IN MOUNT")
    this.fetchData();
    setInterval(() => { this.fetchData(); }, 30 * 1000);
  }

  fetchData() {
    this.props.fetchData(this.componentName, (data) => {
      console.log("SETTING STATE TO", data);
      this.setState({ data });
    });
  }

  refreshData() {
    this.setState({ data: null });
    this.fetchData();
  }
}

export default Container;