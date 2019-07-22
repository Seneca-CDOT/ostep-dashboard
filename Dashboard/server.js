const express = require('express');
const request = require('request');
const path = require('path');
const { IpFilter, IpDeniedError } = require('express-ipfilter');
const { isEnabled, ipsAllowed } = require('../config-files/whitelist');

const PORT = process.env.PORT || 80;
const app = express();

if (isEnabled) {
  app.use(IpFilter(ipsAllowed, { mode: 'allow' }));
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/data/:containerName', (req, res) => {
  request(req.params.containerName, (_error, _response, body) => {
    res.json(body);
  });
});

app.use((err, _req, res, _next) => {
  console.error('Error handler:', err);
  if (err instanceof IpDeniedError) {
    console.log('You shall not pass!');
    res.end();
  } else {
    res.status(err.status || 500).json({ message: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard container is listening on port ${PORT}`);
});
