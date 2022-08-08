import { swap } from "../common/utils.js";
import PriorityQueue from "../structures/priority-queue.js";

export default class HeapSort {
  static sort(seq) {
    const arr = seq.slice();
    const pq = new PriorityQueue({ arr });
    const start = pq.getParentIndex(arr.length - 1);
    for (let i = start; i >= 0; i--) {
      pq.swapDown(i);
    }
    while (!pq.isEmpty()) {
      swap(pq.arr, 0, --pq.size);
      pq.swapDown(0);
    }
    return pq.arr;
  }

  static keep(seq, capicity, maxpq) {
    const pq = new PriorityQueue({ capicity, maxpq });
    seq.forEach((val) => pq.insert(val));
    return pq.arr.slice();
  }
}
