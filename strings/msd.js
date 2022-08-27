export default class MSD {
  static sort(seq) {
    const arr = seq.slice();
    if (typeof arr[0] === "number") {
      this.sortInt32(arr);
    } else {
      this.sortString(arr);
    }
    return arr;
  }

  static sortString(arr) {
    this._sortString(arr, [], 0, arr.length - 1, 0);
  }

  static _sortString(arr, aux, lo, hi, d) {
    const R = 256;
    const CUTOFF = 15;

    if (hi <= lo) return;
    // // cutoff to insertion sort for small subarrays
    // if (hi <= lo + CUTOFF) {
    //   this._insertion(arr, lo, hi, d);
    //   return;
    // }

    const count = [];
    for (let i = 0; i < R + 2; i++) {
      count[i] = 0;
    }
    for (let i = lo; i <= hi; i++) {
      count[this._charCodeAt(arr[i], d) + 2]++;
    }
    for (let i = 0; i < R + 1; i++) {
      count[i + 1] += count[i];
    }
    for (let i = lo; i <= hi; i++) {
      aux[count[this._charCodeAt(arr[i], d) + 1]++] = arr[i];
    }
    for (let i = lo; i <= hi; i++) {
      arr[i] = aux[i - lo];
    }
    for (let i = 0; i < R; i++) {
      this._sortString(arr, aux, lo + count[i], lo + count[i + 1] - 1, d + 1);
    }
  }

  static _charCodeAt(s, d) {
    if (d < s.length) return s.charCodeAt(d);
    else return -1;
  }

  static _insertion(arr, lo, hi, d) {
    for (let i = lo; i <= hi; i++) {
      for (let j = i; j > lo; j--) {
        if (this._less(arr[j], arr[j - 1], d)) {
          this._swap(arr, j, j - 1);
        }
      }
    }
  }

  static _less(a, b, d) {
    // return a.slice(d) < b.slice(d);
    const n = Math.min(a.length, b.length);
    for (let i = d; i < n; i++) {
      if (a.charAt(i) < b.charAt(i)) return true;
      if (a.charAt(i) > b.charAt(i)) return false;
    }
    return a.length < b.length;
  }

  static _swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  static sortInt32(arr) {
    this._sortInt32(arr, [], 0, arr.length - 1, 0);
  }

  static _sortInt32(arr, aux, lo, hi, d) {
    if (hi <= lo) return;

    const R = 256;
    const MASK = R - 1;
    const BITS_PER_BYTE = 8;
    const shift = 32 - BITS_PER_BYTE - BITS_PER_BYTE * d;

    const count = [];
    for (let i = 0; i < R + 1; i++) {
      count[i] = 0;
    }
    for (let i = lo; i <= hi; i++) {
      const c = (arr[i] >> shift) & MASK;
      count[c + 1]++;
    }
    for (let i = 0; i < R; i++) {
      count[i + 1] += count[i];
    }
    // for most significant btyes, [0x80 - 0xff] comes before [0x00 - 0x7f]
    if (d === 0) {
      const shift1 = count[R] - count[R / 2];
      const shift2 = count[R / 2];
      count[R] = shift1 + count[1]; // to simplify recursive call
      for (let i = 0; i < R / 2; i++) {
        count[i] += shift1;
      }
      for (let i = R / 2; i < R; i++) {
        count[i] -= shift2;
      }
    }
    for (let i = lo; i <= hi; i++) {
      const c = (arr[i] >> shift) & MASK;
      aux[count[c]++] = arr[i];
    }
    for (let i = lo; i <= hi; i++) {
      arr[i] = aux[i - lo];
    }

    // no more bits
    if (d === 3) return;
    // special case for d = 0
    if (d === 0 && count[R / 2] > 0) {
      this._sortInt32(arr, aux, lo, lo + count[R / 2] - 1, d + 1);
    }
    // special case for d > 0
    if (d > 0 && count[0] > 0) {
      this._sortInt32(arr, aux, lo, lo + count[0] - 1, d + 1);
    }
    // recursively sort for each character
    // for d = 0, skip case i + 1 = R/2
    // for d > 0, skip case i + 1 = R
    for (let i = 0; i < R; i++) {
      if (count[i + 1] > count[i]) {
        this._sortInt32(arr, aux, lo + count[i], lo + count[i + 1] - 1, d + 1);
      }
    }
  }
}
