// src/utils/urlUtil.ts

import {URL} from 'url'
import {logger} from '../config/logger'

export function isSameOrigin(thisUrl?: URL, thatUrl?: URL): boolean {
  logger.debug(`Comparing origins: ${thisUrl?.origin} and ${thatUrl?.origin}`)
  if (!thisUrl || !thatUrl) return false
  if (thisUrl.origin === thatUrl.origin) return true

  const isSameProtocol = thisUrl.protocol === thatUrl.protocol
  const isSameHost = thisUrl.hostname === thatUrl.hostname
  const isSamePort = thisUrl.port === thatUrl.port

  return isSameProtocol && isSameHost && isSamePort
}

export function tryParseUrl(urlString?: string): URL | undefined {
  if (!urlString) {
    logger.debug('Empty URL string')
    return undefined
  }
  try {
    return new URL(urlString)
  } catch (error: unknown) {
    logger.warn(`Invalid URL string: ${urlString} (${error})`)
  }
  return undefined
}
