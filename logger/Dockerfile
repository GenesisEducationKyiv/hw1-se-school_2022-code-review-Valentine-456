FROM node:16-alpine AS BUILD_IMAGE

WORKDIR logger

ADD ./package.json .
RUN npm i

ADD . .
RUN npm run build



FROM node:16-alpine

WORKDIR logger

COPY --from=BUILD_IMAGE logger/dist ./dist
COPY --from=BUILD_IMAGE logger/node_modules ./node_modules
COPY --from=BUILD_IMAGE logger/.env ./.env
COPY --from=BUILD_IMAGE logger/package.json ./package.json

EXPOSE 5001

CMD ["npm", "run", "start"]