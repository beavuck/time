// src/utils/urlUtil.ts

import {URL} from 'node:url'
import {logger} from '../config/logger'
import {sanitizeForLog} from './stringUtil'

export function isSameOrigin(thisUrl?: URL, thatUrl?: URL): boolean {
  logger.debug(
    `Comparing origins: ${thisUrl?.origin ? sanitizeForLog(thisUrl?.origin) : undefined} and ${thatUrl?.origin ? sanitizeForLog(thatUrl?.origin) : undefined}`,
  )
  if (!thisUrl || !thatUrl) {
    return false
  }
  if (thisUrl.origin === thatUrl.origin) {
    return true
  }

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
    logger.warn(`Invalid URL string: ${sanitizeForLog(urlString)} (${error})`)
  }
  return undefined
}
