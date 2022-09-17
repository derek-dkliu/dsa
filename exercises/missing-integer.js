import { randomSeq } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class MissingInteger {
  static run() {
    const size = 19;
    const cases = [
      randomSeq(size, { unique: false }),
      randomSeq(size, { unique: false }),
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      console.log(this.search(seq, 1, size + 1));
    });
  }

  static search(arr, lo, hi) {
    if (lo === hi || arr.length === 0) {
      return lo;
    }

    const mid = lo + Math.floor((hi - lo) / 2);
    const lower = [];
    const upper = [];
    for (const val of arr) {
      if (val <= mid) {
        lower.push(val);
      } else {
        upper.push(val);
      }
    }

    if (lower.length < mid - lo + 1) {
      return this.search(lower, lo, mid);
    } else if (upper.length < hi - mid) {
      return this.search(upper, mid + 1, hi);
    } else {
      throw new Error(`Invalid range: ${lo} - ${hi}`);
    }
  }
}
