import { sequence } from "../common/helpers.js";

export class KthTwoSortedArrays {
  static run() {
    const seq = sequence(20, { order: false });
    const arr1 = seq.slice(0, 10).sort((a, b) => a - b);
    const arr2 = seq.slice(10).sort((a, b) => a - b);
    const cases = [
      [[], [1], 1, 1],
      [[1], [], 1, 1],
      [[1], [2], 1, 1],
      [[1], [2], 2, 2],
      [[1, 3, 7], [2, 4, 6, 8, 10], 7, 8],
      [arr1, arr2, 8, seq.sort((a, b) => a - b)[7]],
    ];
    for (const [a1, a2, k, v] of cases) {
      console.log("|", ...a1, "|", ...a2, "|", k, v);
      console.log(
        this.mergeSelect(a1, a2, k) === v,
        this.mergeSelect2(a1, a2, k) === v,
        this.binarySearch(a1, a2, 0, a1.length - 1, 0, a2.length - 1, k) === v,
        this.binarySearch1(a1, a2, k) === v,
        this.binarySearch2(a1, a2, k) === v,
        this.binarySearch3(a1, a2, k, 0, Math.min(a1.length - 1, k - 1)) === v
      );
    }
  }

  // T: O(n + m), S: O(n + m)
  static mergeSelect(a1, a2, k) {
    const m = a1.length;
    const n = a2.length;
    if (k > m + n || k < 1) throw new Error("K is out of index");

    const a = [];
    let h = 0;
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
      if (a1[i] <= a2[j]) {
        a[h++] = a1[i++];
      } else {
        a[h++] = a2[j++];
      }
    }
    while (i < m) {
      a[h++] = a1[i++];
    }
    while (j < n) {
      a[h++] = a2[j++];
    }
    return a[k - 1];
  }

  // T: O(k), S: O(1)
  static mergeSelect2(a1, a2, k) {
    const m = a1.length;
    const n = a2.length;
    if (k > m + n || k < 1) throw new Error("K is out of index");

    let h = 0;
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
      if (a1[i] <= a2[j]) {
        h++;
        if (h === k) return a1[i];
        i++;
      } else {
        h++;
        if (h === k) return a2[j];
        j++;
      }
    }
    while (i < m) {
      h++;
      if (h === k) return a1[i];
      i++;
    }
    while (j < n) {
      h++;
      if (h === k) return a2[j];
      j++;
    }
    return -1;
  }

  // T: O(log(m) + log(n)), S: O(log(m) + log(n))
  static binarySearch(a1, a2, l1, r1, l2, r2, k) {
    const m = r1 - l1 + 1;
    const n = r2 - l2 + 1;
    if (k > m + n || k < 1) throw new Error("K is out of index");

    if (m === 0) {
      return a2[k - 1];
    }
    if (n === 0) {
      return a1[k - 1];
    }
    if (k === 1) {
      return Math.min(a1[l1], a2[l2]);
    }
    if (m === 1) {
      if (a1[l1] > a2[l2 + k - 1]) {
        return a2[l2 + k - 1];
      } else {
        return Math.max(a1[l1], a2[l2 + k - 2]);
      }
    }
    if (n === 1) {
      if (a2[l2] > a1[l1 + k - 1]) {
        return a1[l1 + k - 1];
      } else {
        return Math.max(a2[l2], a1[l1 + k - 2]);
      }
    }

    const mid1 = l1 + Math.floor((r1 - l1) / 2);
    const mid2 = l2 + Math.floor((r2 - l2) / 2);
    const sz1 = mid1 - l1 + 1;
    const sz2 = mid2 - l2 + 1;
    if (sz1 + sz2 <= k) {
      if (a1[mid1] <= a2[mid2]) {
        return this.binarySearch(a1, a2, mid1 + 1, r1, l2, r2, k - sz1);
      } else {
        return this.binarySearch(a1, a2, l1, r1, mid2 + 1, r2, k - sz2);
      }
    } else {
      if (a1[mid1] >= a2[mid2]) {
        return this.binarySearch(a1, a2, l1, mid1, l2, r2, k);
      } else {
        return this.binarySearch(a1, a2, l1, r1, l2, mid2, k);
      }
    }
  }

  static binarySearch1(a1, a2, k) {
    const m = a1.length;
    const n = a2.length;
    if (k > m + n || k < 1) throw new Error("K is out of index");

    if (m > n) {
      return this.binarySearch1(a2, a1, k);
    }
    if (m === 0) {
      return a2[k - 1];
    }
    if (k === 1) {
      return Math.min(a1[0], a2[0]);
    }
    if (m === 1) {
      if (a1[0] > a2[k - 1]) {
        return a2[k - 1];
      } else {
        return Math.max(a1[0], a2[k - 2]);
      }
    }

    const mid1 = Math.floor((m - 1) / 2);
    const mid2 = Math.floor((n - 1) / 2);
    if (mid1 + 1 + mid2 + 1 <= k) {
      if (a1[mid1] <= a2[mid2]) {
        return this.binarySearch1(a1.slice(mid1 + 1), a2, k - mid1 - 1);
      } else {
        return this.binarySearch1(a1, a2.slice(mid2 + 1), k - mid2 - 1);
      }
    } else {
      if (a1[mid1] >= a2[mid2]) {
        return this.binarySearch1(a1.slice(0, mid1 + 1), a2, k);
      } else {
        return this.binarySearch1(a1, a2.slice(0, mid2 + 1), k);
      }
    }
  }

  static binarySearch2(a1, a2, k) {
    const m = a1.length;
    const n = a2.length;
    if (k > m + n || k < 1) throw new Error("K is out of index");

    // if (m > n) {
    //   return this.binarySearch2(a2, a1, k);
    // }
    if (m === 0) {
      return a2[k - 1];
    }
    if (n === 0) {
      return a1[k - 1];
    }
    if (k === 1) {
      return Math.min(a1[0], a2[0]);
    }

    const i = Math.min(Math.floor(k / 2), m);
    const j = Math.min(Math.floor(k / 2), n);
    if (a1[i - 1] <= a2[j - 1]) {
      return this.binarySearch2(a1.slice(i), a2, k - i);
    } else {
      return this.binarySearch2(a1, a2.slice(j), k - j);
    }
  }

  static binarySearch3(a1, a2, k) {
    const m = a1.length;
    const n = a2.length;
    if (k > m + n || k < 1) throw new Error("K is out of index");

    if (m > n) {
      return this.binarySearch3(a2, a1, k);
    }
    if (m === 0) {
      return a2[k - 1];
    }
    if (k === 1) {
      return Math.min(a1[0], a2[0]);
    }

    const i = Math.min(Math.floor((m - 1) / 2), k - 1);
    const j = k - 1 - i;
    if ((j === 0 || a1[i] >= a2[j - 1]) && (j === n || a1[i] <= a2[j])) {
      return a1[i];
    } else if (a1[i] < a2[j - 1]) {
      return this.binarySearch3(a1.slice(i + 1), a2, k - i - 1);
    } else {
      return this.binarySearch3(a1.slice(0, i), a2, k);
    }
  }
}
