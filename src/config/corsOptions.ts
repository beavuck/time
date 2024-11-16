// src/config/corsOptions.ts

import {CorsOptions} from 'cors'
import {CorsError} from '../errors/CorsError'
import {isSameOrigin, tryParseUrl} from '../utils/urlUtil'
import {StatusCodes} from 'http-status-codes'
import dotenv from 'dotenv'

dotenv.config()

export const corsOptions: CorsOptions = {
  methods: ['GET', 'OPTIONS'],
  optionsSuccessStatus: StatusCodes.OK,
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ): void => {
    if (
      isAllTrusted() ||
      isSameOrigin(getHostUrl(), tryParseUrl(origin)) ||
      isOriginAbsentOrTrusted(origin)
    ) {
      // eslint-disable-next-line no-restricted-syntax
      callback(null, true)
    } else {
      callback(new CorsError(origin), false)
    }
  },
}

let HOST_URL: URL
let TRUSTED_ORIGINS: string[]

export function getHostUrl(): URL | undefined {
  if (!HOST_URL) {
    initHostUrl()
  }
  return HOST_URL
}

export function initHostUrl(): void {
  HOST_URL = new URL(process.env.HOST_URL!)
}

export function getTrustedOrigins(): string[] {
  if (!TRUSTED_ORIGINS || TRUSTED_ORIGINS.length === 0) {
    initTrustedOrigins()
  }
  return TRUSTED_ORIGINS
}

export function initTrustedOrigins(): void {
  const trustedOrigins: string = process.env.TRUSTED_ORIGINS!
  TRUSTED_ORIGINS = trustedOrigins.split(',')
}

export function isAllTrusted(): boolean {
  return getTrustedOrigins().includes('*')
}

export function isOriginAbsentOrTrusted(origin?: string): boolean {
  return !origin || getTrustedOrigins().includes(origin)
}
