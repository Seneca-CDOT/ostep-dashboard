import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import './App.css';

class App extends Component {
  render() {
    const panelNames = ['github', 'infrastructure', 'presentations', 'eods', 'lamp', 'db1042'];
    return (
      <div>
        <Header
          name={'ostep dashboard'}
        />
        <div className="main-content">
          <div className="container">
            <div className="panel-row">
              {panelNames.map((name, i) => (
                <Panel
                  key={i}
                  title={name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
