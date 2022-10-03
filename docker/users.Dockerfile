FROM node:16

WORKDIR users

ADD ./package.json .
RUN npm i

ADD . .
RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start"]