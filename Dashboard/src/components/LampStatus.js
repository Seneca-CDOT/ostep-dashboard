import React from 'react';
import bulbOn from './assets/bulb-on.svg';
import bulbOff from './assets/bulb-off.svg';

class LampStatus extends React.Component {
    render() {
        const status = this.props.status || "Off";
        return (
            <div className="lamp">
                <h2>DB 1036 LAMP IS {status}</h2>
                <img className="bulb" src={bulbOff} alt={""}/>
            </div>
        );

    }
}

export default LampStatus;