/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type {TsoaRoute} from '@tsoa/runtime'
import {fetchMiddlewares, ExpressTemplateService} from '@tsoa/runtime'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {NowController} from './../controllers/nowController'
import type {Request as ExRequest, Response as ExResponse, RequestHandler, Router} from 'express'

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  IsoTimestamp: {
    dataType: 'refAlias',
    type: {dataType: 'string', validators: {}},
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Now: {
    dataType: 'refObject',
    properties: {
      now: {ref: 'IsoTimestamp', required: true},
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true,
})

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsNowController_getNow: Record<string, TsoaRoute.ParameterSchema> = {}
  app.get(
    '/now',
    ...fetchMiddlewares<RequestHandler>(NowController),
    ...fetchMiddlewares<RequestHandler>(NowController.prototype.getNow),

    async function NowController_getNow(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = []
      try {
        validatedArgs = templateService.getValidatedArgs({args: argsNowController_getNow, request, response})

        const controller = new NowController()

        await templateService.apiHandler({
          methodName: 'getNow',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        })
      } catch (err) {
        return next(err)
      }
    },
  )
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
