FROM node:krypton-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsoa.json ./
COPY src ./src
COPY .env ./.env

RUN npm install --ignore-scripts -g npm@latest \
&& npm ci --ignore-scripts \
&& npm run build \
&& apk add --no-cache shadow \
&& groupadd -r appgroup \
&& useradd -r -g appgroup appuser \
&& chown -R appuser:appgroup /usr/src/app \
&& npm uninstall -g npm

USER appuser

EXPOSE 3000

CMD ["node", "build/server.js"]
