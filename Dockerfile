FROM node:22-alpine

WORKDIR /app

RUN apk update

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

# Configure container network
EXPOSE 3000
CMD [ "src/main.js" ]