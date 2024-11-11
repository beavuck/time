FROM node:jod-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY tsconfig.json ./
COPY tsoa.json ./
COPY src ./src

RUN npm run build \
&& apk add --no-cache shadow \
&& groupadd -r appgroup \
&& useradd -r -g appgroup appuser \
&& chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3000

CMD ["node", "build/server.js"]
