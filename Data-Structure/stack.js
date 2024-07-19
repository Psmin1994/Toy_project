class Stack {
  constructor() {
    this._arr = [];
  }

  push(item) {
    this._arr.push(item);
  }

  pop() {
    return this._arr.pop();
  }

  peek() {
    return this._stack.length ? this._stack[this._stack.length - 1] : null;
  }

  size() {
    return this._arr.length;
  }

  isEmpty() {
    return this._arr.length == 0;
  }
}
