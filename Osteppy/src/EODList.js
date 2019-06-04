import path from "path";
import { promises as fs } from "fs";

export default class EODList {
  constructor({
    dataFile = path.join(__dirname, "eods.json"),
    unsubmittedNamesFile = path.join(__dirname, "sleepyRAs.txt")
  } = {}) {
    this.reportData = {};
    this.dataFile = dataFile;
    this.unsubmittedNames = [];
    this.unsubmittedNamesFile = unsubmittedNamesFile;
  }

  async load() {
    const results = await Promise.all([
      fs.readFile(this.dataFile, { encoding: "utf8", flag: "a+" }),
      fs.readFile(this.unsubmittedNamesFile, {
        encoding: "utf8",
        flag: "a+"
      })
    ]);
    const [reportData, unsubmittedNames] = results;

    try {
      this.reportData = JSON.parse(reportData);
    } catch (e) {
      console.log(`Error parsing ${this.dataFile}: ${e}`);
    }

    this.unsubmittedNames = unsubmittedNames.split("\n");
  }

  save() {
    return Promise.all([
      fs.writeFile(this.dataFile, JSON.stringify(this.reportData)),
      fs.writeFile(this.unsubmittedNamesFile, this.unsubmittedNames.join("\n"))
    ]);
  }

  submit(name, data) {
    this.reportData[name] = data;
    this.unsubmittedNames = this.unsubmittedNames.filter(n => n !== name);
    return this.save();
  }

  missing() {
    return this.unsubmittedNames;
  }

  report() {
    return this.reportData;
  }
}
