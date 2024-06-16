// src/app.ts

import express from 'express'
import dotenv from 'dotenv'
import {corsMiddleware} from './middlewares/corsMiddleware'
import {errorHandler} from './middlewares/errorHandler'
import {rateLimiter} from './middlewares/rateLimiter'
import nowController from './controllers/nowController'
import logger from './config/logger'

logger.info(`Starting Beavuck Time microservice`)

dotenv.config()

const api = express()
api.disable('x-powered-by')

api.use(corsMiddleware)
api.use(errorHandler)
api.use(rateLimiter)

api.use(nowController)

export default api
