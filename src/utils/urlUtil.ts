// src/utils/urlUtil.ts

import {URL} from 'url'
import logger from '../config/logger'

export function isSameOrigin(thisUrl?: URL, thatUrl?: URL): boolean {
  if (!thisUrl || !thatUrl) return false
  if (thisUrl.origin === thatUrl.origin) return true

  return (
    thisUrl.protocol === thatUrl.protocol &&
    thisUrl.hostname === thatUrl.hostname &&
    thisUrl.port === thatUrl.port
  )
}

export function tryParseUrl(urlString?: string): URL | undefined {
  if (!urlString) {
    logger.debug('Empty URL string')
    return undefined
  }
  try {
    return new URL(urlString)
  } catch (error) {
    logger.warn(`Invalid URL string: ${urlString}`)
  }
  return undefined
}
