# Welcome to Ostep Dashboard!

Ostep dashboard 


## Docker

### Firewall Configuration

Open port `80`:

`sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT`

Slack will need to reach the Osteppy container at port `8081`:

`sudo iptables -I INPUT 1 -p tcp --dport 8081 -j ACCEPT`

Restrict access to the components:

```
sudo iptables -A INPUT -p tcp --destination-port 8082 -j DROP
sudo iptables -A INPUT -p tcp --destination-port 8083 -j DROP
sudo iptables -A INPUT -p tcp --destination-port 8084 -j DROP
sudo iptables -A INPUT -p tcp --destination-port 8085 -j DROP
sudo iptables -A INPUT -p tcp --destination-port 8086 -j DROP
```

Save Changes:
` sudo service iptables save`

### Debug Mode for UI

Enables running the frontend without the need to set up Docker or token by loading dummy data.
In the `Dashboard` folder run `npm i` to install dependencies, then `npm run debug`. 

### Create github.env File for Github Component

in the project root directory, add this line to `github.env`

```
GITHUB_TOKEN={token}
```

### Docker compose

To build the containers:

`docker-compose up`
