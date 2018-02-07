const localStorage = {};

export default {
  setItem(key, value) {
    return { ...localStorage, key: value };
  },
  removeItem() {
    return localStorage;
  }
};
