class HashMap {
  constructor() {
    this._map = new Map();
  }

  set(key, value) {
    this._map.set(key, value);
  }

  get(key) {
    return this._map.get(key);
  }

  remove(key) {
    return this._map.delete(key);
  }

  clear() {
    return this._map.clear();
  }

  size() {
    return this._map.size();
  }
}
