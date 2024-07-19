class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(value) {
    let newNode = new Node(value);

    if (this.root == null) {
      this.root = newNode;
    } else {
      let curNode = this.root;

      while (true) {
        if (curNode.value > value) {
          if (curNode.left) {
            curNode = curNode.left;
          } else {
            curNode.left = newNode;
            return;
          }
        } else if (curNode.value < value) {
          if (curNode.right) {
            curNode = curNode.right;
          } else {
            curNode.right = newNode;
            return;
          }
        } else {
          return;
        }
      }
    }
  }

  lockUp(value) {
    if (this.root == null) return false;

    let curNode = this.root;

    while (curNode !== null) {
      if (curNode.value > value) {
        curNode = curNode.left;
      } else if (curNode.value < value) {
        curNode = curNode.right;
      } else {
        console.log(curNode);

        return;
      }
    }
  }

  remove(value) {
    deleteNode(this.root, value);

    function deleteNode(node, value) {
      if (!node) return null;

      if (node.value < value) {
        node.right = deleteNode(node.right, value);
      } else if (node.value > value) {
        node.left = deleteNode(node.left, value);
      } else {
        if (!node.right && !node.left) {
          return null;
        } else if (!node.right) {
          return node.left;
        } else if (!node.left) {
          return node.right;
        } else {
          let maxNode = findMax(node.left);

          node.value = maxNode.value;
          node.left = deleteNode(node.left, maxNode.value);

          return node;
        }
      }

      return node;

      function findMax(node) {
        while (node.right) {
          node = node.right;
        }

        return node;
      }
    }
  }

  preOrder() {
    preOrder(this.root);

    function preOrder(node) {
      if (!node) return;

      console.log(node.value);

      preOrder(node.left);
      preOrder(node.right);
    }
  }

  bfs() {
    if (!this.root) return;

    let queue = [];
    let result = [];

    queue.push(this.root);

    while (queue.length) {
      let curNode = queue.shift();

      result.push(curNode);

      // 현재 부모 노드의 자식들을 모두 다 큐에 담는다.
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
    }

    return result;
  }

  dfs(node = this.root, result = []) {
    if (!node) return;

    result.push(node);

    // 현재 부모 노드의 자식들을 모두 다 큐에 담는다.
    if (node.left) this.dfs(node.left, result);
    if (node.right) this.dfs(node.right, result);

    return result;
  }

  printAll() {
    let stack = [];
    stack.push(this.root);

    while (stack.length) {
      let curNode = stack.pop();
      console.log(curNode);

      if (curNode.right) stack.push(curNode.right);
      if (curNode.left) stack.push(curNode.left);
    }
  }
}

let tree = new BinarySearchTree();

tree.add(8);
tree.add(4);
tree.add(15);
tree.add(2);
tree.add(3);
tree.add(10);
tree.add(20);
tree.add(21);
tree.remove(21);
let b = tree.bfs();
console.log(b);
let a = tree.dfs();
console.log(a);
