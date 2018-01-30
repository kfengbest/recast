FROM node:8.9-alpine

#RUN set -x \
#    && apt-get -q update \
#    && apt-get -yq install \
#       nodejs \
#       sqlite3 \
#       curl
#
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
#    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#    
#RUN apt-get -q update \
#    && apt-get -yq install yarn

WORKDIR /app

ADD package.json yarn.lock ./

RUN yarn install

ADD . .

RUN yarn build

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]

