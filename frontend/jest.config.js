// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
    '^.+\\.tsx$': 'babel-jest',
  },
  setupFilesAfterEnv: [
     '@testing-library/jest-dom', // これで `jest-dom` の拡張が自動的に読み込まれる
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    'pages/**/*.{js,ts,tsx}',
    'components/**/*.{js,ts,tsx}',
    'lib/**/*.{js,ts,tsx}',
  ],
}
