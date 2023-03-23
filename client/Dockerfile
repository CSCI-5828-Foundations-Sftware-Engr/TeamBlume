FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package.json .
RUN yarn
COPY . .

RUN yarn build

# Stage 2
FROM nginx:stable-alpine

COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'