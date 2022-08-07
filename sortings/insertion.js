import { less, swap } from "../common/utils.js";

export default class Insertion {
  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = i; j > 0; j--) {
        if (less(arr[j], arr[j - 1])) {
          swap(arr, j, j - 1);
        } else {
          break;
        }
      }
    }
    return arr;
  }
}
