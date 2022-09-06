export default class BinarySearch {
  static rank(arr, key) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (key < arr[mid]) hi = mid - 1;
      else if (key > arr[mid]) lo = mid + 1;
      else return mid;
    }
    return lo;
  }

  static indexOf(arr, key) {
    return this.search(arr, key, 0, arr.length - 1);
  }

  static search(arr, key, lo, hi) {
    if (lo > hi) return -1;
    const mid = lo + Math.floor((hi - lo) / 2);
    if (key < arr[mid]) return this.search(arr, key, lo, mid - 1);
    else if (key > arr[mid]) return this.search(arr, key, mid + 1, hi);
    else return mid;
  }
}
