// src/__tests__/utils/stringUtil.test.ts

import {sanitizeForLog} from '../../utils/stringUtil'

describe('sanitizeForLog', () => {
  it('strips C0 control characters', () => {
    expect(sanitizeForLog('foo\x00\x01\x1fbar')).toBe('foobar')
  })

  it('strips DEL and C1 control characters', () => {
    expect(sanitizeForLog('foo\x7f\x80\x9fbar')).toBe('foobar')
  })

  it('leaves printable characters untouched', () => {
    expect(sanitizeForLog('https://evil.com')).toBe('https://evil.com')
  })
})
