import { less, swap } from "../common/helpers.js";

export default class Insertion {
  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const len = arr.length;
    for (let i = 1; i < len; i++) {
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

  static indexSort(arr) {
    const n = arr.length;
    if (n === 0) return arr;
    const index = [];
    for (let i = 0; i < n; i++) {
      index[i] = i;
    }

    for (let i = 1; i < n; i++) {
      for (let j = i; j > 0; j--) {
        if (less(arr[index[j]], arr[index[j - 1]])) {
          swap(index, j, j - 1);
        } else {
          break;
        }
      }
    }
    return index;
  }
}
