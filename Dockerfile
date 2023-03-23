FROM node:lts-alpine as frontend

WORKDIR /app
COPY client/package.json .
COPY client/yarn.lock .
RUN yarn
COPY client .
RUN yarn build

FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
COPY --from=frontend /app/build ./build
CMD npm start