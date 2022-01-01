FROM node:16

WORKDIR usr/src/app

COPY package*.json ./

run npm install

COPY /src .

EXPOSE 8080
CMD [ "node","index.js" ]
