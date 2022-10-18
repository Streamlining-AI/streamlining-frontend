#Node Container
FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production --no-audit

COPY ./ ./
CMD ["npm", "run" ,"build"]


#Production using NginX
FROM nginx:alpine
COPY build/ /usr/share/nginx/html
