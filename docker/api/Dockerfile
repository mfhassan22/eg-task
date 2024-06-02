FROM node:lts-alpine

RUN apk --update --no-cache add tzdata

WORKDIR /var/www/api

RUN npm i -g @nestjs/cli

EXPOSE 3000

CMD npm install glob rimraf && npm run build && node dist/main
