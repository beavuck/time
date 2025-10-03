// src/middlewares/errorHandler.ts

import express from 'express'
import {logger} from '../config/logger'
import {BeavuckTimeClientError} from '../errors/beavuckTimeClientError'
import {BeavuckTimeServerError} from '../errors/beavuckTimeServerError'
import {StatusCodes} from 'http-status-codes'
import {ValidateError} from 'tsoa'
import {BeavuckTimeError} from '../errors/base/beavuckTimeError'
import {ErrorResponse} from '../errors/errorResponse'

export const errorHandler = (
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err instanceof ValidateError) {
    const logMsg = `Validation error on ${req.path}: ${err.fields}`
    const resStatus = StatusCodes.UNPROCESSABLE_ENTITY
    const resMsgObj = {message: 'Validation Error', details: err.fields}
    handleOtherError(res, logMsg, resStatus, resMsgObj)
  } else if (err instanceof BeavuckTimeClientError) {
    handleBeavuckClientError(res, err)
  } else if (err instanceof BeavuckTimeServerError || err instanceof Error) {
    handleBeavuckServerError(res, BeavuckTimeServerError.fromError(err))
  } else if (err) {
    handleOtherError(res)
  } else {
    next()
  }
}

function sendErrorResponse(res: express.Response, err: BeavuckTimeError) {
  res.status(err.code).json({message: err.message})
}

function handleBeavuckClientError(res: express.Response, err: BeavuckTimeClientError) {
  logger.warn(err)
  sendErrorResponse(res, err)
}

function handleBeavuckServerError(res: express.Response, err: BeavuckTimeServerError) {
  logger.error(err)
  sendErrorResponse(res, err)
}

function handleOtherError(
  res: express.Response,
  logMsg: string = `Unknown error`,
  resStatus: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
  resMsg: ErrorResponse = new ErrorResponse(),
) {
  logger.error(`${logMsg}: ${JSON.stringify(resMsg)}`)
  res.status(resStatus).json(resMsg)
}
