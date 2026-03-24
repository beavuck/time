// src/__tests__/middlewares/errorHandler.test.ts

import express from 'express'
import {errorHandler} from '../../middlewares/errorHandler'
import {BeavuckTimeClientError} from '../../errors/beavuckTimeClientError'
import {BeavuckTimeServerError} from '../../errors/beavuckTimeServerError'
import {CorsError} from '../../errors/corsError'
import {StatusCodes} from 'http-status-codes'
import {logger} from '../../config/logger'
import {ValidateError} from 'tsoa'

jest.mock('../../config/logger')

describe('errorHandler', () => {
  let req: express.Request
  let res: express.Response
  let next: express.NextFunction

  beforeEach(() => {
    req = {} as express.Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as express.Response
    next = jest.fn() as express.NextFunction
  })

  it('should handle BeavuckTimeClientError', () => {
    const err = new BeavuckTimeClientError('Some message')
    errorHandler(err, req, res, next)
    expect(logger.warn).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(err.code)
    expect(res.json).toHaveBeenCalledWith({message: `${err.message}`})
  })

  it('should handle CorsError', () => {
    const err = new CorsError('Some message')
    errorHandler(err, req, res, next)
    expect(logger.warn).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(err.code)
    expect(res.json).toHaveBeenCalledWith({message: `${err.message}`})
  })

  it('should handle BeavuckTimeServerError', () => {
    const err = new BeavuckTimeServerError('Some message')
    errorHandler(err, req, res, next)
    expect(logger.error).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(err.code)
    expect(res.json).toHaveBeenCalledWith({message: BeavuckTimeServerError.baseMessage})
  })

  it('should handle non-specific error', () => {
    const err = new Error('Some message')
    errorHandler(err, req, res, next)
    const beavuckError = BeavuckTimeServerError.fromError(err)
    expect(logger.error).toHaveBeenCalledWith(beavuckError)
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({message: BeavuckTimeServerError.baseMessage})
  })

  it('should call next if no error', () => {
    errorHandler(undefined, req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('should handle ValidateError', () => {
    const err = new ValidateError({}, 'Some message')
    errorHandler(err, req, res, next)
    expect(logger.error).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Validation Error',
      details: err.fields,
    })
  })

  it('should handle unknown error type', () => {
    const err = {some: 'unknown error'}
    errorHandler(err, req, res, next)
    expect(logger.error).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    })
  })

  it('should handle null error', () => {
    errorHandler(undefined, req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
