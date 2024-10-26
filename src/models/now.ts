// src/models/now.ts

import {IsoTimestamp} from '../types/isoTimestamp'

/**
 * @example {"now": "2019-08-24T14:15:22Z"}
 */
export class Now {
  readonly now: IsoTimestamp

  constructor() {
    this.now = new Date().toISOString()
  }
}
