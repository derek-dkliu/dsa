import { sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

class Shifting {
  static rotate(seq, d) {
    const arr = seq.slice();
    const n = arr.length;
    d = d % n;
    for (let i = 0; i < this.gcd(d, n); i++) {
      const t = arr[i];
      let j = i;
      while (true) {
        let k = (j + d) % n;
        if (k === i) {
          break;
        }
        arr[j] = arr[k];
        j = k;
      }
      arr[j] = t;
    }
    return arr;
  }

  static gcd(a, b) {
    // if (b === 0) {
    //   return a;
    // }
    // return this.gcd(b, a % b);
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }
}

class BlockSwap {
  static rotate(seq, d) {
    const arr = seq.slice();
    d = d % arr.length;
    return this._rotate(arr, 0, arr.length - 1, d);
  }

  static _rotate(arr, lo, hi, d) {
    if (d === 0) return arr;

    const len = lo + d * 2 - 1;
    if (len > hi) {
      const s = hi - (lo + d) + 1;
      const r = hi - s + 1;
      this.swap(arr, lo, r, s);
      return this._rotate(arr, lo + s, hi, d - s);
    } else {
      const r = hi - d + 1;
      this.swap(arr, lo, r, d);
      if (len === hi) {
        return arr;
      } else {
        return this._rotate(arr, lo, hi - d, d);
      }
    }
  }

  static swap(arr, l, r, s) {
    for (let i = 0; i < s; i++) {
      const tmp = arr[l + i];
      arr[l + i] = arr[r + i];
      arr[r + i] = tmp;
    }
  }
}

class Reversion {
  static rotate(seq, d) {
    const arr = seq.slice();
    const n = arr.length;
    d = d % n;
    this.reverse(arr, 0, d - 1);
    this.reverse(arr, d, n - 1);
    this.reverse(arr, 0, n - 1);
    return arr;
  }

  static reverse(arr, lo, hi) {
    let i = lo;
    let j = hi;
    while (i < j) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
      i++;
      j--;
    }
  }
}

class ArrayRotation {
  static run() {
    const size = 10;
    const cases = [sequence(size, { numeric: false })];
    for (const solution of [Shifting, BlockSwap, Reversion]) {
      cases.forEach((seq, index) => {
        banner(
          `[${solution.name}] CASE ${index + 1}:`.padEnd(10) + seq.toString()
        );
        for (let i = 0; i < size; i++) {
          console.log(i, ...solution.rotate(seq, i));
        }
      });
    }
  }
}

ArrayRotation.run();
