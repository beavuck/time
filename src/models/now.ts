// src/models/now.ts

/**
 * @example {"now": "2019-08-24T14:15:22Z"}
 */
export class Now {
  readonly now: string

  constructor() {
    this.now = new Date().toISOString()
  }
}
