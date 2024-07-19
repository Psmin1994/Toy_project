class Queue {
  constructor() {
    this._arr = [];
  }

  enqueue(item) {
    this._arr.push(item);
  }

  dequeue() {
    return this._arr.shift();
  }

  size() {
    return this._arr.length;
  }

  peek() {
    return this._arr[0];
  }
}

// class Queue {
//   constructor() {
//     this._arr = [];
//   }

//   enqueue(item) {
//     this._arr.push(item);
//   }

//   dequeue() {
//     return this._arr.shift();
//   }

//   peek() {
//     return this._arr[0];
//   }

//   size() {
//     return this._arr.length;
//   }

//   isEmpty() {
//     return this._arr.length == 0;
//   }
// }
