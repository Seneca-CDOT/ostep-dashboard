const express = require('express');
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
  const { containerName } = req.params;
  res.send(containerName);
});

app.use((err, req, res, next) => {
  console.error('Error handler:', err);
  if (err instanceof IpDeniedError) {
    res.status(401);
  } else {
    res.status(err.status || 500).json({ message: err });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Dashboard container is listening on port ${PORT}`);
});
