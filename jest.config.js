module.exports = {
  testMatch: [
    '**/?(*.)(spec).js?(x)'
  ],
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
      info: (() => {}),
      success: (() => {}),
      error: (() => {}),
      warning: (() => {})
    },
    localStorage: {
      setItem: (() => {}),
      clearItem: (() => {}),
      getItem: (() => {}),
      removeItem: (() => {})
    },
  },
};
