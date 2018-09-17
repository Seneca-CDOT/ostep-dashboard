
const dash_host = process.env.REACT_APP_OSTEP_DASH_HOST;

export default {
  eods: `http://${dash_host}:8081/eod`,
  db1042: `http://${dash_host}:8084`,
  presentations: `http://${dash_host}:8083`,
  lamp: `http://${dash_host}:8082`,
  infrastructure: `http://${dash_host}:8085`,
  github: `http://${dash_host}:8086`
}