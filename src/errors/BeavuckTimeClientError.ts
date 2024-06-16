// src/errors/BeavuckTimeClientError.ts

import {BeavuckTimeError} from './BeavuckTimeError'
import {StatusCodes} from 'http-status-codes'

export class BeavuckTimeClientError extends BeavuckTimeError {
  static baseMessage = 'Client Error'

  constructor(message: string, code: number = StatusCodes.BAD_REQUEST) {
    super(`${BeavuckTimeClientError.baseMessage}: ${message}`, code)
  }
}
