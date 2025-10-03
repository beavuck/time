// src/errors/errorResponse.ts

import {BeavuckTimeServerError} from './beavuckTimeServerError'

export class ErrorResponse {
  message: string
  details?: unknown

  constructor(message: string = BeavuckTimeServerError.baseMessage, details?: unknown) {
    this.message = message
    this.details = details
  }
}
