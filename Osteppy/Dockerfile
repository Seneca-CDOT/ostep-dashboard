FROM node:10

# File Author / Maintainer
LABEL authors="OSTEP Team"

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install
RUN apt-get update 
RUN apt-get install -y python-pip
RUN pip install slacker

# Copy app source
COPY . /www

# Build the prod version
RUN  cd /www; npm run build

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 2001

# expose the port to outside world
EXPOSE 2001

# start command as per package.json
CMD ["node", "dist/server.js"]
