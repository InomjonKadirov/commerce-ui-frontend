### STAGE 1: Build ###
FROM node:12.18.3-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.19.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/commerce-ui-frontend /usr/share/nginx/html


