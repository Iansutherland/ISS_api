#specify base image

FROM node:current-alpine3.13

COPY . /app

WORKDIR /app

RUN npm install

CMD node ./scrapeISS.js