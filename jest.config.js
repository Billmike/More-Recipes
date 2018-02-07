module.exports = {
  testMatch: [
    '**/?(*.)(spec).js?(x)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>./server/__test__/*.js'
  ],
  setupFiles: [
    '<rootDir>./client/src/__tests__/config.js'
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
      removeItem: (() => {})
    },
  },
};
