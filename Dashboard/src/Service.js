import http from 'http';
import config from './config.js';
import dummyData from './debug/dummy-data';

class Service {
  getData(containerName, cb) {
    if (process.env.REACT_APP_MODE === 'development') {
      cb(dummyData[containerName]);
      return;
    }
    const url = config[containerName];
    http.get(url, res => {
      res.setEncoding('utf8');
      let body = '';
      res.on('error', function(e) {
        console.error(e.message);
      });
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        try {
          body = JSON.parse(body);
          cb(body);
        } catch (e) {
          console.log('INVALID JSON');
          console.log(e);
        }
      });
    });
  }
}

export default Service;
