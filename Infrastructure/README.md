
## Preparation

put ssh private key named as id_rsa for servers in build directory

## Docker

`docker build -t infrastructure .`

`docker run -p 8086:2006 -d infrastructure`

## Open Source Software Used

Node.JS + npm packages (ping, node-cmd, express, node-dig-dns)

## Licence

Licenced under MIT Licence and DBAD
