
## Docker

put ssh key for servers in build directory

RUN:

docker build -t infrastructure .

docker run -p 3200:3200 -d infrastructure


## Open Source Software Used

Node.JS + npm packages (ping, node-cmd, express, node-dig-dns)

