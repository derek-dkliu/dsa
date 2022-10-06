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

class PathFinder {
  static find(A) {
    const path = [[0, 0]];
    this.search(A, 0, 0, path);
    return path;
  }

  static search(A, i, j, path) {
    const R = A.length;
    const C = A[0].length;
    if (i === R - 1 && j === C - 1) {
      return true;
    }

    const dir = [
      [1, 0],
      [0, 1],
    ];
    for (const d of dir) {
      const r = i + d[0];
      const c = j + d[1];
      if (r < R && c < C && A[r][c] === 1) {
        path.push([r, c]);
        if (this.search(A, r, c, path)) return true;
        path.pop();
      }
    }
    return false;
  }
}

class PathCounter {
  static find(n) {
    const A = [];
    for (let i = 0; i < n; i++) {
      A[i] = [];
      for (let j = 0; j < n; j++) {
        A[i][j] = 0;
      }
    }
    A[0][0] = 1;
    const path = { count: 1, total: 0 };
    // since paths are symmetric, always true the first step down,
    // and finally multiply the result by two
    A[0][1] = 1;
    path.count++;
    this.search(A, 0, 1, path);
    return path.total * 2;
  }

  static search(A, i, j, path) {
    const R = A.length;
    const C = A[0].length;
    // stop once lower-right cell is reached and check if every cell covered
    if (i === R - 1 && j === C - 1) {
      if (path.count === R * C) {
        path.total++;
      }
      return;
    }

    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const d of dir) {
      const r = i + d[0];
      const c = j + d[1];
      if (r >= 0 && r < R && c >= 0 && c < C && A[r][c] === 0) {
        // check split cases when next forward step cannot continue
        const r0 = r + d[0];
        const c0 = c + d[1];
        const r1 = d[1] === 0 ? r : r - 1;
        const c1 = d[1] === 0 ? c - 1 : c;
        const r2 = d[1] === 0 ? r : r + 1;
        const c2 = d[1] === 0 ? c + 1 : C;
        if (
          (r0 < 0 || r0 >= R || c0 < 0 || c0 >= C || A[r0][c0] === 1) &&
          r1 >= 0 &&
          r1 < R &&
          c1 >= 0 &&
          c1 < C &&
          A[r1][c1] === 0 &&
          r2 >= 0 &&
          r2 < R &&
          c2 >= 0 &&
          c2 < C &&
          A[r2][c2] === 0
        ) {
          continue;
        }
        // backtrack
        A[r][c] = 1;
        path.count++;
        this.search(A, r, c, path);
        path.count--;
        A[r][c] = 0;
      }
    }
  }
}

class MatrixWorld {
  static run() {
    const A1 = [
      [1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 1],
    ];
    console.log(ConnectedIsland.findMax(A1));
    const A2 = [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [1, 0, 1, 1],
    ];
    console.log(PathFinder.find(A2).join("->"));

    console.log(PathCounter.find(7));
  }
}

MatrixWorld.run();
