// src/utils/stringUtil.ts

export function sanitizeForLog(value: string): string {
  // About the warning suppression: we're specifically working on control characters here,
  // to sanitize strings for protection against log injection
  // eslint-disable-next-line no-control-regex
  return value.replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, '')
}
