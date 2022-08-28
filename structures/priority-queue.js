import { less, swap } from "../common/helpers.js";

/*
 * Priority queue is implemented with binary heap (here represented by array);
 * Binary heap is a complete binary tree where
 * parent's key is smaller/larger than children's key.
 */
export default class PriorityQueue {
  constructor(maxpq = true) {
    this.arr = [];
    this.compare = (a, b) => (maxpq ? less(b, a) : less(a, b));
  }

  getData() {
    return this.arr.slice();
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.arr.length;
  }

  insert(item) {
    this.arr.push(item);
    this.swapUp(this.size() - 1);
  }

  delete() {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.arr[0];
    const last = this.size() - 1;
    swap(this.arr, 0, last);
    this.arr.length = last;
    this.swapDown(0);
    return item;
  }

  swapUp(i) {
    while (i > 0) {
      const parent = this.getParentIndex(i);
      if (this.compare(this.arr[i], this.arr[parent])) {
        swap(this.arr, i, parent);
        i = parent;
      } else {
        break;
      }
    }
  }

  swapDown(i, size) {
    size = size ?? this.size();
    while (this.getLeftChildIndex(i) < size) {
      let left = this.getLeftChildIndex(i);
      const right = left + 1;
      if (right < size && this.compare(this.arr[right], this.arr[left])) {
        left = right;
      }
      if (this.compare(this.arr[left], this.arr[i])) {
        swap(this.arr, left, i);
        i = left;
      } else {
        break;
      }
    }
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return i * 2 + 1;
  }
}
