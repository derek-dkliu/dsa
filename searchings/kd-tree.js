export default class KdTree {
  constructor() {
    this.root = null;
  }

  size() {
    return this._size(this.root);
  }

  _size(node) {
    return node === null ? 0 : node.size;
  }

  insert(key) {
    if (key === null) throw new Error("Null key");
    this.root = this._insert(this.root, key, 0);
  }

  _insert(node, key, level) {
    if (node === null) return new Node(key);
    const cmp = key.compare(node.key, level);
    if (cmp < 0) {
      node.left = this._insert(node.left, key, level + 1);
    } else if (cmp > 0) {
      node.right = this._insert(node.right, key, level + 1);
    } else {
      // do nothing
    }
    node.size = 1 + this._size(node.left) + this._size(node.right);
    return node;
  }

  rangeSearch(lo, hi) {
    if (lo === null || !(lo instanceof Vector))
      throw new Error("lo is null or invalid");
    if (hi === null || !(hi instanceof Vector))
      throw new Error("hi is null or invalid");

    const result = [];
    this.sanitizeRange(lo, hi);
    this._rangeSearch(this.root, lo, hi, 0, result);
    return result.map((vec) => vec.toString()).join("\n");
  }

  _rangeSearch(node, lo, hi, level, result) {
    if (node === null) return;

    if (node.key.liesIn(lo, hi)) {
      result.push(node.key);
    }
    const cmplo = lo.compare(node.key, level);
    const cmphi = hi.compare(node.key, level);
    if (cmplo < 0) {
      this._rangeSearch(node.left, lo, hi, level + 1, result);
    }
    if (cmphi > 0) {
      this._rangeSearch(node.right, lo, hi, level + 1, result);
    }
  }

  sanitizeRange(lo, hi) {
    if (lo.val.length !== hi.val.length) throw new Error("Invalid range");
    for (let i = 0; i < lo.val.length; i++) {
      const min = Math.min(lo.val[i], hi.val[i]);
      const max = Math.max(lo.val[i], hi.val[i]);
      lo.val[i] = min;
      hi.val[i] = max;
    }
  }

  nearestNeighbor(key) {
    if (key === null || !(key instanceof Vector))
      throw new Error("key is null or invalid");
    const best = { dist: Infinity, key: null };
    this._nearestNeighbor(this.root, key, 0, best);
    return best.key;
  }

  _nearestNeighbor(node, key, level, best) {
    if (node === null || best.dist === 0) return;
    const dist = key.distance(node.key);
    if (dist === 0) {
      best.dist = 0;
      best.key = node.key;
      return;
    }
    if (dist < best.dist) {
      best.dist = dist;
      best.key = node.key;
    }
    const cmp = key.compare(node.key, level);
    if (cmp < 0) {
      this._nearestNeighbor(node.left, key, level + 1, best);
      if (key.levelDist(node.key, level) < best.dist) {
        this._nearestNeighbor(node.right, key, level + 1, best);
      }
    } else {
      this._nearestNeighbor(node.right, key, level + 1, best);
      if (key.levelDist(node.key, level) < best.dist) {
        this._nearestNeighbor(node.left, key, level + 1, best);
      }
    }
  }

  static search(points, rect) {
    const kdt = new KdTree();
    for (let i = 0; i < points.length; i++) {
      kdt.insert(new Vector(points[i], i + 1));
    }
    return kdt.rangeSearch(new Vector(rect[0]), new Vector(rect[1]));
  }

  static nearest(points, target) {
    const kdt = new KdTree();
    for (let i = 0; i < points.length; i++) {
      kdt.insert(new Vector(points[i], i + 1));
    }
    return kdt.nearestNeighbor(new Vector(target)).toString();
  }
}

class Vector {
  constructor(val, id = null) {
    this.val = val;
    this.id = id;
  }

  levelDist(that, level) {
    const i = level % this.val.length;
    return Math.pow(this.val[i] - that.val[i], 2);
  }

  distance(that) {
    let dist = 0;
    for (let i = 0; i < this.val.length; i++) {
      dist += Math.pow(this.val[i] - that.val[i], 2);
    }
    return dist;
  }

  liesIn(lo, hi) {
    for (let i = 0; i < this.val.length; i++) {
      if (this.val[i] < lo.val[i] || this.val[i] > hi.val[i]) {
        return false;
      }
    }
    return true;
  }

  compare(that, level) {
    const i = level % this.val.length;
    return this.val[i] - that.val[i];
  }

  toString() {
    return `${this.id}: (${this.val.join()})`;
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
