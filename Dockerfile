FROM node:8.9-alpine

WORKDIR /app

ADD package.json yarn.lock ./

RUN yarn install

ADD . .

RUN yarn build

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]

