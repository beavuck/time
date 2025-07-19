// src/api.ts

import express from 'express'
import {corsMiddleware} from './middlewares/corsMiddleware'
import {errorHandler} from './middlewares/errorHandler'
import {rateLimiter} from './middlewares/rateLimiter'
import {notFoundHandler} from './middlewares/notFoundHandler'
import {RegisterRoutes} from './routes/routes'

export const api = express()
api.disable('x-powered-by')

api.use(corsMiddleware)
api.use(errorHandler)
api.use(rateLimiter)

RegisterRoutes(api)

api.use(notFoundHandler)
