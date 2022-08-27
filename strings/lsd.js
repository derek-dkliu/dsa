export default class LSD {
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
    const R = 256;
    const W = arr[0].length;
    const N = arr.length;
    const aux = [];
    for (let d = W - 1; d >= 0; d--) {
      // init count with length of R + 1
      const count = [];
      for (let i = 0; i < R + 1; i++) {
        count[i] = 0;
      }
      // compute frequency
      for (let i = 0; i < N; i++) {
        count[arr[i].charCodeAt(d) + 1]++;
      }
      // compuate cumulates
      for (let i = 0; i < R; i++) {
        count[i + 1] += count[i];
      }
      // move item
      for (let i = 0; i < N; i++) {
        aux[count[arr[i].charCodeAt(d)]++] = arr[i];
      }
      // copy back
      for (let i = 0; i < N; i++) {
        arr[i] = aux[i];
      }
    }
  }

  // sort 32-bit integers in ascending order.
  // explained at https://stackoverflow.com/questions/25597831/questions-on-an-implementation-of-radix-sort-in-java
  static sortInt32(arr) {
    const W = 4;
    const BITS_PER_BYTE = 8;
    const R = 1 << BITS_PER_BYTE;
    const MASK = R - 1;
    const N = arr.length;
    const aux = [];
    for (let d = 0; d < W; d++) {
      const shift = d * BITS_PER_BYTE;
      const count = [];
      for (let i = 0; i < R + 1; i++) {
        count[i] = 0;
      }
      for (let i = 0; i < N; i++) {
        const c = (arr[i] >> shift) & MASK;
        count[c + 1]++;
      }
      for (let i = 0; i < R; i++) {
        count[i + 1] += count[i];
      }
      // for most significant btyes, [0x80 - 0xff] comes before [0x00 - 0x7f]
      if (d === W - 1) {
        const shift1 = count[R] - count[R / 2];
        const shift2 = count[R / 2];
        for (let i = 0; i < R / 2; i++) {
          count[i] += shift1;
        }
        for (let i = R / 2; i < R; i++) {
          count[i] -= shift2;
        }
      }
      for (let i = 0; i < N; i++) {
        const c = (arr[i] >> shift) & MASK;
        aux[count[c]++] = arr[i];
      }
      for (let i = 0; i < N; i++) {
        arr[i] = aux[i];
      }
    }
  }
}
