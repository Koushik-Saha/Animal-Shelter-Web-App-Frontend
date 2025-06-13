module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{js,ts}',
    '<rootDir>/src/**/*.test.{js,ts}',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testTimeout: 10000,
  verbose: true,
}