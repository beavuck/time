#!/usr/bin/env node

// src/server.ts

import {api} from './api'
import {logger} from './config/logger'
import {tryParseUrl} from './utils/urlUtil'
import dotenvx from '@dotenvx/dotenvx'
import http from 'http'

dotenvx.config({
  ignore: ['MISSING_ENV_FILE'],
})

type ServerOptions = {
  port?: number
  hostUrl?: string
  trustedOrigins?: string
}

function validateEnv({
  hostUrl,
  trustedOrigins,
}: Required<Pick<ServerOptions, 'hostUrl' | 'trustedOrigins'>>) {
  if (!hostUrl || !tryParseUrl(hostUrl)) {
    logger.error('HOST_URL not set or is not a valid URL')
    process.exit(1)
  }

  if (!trustedOrigins) {
    logger.error('TRUSTED_ORIGINS not set')
    process.exit(1)
  }
}

// FIXME the server options method causes an exception, npm users will have to use a .env file for now
export function startServer(options: ServerOptions = {}): http.Server {
  const API_PORT = options.port ?? process.env.BEAVUCK_TIME_API_PORT ?? 3000
  const HOST_URL = options.hostUrl ?? process.env.BEAVUCK_TIME_HOST_URL ?? ''
  const TRUSTED_ORIGINS =
    options.trustedOrigins ?? process.env.BEAVUCK_TIME_TRUSTED_ORIGINS ?? ''

  validateEnv({hostUrl: HOST_URL, trustedOrigins: TRUSTED_ORIGINS})

  const server = api.listen(API_PORT, () => {
    logger.info(
      `
| |                               | |                                          ,=.
| |__   ___  __ ___   ___   _  ___| | __                        ,=""""==.__.="  o".___
| '_ \\ / _ \\/ _\` \\ \\ / / | | |/ __| |/ /                  ,=.=="                  ___/
| |_) |  __/ (_| |\\ V /| |_| | (__|   <             ,==.,"    ,          , \\,===""
|_.__/ \\___|\\__,_| \\_/  \\__,_|\\___|_|\\_\\          <     ,==)  \\"'"=._.==)  \\
                                                    \`==''    \`"           \`"

 Beavuck Time microservice started successfully

 Ready on API port ${API_PORT} (if this is running in a container, this port number is internal to the container)
      `,
    )
  })

  server.on('error', (err: NodeJS.ErrnoException) => {
    logger.error(`Beavuck Time Server error [${err.code}]: ${err.message}`)
    process.exit(1)
  })

  const gracefulShutdown = (signal: string) => {
    logger.info(`${signal} signal received: closing HTTP server`)
    server.close(() => {
      logger.info('HTTP server closed')
      process.exit(0)
    })
  }

  const SIGTERM = 'SIGTERM'
  const SIGINT = 'SIGINT'
  process.on(SIGTERM, () => gracefulShutdown(SIGTERM))
  process.on(SIGINT, () => gracefulShutdown(SIGINT))

  return server
}

// Support running as standalone binary
if (require.main === module) {
  startServer()
}
