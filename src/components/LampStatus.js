import React from 'react';
import bulbOn from './assets/bulb-on.svg';
import bulbOff from './assets/bulb-off.svg';

class LampStatus extends React.Component {
    render() {
        return (
            <div className="lamp">
                <h2>DB 1036 LAMP IS ON</h2>
                <img className="bulb" src={bulbOn}></img>
            </div>
        );

    }
}

export default LampStatus;