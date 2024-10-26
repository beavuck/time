// src/services/nowService.ts

import {Now} from '../models/now'

export class NowService {
  public get(): Now {
    return new Now()
  }
}
