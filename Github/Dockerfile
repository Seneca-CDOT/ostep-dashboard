FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./Github/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./Github .

# Add config file
RUN mkdir /usr/src/config-files
COPY ./config-files/github-token.json /usr/src/config-files

EXPOSE 80
CMD [ "npm", "start" ]
