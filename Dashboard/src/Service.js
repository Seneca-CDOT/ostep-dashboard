import http from 'http';
import dummyData from './debug/dummy-data';

class Service {
  getData(containerName, cb) {
    if (process.env.REACT_APP_MODE === 'development') {
      cb(dummyData[containerName]);
    } else {
      http.get(containerName, res => {
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
            console.error(e);
          }
        });
      });
    }
  }
}

export default Service;
