// src/middlewares/rateLimiter.ts

import rateLimit from 'express-rate-limit'

const NO_RATE_LIMIT = '-1'
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT ?? NO_RATE_LIMIT, 10)

const SECONDS_IN_ONE_MINUTE = 60
const MILLISECONDS_IN_ONE_SECOND = 1000
const ONE_MINUTE = SECONDS_IN_ONE_MINUTE * MILLISECONDS_IN_ONE_SECOND

export const rateLimiter =
  RATE_LIMIT > 0 ?
  rateLimit({windowMs: ONE_MINUTE, limit: RATE_LIMIT})
  : (_req: any, _res: any, next: any) => next()
