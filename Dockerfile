FROM node:16

WORKDIR app

ADD ./package.json .
RUN npm i

ADD . .
RUN npm run build:ts

EXPOSE 5000

CMD ["npm", "run", "start"]