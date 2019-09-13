FROM node:10-alpine
WORKDIR /app
RUN mkdir -p /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g parcel
