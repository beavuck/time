// src/__tests__/middlewares/errorHandler.test.ts

import express from 'express'
import {errorHandler} from '../../middlewares/errorHandler'
import {BeavuckTimeClientError} from '../../errors/BeavuckTimeClientError'
import {BeavuckTimeServerError} from '../../errors/BeavuckTimeServerError'
import {CorsError} from '../../errors/CorsError'
import {StatusCodes} from 'http-status-codes'
import logger from '../../config/logger'

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
    expect(res.json).toHaveBeenCalledWith({
      message: BeavuckTimeClientError.baseMessage,
    })
  })

  it('should handle CorsError', () => {
    const err = new CorsError('Some message')
    errorHandler(err, req, res, next)
    expect(logger.warn).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(err.code)
    expect(res.json).toHaveBeenCalledWith({message: CorsError.baseMessage})
  })

  it('should handle BeavuckTimeServerError', () => {
    const err = new BeavuckTimeServerError('Some message')
    errorHandler(err, req, res, next)
    expect(logger.error).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(err.code)
    expect(res.json).toHaveBeenCalledWith({
      message: BeavuckTimeServerError.baseMessage,
    })
  })

  it('should handle unknown error', () => {
    const err = new Error('Some message')
    errorHandler(err, req, res, next)
    expect(logger.error).toHaveBeenCalledWith(err)
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({message: 'Internal Server Error'})
  })

  it('should call next if no error', () => {
    errorHandler(null, req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
