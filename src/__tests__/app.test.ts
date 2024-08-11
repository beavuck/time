import request from 'supertest'
import api from '../app'
import {StatusCodes} from 'http-status-codes'

let callsMadeSoFar = 0

function getSomeTrustedOrigin(): string {
  return process.env.TRUSTED_ORIGINS?.split(',')[0] ?? ''
}

/**
 * Increments the callsMadeSoFar counter and returns the response and trusted origin
 */
async function makeSuccessfulCallToNowEndpoint() {
  const trustedOrigin = getSomeTrustedOrigin()
  const res = await request(api).get('/now').set('Origin', trustedOrigin)

  callsMadeSoFar++ // IMPORTANT

  return {res, trustedOrigin}
}

describe('App Initialization', () => {
  it('should disable x-powered-by header', async () => {
    const res = await request(api).get('/now')
    expect(res.header['x-powered-by']).toBeUndefined()
  })

  it('should allow requests from trusted origins', async () => {
    const {res, trustedOrigin} = await makeSuccessfulCallToNowEndpoint()
    expect(res.header['access-control-allow-origin']).toBe(trustedOrigin)
    expect(res.status).toBe(StatusCodes.OK)
  })

  it('should block requests from non-trusted origins', async () => {
    const res = await request(api)
      .get('/now')
      .set('Origin', 'https://non-trusted.com')

    expect(res.header['access-control-allow-origin']).toBeUndefined()
    expect(res.status).toBe(StatusCodes.FORBIDDEN)
  })

  it('should block requests with no origin header', async () => {
    const res = await request(api).get('/now')
    expect(res.header['access-control-allow-origin']).toBeUndefined()
    expect(res.status).toBe(StatusCodes.FORBIDDEN)
  })

  it('should allow requests with no origin header but a referer header identical to server url', async () => {
    const REFERER: string = process.env.HOST_URL!
    const res = await request(api).get('/now').set('Referer', REFERER)
    callsMadeSoFar++
    expect(res.header['access-control-allow-origin']).toBeUndefined()
    expect(res.status).toBe(StatusCodes.OK)
  })

  it('should handle errors using errorHandler middleware', async () => {
    const res = await request(api)
      .get('/non-existent-endpoint')
      .set('Origin', getSomeTrustedOrigin())

    expect(res.status).toBe(StatusCodes.NOT_FOUND)
  })

  it('should return the current time in ISO format', async () => {
    const {res} = await makeSuccessfulCallToNowEndpoint()
    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toHaveProperty('now')

    const Iso8601Format = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
    expect(res.body.now).toMatch(Iso8601Format)
  })

  it('should block requests that exceed the rate limit', async () => {
    const RATE_LIMIT = parseInt(process.env.RATE_LIMIT!, 10)
    let fallbackCounter = 0
    while (callsMadeSoFar <= RATE_LIMIT && fallbackCounter++ < 10) {
      let {res} = await makeSuccessfulCallToNowEndpoint() // incrementing callsMadeSoFar
      if (callsMadeSoFar == RATE_LIMIT) {
        expect(res.status).toBe(StatusCodes.TOO_MANY_REQUESTS)
      }
    }
  })
})
