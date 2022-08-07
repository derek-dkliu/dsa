import { less, swap, shuffle, medianOfThree } from "../common/utils.js";

export class QuickSort {
  static CUTOFF = 10;

  static select(seq, n) {
    if (!seq || seq.length === 0) {
      return null;
    }
    const arr = shuffle(seq.slice());
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
      const p = this._partition(arr, lo, hi);
      if (p === n) {
        return arr[p];
      } else if (p < n) {
        lo = p + 1;
      } else {
        hi = p - 1;
      }
    }
    return null;
  }

  static sort(seq) {
    if (!seq || seq.length === 0) {
      return seq;
    }
    // shuflling is needed for performance guarantee
    const arr = shuffle(seq.slice());
    this._sort(arr, 0, arr.length - 1);
    return arr;
  }

  static _sort(arr, lo, hi) {
    // // improve1: cutoff to insertion sort
    // if (lo + this.CUTOFF - 1 >= hi) {
    //   // do insertion sort from lo to hi
    //   return;
    // }
    if (lo >= hi) {
      return;
    }

    // improve2: median of sample for pivot
    const mid = lo + Math.floor((hi - lo) / 2);
    swap(arr, lo, medianOfThree(arr, lo, mid, hi));

    const p = this._partition(arr, lo, hi);
    this._sort(arr, lo, p - 1);
    this._sort(arr, p + 1, hi);
  }

  static _partition(arr, lo, hi) {
    const pivot = arr[lo];
    let i = lo + 1;
    let j = hi;
    // terminate when i and j cross
    while (i <= j) {
      // stop on keys equal to pivot, or when i and j cross
      while (less(arr[i], pivot) && i <= j) {
        i++;
      }
      while (less(pivot, arr[j])) {
        j--;
      }
      if (i > j) {
        break;
      }
      swap(arr, i, j);
      i++;
      j--;
    }
    // j points to the largest element of left subarray
    // swap lo with j, so the pivot is in place
    swap(arr, lo, j);
    return j;
  }
}

export class QuickSort3Way {
  static sort(seq) {
    if (!Array.isArray(seq)) {
      return null;
    }
    // shuflling is needed for performance guarantee
    const arr = shuffle(seq.slice());
    this._sort(arr, 0, arr.length - 1);
    return arr;
  }

  static _sort(arr, lo, hi) {
    // // improve1: cutoff to insertion sort
    // if (lo + this.CUTOFF - 1 >= hi) {
    //   // do insertion sort from lo to hi
    //   return;
    // }
    if (lo >= hi) {
      return;
    }

    // // improve2: median of sample for pivot
    // const mid = lo + Math.floor((hi - lo) / 2);
    // swap(arr, lo, medianOfThree(arr, lo, mid, hi));

    const [lt, gt] = this._partition(arr, lo, hi);
    this._sort(arr, lo, lt - 1);
    this._sort(arr, gt + 1, hi);
  }

  static _partition(arr, lo, hi) {
    const pivot = arr[lo];
    let lt = lo;
    let gt = hi;
    let i = lo + 1;
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
}
