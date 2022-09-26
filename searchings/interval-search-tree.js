export default class IntervalSearchTree {
  constructor() {
    this.root = null;
  }

  insert(key1, key2) {
    if (key1 === null) throw new Error("key1 is null");
    if (key2 === null) throw new Error("key2 is null");
    this.root = this._insert(this.root, new Interval(key1, key2));
  }

  _insert(node, key) {
    if (node === null) return new Node(key);
    if (key.equal(node.key)) {
      // do nothing
    } else if (key.lo < node.key.lo) {
      node.left = this._insert(node.left, key);
    } else {
      node.right = this._insert(node.right, key);
    }
    node.max = Math.max(node.left?.max || 0, node.right?.max || 0);
    return node;
  }

  search(key1, key2) {
    if (key1 === null) throw new Error("key1 is null");
    if (key2 === null) throw new Error("key2 is null");
    const inverval = this._search(this.root, new Interval(key1, key2));
    return inverval === null ? null : inverval.toArray();
  }

  _search(node, key) {
    if (node === null) return null;
    if (key.insersect(node.key)) return node.key;
    else if (node.left === null) return this._search(node.right, key);
    else if (node.left.max < key.lo) return this._search(node.right, key);
    else return this._search(node.left, key);
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.max = key.right;
    this.left = null;
    this.right = null;
  }
}

class Interval {
  constructor(v1, v2) {
    this.lo = Math.min(v1, v2);
    this.hi = Math.max(v1, v2);
  }

  insersect(that) {
    if (this.lo > that.hi || this.hi < that.lo) return false;
    return true;
  }

  equal(that) {
    return this.lo === that.lo && this.hi === that.hi;
  }

  toArray() {
    return [this.lo, this.hi];
  }
}
