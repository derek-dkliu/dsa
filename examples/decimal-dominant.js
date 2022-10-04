import { less, swap } from "../common/helpers.js";

export class DecimalDominant {
  static run() {
    const seq = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const result1 = this.bucket(seq.slice());
    const result2 = this.quick(seq.slice());
    console.log(...seq, result1, result2);
  }

  static bucket(arr) {
    const m = 10 - 1;
    const count = new Map();
    for (const x of arr) {
      if (count.has(x)) {
        count.set(x, count.get(x) + 1);
      } else {
        if (count.size < m) {
          count.set(x, 1);
        } else {
          for (const [key, val] of count) {
            if (val === 1) {
              count.delete(key);
            } else {
              count.set(key, val - 1);
            }
          }
        }
      }
    }
    for (const key of count.keys()) {
      count.set(key, 0);
    }
    for (const x of arr) {
      if (count.has(x)) {
        count.set(x, count.get(x) + 1);
      }
    }
    const result = [];
    const sz = Math.floor(arr.length / 10);
    for (const [key, val] of count) {
      if (val > sz) result.push(key);
    }
    return result;
  }

  static quick(arr) {
    const result = [];
    const sz = Math.floor(arr.length / 10);
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
      const bound = this.select(arr, lo + sz, lo, hi);
      if (!bound) break;
      const [lt, gt] = bound;
      if (gt - lt + 1 > sz) {
        result.push(arr[lt]);
      }
      lo = gt + 1;
    }
    return result;
  }

  static select(arr, k, lo, hi) {
    while (lo <= hi) {
      const [lt, gt] = this.partition(arr, lo, hi);
      if (k >= lt && k <= gt) {
        return [lt, gt];
      } else if (k < lt) {
        hi = lt - 1;
      } else {
        lo = gt + 1;
      }
    }
    return null;
  }

  static partition(arr, lo, hi) {
    // const mid = lo + Math.floor((hi - lo) / 2);
    // const m = this.median3(arr, lo, mid, hi);
    // swap(arr, lo, m);

    let p = arr[lo];
    let lt = lo;
    let gt = hi;
    let i = lo + 1;
    while (i <= gt) {
      if (less(arr[i], p)) {
        swap(arr, i++, lt++);
      } else if (less(p, arr[i])) {
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
        ? j
        : less(a[i], a[k])
        ? k
        : i
      : less(a[k], a[j])
      ? j
      : less(a[k], a[i])
      ? k
      : i;
  }
}
