// src/__tests__/middlewares/corsMiddleware.test.ts

import express from 'express'
import cors from 'cors'
import {corsMiddleware} from '../../middlewares/corsMiddleware'
import {CorsError} from '../../errors/corsError'
import {BeavuckTimeServerError} from '../../errors/beavuckTimeServerError'
import {logger} from '../../config/logger'

jest.mock('cors')
jest.mock('../../config/logger')

const mockCors = cors as jest.Mock

describe('corsMiddleware', () => {
  let req: express.Request
  let res: express.Response
  let next: jest.Mock

  beforeEach(() => {
    req = {headers: {}} as express.Request
    res = {} as express.Response
    next = jest.fn()
    mockCors.mockReturnValue((_req: unknown, _res: unknown, n: express.NextFunction) => n())
    process.env.BEAVUCK_TIME_HOST_URL = 'http://localhost:3000'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('delegates to cors() when origin header is present', () => {
    req.headers.origin = 'http://trusted.com'
    corsMiddleware(req, res, next)
    expect(mockCors).toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it('logs the sanitized origin on CORS requests', () => {
    req.headers.origin = 'http://evil.com\x01injected'
    corsMiddleware(req, res, next)
    expect(logger.debug).toHaveBeenCalledWith('CORS request from http://evil.cominjected')
  })

  it('calls next with BeavuckTimeServerError when HOST_URL is not set', () => {
    delete process.env.BEAVUCK_TIME_HOST_URL
    corsMiddleware(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.any(BeavuckTimeServerError))
  })

  it('calls next without error when referrer matches the host', () => {
    req.headers.referer = 'http://localhost:3000/page'
    corsMiddleware(req, res, next)
    expect(next).toHaveBeenCalledWith()
  })

  it('calls next with CorsError when neither origin nor referrer is trusted', () => {
    req.headers.referer = 'http://untrusted.com'
    corsMiddleware(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.any(CorsError))
  })

  it('sanitizes control characters from the CorsError message', () => {
    req.headers.referer = 'http://evil.com\x0ainjected'
    corsMiddleware(req, res, next)
    const error: CorsError = next.mock.calls[0][0]
    // eslint-disable-next-line no-control-regex
    expect(error.message).not.toMatch(/\x0a/)
    expect(error.message).toContain('http://evil.cominjected')
  })
})
