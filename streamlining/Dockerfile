#Node Container
FROM node:alpine as react-build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production --no-audit

COPY ./ ./
CMD ["npm", "run" ,"build"]


#Production using NginX
#FROM nginx:alpine
#COPY build/ /usr/share/nginx/html
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]