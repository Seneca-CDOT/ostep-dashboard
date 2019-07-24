FROM node:10

# File Author / Maintainer
LABEL authors="OSTEP Team"

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install
RUN apt-get update 
RUN apt-get install -y ntp

# Copy app source
COPY . /www

# Build the prod version
RUN  cd /www; npm run build

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 80

# set the timezone
ENV TZ=America/Toronto
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# expose the port to outside world
EXPOSE 80

# start command as per package.json
CMD ["node", "dist/server.js"]