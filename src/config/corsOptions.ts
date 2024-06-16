// src/config/corsOptions.ts

import {CorsOptions} from 'cors'
import {CorsError} from '../errors/CorsError'
import {isSameOrigin, tryParseUrl} from '../utils/urlUtil'
import dotenv from 'dotenv'
import {StatusCodes} from 'http-status-codes'

dotenv.config()

const HOST_URL: URL | undefined = tryParseUrl(process.env.HOST_URL ?? '')
const TRUSTED_ORIGINS: string[] = process.env.TRUSTED_ORIGINS
  ? process.env.TRUSTED_ORIGINS.split(',')
  : [HOST_URL?.origin ?? '']

export const corsOptions: CorsOptions = {
  methods: ['GET', 'OPTIONS'],
  optionsSuccessStatus: StatusCodes.OK,
  origin: (origin, callback) => {
    if (
      isAllTrusted() ||
      isSameOrigin(HOST_URL, tryParseUrl(origin)) ||
      isOriginAbsentOrTrusted(origin)
    ) {
      callback(null, true)
    } else {
      callback(new CorsError(origin), false)
    }
  },
}

export function isAllTrusted(): boolean {
  return TRUSTED_ORIGINS.includes('*')
}

function isOriginAbsentOrTrusted(origin?: string): boolean {
  return !origin || TRUSTED_ORIGINS.includes(origin)
}
