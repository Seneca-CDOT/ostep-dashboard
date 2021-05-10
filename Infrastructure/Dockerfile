FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./Infrastructure/package*.json ./

RUN npm install
RUN apk update && apk add bind-tools
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./Infrastructure .

# Add config file
RUN mkdir /usr/src/config-files
COPY ./config-files/id_rsa  /usr/src/app
COPY ./config-files/infrastructure.js /usr/src/config-files

EXPOSE 80
CMD [ "npm", "start" ]
