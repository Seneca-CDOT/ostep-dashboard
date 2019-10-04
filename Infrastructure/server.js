const express = require('express');
const cors = require('cors');
const getStatus = require('./checkService.js');

const app = express();
const PORT = 80;

app.use(cors());

app.get('/', async (req, res) => {
  const status = await getStatus();
  res.json(status);
});

app.listen(PORT, () => {
  console.log(`Infrastructure Container running on localhost:${PORT}`);
});
