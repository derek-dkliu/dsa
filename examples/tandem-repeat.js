class TandemRepeat {
  static search(txt, pat) {
    const k = Math.floor(txt.length / pat.length);
    const p = pat.repeat(k);
    const M = p.length;
    const R = 256;
    // build dfa for tandem pattern
    const dfa = [];
    for (let i = 0; i < R; i++) {
      dfa[i] = [0];
    }
    dfa[p.charCodeAt(0)][0] = 1;
    let x = 0;
    for (let j = 1; j < M; j++) {
      for (let i = 0; i < R; i++) {
        dfa[i][j] = dfa[i][x];
      }
      dfa[p.charCodeAt(j)][j] = j + 1;
      x = dfa[p.charCodeAt(j)][x];
    }
    let max = 0;
    let loc = 0;
    let j = 0;
    for (let i = 0; i < txt.length; i++) {
      j = dfa[txt.charCodeAt(i)][j];
      if (j > max) {
        max = j;
        loc = i - j + 1;
      }
    }
    const len = Math.floor(max / pat.length);
    loc = loc - (max - len * pat.length);
    return [len, loc];
  }
}

const text = "abcabcababcaba";
const pattern = "abcab";
console.log(TandemRepeat.search(text, pattern));
