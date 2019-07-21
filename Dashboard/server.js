const express = require('express');
const path = require('path');
const { IpFilter, IpDeniedError } = require('express-ipfilter');
const whitelist = require('../config-files/whitelist');

const PORT = process.env.PORT || 80;
const app = express();

app.use(IpFilter(whitelist, { mode: 'allow' }));
app.use(express.static(path.join(__dirname, 'build')));

app.use((err, req, res, next) => {
  console.log('Error handler', err);
  if (err instanceof IpDeniedError) {
    res.status(401);
  } else {
    res.status(err.status || 500);
  }

  res.send('You shall not pass.');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`listening on ${PORT}`);
});
