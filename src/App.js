import React, { Component } from 'react';
import Title from './components/Title';
import Panel from './components/Panel';
import './App.css';

class App extends Component {
  render() {
    const panels = ['github', 'slack', '1042']
    return (
      <div>
        <Title
          name={'ostep dashboard'}
        />
        <div className="container">
          <div className="panel-row">
            {panels.map((panel, i) => (
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
