import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const panelNames = ['github', 'infrastructure', 'ra presentations', 'eods', 'the lamp', 'room 1042'];
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
                  data={[1, 2, 3, 1, 2, 3, 1, 2, 3]}
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
