FROM node:16-alpine AS BUILD_IMAGE

WORKDIR app

ADD ./package.json .
RUN npm i

ADD . .
RUN npm run build



FROM node:16-alpine

WORKDIR app

COPY --from=BUILD_IMAGE app/dist ./dist
COPY --from=BUILD_IMAGE app/node_modules ./node_modules
COPY --from=BUILD_IMAGE app/.env ./.env
COPY --from=BUILD_IMAGE app/package.json ./package.json

EXPOSE 5000

CMD ["npm", "run", "start"]