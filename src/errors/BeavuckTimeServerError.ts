// src/errors/BeavuckTimeServerError.ts

import {BeavuckTimeError} from './BeavuckTimeError'
import {StatusCodes} from 'http-status-codes'

export class BeavuckTimeServerError extends BeavuckTimeError {
  static baseMessage = 'Internal Server Error'

  constructor(
    message: string,
    code: number = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(`${BeavuckTimeServerError.baseMessage}: ${message}`, code)
  }
}
