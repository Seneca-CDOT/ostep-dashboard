import http from 'http';
import dummyData from './debug/dummy-data';

class Service {
  getData(containerName, cb) {
    if (process.env.REACT_APP_MODE === 'development') {
      cb(dummyData[containerName]);
    } else {
      http.get(`data/${containerName}`, res => {
        res.setEncoding('utf8');
        let body = '';

        res.on('error', function(e) {
          console.error(e.message);
          cb(null);
        });

        res.on('data', data => {
          body += data;
        });

        res.on('end', () => {
          console.log(`${containerName}'s body: ${body}`)
          try {
            body = JSON.parse(body);
            console.log(`Parsed body: ${body}`)
            if (typeof body !== 'object') {
              throw new Error('Invalid type after parsing JSON body');
            }
            cb(body);
          } catch (e) {
            console.error(`Error parsing ${containerName} data: ${e}`);
            cb(null);
          }
        });
      });
    }
  }
}

export default Service;
