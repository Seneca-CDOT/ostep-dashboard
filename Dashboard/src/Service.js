import https from 'https';
import http from 'http';
import config from './config.js';

class Service {
  getData(containerName, cb) {
    const url = config[containerName];
    http.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        console.log(body);
        cb(body);
      });
    });
  }
}

export default Service;