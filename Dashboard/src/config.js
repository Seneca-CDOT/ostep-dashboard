
const dash_host = process.env.REACT_APP_OSTEP_DASH_HOST;

export default {
  eods: `http://${dash_host}:8081/eod`,
  lamp: `http://${dash_host}:8082`,
  presentations: `http://${dash_host}:8083`,
  db1042: `http://${dash_host}:8084`,
  infrastructure: `http://${dash_host}:8085`,
  github: `http://${dash_host}:8086`

  // Uncomment below for testing locally
  // eods: `http://localhost:8081/eod`,
  // lamp: `http://localhost:8082`,
  // presentations: `http://localhost:8083`,
  // db1042: `http://localhost:8084`,
  // infrastructure: `http://localhost:8085`,
  // github: `http://localhost:8086`
}
