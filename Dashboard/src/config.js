
const dashHost = process.env.REACT_APP_OSTEP_DASH_HOST || "localhost";

export default {
  osteppy: `http://bbb.cdot.systems:8081/eod`,
  lamp: `http://${dashHost}:8082`,
  presentations: `http://${dashHost}:8083`,
  meetings: `http://${dashHost}:8084`,
  infrastructure: `http://${dashHost}:8085`,
  github: `http://${dashHost}:8086`
}
