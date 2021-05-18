#specify base image

FROM node:current-alpine3.13

COPY . /app

WORKDIR /app

