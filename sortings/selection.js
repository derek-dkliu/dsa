import { less, swap } from "../common/utils.js";

export default class Selection {
  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (less(arr, j, min)) {
          min = j;
        }
      }
      swap(arr, i, min);
    }
    return arr;
  }
}
