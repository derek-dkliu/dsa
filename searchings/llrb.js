import { ArgumentError } from "../common/errors.js";
import { less } from "../common/helpers.js";

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.left = null;
    this.right = null;
    this.count = 1;
    this.color = LLRB.RED;
  }
}

export default class LLRB {
  static RED = true;
  static BLACK = false;

  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  get2(key) {
    if (key === null) throw new Error("key cannot be null");
    let node = this.root;
    while (node !== null) {
      if (less(key, node.key)) {
        node = node.left;
      } else if (less(node.key, key)) {
        node = node.right;
      } else {
        return node.val;
      }
    }
    return null;
  }

  get(key) {
    if (key === null) throw new Error("key cannot be null");
    return this._get(this.root, key);
  }

  _get(node, key) {
    if (node === null) return null;
    if (less(key, node.key)) {
      return this._get(node.left, key);
    } else if (less(node.key, key)) {
      return this._get(node.right, key);
    } else {
      return node.val;
    }
  }

  contains(key) {
    return this.get(key) != null;
  }

  put(key, val) {
    if (key === null) throw new Error("null key is not allowed");
    this.root = this._put(this.root, key, val);
  }

  _put(node, key, val) {
    if (node === null) return new Node(key, val);
    if (less(key, node.key)) {
      node.left = this._put(node.left, key, val);
    } else if (less(node.key, key)) {
      node.right = this._put(node.right, key, val);
    } else {
      node.val = val;
    }

    if (!this.isRed(node.left) && this.isRed(node.right)) {
      node = this.rotateLeft(node);
    }
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node);
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node);
    }

    node.count = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  delete(key) {
    if (key === null) throw new Error("null key is not allowed");
    this.root = this._delete(this.root, key);
  }

  _delete(node, key) {
    if (node === null) return null;
    if (less(key, node.key)) {
      node.left = this._delete(node.left, key);
    } else if (less(node.key, key)) {
      node.right = this._delete(node.right, key);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const min = this._min(node.right);
      min.right = this._deleteMin(node.right);
      min.left = node.left;
      node = min;
    }
    node.count = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  deleteMin() {
    if (this.isEmpty()) return null;
    this.root = this._deleteMin(this.root);
  }

  _deleteMin(node) {
    if (node.left === null) return node.right;
    node.left = this._deleteMin(node.left);
    node.count = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  deleteMax() {
    if (this.isEmpty()) return null;
    this.root = this._deleteMax(this.root);
  }

  _deleteMax(node) {
    if (node.right === null) return node.left;
    node.right = this._deleteMax(node.right);
    node.count = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  min() {
    if (this.isEmpty()) return null;
    return this._min(this.root).key;
  }

  _min(node) {
    if (node.left === null) return node;
    return this._min(node.left);
  }

  max() {
    if (this.isEmpty()) return null;
    return this._max(this.root).key;
  }

  _max(node) {
    if (node.right === null) return node;
    return this._max(node.right);
  }

  floor(key) {
    if (key === null) throw new Error("null key is not allowed");
    const node = this._floor(this.root, key);
    return node === null ? null : node.key;
  }

  _floor(node, key) {
    if (node === null) return null;
    if (less(key, node.key)) {
      return this._floor(node.left, key);
    } else if (less(node.key, key)) {
      const x = this._floor(node.right, key);
      return x !== null ? x : node;
    } else {
      return node;
    }
  }

  ceil(key) {
    if (key === null) throw new Error("null key is not allowed");
    const node = this._ceil(this.root, key);
    return node === null ? null : node.key;
  }

  _ceil(node, key) {
    if (node === null) return null;
    if (less(key, node.key)) {
      const x = this._ceil(node.left, key);
      return x !== null ? x : node;
    } else if (less(node.key, key)) {
      return this._ceil(node.right, key);
    } else {
      return node;
    }
  }

  size() {
    return this._size(this.root);
  }

  _size(node) {
    return node === null ? 0 : node.count;
  }

  select(rank) {
    if (rank < 0 || rank >= this.size()) {
      throw new ArgumentError("argument is out of range");
    }
    return this._select(this.root, rank);
  }

  _select(node, rank) {
    if (node === null) return null;
    const size = this._size(node.left);
    if (less(rank, size)) {
      return this._select(node.left, rank);
    } else if (less(size, rank)) {
      return this._select(node.right, rank - this._size(node.left) - 1);
    } else {
      return node.key;
    }
  }

  rank(key) {
    if (key === null) throw new Error("null key is not allowed");
    return this._rank(this.root, key);
  }

  _rank(node, key) {
    if (node === null) return 0;
    if (less(key, node.key)) {
      return this._rank(node.left, key);
    } else if (less(node.key, key)) {
      return this._size(node.left) + 1 + this._rank(node.right, key);
    } else {
      return this._size(node.left);
    }
  }

  rangeCount(lo, hi) {
    if (lo === null) throw new Error("lo key cannot be null");
    if (hi === null) throw new Error("hi key cannot be null");
    if (less(hi, lo)) return 0;
    if (this.contains(hi)) {
      return this.rank(hi) - this.rank(lo) + 1;
    } else {
      return this.rank(hi) - this.rank(lo);
    }
  }

  rangeSearch(lo, hi) {
    if (lo === null) throw new Error("lo key cannot be null");
    if (hi === null) throw new Error("hi key cannot be null");
    if (less(hi, lo)) return null;
    const result = [];
    this._rangeSearch(this.root, lo, hi, result);
    return result;
  }

  _rangeSearch(node, lo, hi, result) {
    if (node === null) return;
    if (less(lo, node.key)) {
      this._rangeSearch(node.left, lo, hi, result);
    }
    if (!less(node.key, lo) && !less(hi, node.key)) {
      result.push(node.key);
    }
    if (less(node.key, hi)) {
      this._rangeSearch(node.right, lo, hi, result);
    }
  }

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

  /* helper functions */
  isRed(node) {
    return node === null ? false : node.color === LLRB.RED;
  }

  rotateLeft(node) {
    const x = node.right;
    node.right = x.left;
    x.left = node;
    x.color = node.color;
    node.color = LLRB.RED;
    x.count = node.count;
    node.count = 1 + this._size(node.left) + this._size(node.right);
    return x;
  }

  rotateRight(node) {
    const x = node.left;
    node.left = x.right;
    x.right = node;
    x.color = node.color;
    node.color = LLRB.RED;
    x.count = node.count;
    node.count = 1 + this._size(node.left) + this._size(node.right);
    return x;
  }

  flipColors(node) {
    node.color = !node.color;
    node.left.color = !node.left.color;
    node.right.color = !node.right.color;
  }
}
