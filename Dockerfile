FROM node:alpine as commerce-ui-frontend

RUN apk update && apk add --no-cache make git

WORKDIR /app

COPY commerce-ui-frontend/package*.json  /app/

RUN npm install @angular/cli@9.0.1 -g \
    && npm ci

COPY commerce-ui-frontend  /app

EXPOSE 4201

CMD ng serve --port 4201 --host 0.0.0.0 --disable-host-check





#### STAGE 1: Build ###
#FROM node:12.7-alpine AS build
#WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#### STAGE 2: Run ###
#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /app/dist/commerce-ui-frontend /usr/share/nginx/html


