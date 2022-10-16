FROM node:16-alpine AS BUILD_IMAGE

WORKDIR customers

ADD ./package.json .
RUN npm i

ADD . .
RUN npm run build



FROM node:16-alpine

WORKDIR customers

COPY --from=BUILD_IMAGE customers/dist ./dist
COPY --from=BUILD_IMAGE customers/node_modules ./node_modules
COPY --from=BUILD_IMAGE customers/.env ./.env
COPY --from=BUILD_IMAGE customers/package.json ./package.json

EXPOSE 5002

CMD ["npm", "run", "start"]