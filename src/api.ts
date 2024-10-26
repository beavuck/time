// src/api.ts

import express from 'express'
import dotenv from 'dotenv'
import {corsMiddleware} from './middlewares/corsMiddleware'
import {errorHandler} from './middlewares/errorHandler'
import {rateLimiter} from './middlewares/rateLimiter'
import {notFoundHandler} from './middlewares/notFoundHandler'
import {RegisterRoutes} from './routes/routes'
import {logger} from './config/logger'

logger.info(`Starting Beavuck Time microservice`)

dotenv.config()

export const api = express()
api.disable('x-powered-by')

api.use(corsMiddleware)
api.use(errorHandler)
api.use(rateLimiter)

RegisterRoutes(api)

api.use(notFoundHandler)
