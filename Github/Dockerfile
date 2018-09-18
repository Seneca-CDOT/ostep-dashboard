FROM node

WORKDIR /usr/src/app

COPY package*.json ./

# ENV GITHUB_TOKEN $GITHUB_TOKEN

RUN npm install

COPY . .

EXPOSE 2006
CMD [ "npm", "start" ]
