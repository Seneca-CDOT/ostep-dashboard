# Welcome to Ostep Dashboard!

Ostep dashboard displays 


## Docker

### Open Osteppy port for Slack

Slack will need to reach the Osteppy container at port `8081`:

`sudo iptables -I INPUT 1 -p tcp --dport 8081 -j ACCEPT`

### Create github.env File for Github Component

in the project root directory, add this line to `github.env`

```
GITHUB_TOKEN={token}
```

### Docker compose

To build the containers:

`docker-compose up`
