import { less, swap } from "../common/helpers.js";
import PriorityQueue from "../structures/priority-queue.js";

export default class HeapSort {
  static sort(seq) {
    const arr = seq.slice();
    let size = arr.length;
    const start = Math.floor((arr.length - 1) / 2);
    for (let i = start; i >= 0; i--) {
      this.swapDown(arr, i, size);
    }
    while (size > 0) {
      swap(arr, 0, --size);
      this.swapDown(arr, 0, size);
    }
    return arr;
  }

  static swapDown(arr, i, size) {
    while (i * 2 + 1 < size) {
      let j = i * 2 + 1;
      if (j + 1 < size && less(arr[j], arr[j + 1])) {
        j++;
      }
      if (less(arr[i], arr[j])) {
        swap(arr, i, j);
        i = j;
      } else {
        break;
      }
    }
  }

  static pqSort(seq, maxpq) {
    const pq = new PriorityQueue(maxpq);
    pq.arr = seq.slice();
    const start = pq.getParentIndex(pq.size() - 1);
    for (let i = start; i >= 0; i--) {
      pq.swapDown(i);
    }
    let size = pq.size();
    while (size > 0) {
      swap(pq.arr, 0, --size);
      pq.swapDown(0, size);
    }
    return pq.getData();
  }

  static keep(seq, capicity, maxpq) {
    const pq = new PriorityQueue({ maxpq });
    seq.forEach((val) => {
      pq.insert(val);
      if (pq.size() > capicity) {
        pq.delete();
      }
    });
    return pq.getData();
  }
}
