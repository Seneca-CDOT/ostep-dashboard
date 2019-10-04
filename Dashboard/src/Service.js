import http from 'http';
import dummyData from './debug/dummy-data';

class Service {
  getData(containerName, cb) {
    if (process.env.REACT_APP_MODE === 'development') {
      cb(dummyData[containerName]);
    } else {
      http.get(`data/${containerName}`, res => {
        const { statusCode } = res;

        if (statusCode !== 200) {
          throw new Error(
            `Request to ${containerName} failed. Status code: ${statusCode}`
          );
        }

        res.setEncoding('utf8');
        let body = '';

        res.on('error', function(e) {
          throw new Error(
            `Could not fetch data for ${containerName}: ${e.message}`
          );
        });

        res.on('data', data => {
          body += data;
        });

        res.on('end', () => {
          body = JSON.parse(body);
          if (typeof body !== 'object') {
            throw new Error(
              `Invalid type after parsing ${containerName} body: ${typeof body}`
            );
          }
          cb(body);
        });
      });
    }
  }
}

export default Service;
