// src/config/logger.ts

import {createLogger, format, transports} from 'winston'
import 'winston-daily-rotate-file'
import dotenvx from '@dotenvx/dotenvx'

dotenvx.config()

const LOGS_DIR = 'logs'
const LOG_LEVEL: string = process.env.LOG_LEVEL ?? 'info'
const MAX_LOG_FILES: string | number = process.env.MAX_LOG_FILES ?? 64
const MAX_SIZE_LOG_FILES: string = process.env.MAX_SIZE_LOG_FILES ?? '1m'

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${LOGS_DIR}/%DATE%-combined.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: MAX_SIZE_LOG_FILES,
  maxFiles: MAX_LOG_FILES,
})

export const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.timestamp(),
    format.printf(({timestamp, level, message}) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${LOGS_DIR}/error.log`,
      level: 'error',
    }),
    dailyRotateFileTransport,
  ],
})
