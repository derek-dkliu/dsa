import { less, swap } from "../common/utils.js";

/*
 * Priority queue is implemented with binary heap (here represented by array);
 * Binary heap(min) is a complete binary tree where
 * parent node is no larger than children node.
 */
export default class PriorityQueue {
  constructor({ arr = [], capicity = 0, maxpq = true } = {}) {
    this.arr = arr;
    this.size = arr.length;
    this.capicity = capicity;
    this.compare = (a, b) => (maxpq ? less(b, a) : less(a, b));
  }

  isEmpty() {
    return this.size === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.arr[0];
  }

  insert(item) {
    this.arr[this.size++] = item;
    this.swapUp(this.size - 1);
    // check size if capicity is set
    if (this.capicity && this.size > this.capicity) {
      this.delete();
    }
  }

  delete() {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.arr[0];
    swap(this.arr, 0, --this.size);
    this.arr.length = this.size;
    this.swapDown(0);
    return item;
  }

  swapUp(idx) {
    while (this.hasParent(idx)) {
      const parent = this.getParentIndex(idx);
      if (this.compare(this.arr[idx], this.arr[parent])) {
        swap(this.arr, idx, parent);
        idx = parent;
      } else {
        break;
      }
    }
  }

  swapDown(idx) {
    while (this.hasLeftChild(idx)) {
      let left = this.getLeftChildIndex(idx);
      if (
        this.hasRightChild(idx) &&
        this.compare(this.arr[this.getRightChildIndex(idx)], this.arr[left])
      ) {
        left = this.getRightChildIndex(idx);
      }
      if (this.compare(this.arr[left], this.arr[idx])) {
        swap(this.arr, left, idx);
        idx = left;
      } else {
        break;
      }
    }
  }

  hasParent(idx) {
    return idx > 0;
  }

  hasLeftChild(idx) {
    return this.getLeftChildIndex(idx) < this.size;
  }

  hasRightChild(idx) {
    return this.getRightChildIndex(idx) < this.size;
  }

  getParentIndex(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getLeftChildIndex(idx) {
    return idx * 2 + 1;
  }

  getRightChildIndex(idx) {
    return idx * 2 + 2;
  }
}
