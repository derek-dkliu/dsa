// take ~N/M character compares (i.e sublinear time)
// worst-case can be ~MN (e.g. search ABBBB in BBBBBB...)
export class BoyerMoore {
  constructor(pat) {
    this.R = 256;
    this.pat = pat;
    this.right = [];
    for (let i = 0; i < this.R; i++) {
      this.right[i] = -1;
    }
    for (let i = 0; i < pat.length; i++) {
      this.right[pat.charCodeAt(i)] = i;
    }
  }

  search(txt) {
    const N = txt.length;
    const M = this.pat.length;
    let skip;
    for (let i = 0; i <= N - M; i += skip) {
      skip = 0;
      for (let j = M - 1; j >= 0; j--) {
        if (txt.charAt(i + j) !== this.pat.charAt(j)) {
          skip = Math.max(1, j - this.right[txt.charCodeAt(i + j)]);
          break;
        }
      }
      if (skip === 0) return i;
    }
    return N;
  }
}
