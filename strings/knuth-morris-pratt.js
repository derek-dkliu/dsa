// access no more than M + N chars
// construct dfa[][] proportional to RM in time and space
export class KMP {
  constructor(pat) {
    this.M = pat.length;
    this.R = 256;
    this.dfa = [];
    for (let i = 0; i < this.R; i++) {
      this.dfa[i] = [0];
    }
    this.dfa[pat.charCodeAt(0)][0] = 1;
    let x = 0;
    for (let j = 1; j < this.M; j++) {
      for (let c = 0; c < this.R; c++) {
        this.dfa[c][j] = this.dfa[c][x];
      }
      this.dfa[pat.charCodeAt(j)][j] = j + 1;
      x = this.dfa[pat.charCodeAt(j)][x];
    }
  }

  search(txt) {
    let i;
    let j;
    let N = txt.length;
    for (i = 0, j = 0; i < N && j < this.M; i++) {
      j = this.dfa[txt.charCodeAt(i)][j];
    }
    if (j === this.M) return i - this.M;
    else return N;
  }
}
