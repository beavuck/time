// src/__tests__/utils/urlUtil.test.ts

import {isSameOrigin, tryParseUrl} from '../../utils/urlUtil'
import {URL} from 'node:url'

const A_VALID_URL_STRING = 'https://example.com:1234'
const SAME_VALID_URL_DIFFERENT_PORT = 'https://example.com:81'
const SOME_OTHER_VALID_URL_STRING = 'https://different.com:1234'
const AN_INVALID_URL_STRING = 'invalid'

describe('urlUtil', () => {
  describe('isSameOrigin', () => {
    it('returns false when either URL is undefined', () => {
      const url = new URL(A_VALID_URL_STRING)
      expect(isSameOrigin(url)).toBe(false)
      expect(isSameOrigin(undefined, url)).toBe(false)
    })

    it('returns true when URLs have the same origin', () => {
      const url1 = new URL(A_VALID_URL_STRING)
      const url2 = new URL(A_VALID_URL_STRING)
      expect(isSameOrigin(url1, url2)).toBe(true)
    })

    it('returns false when URLs have the same origin but different ports', () => {
      const url1 = new URL(A_VALID_URL_STRING)
      const url2 = new URL(SAME_VALID_URL_DIFFERENT_PORT)
      expect(isSameOrigin(url1, url2)).toBe(false)
    })

    it('returns false when URLs have different origins', () => {
      const url1 = new URL(A_VALID_URL_STRING)
      const url2 = new URL(SOME_OTHER_VALID_URL_STRING)
      expect(isSameOrigin(url1, url2)).toBe(false)
    })
  })

  describe('tryParseUrl', () => {
    it('returns undefined when URL string is undefined', () => {
      expect(tryParseUrl()).toBeUndefined()
    })

    it('returns a URL object when URL string is valid', () => {
      const url = tryParseUrl(A_VALID_URL_STRING)
      expect(url).toBeInstanceOf(URL)
      expect(url?.origin).toBe(A_VALID_URL_STRING)
    })

    it('returns undefined when URL string is invalid', () => {
      expect(tryParseUrl(AN_INVALID_URL_STRING)).toBeUndefined()
    })
  })
})
