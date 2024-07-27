// src/errors/BeavuckTimeClientError.ts

import {BeavuckTimeError} from './base/BeavuckTimeError'
import {StatusCodes} from 'http-status-codes'

export class BeavuckTimeClientError extends BeavuckTimeError {
  static readonly baseMessage: string = 'Client Error'

  constructor(message: string, code: number = StatusCodes.BAD_REQUEST) {
    super(`${BeavuckTimeClientError.baseMessage}: ${message}`, code)
  }
}
