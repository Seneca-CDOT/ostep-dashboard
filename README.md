# Welcome to the OSTEP Dashboard!

![Alt text](repo-resources/ostep-demo.png 'Dashboard Image')

## Docker
### Debug Mode for UI

Enables running the frontend without the need to set up Docker or token by loading dummy data.
In the `Dashboard` folder run `npm i` to install dependencies, then `npm run debug`.

### Configuration Files:

    authentication.json
    github-token.json
    id_rsa (a private key with EHL access)

Create the above files in the `config-files/` directory.

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

##### `github-whitelist.json:`

```
{
  repos: ["repo1", "repo2", "repo3"]
}
```

##### `id_rsa:`

```
-----BEGIN OPENSSH PRIVATE KEY-----
ABCVAEWFOAFW...
-----END OPENSSH PRIVATE KEY-----
```

##### `infrastructure.js:`

```
module.exports = {
  servers: [
    { name: 'server1', address: 'mydomain.mymachines.com' },
    { name: 'server2', address: 'mydomain.mymachines.com' },
  ...
  ],
  workstations: [
    { host: 'workstation1', address: 'workstation1.mymachines.com' },
    { host: 'workstation2', address: 'workstation2.mymachines.com' },
  ...
  ],
  dnsQueryDomain: 'mymachines.com',
  sshUser: 'admin'
};
```

### Docker compose

To build the containers:

`docker-compose up`
