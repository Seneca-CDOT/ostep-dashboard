
const dash_host = process.env.REACT_APP_OSTEP_DASH_HOST || "localhost";

export default {
  osteppy: `http://narnia.cdot.systems:8081/eod`,
  lamp: `http://${dash_host}:8082`,
  presentations: `http://${dash_host}:8083`,
  meetings: `http://${dash_host}:8084`,
  infrastructure: `http://${dash_host}:8085`,
  github: `http://${dash_host}:8086`
}
