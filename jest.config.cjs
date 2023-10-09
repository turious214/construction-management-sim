module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**/*.ts'
  ],
  coverageDirectory: './test/jest/coverage',
  // Restrict to directory
    roots: [
      "<rootDir>/test/jest"
    ],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },

    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],



};