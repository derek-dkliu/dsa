class ConnectedIsland {
  static findMax(A) {
    let max = 0;
    const size = { cnt: 0 };
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[0].length; j++) {
        // count connected
        this.dfs(A, i, j, size);
        // update max
        if (size.cnt > max) max = size.cnt;
        // reset count
        size.cnt = 0;
      }
    }
    return max;
  }

  static dfs(A, i, j, size) {
    if (A[i][j] === 0) return;
    // mark as visited
    A[i][j] = 0;
    // add count
    size.cnt++;

    const R = A.length;
    const C = A[0].length;
    // 8 neighbor cells
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
    ];
    for (const d of dir) {
      const r = i + d[0];
      const c = j + d[1];
      if (r >= 0 && r < R && c >= 0 && c < C) {
        this.dfs(A, r, c, size);
      }
    }
  }
}

const A = [
  [1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 0, 1, 1],
];
console.log(ConnectedIsland.findMax(A));
