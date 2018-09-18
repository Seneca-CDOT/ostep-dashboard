FROM node

# File Author / Maintainer
LABEL authors="OSTEP Team"

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 2001

# expose the port to outside world
EXPOSE 2001

# start command as per package.json
CMD ["npm", "run", "build"]
CMD ["npm", "start"]
