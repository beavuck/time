// src/__tests__/config/corsOptions.test.ts

import {initTrustedOrigins, isOriginTrusted} from '../../config/corsOptions'

function setTrustedOrigins(...origins: string[]) {
  process.env.BEAVUCK_TIME_TRUSTED_ORIGINS = origins.join(',')
  initTrustedOrigins()
}

describe('isOriginTrusted', () => {
  it('returns true for an exact match', () => {
    setTrustedOrigins('https://app.example.com')
    expect(isOriginTrusted('https://app.example.com')).toBe(true)
  })

  it('returns true for a wildcard pattern matching the origin host', () => {
    setTrustedOrigins('https://app.example.com/*')
    expect(isOriginTrusted('https://app.example.com')).toBe(true)
  })

  it('does not allow a domain that merely shares a prefix with a trusted origin', () => {
    setTrustedOrigins('https://app.example.com')
    expect(isOriginTrusted('https://app.example.com.evil.com')).toBe(false)
  })

  it('does not allow a domain that shares a prefix with a wildcard trusted origin', () => {
    setTrustedOrigins('https://app.example.com/*')
    expect(isOriginTrusted('https://app.example.com.evil.com')).toBe(false)
  })

  it('returns false for an untrusted origin', () => {
    setTrustedOrigins('https://app.example.com')
    expect(isOriginTrusted('https://other.com')).toBe(false)
  })

  it('returns false when the trusted origin pattern is malformed', () => {
    setTrustedOrigins('not-a-url/*')
    expect(isOriginTrusted('not-a-url')).toBe(false)
  })
})
