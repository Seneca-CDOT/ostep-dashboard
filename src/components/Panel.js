import React from 'react';
import refresh from './assets/refresh.svg'

class Panel extends React.Component {
  render() {
    return (
      <div className="panel-body">
        <div className="panel-title">
          <h3>
            {this.props.title.toUpperCase()}
          </h3>
          <div className="refresh-container">
            <img className="refresh" src={refresh}></img>
          </div>
        </div>
        <div className="panel-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna duis convallis convallis tellus id interdum velit laoreet id. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Nulla aliquet enim tortor at auctor. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Elementum integer enim neque volutpat ac tincidunt. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Elit sed vulputate mi sit amet. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Eget magna fermentum iaculis eu. Ultricies leo integer malesuada nunc. Nisl condimentum id venenatis a condimentum. Ullamcorper morbi tincidunt ornare massa eget. Amet justo donec enim diam vulputate. Vitae aliquet nec ullamcorper sit.
        </div>
      </div>
    );
  }
}

export default Panel;