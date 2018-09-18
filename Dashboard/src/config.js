
const dash_host = process.env.REACT_APP_OSTEP_DASH_HOST || "localhost";

export default {
  eods: `http://${dash_host}:8081/eod`,
  lamp: `http://${dash_host}:8082`,
  presentations: `http://${dash_host}:8083`,
  db1042: `http://${dash_host}:8084`,
  infrastructure: `http://${dash_host}:8085`,
  github: `http://${dash_host}:8086`
}
