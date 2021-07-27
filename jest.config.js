module.exports = {
  preset: 'react-native',
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFiles: [
    //  incluir de acordo com a necessidade do projeto
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__tests__/jest.setup.js'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@?react-navigation|@react-native-community|@react-native-picker/picker)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/ios',
    '<rootDir>/android',
    '<rootDir>/node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1'
  },
  haste: {
    defaultPlatform: 'android',
    platforms: ['android', 'ios', 'native']
  }
};
