FROM node:22-alpine3.21

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsoa.json ./
COPY src ./src
COPY .env ./.env

# building the app
RUN npm install --ignore-scripts -g npm@latest \
&& npm ci --ignore-scripts \
&& npm run build \
# managing user permissions
&& apk add --no-cache shadow \
&& groupadd -r appgroup \
&& useradd -r -g appgroup appuser \
&& chown -R appuser:appgroup /usr/src/app \
# making the image smaller by removing npm
&& npm uninstall -g npm

USER appuser

EXPOSE 3000

CMD ["node", "build/server.js"]
