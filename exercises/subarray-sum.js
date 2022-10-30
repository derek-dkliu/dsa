class MaxSubarray {
  static find(A) {
    let start = 0;
    let sum = 0;
    let max = -Infinity;
    let range;
    for (let i = 0; i < A.length; i++) {
      sum += A[i];
      if (sum > max) {
        max = sum;
        range = [start, i];
      }
      if (sum < 0) {
        sum = 0;
        start = i + 1;
      }
    }
    console.log(max, range);
  }

  static find1(A) {
    let max = -Infinity;
    let maxEndsHere = 0;
    for (let i = 0; i < A.length; i++) {
      maxEndsHere += A[i];
      max = Math.max(max, maxEndsHere);
      maxEndsHere = Math.max(maxEndsHere, 0);
    }
    console.log(max);
  }

  static find2a(A) {
    let max = -Infinity;
    for (let i = 0; i < A.length; i++) {
      let sum = 0;
      for (let j = i; j < A.length; j++) {
        sum += A[j];
        if (sum > max) {
          max = sum;
        }
      }
    }
    console.log(max);
  }

  static find2b(A) {
    let cum = [0];
    for (let i = 0; i < A.length; i++) {
      cum[i + 1] = cum[i] + A[i];
    }
    let max = -Infinity;
    for (let i = 0; i < A.length; i++) {
      for (let j = i; j < A.length; j++) {
        const sum = cum[j + 1] - cum[i];
        if (sum > max) {
          max = sum;
        }
      }
    }
    console.log(max);
  }

  static find3a(A) {
    const max = this._find3a(A, 0, A.length - 1);
    console.log(max);
  }
  static _find3a(A, lo, hi) {
    if (lo > hi) return -Infinity;
    if (lo === hi) return A[lo];
    const mid = lo + Math.floor((hi - lo) / 2);
    let lsum = 0;
    let lmax = -Infinity;
    for (let i = mid; i >= lo; i--) {
      lsum += A[i];
      lmax = Math.max(lmax, lsum);
    }
    let rsum = 0;
    let rmax = -Infinity;
    for (let i = mid + 1; i <= hi; i++) {
      rsum += A[i];
      rmax = Math.max(rmax, rsum);
    }
    return Math.max(
      this._find3a(A, lo, mid),
      this._find3a(A, mid + 1, hi),
      lmax + rmax
    );
  }

  static find3b(A) {
    const [max] = this._find3b(A, 0, A.length - 1);
    console.log(max);
  }
  static _find3b(A, lo, hi) {
    if (lo === hi) {
      const v = A[lo];
      return [v, v, v, v];
    }
    const mid = lo + Math.floor((hi - lo) / 2);
    const [lmax, lprefix, lsuffix, lsum] = this._find3b(A, lo, mid);
    const [rmax, rprefix, rsuffix, rsum] = this._find3b(A, mid + 1, hi);
    const max = Math.max(lmax, rmax, lsuffix + rprefix);
    const prefix = Math.max(lprefix, lsum + rprefix);
    const suffix = Math.max(rsuffix, rsum + lsuffix);
    const sum = lsum + rsum;
    return [max, prefix, suffix, sum];
  }
}

import BST from "../searchings/bst.js";

class ClosestSubarray {
  static zero(A) {
    const cum = [[0, -1]];
    for (let i = 0; i < A.length; i++) {
      cum[i + 1] = [cum[i][0] + A[i], i];
    }
    cum.sort((a, b) => a[0] - b[0]);
    let min = Infinity;
    let ans = [];
    for (let i = 1; i < cum.length; i++) {
      const a = cum[i - 1];
      const b = cum[i];
      const diff = Math.abs(a[0] - b[0]);
      if (diff < min) {
        min = diff;
        ans = [a, b];
      }
    }
    const [a, b] = ans;
    // determine low and high index
    if (a[1] < b[1]) {
      console.log(b[0] - a[0], [a[1] + 1, b[1]]);
    } else {
      console.log(a[0] - b[0], [b[1] + 1, a[1]]);
    }
  }

  static find(A, target) {
    let ans = [];
    let min = Infinity;
    let sum = 0;
    const bst = new BST();
    bst.put(0, -1);
    for (let i = 0; i < A.length; i++) {
      sum += A[i];
      const low = bst.floor(sum - target);
      if (low !== null) {
        const diff = sum - target - low;
        if (diff < min) {
          min = diff;
          ans = [sum - low, bst.get(low) + 1, i];
        }
      }
      const high = bst.ceil(sum - target);
      if (high !== null) {
        const diff = high - (sum - target);
        if (diff < min) {
          min = diff;
          ans = [sum - high, bst.get(high) + 1, i];
        }
      }
      bst.put(sum, i);
    }
    const [best, ...range] = ans;
    console.log(best, range);
  }

  static find2a(A, target) {
    let min = Infinity;
    let best = null;
    for (let i = 0; i < A.length; i++) {
      let sum = 0;
      for (let j = i; j < A.length; j++) {
        sum += A[j];
        const diff = Math.abs(sum - target);
        if (diff < min) {
          min = diff;
          best = sum;
        }
      }
    }
    console.log(best);
  }

  static find2b(A, target) {
    let cum = [0];
    for (let i = 0; i < A.length; i++) {
      cum[i + 1] = cum[i] + A[i];
    }
    let min = Infinity;
    let best = null;
    for (let i = 0; i < A.length; i++) {
      for (let j = i; j < A.length; j++) {
        const sum = cum[j + 1] - cum[i];
        const diff = Math.abs(sum - target);
        if (diff < min) {
          min = diff;
          best = sum;
        }
      }
    }
    console.log(best);
  }
}

const cases = [
  [31, -41, 59, 26, -53, 58, 97, -93, -23, 84],
  [3, 2, 9, 4, 6, 8, 5, 7],
  [-3, -2, -9, 0, -6, -8, -5, -7],
  [-3, -2, -1],
  // [-3, -2],
  // [-3],
];
for (const A of cases) {
  MaxSubarray.find(A);
  MaxSubarray.find1(A);
  MaxSubarray.find2a(A);
  MaxSubarray.find2b(A);
  MaxSubarray.find3a(A);
  MaxSubarray.find3b(A);
}

let target = 0;
console.log("target:", target);
for (const A of cases) {
  ClosestSubarray.zero(A);
  ClosestSubarray.find2a(A, target);
  ClosestSubarray.find2b(A, target);
}

target = 8;
console.log("target:", target);
for (const A of cases) {
  ClosestSubarray.find(A, target);
  ClosestSubarray.find2a(A, target);
  ClosestSubarray.find2b(A, target);
}

function subarrayZero(A, m) {
  let sum = 0;
  let l = 0;
  let min = Infinity;
  let left = 0;
  for (let i = 0; i < A.length; i++) {
    sum += A[i];
    if (i > m) {
      sum -= A[l++];
    }
    if (i >= m && Math.abs(sum) < Math.abs(min)) {
      min = sum;
      left = l;
    }
  }
  console.log(min, left);
}
const A = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84];
const m = 4;
console.log("M nearest zero", m);
subarrayZero(A, m);
