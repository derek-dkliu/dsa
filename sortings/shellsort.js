import { less, swap } from "../common/helpers.js";

export default class Shellsort {
  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const len = arr.length;
    let h = 1;
    while (h < len / 3) {
      h = h * 3 + 1;
    }
    while (h >= 1) {
      // do h-sort which is a generalization of insertion sort where h=1
      for (let i = h; i < len; i++) {
        for (let j = i; j >= h; j -= h) {
          if (less(arr[j], arr[j - h])) {
            swap(arr, j, j - h);
          } else {
            break;
          }
        }
      }
      h = Math.floor(h / 3);
    }
    return arr;
  }
}
