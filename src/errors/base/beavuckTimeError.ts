// src/errors/base/beavuckTimeError.ts

export abstract class BeavuckTimeError extends Error {
  code: number

  protected constructor(message: string, code: number) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}
