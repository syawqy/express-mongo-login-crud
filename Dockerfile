FROM node:16-alpine3.11
    
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run server
EXPOSE 3000