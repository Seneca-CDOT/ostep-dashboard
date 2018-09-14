FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

# ENV GITHUB_TOKEN $GITHUB_TOKEN

RUN npm install

COPY . .

CMD [ "npm", "start" ]