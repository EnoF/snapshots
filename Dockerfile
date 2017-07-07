FROM node:8

WORKDIR /usr/src

COPY package.json /usr/src/package.json
RUN npm install

COPY . /usr/src
