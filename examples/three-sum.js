import BinarySearch from "../searchings/binary-search.js";

export class ThreeSum {
  static run() {
    const arr = [30, -40, -20, -10, 40, 0, 10, 15];
    const result = ThreeSum.search(arr);
    console.log(arr.toString());
    console.log(result.length, result);
  }

  static search(arr) {
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
