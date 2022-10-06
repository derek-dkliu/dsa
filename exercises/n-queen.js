class NQueen {
  static total = 0;

  static count(n) {
    this._count(0, n, [], [], []);
    console.log(this.total);
  }

  static _count(i, n, cols, diag1, diag2) {
    if (i === n) {
      this.total++;
      return;
    }
    for (let j = 0; j < n; j++) {
      const d1 = i + j;
      const d2 = i - j + n - 1;
      if (cols[j] || diag1[d1] || diag2[d2]) continue;
      cols[j] = diag1[d1] = diag2[d2] = 1;
      this._count(i + 1, n, cols, diag1, diag2);
      cols[j] = diag1[d1] = diag2[d2] = 0;
    }
  }

  static search(n) {
    const q = [];
    for (let i = 0; i < n; i++) q[i] = 0;
    this._search(q, 0);
  }

  static _search(q, k) {
    const n = q.length;
    if (k === n) {
      const b = this.getBoard(q);
      console.log(b);
      return;
    }
    for (let i = 0; i < n; i++) {
      q[k] = i;
      if (!this.isValid(q, k)) continue;
      this._search(q, k + 1);
    }
  }

  static isValid(q, k) {
    for (let i = 0; i < k; i++) {
      if (q[i] === q[k]) return false;
      if (q[i] - q[k] === k - i) return false;
      if (q[k] - q[i] === k - i) return false;
    }
    return true;
  }

  static getBoard(q) {
    const n = q.length;
    const b = [];
    for (let i = 0; i < n; i++) {
      b[i] = [];
      for (let j = 0; j < n; j++) {
        b[i][j] = q[i] === j ? "Q" : "*";
      }
    }
    return b;
  }
}

NQueen.count(4);
NQueen.search(4);
