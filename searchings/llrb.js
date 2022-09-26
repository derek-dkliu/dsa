import { ArgumentError } from "../common/errors.js";
import { less } from "../common/helpers.js";

class Node {
  constructor(key, val, color) {
    this.key = key;
    this.val = val;
    this.left = null;
    this.right = null;
    this.count = 1;
    this.color = color;
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
    if (val === null) {
      this.delete(key);
      return;
    }
    this.root = this._put(this.root, key, val);
    this.root.color = LLRB.BLACK;
  }

  _put(node, key, val) {
    if (node === null) return new Node(key, val, LLRB.RED);
    if (less(key, node.key)) {
      node.left = this._put(node.left, key, val);
    } else if (less(node.key, key)) {
      node.right = this._put(node.right, key, val);
    } else {
      node.val = val;
    }

    if (this.isRed(node.right) && !this.isRed(node.left)) {
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
    if (!this.contains(key)) return;
    this.root = this._delete(this.root, key);
    if (!this.isEmpty()) this.root.color = LLRB.BLACK;
    this.test();
  }

  _delete(node, key) {
    if (node === null) return null;
    if (less(key, node.key)) {
      if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
        node = this.moveRedLeft(node);
      }
      node.left = this._delete(node.left, key);
    } else {
      if (this.isRed(node.left)) node = this.rotateRight(node);
      if (!less(node.key, key) && node.right === null) return null;
      if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
        node = this.moveRedRight(node);
      }
      if (less(node.key, key)) {
        node.right = this._delete(node.right, key);
      } else {
        // const min = this._min(node.right);
        // min.right = this._deleteMin(node.right);
        // min.left = node.left;
        // min.color = node.color;
        // node = min;
        const min = this._min(node.right);
        node.key = min.key;
        node.val = min.val;
        node.right = this._deleteMin(node.right);
      }
    }
    return this.balance(node);
  }

  deleteMin() {
    if (this.isEmpty()) return null;
    this.root = this._deleteMin(this.root);
    if (!this.isEmpty()) this.root.color = LLRB.BLACK;
  }

  _deleteMin(node) {
    if (node.left === null) return null;
    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = this.moveRedLeft(node);
    }
    node.left = this._deleteMin(node.left);
    return this.balance(node);
  }

  deleteMax() {
    if (this.isEmpty()) return null;
    this.root = this._deleteMax(this.root);
    if (!this.isEmpty()) this.root.color = LLRB.BLACK;
  }

  _deleteMax(node) {
    if (this.isRed(node.left)) {
      node = this.rotateRight(node);
    }
    if (node.right === null) return null;
    if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
      node = this.moveRedRight(node);
    }
    node.right = this._deleteMax(node.right);
    return this.balance(node);
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

  floor2(key) {
    if (key === null) throw new Error("null key is not allowed");
    const node = this._floor2(this.root, key, null);
    return node === null ? null : node.key;
  }

  _floor2(node, key, best) {
    if (node === null) return best;
    if (less(key, node.key)) return this._floor2(node.left, key, best);
    else if (less(node.key, key)) return this._floor(node.right, key, node);
    else return node;
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

  keys() {
    if (this.isEmpty()) return [];
    return this.rangeSearch(this.min(), this.max());
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

  rangeCount2(lo, hi) {
    if (lo === null) throw new Error("lo key cannot be null");
    if (hi === null) throw new Error("hi key cannot be null");
    return this._rangeCount2(this.root, lo, hi);
  }

  _rangeCount2(node, lo, hi) {
    if (node === null) return 0;
    let size = 0;
    if (!less(node.key, lo) && !less(hi, node.key)) {
      size += 1;
    }
    if (less(lo, node.key)) {
      size += this._rangeCount2(node.left, lo, hi);
    }
    if (less(node.key, hi)) {
      size += this._rangeCount2(node.right, lo, hi);
    }
    return size;
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

  moveRedLeft(node) {
    this.flipColors(node);
    if (this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right);
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }

  moveRedRight(node) {
    this.flipColors(node);
    if (this.isRed(node.left.left)) {
      node = this.rotateRight(node);
      this.flipColors(node);
    }
    return node;
  }

  balance(node) {
    if (this.isRed(node.right) && !this.isRed(node.left)) {
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

  test() {
    if (!this.isBST()) {
      throw new Error("Not in symmetric order");
    }
    if (!this.isSizeConsistent()) {
      throw new Error("Inconsistent counts");
    }
    if (!this.isRankConsistent()) {
      throw new Error("Inconsistent rank");
    }
    if (!this.is23()) {
      throw new Error("Not a 2-3 tree");
    }
    if (!this.isBalanced()) {
      throw new Error("Not balanced");
    }
  }

  isBST() {
    return this._isBST(this.root, null, null);
  }

  _isBST(node, min, max) {
    if (node === null) return true;
    if (min !== null && !less(min, node.key)) return false;
    if (max !== null && !less(node.key, max)) return false;
    return (
      this._isBST(node.left, min, node.key) &&
      this._isBST(node.right, node.key, max)
    );
  }

  isSizeConsistent() {
    return this._isSizeConsistent(this.root);
  }

  _isSizeConsistent(node) {
    if (node === null) return true;
    const size = 1 + this._size(node.left) + this._size(node.right);
    if (node.count !== size) return false;
    return (
      this._isSizeConsistent(node.left) && this._isSizeConsistent(node.right)
    );
  }

  isRankConsistent() {
    for (let i = 0; i < this.size(); i++) {
      if (i !== this.rank(this.select(i))) return false;
    }
    for (const key of this.keys()) {
      if (key !== this.select(this.rank(key))) return false;
    }
    return true;
  }

  is23() {
    return this._is23(this.root);
  }

  _is23(node) {
    if (node === null) return true;
    if (this.isRed(node.right)) return false;
    if (this.isRed(node) && this.isRed(node.left)) return false;
    return this._is23(node.left) && this._is23(node.right);
  }

  isBalanced() {
    let black = 0;
    let node = this.root;
    while (node !== null) {
      if (!this.isRed(node)) black++;
      node = node.left;
    }
    return this._isBalanced(this.root, black);
  }

  _isBalanced(node, black) {
    if (node === null) return black === 0;
    if (!this.isRed(node)) black--;
    return (
      this._isBalanced(node.left, black) && this._isBalanced(node.right, black)
    );
  }
}
