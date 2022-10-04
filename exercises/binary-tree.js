import { sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";
import { Queue } from "../structures/queue.js";
import { Stack } from "../structures/stack.js";

class BinaryTree {
  constructor() {
    this.root = null;
  }

  size() {
    return this._size(this.root);
  }

  _size(node) {
    return node === null ? 0 : node.size;
  }

  isBST() {
    return this._isBST(this.root, null, null);
  }

  _isBST(node, min, max) {
    if (node === null) return true;
    if (min !== null && node.key <= min) return false;
    if (max !== null && node.key >= max) return false;
    return (
      this._isBST(node.left, min, node.key) &&
      this._isBST(node.right, node.key, max)
    );
  }

  insert(key) {
    this.root = this._insert(this.root, key);
  }

  _insert(node, key) {
    if (node === null) return new Node(key);
    if (key === node.key) return node;
    else if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else {
      node.right = this._insert(node.right, key);
    }
    node.size = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  append(key) {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }
    const q = new Queue();
    q.enqueue(this.root);
    while (!q.isEmpty()) {
      const node = q.dequeue();
      if (node.left === null) {
        node.left = new Node(key);
        break;
      } else {
        q.enqueue(node.left);
      }
      if (node.right === null) {
        node.right = new Node(key);
        break;
      } else {
        q.enqueue(node.right);
      }
    }
  }

  add(key) {
    this.root = this._add(this.root, key);
  }

  _add(node, key) {
    if (node === null) return new Node(key);
    if (key === node.key) return node;
    else if (this._size(node.left) <= this._size(node.right)) {
      node.left = this._add(node.left, key);
    } else {
      node.right = this._add(node.right, key);
    }
    node.size = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  // recursive method
  inorder() {
    const result = [];
    this._inorder(this.root, result);
    return result;
  }

  _inorder(node, result) {
    if (node === null) return;
    this._inorder(node.left, result);
    result.push(node.key);
    this._inorder(node.right, result);
  }

  // iterative method
  inorder2() {
    const result = [];
    const stack = new Stack();
    let curr = this.root;
    while (true) {
      if (curr !== null) {
        stack.push(curr);
        curr = curr.left;
      } else {
        if (!stack.isEmpty()) {
          curr = stack.pop();
          result.push(curr.key);
          curr = curr.right;
        } else {
          return result;
        }
      }
    }
  }

  // traverse with constance space
  inorder3() {
    const result = [];
    let curr = this.root;
    while (curr !== null) {
      if (curr.left !== null) {
        // traverse left subtree and come back to the current node
        // using right pointer of its predecoessor
        // find the predecessor of current node
        let pre = curr.left;
        while (pre.right !== null && pre.right !== curr) {
          pre = pre.right;
        }
        // no right pointer was added to the predecessor
        if (pre.right === null) {
          // point its right to the current node
          pre.right = curr;
          // continue to visit left subtree
          curr = curr.left;
        } else {
          pre.right = null;
          result.push(curr.key);
          curr = curr.right;
        }
      } else {
        result.push(curr.key);
        curr = curr.right;
      }
    }
    return result;
  }

  levelorder() {
    const result = [];
    const q = new Queue();
    q.enqueue(this.root);
    while (!q.isEmpty()) {
      const node = q.dequeue();
      result.push(node.key);
      if (node.left !== null) {
        q.enqueue(node.left);
      }
      if (node.right !== null) {
        q.enqueue(node.right);
      }
    }
    return result;
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.size = 1;
  }
}

class BinaryTreeClient {
  static run() {
    const size = 20;
    const cases = [
      sequence(size, { order: false }),
      [3, 2, 5, 1, 4],
      [6, 2, 7, 1, 4, 3, 5],
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      const tree = new BinaryTree();
      if (index === cases.length - 1) {
        seq.forEach((x) => tree.insert(x));
        console.log(...tree.levelorder());
        console.log(...tree.inorder());
        console.log(...tree.inorder2());
        console.log(...tree.inorder3());
        console.log(tree.isBST());
        const tmp = tree.root.key;
        tree.root.key = tree.root.left.right.right.key;
        tree.root.left.right.right.key = tmp;
      } else {
        seq.forEach((x) => tree.append(x));
      }
      console.log(...tree.levelorder());
      console.log(...tree.inorder());
      console.log(tree.isBST());
    });
  }
}

BinaryTreeClient.run();
