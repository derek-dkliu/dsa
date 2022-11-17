import { less, swap } from "../common/helpers.js";

export default class Bubble {
  static sort(seq) {
    const arr = seq.slice();
    let sorted = false;
    let lastUnsorted = arr.length - 1;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < lastUnsorted; i++) {
        if (less(arr[i + 1], arr[i])) {
          swap(arr, i, i + 1);
          sorted = false;
        }
      }
    }
    return arr;
  }
}
