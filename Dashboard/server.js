const app = require('express')();
const path = require('path');
const { IpFilter } = require('express-ipfilter');
const PORT = process.env.PORT || 80;
const whitelist = require('../config-files/whitelist.json');

app.use(IpFilter(whitelist));

app.get('/', (req, res) => {
  res.json(req.ip);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
