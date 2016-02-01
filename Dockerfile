FROM node:0.12-slim
MAINTAINER Paul Nechifor

RUN mkdir -p /app/build/bower
ADD /package.json /app/package.json
ADD /backend /app/backend
ADD /build/bundle /app/build/bundle
ADD /build/bower/bootswatch-dist /app/build/bower/bootswatch-dist

RUN cd /app; npm i --production --ignore-scripts

ENTRYPOINT node /app/backend/main.js
EXPOSE 3000
