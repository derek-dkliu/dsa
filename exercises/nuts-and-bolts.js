import { randomSeq, shuffle, less, swap } from "../common/helpers.js";

export class NutsAndBolts {
  static run() {
    const size = 20;
    const nuts = randomSeq(size, { unique: false, numeric: false });
    const bolts = shuffle(nuts.slice());
    console.log(...nuts);
    console.log(...bolts);
    this.match(nuts, bolts, 0, nuts.length - 1);
    console.log(...nuts);
    console.log(...bolts);
  }

  static match(nuts, bolts, lo, hi) {
    if (lo >= hi) return;

    const mid = lo + Math.floor((hi - lo) / 2);
    const pivot = this.median3(bolts, lo, mid, hi);
    const [lt, gt] = this.partition(nuts, lo, hi, pivot);
    this.partition(bolts, lo, hi, nuts[lt]);
    this.match(nuts, bolts, lo, lt - 1);
    this.match(nuts, bolts, gt + 1, hi);
  }

  static partition(arr, lo, hi, pivot) {
    let lt = lo;
    let gt = hi;
    let i = lo;
    while (i <= gt) {
      if (less(arr[i], pivot)) {
        swap(arr, i++, lt++);
      } else if (less(pivot, arr[i])) {
        swap(arr, i, gt--);
      } else {
        i++;
      }
    }
    return [lt, gt];
  }

  static median3(a, i, j, k) {
    return less(a[i], a[j])
      ? less(a[j], a[k])
        ? a[j]
        : less(a[i], a[k])
        ? a[k]
        : a[i]
      : less(a[k], a[j])
      ? a[j]
      : less(a[k], a[i])
      ? a[k]
      : a[i];
  }
}
