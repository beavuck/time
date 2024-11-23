FROM node:jod-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsoa.json ./
COPY src ./src

# building the app
RUN npm install --ignore-scripts -g npm@latest \
&& npm ci --ignore-scripts \
&& npm run build \
# managing user permissions
&& apk add --no-cache shadow \
&& groupadd -r appgroup \
&& useradd -r -g appgroup appuser \
&& chown -R appuser:appgroup /usr/src/app \
# manually handling cross-spawn issue (FIXME remove this handling when node image is fixed)
&& npm uninstall -g cross-spawn  \
&& npm cache clean --force  \
&& find /usr/local/lib/node_modules -name "cross-spawn" -type d -exec rm -rf {} + \
&& npm install --ignore-scripts -g cross-spawn@^7.0.6 --force \
# making the image smaller by removing npm
&& npm uninstall -g npm@latest

USER appuser

EXPOSE 3000

CMD ["node", "build/server.js"]
