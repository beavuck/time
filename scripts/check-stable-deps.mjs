import { readFileSync } from 'node:fs'

const { dependencies } = JSON.parse(readFileSync('package.json', 'utf-8'))

const ALLOWED_UNSTABLE = new Set([
  // 'some-package', // reason why it's allowed
])

const unstable = Object.entries(dependencies)
  .filter(([name, version]) => !ALLOWED_UNSTABLE.has(name) && (/^[\^~]?0\./i.test(version) || /-(?:alpha|beta|rc)[.\d]*$/i.test(version)))
  .map(([name, version]) => `  ${name}: ${version}`)

if (unstable.length > 0) {
  // eslint-disable-next-line no-restricted-syntax
  console.error('Unstable dependencies (0.x or pre-release) found in "dependencies":\n' + unstable.join('\n'))
  process.exit(1)
}
