FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY ./index.js .

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

RUN chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3000

CMD ["node", "index.js"]
