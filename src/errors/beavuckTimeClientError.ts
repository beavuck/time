// src/errors/beavuckTimeClientError.ts

import {BeavuckTimeError} from './base/beavuckTimeError'
import {StatusCodes} from 'http-status-codes'

export class BeavuckTimeClientError extends BeavuckTimeError {
  static readonly baseMessage: string = 'Client Error'

  constructor(message: string, code: number = StatusCodes.BAD_REQUEST) {
    super(`${BeavuckTimeClientError.baseMessage}: ${message}`, code)
  }
}
