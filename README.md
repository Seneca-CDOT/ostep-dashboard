# Welcome to Ostep Dashboard!

Ostep dashboard

## Docker

### Firewall Configuration

Open port `80`:

`sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT`

Save Changes:
`sudo service iptables save`

### Debug Mode for UI

Enables running the frontend without the need to set up Docker or token by loading dummy data.
In the `Dashboard` folder run `npm i` to install dependencies, then `npm run debug`.

### Configuration Files:

    authentication.json
    github-token.json
    id_rsa (a private key with EHL access)

Create the above files in the `Dashboard/config-files/` directory.

##### Sample Configs:

##### `authentication.json:`

```
{
  "whitelist": ["127.0.0.1", "192.0.2.0/24"], // list of IPs that are permitted without authentication.
  "users": { "admin": "supersecret", "foo": "bar" } // key-value pairs for username & password for basic auth.
}
```

##### `github-token.json:`

```
{
  key: "dhj340gknmwuxzv3956b03bnf834j30"
}
```

##### `id_rsa:`

```
-----BEGIN OPENSSH PRIVATE KEY-----
ABCVAEWFOAFW...
-----END OPENSSH PRIVATE KEY-----
```

##### `infrastructure.json:`

```
module.exports = {
  servers: [
    {
      description: 'server',
      name: 'server1',
      domain: 'mydomain.mymachines.com',
      port: '3000'
    },
    {
      description: 'server',
      name: 'server2',
      domain: 'mydomain.mymachines.com',
      port: '3000'
    },
  ...
  ],
  workstations: [
    { host: 'workstation1', address: 'workstation1.mymachines.com' },
    { host: 'workstation2', address: 'workstation2.mymachines.systems' },
  ...
  ],
  dnsQueryDomain: 'mymachines.com',
  sshUser: 'admin'
};
```

### Docker compose

To build the containers:

`docker-compose up`
