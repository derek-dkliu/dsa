import { sequence } from "../common/helpers.js";

export class Bitonic {
  static run() {
    const s1 = sequence(15, { reverse: false }).filter((v) => v % 2 === 0);
    const s2 = sequence(40, { reverse: true }).filter((v) => v % 2 === 1);
    const arr = s1.concat(s2);
    console.log(arr.toString());
    for (const x of arr) {
      console.log(x, this.search(arr, x), this.search2(arr, x));
    }
  }

  static search2(arr, x) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (x === arr[mid]) {
        return mid;
      } else if (x > arr[mid]) {
        if (arr[mid] < arr[mid + 1]) {
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      } else {
        const ans = this.binarySearch(arr, x, lo, mid - 1);
        if (ans !== -1) return ans;
        return this.binarySearch(arr, x, mid + 1, hi, false);
      }
    }
    return -1;
  }

  static search(arr, x) {
    const peak = this.findPeak(arr);
    if (peak === -1) throw new Error("No peak in bitonic arr");
    if (x == arr[peak]) return peak;
    if (x > arr[peak]) return -1;
    const ans = this.binarySearch(arr, x, 0, peak);
    if (ans !== -1) return ans;
    return this.binarySearch(arr, x, peak + 1, arr.length - 1, false);
  }

  static findPeak(arr) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (
        (mid === arr.length - 1 || arr[mid] > arr[mid + 1]) &&
        (mid === 0 || arr[mid] > arr[mid - 1])
      ) {
        return mid;
      } else if (arr[mid] < arr[mid + 1]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return -1;
  }

  static binarySearch(arr, x, lo, hi, asc = true) {
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (x === arr[mid]) {
        return mid;
      } else if (x < arr[mid]) {
        asc ? (hi = mid - 1) : (lo = mid + 1);
      } else {
        asc ? (lo = mid + 1) : (hi = mid - 1);
      }
    }
    return -1;
  }
}
