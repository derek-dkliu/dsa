import { shuffle } from "../common/utils.js";

export default class Quick3String {
  static sort(seq) {
    if (typeof seq[0] === "number") {
      const arr = seq.slice();
      return arr.sort((a, b) => a - b);
    } else {
      const arr = shuffle(seq.slice());
      this._sort(arr, 0, arr.length - 1, 0);
      return arr;
    }
  }

  static _sort(arr, lo, hi, d) {
    if (hi <= lo) return;

    const v = this._charCodeAt(arr[lo], d);
    let lt = lo;
    let gt = hi;
    let i = lo + 1;
    while (i <= gt) {
      const c = this._charCodeAt(arr[i], d);
      if (c < v) {
        this._swap(arr, i++, lt++);
      } else if (c > v) {
        this._swap(arr, i, gt--);
      } else {
        i++;
      }
    }
    this._sort(arr, lo, lt - 1, d);
    if (v >= 0) this._sort(arr, lt, gt, d + 1);
    this._sort(arr, gt + 1, hi, d);
  }

  static _swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  static _charCodeAt(s, d) {
    if (d < s.length) return s.charCodeAt(d);
    else return -1;
  }
}
