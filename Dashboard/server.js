const express = require('express');
const request = require('request');
const path = require('path');
const basicAuth = require('express-basic-auth');
const { IpFilter, IpDeniedError } = require('express-ipfilter');
const { whitelist, users } = require('../config-files/authentication');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(IpFilter(whitelist, { mode: 'allow' }));

app.use((err, req, res, next) => {
  console.error('IN FIRST Error handler:', err);
  if (err instanceof IpDeniedError) {
    next();
  } else {
    next(err);
  }
}, basicAuth({ challenge: true, users }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/data/:containerName', (req, res, next) => {
  request(`http://${req.params.containerName}`, (error, _response, body) => {
    if (error) next(error);
    res.send(body);
  });
});

app.use((err, _req, res, next) => {
  console.error('Error handler:', err);
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard container is listening on port ${PORT}`);
});
