// src/middlewares/corsMiddleware.ts

import cors from 'cors'
import {corsOptions} from '../config/corsOptions'
import {isSameOrigin, tryParseUrl} from '../utils/urlUtil'
import {CorsError} from '../errors/CorsError'
import express from 'express'
import logger from '../config/logger'
import {BeavuckTimeServerError} from '../errors/BeavuckTimeServerError'

export const corsMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const HOST_URL = tryParseUrl(process.env.HOST_URL ?? '')

  if (req.headers.origin) {
    logger.debug(`CORS request from ${req.headers.origin}`)
    cors(corsOptions)(req, res, next)
  } else if (!HOST_URL) {
    const noHostUrl = 'Host URL not set'
    next(new BeavuckTimeServerError(noHostUrl))
  } else if (isSameOrigin(HOST_URL, tryParseUrl(req.headers.referer ?? ''))) {
    next()
  } else {
    const badOriginAndOrReferer = `origin: ${req.headers.origin}, referer: ${req.headers.referer}`
    next(new CorsError(badOriginAndOrReferer))
  }
}
