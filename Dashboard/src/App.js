import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import './App.css';

class App extends Component {
  render() {
    const panelNames = ['github', 'infrastructure', 'presentations', 'eods', 'lamp', 'db1042'];
    return (
      <div className="app-content">
        <Header
          name={'ostep dashboard'}
        />
        <div className="panel-row">
          {panelNames.map((name, i) => (
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
