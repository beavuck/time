// src/__tests__/config/corsOptions.test.ts

import {corsOptions, getHostUrl, getTrustedOrigins, initHostUrl, initTrustedOrigins, isAllTrusted, isOriginAbsentOrTrusted} from '../../config/corsOptions'
import {CorsError} from '../../errors/CorsError'
import * as process from 'node:process'

describe('CORS Options', () => {
  it('should allow requests from trusted origins', done => {
    const origin = process.env.TRUSTED_ORIGINS?.split(',')[0]
    if (typeof corsOptions.origin === 'function') {
      corsOptions.origin(origin, (err: any, allow?: any) => {
        expect(err).toBeNull()
        expect(allow).toBe(true)
        done()
      })
    }
  })

  it('should block requests from non-trusted origins', done => {
    const origin = 'https://non-trusted.com'
    if (typeof corsOptions.origin === 'function') {
      corsOptions.origin(origin, (err: any, allow?: any) => {
        expect(err).toBeInstanceOf(CorsError)
        expect(allow).toBe(false)
        done()
      })
    }
  })

  it('should allow requests with undefined origin (effectively delegating to CORS middleware)', done => {
    if (typeof corsOptions.origin === 'function') {
      corsOptions.origin(undefined, (err: any, allow?: any) => {
        expect(err).toBeNull()
        expect(allow).toBe(true)
        done()
      })
    }
  })

  it('should allow requests when TRUSTED_ORIGINS includes *', done => {
    const originalTrustedOrigins = process.env.TRUSTED_ORIGINS
    process.env.TRUSTED_ORIGINS = '*'
    initTrustedOrigins()
    const origin = 'https://any-origin.com'
    if (typeof corsOptions.origin === 'function') {
      corsOptions.origin(origin, (err: any, allow?: any) => {
        expect(err).toBeNull()
        expect(allow).toBe(true)
        done()
      })
    }
    process.env.TRUSTED_ORIGINS = originalTrustedOrigins
    initTrustedOrigins()
  })

  it('should call initHostUrl when getHostUrl is called', () => {
    const originalHostUrl = process.env.HOST_URL
    process.env.HOST_URL = 'http://localhost:9124'
    initHostUrl()
    const hostUrl = getHostUrl()
    expect(hostUrl?.toString()).toBe('http://localhost:9124/')
    process.env.HOST_URL = originalHostUrl
  })

  it('should call initTrustedOrigins when getTrustedOrigins is called', () => {
    const originalTrustedOrigins = process.env.TRUSTED_ORIGINS
    process.env.TRUSTED_ORIGINS = 'http://localhost:8477'
    initTrustedOrigins()
    const trustedOrigins = getTrustedOrigins()
    expect(trustedOrigins).toContain('http://localhost:8477')
    process.env.TRUSTED_ORIGINS = originalTrustedOrigins
  })

  it('should return false when isAllTrusted is called and TRUSTED_ORIGINS does not include *', () => {
    const originalTrustedOrigins = process.env.TRUSTED_ORIGINS
    process.env.TRUSTED_ORIGINS = 'http://localhost:8477'
    initTrustedOrigins()
    expect(isAllTrusted()).toBe(false)
    process.env.TRUSTED_ORIGINS = originalTrustedOrigins
  })

  it('should return false when isOriginAbsentOrTrusted is called with a non-trusted origin', () => {
    const originalTrustedOrigins = process.env.TRUSTED_ORIGINS
    process.env.TRUSTED_ORIGINS = 'http://localhost:8477'
    initTrustedOrigins()
    expect(isOriginAbsentOrTrusted('https://non-trusted.com')).toBe(false)
    process.env.TRUSTED_ORIGINS = originalTrustedOrigins
  })

  it('should return true when isAllTrusted is called and TRUSTED_ORIGINS includes *', () => {
    const originalTrustedOrigins = process.env.TRUSTED_ORIGINS
    process.env.TRUSTED_ORIGINS = '*'
    initTrustedOrigins()
    expect(isAllTrusted()).toBe(true)
    process.env.TRUSTED_ORIGINS = originalTrustedOrigins
  })

  it('should return true when isOriginAbsentOrTrusted is called with a trusted origin', () => {
    const originalTrustedOrigins = process.env.TRUSTED_ORIGINS
    process.env.TRUSTED_ORIGINS = 'http://localhost:8477'
    initTrustedOrigins()
    expect(isOriginAbsentOrTrusted('http://localhost:8477')).toBe(true)
    process.env.TRUSTED_ORIGINS = originalTrustedOrigins
  })
})
