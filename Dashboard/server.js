const express = require('express');
const request = require('request');
const path = require('path');
const basicAuth = require('express-basic-auth');
const { IpFilter, IpDeniedError } = require('express-ipfilter');
const { whitelist, users } = require('../config-files/authentication');

const PORT = process.env.PORT || 8080;
const app = express();

if (whitelist) {
  app.use(IpFilter(whitelist, { mode: 'allow' }));
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/data/:containerName', (req, res) => {
  request(req.params.containerName, (_error, _response, body) => {
    res.json(body);
  });
});

app.get('/osteppy/:endpoint', (req, res) => {
  request(`osteppy/${req.params.endpoint}`, (_error, _response, body) => {
    res.json(body);
  });
});

app.use((err, _req, res, next) => {
  console.error('Error handler:', err);
  if (err instanceof IpDeniedError) {
    next();
  } else {
    res.status(err.status || 500).json({ message: err.message });
  }
});

app.use(basicAuth({ challenge: true, users }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard container is listening on port ${PORT}`);
});
