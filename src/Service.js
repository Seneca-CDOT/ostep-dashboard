import https from 'https';

class Service {
  constructor() {
    this.getData = this.getData.bind(this);
  }

  getData(containerName) {
    const url = containerName || "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        console.log(body);
        // console.log(
        //   `City: ${body.results[0].formatted_address} -`,
        //   `Latitude: ${body.results[0].geometry.location.lat} -`,
        //   `Longitude: ${body.results[0].geometry.location.lng}`
        // );
      });
    });
  }
}

export default Service;