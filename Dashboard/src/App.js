import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import './App.css';
import Service from './Service.js';
const service = new Service();

class App extends Component {
  fetchData(componentName, cb) {
    service.getData(componentName, cb);
  }

  render() {

    let defaultPanels = ['github', 'infrastructure', 'presentations', 'eods', 'db1042'];
    let panels = defaultPanels;

    const urlParams = new URLSearchParams(window.location.search);
    const panelQuery = urlParams.get('panels');

    if (panelQuery) {
      panels = panelQuery.split(",").filter((panel) => defaultPanels.includes(panel));
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
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default App;
