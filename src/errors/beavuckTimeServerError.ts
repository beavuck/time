// src/errors/beavuckTimeServerError.ts

import {BeavuckTimeError} from './base/beavuckTimeError'
import {StatusCodes} from 'http-status-codes'

export class BeavuckTimeServerError extends BeavuckTimeError {
  static readonly baseMessage: string = 'Internal Server Error'

  constructor(message: string, code: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(`${BeavuckTimeServerError.baseMessage}: ${message}`, code)
  }

  static fromError(error: Error): BeavuckTimeServerError {
    return error instanceof BeavuckTimeServerError ? error : (
        new BeavuckTimeServerError(error.message)
      )
  }
}
