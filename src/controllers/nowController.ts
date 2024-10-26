// src/controllers/nowController.ts

import {Controller, Get, OperationId, Route, Tags} from 'tsoa'
import {Now} from '../models/now'
import {NowService} from '../services/nowService'

@Route('now')
export class NowController extends Controller {

  /**
   * Get the current time in ISO format, in UTC timezone
   * @summary Get current time
   */
  @Tags('now')
  @Get()
  @OperationId('getNow')
  public async getNow(): Promise<Now> {
    return new NowService().get()
  }
}
