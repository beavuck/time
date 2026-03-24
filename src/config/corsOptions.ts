// src/config/corsOptions.ts

import {CorsOptions} from 'cors'
import {CorsError} from '../errors/corsError'
import {isSameOrigin, tryParseUrl} from '../utils/urlUtil'
import {StatusCodes} from 'http-status-codes'

export const corsOptions: CorsOptions = {
  methods: ['GET', 'OPTIONS'],
  optionsSuccessStatus: StatusCodes.OK,
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void => {
    if (!origin || isAllTrusted() || isSameOrigin(getHostUrl(), tryParseUrl(origin)) || isOriginTrusted(origin)) {
      // eslint-disable-next-line no-restricted-syntax -- the http external library expects null
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

export function isOriginTrusted(origin: string): boolean {
  if (getTrustedOrigins().includes(origin)) {
    return true
  }

  return getTrustedOrigins().some(trusted => {
    const trustedPattern = trusted.replace(/\/\*$/, '')
    try {
      const trustedUrl = new URL(trustedPattern)
      const originUrl = new URL(origin)
      return (
        trustedUrl.protocol === originUrl.protocol &&
        trustedUrl.hostname === originUrl.hostname &&
        trustedUrl.port === originUrl.port
      )
    } catch {
      return false
    }
  })
}
