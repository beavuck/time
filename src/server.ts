#!/usr/bin/env node

// src/server.ts

import {api} from './api'
import {logger} from './config/logger'
import {tryParseUrl} from './utils/urlUtil'
import dotenvx from '@dotenvx/dotenvx'
import http from 'node:http'

// Load environment variables from .env file, if available
// but don't error if the file is missing
dotenvx.config({
  ignore: ['MISSING_ENV_FILE'],
})

export function startServer(options: ServerOptions = {}): http.Server {
  manageEnvVars(options)

  const server = api.listen(process.env.BEAVUCK_TIME_API_PORT, () => {
    logger.info(
      `
| |                               | |                                          ,=.
| |__   ___  __ ___   ___   _  ___| | __                        ,=""""==.__.="  o".___
| '_ \\ / _ \\/ _\` \\ \\ / / | | |/ __| |/ /                  ,=.=="                  ___/
| |_) |  __/ (_| |\\ V /| |_| | (__|   <             ,==.,"    ,          , \\,===""
|_.__/ \\___|\\__,_| \\_/  \\__,_|\\___|_|\\_\\          <     ,==)  \\"'"=._.==)  \\
                                                    \`==''    \`"           \`"

 Beavuck Time microservice started successfully

 Ready on API port ${process.env.BEAVUCK_TIME_API_PORT} (if this is running in a container, this port number is internal to the container)
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

type ServerOptions = {
  apiPort?: number | string
  hostUrl?: string
  trustedOrigins?: string
}

function manageEnvVars(options: ServerOptions) {
  logger.info('serverOptions: ' + JSON.stringify(options))

  process.env.BEAVUCK_TIME_API_PORT =
    options.apiPort === undefined ? '3000' : String(options.apiPort)
  logger.debug('API_PORT: ' + process.env.BEAVUCK_TIME_API_PORT)

  process.env.BEAVUCK_TIME_HOST_URL =
    options.hostUrl ?? process.env.BEAVUCK_TIME_HOST_URL
  logger.debug('HOST_URL: ' + process.env.BEAVUCK_TIME_HOST_URL)

  process.env.BEAVUCK_TIME_TRUSTED_ORIGINS =
    options.trustedOrigins ?? process.env.BEAVUCK_TIME_TRUSTED_ORIGINS
  logger.debug('TRUSTED_ORIGINS: ' + process.env.BEAVUCK_TIME_TRUSTED_ORIGINS)

  validateEnv()
}

function validateEnv() {
  if (!process.env.BEAVUCK_TIME_HOST_URL || !tryParseUrl(process.env.BEAVUCK_TIME_HOST_URL)) {
    logger.error('HOST_URL not set or is not a valid URL')
    process.exit(1)
  }

  if (!process.env.BEAVUCK_TIME_TRUSTED_ORIGINS) {
    logger.error('TRUSTED_ORIGINS not set')
    process.exit(1)
  }
}

// Support running as standalone binary
if (require.main === module) {
  startServer()
}
