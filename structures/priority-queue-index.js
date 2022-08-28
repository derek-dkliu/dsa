import { less } from "../common/helpers.js";

export default class IndexPriorityQueue {
  constructor(maxN, maxpq = false) {
    this.maxN = maxN;
    this.maxpq = maxpq;
    this.keys = [];
    this.n = 0; // number of elements on PQ
    this.pq = []; // index of the key by heap position
    this.qp = []; // heap position of the key by index
  }

  insert(i, key) {
    if (this.contains(i))
      throw new Error("index is already in the priority queue");
    const n = this.n++;
    this.keys[i] = key;
    this.qp[i] = n;
    this.pq[n] = i;
    this.swapUp(n);
  }

  delete() {
    if (this.isEmpty()) throw new Error("Priority queue underflow");
    this.exch(0, --this.n);
    const n = this.n;
    const i = this.pq[n];
    this.keys[i] = null;
    this.qp[i] = null;
    this.pq[n] = null;
    this.swapDown(0);
    return i;
  }

  keyOf(i) {
    this.validateIndex(i);
    if (!this.contains(i))
      throw new Error("index is not in the priority queue");
    return this.keys[i];
  }

  peekIndex() {
    if (this.isEmpty()) throw new Error("Priority queue underflow");
    return this.pq[0];
  }

  peekKey() {
    if (this.isEmpty()) throw new Error("Priority queue underflow");
    return this.keys[this.pq[0]];
  }

  changeKey(i, key) {
    if (!this.contains(i))
      throw new Error("index is not in the priority queue");
    this.keys[i] = key;
    this.swapUp(this.qp[i]);
    this.swapDown(this.qp[i]);
  }

  decreaseKey(i, key) {
    if (!this.contains(i))
      throw new Error("index is not in the priority queue");
    if (!less(key, this.keys[i])) {
      throw new Error(
        "Calling decreaseKey() with a key equal to or greater than the key in the priority queue"
      );
    }
    this.keys[i] = key;
    if (this.maxpq) {
      this.swapDown(this.qp[i]);
    } else {
      this.swapUp(this.qp[i]);
    }
  }

  increaseKey(i, key) {
    if (!this.contains(i))
      throw new Error("index is not in the priority queue");
    if (less(key, this.keys[i])) {
      throw new Error(
        "Calling increaseKey() with a key equal to or less than the key in the priority queue"
      );
    }
    this.keys[i] = key;
    if (this.maxpq) {
      this.swapUp(this.qp[i]);
    } else {
      this.swapDown(this.qp[i]);
    }
  }

  contains(i) {
    this.validateIndex(i);
    return this.qp[i] !== undefined && this.qp[i] !== null;
  }

  isEmpty() {
    return this.n === 0;
  }

  size() {
    return this.n;
  }

  // helper functions
  swapUp(k) {
    while (k > 0) {
      const parent = this.getParent(k);
      if (this.compare(k, parent)) {
        this.exch(k, parent);
        k = parent;
      } else {
        break;
      }
    }
  }

  swapDown(k) {
    while (this.getLeftChild(k) < this.n) {
      let j = this.getLeftChild(k);
      if (j + 1 < this.n && this.compare(j + 1, j)) {
        j = j + 1;
      }
      if (this.compare(j, k)) {
        this.exch(k, j);
        k = j;
      } else {
        break;
      }
    }
  }

  getParent(k) {
    return Math.floor((k - 1) / 2);
  }

  getLeftChild(k) {
    return k * 2 + 1;
  }

  compare(i, j) {
    const a = this.keys[this.pq[i]];
    const b = this.keys[this.pq[j]];
    return this.maxpq ? less(b, a) : less(a, b);
  }

  exch(i, j) {
    const tmp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = tmp;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }

  validateIndex(i) {
    if (i < 0) throw new Error("index is negative: " + i);
    if (i >= this.maxN) throw new Error("index >= capacity: " + i);
  }
}
