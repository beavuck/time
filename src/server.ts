// src/server.ts

import {api} from './api'
import dotenv from 'dotenv'
import {logger} from './config/logger'
import {tryParseUrl} from './utils/urlUtil'

dotenv.config()

const API_PORT = process.env.API_PORT ?? 3000

const HOST_URL = process.env.HOST_URL ?? ''
const TRUSTED_ORIGINS = process.env.TRUSTED_ORIGINS ?? ''

const SIGTERM = 'SIGTERM'
const SIGINT = 'SIGINT'

if (!HOST_URL || !tryParseUrl(HOST_URL)) {
  logger.error('HOST_URL not set in environment variables (or is not a valid URL)')
  process.exit(1)
}

if (!TRUSTED_ORIGINS) {
  logger.error('TRUSTED_ORIGINS not set in environment variables')
  process.exit(1)
}

const server = api.listen(API_PORT, () => {
  logger.info(
    `Ready on API port ${API_PORT} (if this is running in a container, this port number is internal to the container)`,
  )
})

const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} signal received: closing HTTP server`)
  server.close(() => {
    logger.info('HTTP server closed')
    process.exit(0)
  })
}

process.on(SIGTERM, () => gracefulShutdown(SIGTERM))
process.on(SIGINT, () => gracefulShutdown(SIGINT))
