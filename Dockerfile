FROM dhi.io/node:24-alpine3.24-dev AS builder

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsoa.json ./
COPY src ./src

RUN npm run safe-install:ci && npm run build

FROM dhi.io/node:24-alpine3.24

WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/build ./build
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/package.json ./

EXPOSE 3000

CMD ["node", "build/server.js"]
