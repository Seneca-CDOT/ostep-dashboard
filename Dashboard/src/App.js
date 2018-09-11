import React, { Component } from 'react';
import Header from './components/Header';
import Panel from './components/Panel';
import LongPanel from './components/LongPanel';
import Service from './Service.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const service = new Service();
    console.log(service.getData('https://jsonplaceholder.typicode.com/todos/1'));
    
  }
  render() {
    const panelNames = ['github', 'infrastructure', 'ra presentations', 'slack', 'eods', 'room 1042'];
    return (
      <div>
        <Header
          name={'ostep dashboard'}
        />
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
    );
  }
}

export default App;
