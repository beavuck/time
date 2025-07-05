// src/api.ts

import express from 'express'
import {corsMiddleware} from './middlewares/corsMiddleware'
import {errorHandler} from './middlewares/errorHandler'
import {rateLimiter} from './middlewares/rateLimiter'
import {notFoundHandler} from './middlewares/notFoundHandler'
import {RegisterRoutes} from './routes/routes'
import {logger} from './config/logger'
import dotenvx from '@dotenvx/dotenvx'

dotenvx.config()

logger.info(`
| |                               | |                                          ,=.
| |__   ___  __ ___   ___   _  ___| | __                        ,=""""==.__.="  o".___
| '_ \\ / _ \\/ _\` \\ \\ / / | | |/ __| |/ /                  ,=.=="                  ___/
| |_) |  __/ (_| |\\ V /| |_| | (__|   <             ,==.,"    ,          , \\,===""
|_.__/ \\___|\\__,_| \\_/  \\__,_|\\___|_|\\_\\          <     ,==)  \\"'"=._.==)  \\
                                                    \`==''    \`"           \`"
 \n\nStarting Beavuck Time microservice`)

export const api = express()
api.disable('x-powered-by')

api.use(corsMiddleware)
api.use(errorHandler)
api.use(rateLimiter)

RegisterRoutes(api)

api.use(notFoundHandler)
