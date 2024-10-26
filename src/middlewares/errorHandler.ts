// src/middlewares/errorHandler.ts

import express from 'express'
import {logger} from '../config/logger'
import {BeavuckTimeClientError} from '../errors/BeavuckTimeClientError'
import {BeavuckTimeServerError} from '../errors/BeavuckTimeServerError'
import {StatusCodes} from 'http-status-codes'
import {CorsError} from '../errors/CorsError'
import {ValidateError} from 'tsoa'

export const errorHandler = (
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err instanceof BeavuckTimeClientError) {
    logger.warn(err)
    res.status(err.code).json(
      {
        message:
          err instanceof CorsError
          ? CorsError.baseMessage
          : BeavuckTimeClientError.baseMessage,
      },
    )
  } else if (err instanceof BeavuckTimeServerError) {
    logger.error(err)
    res.status(err.code).json({message: BeavuckTimeServerError.baseMessage})
  } else if (err instanceof ValidateError) {
    logger.error(`Validation error on ${req.path}: ${err.fields}`)
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({message: 'Validation Error', details: err.fields})
  } else if (err) {
    logger.error(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: 'Internal Server Error'})
  } else {
    next()
  }
}
