class NQueen {
  static count = 0;

  static find(n) {
    this.search(0, n, [], [], []);
    console.log(this.count);
  }

  static search(i, n, cols, diag1, diag2) {
    if (i === n) {
      this.count++;
      return;
    }

    for (let j = 0; j < n; j++) {
      const d1 = i + j;
      const d2 = i - j + n - 1;
      if (cols[j] || diag1[d1] || diag2[d2]) continue;
      cols[j] = diag1[d1] = diag2[d2] = 1;
      this.search(i + 1, n, cols, diag1, diag2);
      cols[j] = diag1[d1] = diag2[d2] = 0;
    }
  }
}

NQueen.find(16);
