import React, { Component } from 'react';
import Header from './components/Header';
import './styles/css/style.css';
import './App.css';
import Service from './Service.js';
import Infrastructure from './components/Infrastructure'
import Github from './components/Github'
import Osteppy from './components/Osteppy';
import Schedule from './components/Schedule';
const service = new Service();
// const DEFAULT_PANELS = ['github', 'infrastructure', 'eods'];

class App extends Component {
  fetchData(componentName, cb) {
    service.getData(componentName, cb);
  }

  render() {
    // let panels = DEFAULT_PANELS;
    // const urlParams = new URLSearchParams(window.location.search);
    // const panelQuery = urlParams.get('panels');

    // if (panelQuery) {
    //   panels = panelQuery.split(",").filter((panel) => DEFAULT_PANELS.includes(panel));
    // }

    return (
      <div className="app-content">
        <Header
          name={'dashboard'}
          fetchData={this.fetchData}
        />
        <div className="main-content">
          <div className="panel-row">
            <Github fetchData={this.fetchData} />
            <Infrastructure fetchData={this.fetchData} />
          </div>
          <div className="panel-row">
            <Osteppy fetchData={this.fetchData} />
            <Schedule fetchData={this.fetchData} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;
