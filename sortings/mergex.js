import { less, swap } from "../common/helpers.js";

export class MergeX {
  static CUTOFF = 5;

  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    const arr = seq.slice();
    const aux = arr.slice();
    this._sort(arr, aux, 0, arr.length - 1);
    return arr;
  }

  static _sort(arr, aux, lo, hi) {
    // if (hi <= lo) return;
    if (hi <= lo + this.CUTOFF) {
      this.insertionSort(arr, lo, hi);
      return;
    }

    const mid = lo + Math.floor((hi - lo) / 2);
    this._sort(aux, arr, lo, mid);
    this._sort(aux, arr, mid + 1, hi);

    if (!less(aux[mid + 1], aux[mid])) {
      for (let i = lo; i <= hi; i++) arr[i] = aux[i];
      return;
    }

    this._merge(arr, aux, lo, mid, hi);
  }

  static _merge(arr, aux, lo, mid, hi) {
    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      if (i > mid) arr[k] = aux[j++];
      else if (j > hi) arr[k] = aux[i++];
      else if (less(aux[j], aux[i])) arr[k] = aux[j++];
      else arr[k] = aux[i++];
    }
  }

  static insertionSort(arr, lo, hi) {
    for (let i = lo + 1; i <= hi; i++) {
      for (let j = i; j > lo; j--) {
        if (less(arr[j], arr[j - 1])) {
          swap(arr, j, j - 1);
        } else {
          break;
        }
      }
    }
  }
}
