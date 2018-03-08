module.exports = {
  coveragePathIgnorePatterns: [
    '<rootDir>/client/src/__tests__/*',
    '<rootDir>/client/src/actionCreators/*',
    '<rootDir>/client/src/utils/*',
    '<rootDir>/server/validators'
  ],
  testMatch: [
    '**/?(*.)(spec).js?(x)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/src/__tests__/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/client/src/__tests__/__mocks__/styleMock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>./server/__test__/*.js'
  ],
  setupFiles: [
    'raf/polyfill',
    '<rootDir>./client/src/__tests__/config.js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  globals: {
    toastr: {
      info: (() => { }),
      success: (() => { }),
      error: (() => { }),
      warning: (() => { })
    },
    localStorage: {
      setItem: (() => { }),
      clearItem: (() => { }),
      getItem: (() => { }),
      removeItem: (() => { })
    },
  },
};
