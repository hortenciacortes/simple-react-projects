export const Storage = {
  set(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  },

  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}
