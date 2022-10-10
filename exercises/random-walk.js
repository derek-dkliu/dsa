class RandomWalk {
  static run() {
    const n = 10;
    const trials = 100000;
    let deadEnds = 0;
    for (let i = 0; i < trials; i++) {
      if (!this.simulate(n)) deadEnds++;
    }
    console.log((deadEnds / trials) * 100, "%");
  }

  static simulate(n) {
    const A = [];
    for (let i = 0; i < n; i++) {
      A[i] = [];
      for (let j = 0; j < n; j++) A[i][j] = false;
    }
    let x = Math.floor(n / 2);
    let y = Math.floor(n / 2);
    while (x > 0 && x < n - 1 && y > 0 && y < n - 1) {
      if (A[x - 1][y] && A[x + 1][y] && A[x][y - 1] && A[x][y + 1])
        return false;

      A[x][y] = true;

      const r = Math.random();
      if (r < 0.25) {
        if (!A[x - 1][y]) x--;
      } else if (r < 0.5) {
        if (!A[x + 1][y]) x++;
      } else if (r < 0.75) {
        if (!A[x][y - 1]) y--;
      } else {
        if (!A[x][y + 1]) y++;
      }
    }
    return true;
  }
}

class RandomWalkRecursive {
  static run() {
    const n = 10;
    const trials = 100000;
    let deadEnds = 0;
    for (let i = 0; i < trials; i++) {
      if (!this.simulate(n)) deadEnds++;
    }
    console.log((deadEnds / trials) * 100, "%");
  }

  static simulate(n) {
    const A = [];
    for (let i = 0; i < n; i++) {
      A[i] = [];
      for (let j = 0; j < n; j++) A[i][j] = false;
    }
    let x = Math.floor(n / 2);
    let y = Math.floor(n / 2);
    return this.search(A, x, y);
  }

  static search(A, x, y) {
    const n = A.length;
    if (x === 0 || x === n - 1 || y === 0 || y === n - 1) return true;
    if (A[x - 1][y] && A[x + 1][y] && A[x][y - 1] && A[x][y + 1]) return false;

    A[x][y] = true;
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    while (true) {
      let r = Math.floor(Math.random() * dir.length);
      const nx = x + dir[r][0];
      const ny = y + dir[r][1];
      if (!A[nx][ny]) {
        return this.search(A, nx, ny);
      }
    }
  }
}

RandomWalk.run();
// RandomWalkRecursive.run();
