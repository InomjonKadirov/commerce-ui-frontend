FROM node:alpine AS builder

WORKDIR /commerce-ui-frontend

COPY . .

RUN npm install && \
    npm run build --prod

FROM nginx:alpine

COPY --from=builder /commerce-ui-frontend/dist/* /usr/share/nginx/html/