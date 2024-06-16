module.exports = {
  bail: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/utils/**/*.ts',
    'src/services/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
}
