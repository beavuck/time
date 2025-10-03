// src/errors/corsError.ts

import {StatusCodes} from 'http-status-codes'
import {BeavuckTimeClientError} from './beavuckTimeClientError'

export class CorsError extends BeavuckTimeClientError {
  static readonly baseMessage: string = 'Origin forbidden by CORS'

  constructor(origin?: string) {
    super(`${CorsError.baseMessage}: ${origin}`, StatusCodes.FORBIDDEN)
  }
}
