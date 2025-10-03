// src/config/corsOptions.ts

import {CorsOptions} from 'cors'
import {CorsError} from '../errors/corsError'
import {isSameOrigin, tryParseUrl} from '../utils/urlUtil'
import {StatusCodes} from 'http-status-codes'
import dotenvx from '@dotenvx/dotenvx'

dotenvx.config()

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
  HOST_URL = new URL(process.env.BEAVUCK_TIME_HOST_URL!)
}

export function getTrustedOrigins(): string[] {
  if (!TRUSTED_ORIGINS || TRUSTED_ORIGINS.length === 0) {
    initTrustedOrigins()
  }
  return TRUSTED_ORIGINS
}

export function initTrustedOrigins(): void {
  const trustedOrigins: string = process.env.BEAVUCK_TIME_TRUSTED_ORIGINS!
  TRUSTED_ORIGINS = trustedOrigins
    .split(',')
    .map(to => to.trim())
    .filter(to => to.length > 0)
}

export function isAllTrusted(): boolean {
  return getTrustedOrigins().includes('*')
}

export function isOriginAbsentOrTrusted(origin?: string): boolean {
  return (
    !origin ||
    getTrustedOrigins().includes(origin) ||
    getTrustedOrigins().some(to => to.includes('/*') && origin.startsWith(to))
  )
}
