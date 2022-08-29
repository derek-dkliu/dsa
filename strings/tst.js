import { ArgumentError } from "../common/errors.js";

export class TST {
  constructor() {
    this.root = null;
  }

  put(key, val) {
    if (key === undefined || key === null)
      throw new ArgumentError("Key cannot be null or undefined");
    this.root = this._put(this.root, key, val, 0);
  }

  _put(node, key, val, d) {
    const c = key.charAt(d);
    if (!node) node = new Node(c);

    if (c < node.c) {
      node.left = this._put(node.left, key, val, d);
    } else if (c > node.c) {
      node.right = this._put(node.right, key, val, d);
    } else {
      if (d < key.length - 1) {
        node.mid = this._put(node.mid, key, val, d + 1);
      } else {
        node.val = val;
      }
    }
    return node;
  }

  contains(key) {
    return this.get(key) !== null;
  }

  get(key) {
    if (key === undefined || key === null)
      throw new ArgumentError("Key cannot be null or undefined");
    const node = this._get(this.root, key, 0);
    return node !== null ? node.val : null;
  }

  _get(node, key, d) {
    if (!node) return null;
    if (key.length === 0) throw new ArgumentError("Key must have length >= 1");
    const c = key.charAt(d);
    if (c < node.c) return this._get(node.left, key, d);
    else if (c > node.c) return this._get(node.right, key, d);
    else if (d < key.length - 1) return this._get(node.mid, key, d + 1);
    else return node;
  }
}

class Node {
  constructor(c) {
    this.c = c;
    this.val = null;
    this.left = null;
    this.right = null;
    this.mid = null;
  }
}
