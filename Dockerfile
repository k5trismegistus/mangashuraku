FROM node:8-alpine
RUN apk --update add imagemagick && rm -rf /var/cache/apk/*
WORKDIR /app
RUN mkdir -p /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
