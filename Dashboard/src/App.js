import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import MergedPanel from './components/MergedPanel';
import './App.css';
import Service from './Service.js';
import Infrastructure from './components/Infrastructure'
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
        <div className="panel-row">
          {panels.map((name, i) => (
            <Panel
              key={i}
              title={name}
              fetchData={this.fetchData}
            />
          ))}
          <MergedPanel 
            fetchData={this.fetchData}
          />
          <Infrastructure 
            fetchData={this.fetchData}
          />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default App;
