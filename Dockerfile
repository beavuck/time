FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV API_PORT=3000
ENV API_KEY_KEY=time-api-key

CMD ["node", "index.js"]
