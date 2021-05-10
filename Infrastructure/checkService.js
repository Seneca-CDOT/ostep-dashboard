const ping = require('ping');
const exec = require('child_process').exec;
const dig = require('node-dig-dns');
const {
  servers: serverList,
  workstations: workstationList,
  dnsQueryDomain,
  sshUser
} = require('../config-files/infrastructure.js');

const DIG_ARGS = ['ns'];
const SSH_TIMEOUT = 3;

const pingWorkstation = async workstation => {
  const { alive } = await ping.promise.probe(workstation.address);
  workstation.status = alive ? 'up' : 'down';
  return workstation;
};

const checkWorkstations = () =>
  Promise.all(workstationList.map(workstation => pingWorkstation(workstation)));

const checkServers = () =>
  Promise.all(serverList.map(server => pingWorkstation(server)));

const checkDNS = async () => {
  try {
    const digResult = await dig([dnsQueryDomain, ...DIG_ARGS]);
    return digResult.answer;
  } catch (error) {
    return error;
  }
};

const getStatus = async () => {
  try {
    const [workstations, servers, dns] = await Promise.all([
      checkWorkstations(),
      checkServers(),
      checkDNS()
    ]);
    return { workstations, servers, dns };
  } catch (error) {
    return { message: error };
  }
};

module.exports = getStatus;
