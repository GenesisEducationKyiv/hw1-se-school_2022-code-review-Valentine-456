FROM node:16

WORKDIR currencyRate

ADD ./package.json .
RUN npm i

ADD . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
