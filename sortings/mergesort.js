import { less } from "../common/helpers.js";

export default class MergeSort {
  static CUTOFF = 6;

  static sortBottomUp(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const aux = seq.slice();
    const n = arr.length;
    // size is the length of subarray already sorted
    for (let size = 1; size < n; size *= 2) {
      // loop only when remaining entries is larger than size,
      // since subarray of length "size" is already sorted
      for (let i = 0; i + size < n; i += size * 2) {
        const lo = i;
        const mid = lo + size - 1;
        const hi = Math.min(n - 1, lo + size * 2 - 1); // capped in case out of index
        this._merge(arr, aux, lo, mid, hi);
      }
    }
    return arr;
  }

  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const aux = seq.slice();
    this._sort(arr, aux, 0, arr.length - 1);
    return arr;
  }

  static _sort(arr, aux, lo, hi) {
    // // improve1: cutoff to insertion sort
    // if (lo + this.CUTOFF - 1 >= hi) {
    //   // do insertion sort from lo to hi
    //   return;
    // }
    if (lo >= hi) {
      return;
    }
    const mid = lo + Math.floor((hi - lo) / 2);
    this._sort(arr, aux, lo, mid);
    this._sort(arr, aux, mid + 1, hi);

    // improve2: check if already sorted
    if (!less(arr[mid + 1], arr[mid])) {
      return;
    }

    this._merge(arr, aux, lo, mid, hi);
  }

  static _merge(arr, aux, lo, mid, hi) {
    // copy to aux[]
    for (let k = lo; k <= hi; k++) {
      aux[k] = arr[k];
    }
    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        // improve3: skip copy as rightmost elements are already in place
        break;
        // arr[k] = aux[j++];
      } else if (j > hi) {
        arr[k] = aux[i++];
      } else if (less(aux[j], aux[i])) {
        arr[k] = aux[j++];
      } else {
        arr[k] = aux[i++];
      }
    }
  }
}
