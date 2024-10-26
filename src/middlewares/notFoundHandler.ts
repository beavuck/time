// src/middlewares/notFoundHandler.ts

import {Request as ExpressRequest, Response as ExpressResponse} from 'express'
import {StatusCodes} from 'http-status-codes'

export const notFoundHandler = (_req: ExpressRequest, res: ExpressResponse) => {
  res.status(StatusCodes.NOT_FOUND).send({message: 'Not Found'})
}
