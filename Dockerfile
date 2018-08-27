FROM node:8-alpine
WORKDIR /app
RUN mkdir -p /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

