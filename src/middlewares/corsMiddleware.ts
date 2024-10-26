// src/middlewares/corsMiddleware.ts

import cors from 'cors'
import {isSameOrigin, tryParseUrl} from '../utils/urlUtil'
import {CorsError} from '../errors/CorsError'
import express from 'express'
import {logger} from '../config/logger'
import {BeavuckTimeServerError} from '../errors/BeavuckTimeServerError'
import {corsOptions} from '../config/corsOptions'

export const corsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const HOST_URL = tryParseUrl(process.env.HOST_URL ?? '')
  // 'referer' is a misspelling that was kept for compatibility: https://en.wikipedia.org/wiki/HTTP_referer
  const referrerHeader: string | undefined = req.headers.referrer as string || req.headers.referer
  if (req.headers.origin) {
    logger.debug(`CORS request from ${req.headers.origin}`)
    cors(corsOptions)(req, res, next)
  } else if (!HOST_URL) {
    const noHostUrl = 'Host URL not set'
    next(new BeavuckTimeServerError(noHostUrl))
  } else if (isSameOrigin(HOST_URL, tryParseUrl(referrerHeader ?? ''))) {
    next()
  } else {
    const badOriginAndOrReferrer = `origin: ${req.headers.origin}, referrer: ${referrerHeader}`
    next(new CorsError(badOriginAndOrReferrer))
  }
}
