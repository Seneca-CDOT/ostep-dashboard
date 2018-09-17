import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let defaultPanels  = ['github', 'infrastructure', 'presentations', 'eods', 'lamp', 'db1042'];
    let panels = defaultPanels;

    const urlParams = new URLSearchParams(window.location.search);
    const panelQuery = urlParams.get('panels');

    if (panelQuery) {
      panels = panelQuery.split(",").filter((panel) => defaultPanels.includes(panel));
    }

    // const panelNames = ['github', 'infrastructure', 'presentations', 'eods', 'lamp', 'db1042'];
    return (
      <div className="app-content">
        <Header
          name={'ostep dashboard'}
        />
        <div className="panel-row">
          {panels.map((name, i) => (
            <Panel
              key={i}
              title={name}
            />
          ))}
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default App;
