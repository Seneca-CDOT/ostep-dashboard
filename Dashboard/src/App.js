import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/common/Panel';
import MergedPanel from './components/MergedPanel';
import './App.css';
import Service from './Service.js';
import Infrastructure from './components/Infrastructure'
import Github from './components/Github'
import Osteppy from './components/Osteppy';
const service = new Service();
const DEFAULT_PANELS = ['github', 'infrastructure', 'eods'];
const MERGED_PANELS = ['presentations', 'db1042']

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
        >
        </Github>
        <Infrastructure
          fetchData={this.fetchData}
        />
        <Osteppy
          fetchData={this.fetchData}
        />

        <div className="blank"></div>
      </div>

    );
  }
}

export default App;
