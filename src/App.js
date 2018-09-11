import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import LongPanel from './components/LongPanel';
import './App.css';

class App extends Component {
  render() {
    const topPanels = ['github', 'infrastructure', 'ra presentations'];
    const bottomPanels = ['slack', 'eods', 'room 1042'];
    return (
      <div>
        <Header
          name={'ostep dashboard'}
        />
        <div className="container">
          <div className="panel-row">
            {topPanels.map((panel, i) => (
              <Panel
                key={i}
                title={panel}
              />
            ))}
          </div>
          <div className="panel-row">
            {bottomPanels.map((panel, i) => (
              <Panel
                key={i}
                title={panel}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
