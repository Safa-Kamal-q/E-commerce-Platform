FROM node:16.20.1

#working dir
WORKDIR /app

#copy package json files
COPY package*.json ./

#install files
RUN npm install

#copy source files
COPY . . 

# ecpode the api port
EXPOSE 3000

CMD ["npm","run","dev"]

