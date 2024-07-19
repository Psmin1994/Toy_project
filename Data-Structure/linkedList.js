class Node {
  constructor(data) {
    this.data = data || null;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addFirst(newData) {
    let newNode = new Node(newData);

    if (this.head) {
      this.head.prev = newNode;
      newNode.next = this.head;

      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    this.size++;

    return newNode;
  }

  addLast(newData) {
    let newNode = new Node(newData);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;

      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    this.size++;

    return newNode;
  }

  add(newData, index) {
    if (index == undefined || index < 0 || index > this.size) return -1;

    let newNode = new Node(newData);

    if (index == 0) {
      this.head.prev = newNode;
      newNode.next = this.head;

      this.head = newNode;
    } else {
      let curNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        curNode = curNode.next;
      }

      newNode.next = curNode.next;
      newNode.next.prev = newNode;

      curNode.next = newNode;
      newNode.prev = curNode;
    }

    this.size++;

    return newNode;
  }

  removeFirst() {
    if (this.head) {
      let rmNode = this.head;

      this.head = rmNode.next;
      this.head.prev = null;

      this.size--;

      return rmNode;
    } else {
      return -1;
    }
  }

  removeLast() {
    let rmNode = this.tail;

    this.tail = rmNode.prev;
    this.tail.next = null;

    this.size--;

    return rmNode;
  }

  remove(index) {
    if (index == 0) {
      this.removeFirst();
    } else {
      let curNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        curNode = curNode.next;
      }

      let rmNode = curNode.next;

      curNode.next = rmNode.next;
      curNode.next.prev = curNode;

      this.size--;

      return rmNode;
    }
  }

  get(index) {
    if (index == 0) {
      return this.head;
    } else {
      let curNode = this.head;

      for (let i = 0; i < index; i++) {
        curNode = curNode.next;
      }

      return curNode;
    }
  }

  set(newData, index) {
    if (index == 0) {
      this.head.data = newData;

      return this.head;
    } else {
      let curNode = this.head;

      for (let i = 0; i < index; i++) {
        curNode = curNode.next;
      }

      curNode.data = newData;

      return curNode;
    }
  }

  printNodeAll() {
    let curNode = this.head;
    let result = "";

    for (let i = 0; i < this.size - 1; i++) {
      result += `[ ${curNode.data} ] -> `;
      curNode = curNode.next;
    }

    result += `[ ${curNode.data} ]`;

    console.log(result);
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.size == 0 ? true : false;
  }
}

let list = new DoublyLinkedList();

list.addFirst(1);

list.add(3, 0);

list.add(5, 1);

list.remove(1);

list.set(4, 0);

list.printNodeAll();
