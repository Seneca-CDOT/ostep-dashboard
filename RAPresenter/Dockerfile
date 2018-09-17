FROM node:8
# use another image as a template, using offical node image and version 7
WORKDIR /usr/src/app
#working directory where code is to be inside docker container  
COPY package*.json ./
RUN npm install
COPY . .
# copy dependancies into working directory, run npm, and install dependencies 
EXPOSE 8083
CMD [ "node", "index.js"]
#on port 8083
