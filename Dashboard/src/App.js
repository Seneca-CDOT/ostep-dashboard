import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import Service from './Service.js';
import Infrastructure from './components/Infrastructure'
import Github from './components/Github'
import Osteppy from './components/Osteppy';
import Meetings from './components/Meetings';
import Presentations from './components/Presentations';
const service = new Service();
const DEFAULT_PANELS = ['github', 'infrastructure', 'eods'];

class App extends Component {
  fetchData(componentName, cb) {
    service.getData(componentName, cb);
  }

  render() {
    let panels = DEFAULT_PANELS;
    const urlParams = new URLSearchParams(window.location.search);
    const panelQuery = urlParams.get('panels');

    if (panelQuery) {
      panels = panelQuery.split(",").filter((panel) => DEFAULT_PANELS.includes(panel));
    }

    return (
      <div className="app-content">
        <Header
          name={'ostep dashboard'}
          fetchData={this.fetchData}
        />
        <Github
          fetchData={this.fetchData}
        />
        <Infrastructure
          fetchData={this.fetchData}
        />
        <Osteppy
          fetchData={this.fetchData}
        />
        <Meetings
          fetchData={this.fetchData}
        />
        <Presentations
          fetchData={this.fetchData}
        />
        <div className="blank"></div>
      </div>

    );
  }
}

export default App;
