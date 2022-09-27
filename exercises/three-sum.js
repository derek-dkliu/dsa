import BinarySearch from "../searchings/binary-search.js";

export class ThreeSum {
  static run() {
    const arr = [30, -40, -20, -10, 40, 0, 10, 15];
    const result1 = ThreeSum.searchHashMap(arr);
    const result2 = ThreeSum.searchHashMap2(arr);
    const result3 = ThreeSum.search2Pointer(arr);
    const result4 = ThreeSum.binarysearch(arr);
    console.log(arr.toString());
    console.log(result1.length, result1);
    console.log(result2.length, result2);
    console.log(result3.length, result3);
    console.log(result4.length, result4);
  }

  static searchHashMap(arr) {
    const result = [];
    const N = arr.length;
    for (let i = 0; i < N - 1; i++) {
      const set = new Set();
      for (let j = i + 1; j < N; j++) {
        const x = -(arr[i] + arr[j]);
        if (set.has(x)) {
          result.push([x, arr[i], arr[j]]);
          // because input is array of distinct elements
        } else {
          set.add(arr[j]);
        }
      }
    }
    return result;
  }

  static searchHashMap2(arr) {
    const map = new Map();
    const N = arr.length;
    // following loop order ensures indices in map is sorted by j index
    for (let j = 1; j < N - 1; j++) {
      for (let i = 0; i < j; i++) {
        const key = -(arr[i] + arr[j]);
        const indices = map.get(key) || [];
        indices.push([i, j]);
        map.set(key, indices);
      }
    }
    const result = [];
    for (let k = 2; k < N; k++) {
      const indices = map.get(arr[k]);
      if (indices) {
        for (const [i, j] of indices) {
          if (k > j) {
            result.push([arr[i], arr[j], arr[k]]);
          } else {
            break;
          }
        }
      }
    }
    return result;
  }

  static search2Pointer(arr) {
    arr.sort((a, b) => a - b);
    const N = arr.length;
    const result = [];
    for (let k = 0; k < N - 2; k++) {
      const x = -arr[k];
      let i = k + 1;
      let j = arr.length - 1;
      while (i < j) {
        if (arr[i] + arr[j] === x) {
          result.push([arr[k], arr[i++], arr[j--]]);
        } else if (arr[i] + arr[j] < x) {
          i++;
        } else {
          j--;
        }
      }
    }
    return result;
  }

  static binarysearch(arr) {
    arr.sort((a, b) => a - b);
    if (this.checkDuplicates(arr))
      throw new Error("Array contains duplicate integers");
    const N = arr.length;
    const result = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a1 = arr[i];
        const a2 = arr[j];
        const a3 = -(a1 + a2);
        const index = BinarySearch.indexOf(arr, a3);
        if (index > j) {
          result.push([a1, a2, arr[index]]);
        }
        // const index = BinarySearch.search(arr, a3, j + 1, N - 1);
        // if (index !== -1) {
        //   result.push([a1, a2, arr[index]]);
        // }
      }
    }
    return result;
  }

  static checkDuplicates(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === arr[i - 1]) return true;
    }
    return false;
  }
}
