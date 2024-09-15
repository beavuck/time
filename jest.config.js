// jest.config.js
module.exports = {
  bail: 1,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/utils/**/*.ts',
    'src/services/**/*.ts',
    'src/config/corsOptions.ts',
    'src/controllers/**/*.ts',
    'src/errors/**/*.ts',
    'src/middlewares/corsMiddleware.ts',
    'src/middlewares/errorHandler.ts',
    'src/app.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
