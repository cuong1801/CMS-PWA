
FROM node:10-alpine

RUN mkdir -p /home/node/schance-front-alpha/node_modules && chown -R node:node /home/node/schance-front-alpha

WORKDIR /home/node/schance-front-alpha

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

EXPOSE 7002

CMD [ "npm", "start" ]
