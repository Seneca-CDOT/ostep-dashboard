const ping = require('ping');
const exec = require('child_process').exec;
const dig = require('node-dig-dns');
const {
  servers: serverList,
  workstations: workstationList,
  dnsQueryDomain,
  sshUser
} = require('./config.js');

const DIG_ARGS = ['ns'];
const SSH_TIMEOUT = 3;

const pingWorkstation = workstation => {
  return new Promise(resolve => {
    ping.sys.probe(workstation.address, isAlive => {
      workstation.status = isAlive ? 'up' : 'down';
      resolve(workstation);
    });
  });
};

const sshIntoServer = server => {
  return new Promise(resolve => {
    exec(
      `ssh -o "StrictHostKeyChecking no" -o ConnectTimeout=${SSH_TIMEOUT} -i id_rsa -p ${
        server.port
      } ${sshUser}@${server.domain} hostname`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          server.status = 'error';
        } else {
          server.status = data.includes(server.name) ? 'up' : 'down';
        }
        resolve(server);
      }
    );
  });
};

const checkWorkstations = () =>
  Promise.all(workstationList.map(workstation => pingWorkstation(workstation)));

const checkServers = () =>
  Promise.all(serverList.map(server => sshIntoServer(server)));

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
