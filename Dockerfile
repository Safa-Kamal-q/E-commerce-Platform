FROM node:latest

#working dir
WORKDIR /usr/src/app

#copy package json files
COPY package*.json ./

#install prettier 
RUN npm install prettier -g

#install files
RUN npm install

#copy source files
COPY . . 

# ecpode the api port
EXPOSE 3000

CMD ["npm","run","dev"]

