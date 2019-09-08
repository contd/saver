FROM node:12.8.0

RUN npm i -g npm forever && \
  mkdir -p /app;

WORKDIR /app

RUN mkdir public models tools routes views

COPY ./public public
COPY ./models models
COPY ./tools tools
COPY ./routes routes
COPY ./views views
COPY ./package.json .
COPY ./yarn.lock .
COPY ./app.js .
COPY ./index.js .

VOLUME ["/cache"]

RUN rm node_modules -rf && npm install

CMD forever index.js

