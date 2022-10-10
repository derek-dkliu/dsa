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

const A = [
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [1, 0, 1, 1],
];
console.log(PathFinder.find(A).join("->"));
