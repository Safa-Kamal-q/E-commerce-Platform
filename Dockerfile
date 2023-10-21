FROM node:latest

#working dir
WORKDIR /usr/src/app

#copy package json files
COPY package*.json ./

#install files
RUN npm install

#copy source files
COPY . . 


CMD ["npm","run","dev"]

