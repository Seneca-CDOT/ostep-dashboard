import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import Service from './Service.js';
import Infrastructure from './components/Infrastructure';
import Github from './components/Github';
import Schedule from './components/Schedule';
import HelpWanted from './components/HelpWanted';
import Panel from './components/common/Panel';

const service = new Service();
// const DEFAULT_PANELS = ['github', 'infrastructure', 'eods'];

class App extends Component {
  fetchData(componentName, cb) {
    try {
      service.getData(componentName, cb);
    } catch (e) {
      console.error(e);
    }
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
        <Header name={'dashboard'} fetchData={this.fetchData} />
        <div className="main-content">
          <div className="row">
            <Github fetchData={this.fetchData} />
            <Infrastructure fetchData={this.fetchData} />
          </div>
          <div className="row">

            {/* <Osteppy fetchData={this.fetchData} /> */}
            <HelpWanted fetchData={this.fetchData} />
            <Schedule fetchData={this.fetchData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
