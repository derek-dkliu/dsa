class PathCount {
  static count(A) {
    const memo = [];
    for (let i = 0; i < A.length; i++) {
      memo[i] = [];
      for (let j = 0; j < A[i].length; j++) {
        memo[i][j] = 0;
      }
    }
    return this._count(A, 0, 0, memo);
  }

  static _count(A, i, j, memo) {
    const R = A.length;
    const C = A[0].length;
    if (i >= R || j >= C || A[i][j] === 0) return 0;
    if (i === R - 1 && j === C - 1) return 1;
    if (memo[i][j] === 0) {
      memo[i][j] =
        this._count(A, i + 1, j, memo) + this._count(A, i, j + 1, memo);
    }
    return memo[i][j];
  }

  static count2(A) {
    const R = A.length;
    const C = A[0].length;
    // initialize dp, set last row and column to 1 if cell is not blocked.
    const dp = [];
    for (let i = R - 1; i >= 0; i--) {
      dp[i] = [];
      for (let j = C - 1; j >= 0; j--) {
        dp[i][j] = 0;
        if (i === R - 1) {
          dp[i][j] = 1;
        } else if (j === C - 1 && A[i][j] === 1) {
          dp[i][j] = 1;
        }
      }
    }
    for (let i = R - 2; i >= 0; i--) {
      for (let j = C - 2; j >= 0; j--) {
        dp[i][j] = A[i][j] === 1 ? dp[i + 1][j] + dp[i][j + 1] : 0;
      }
    }
    return dp[0][0];
  }

  static count3(A) {
    const R = A.length;
    const C = A[0].length;
    const dp = [];
    let row = R - 1;
    while (row >= 0) {
      for (let i = C - 1; i >= 0; i--) {
        if (row === R - 1) {
          dp[i] = A[row][i] === 1 ? 1 : 0;
        } else if (i === C - 1) {
          dp[i] = A[row][i] === 1 ? 1 : 0;
        } else {
          dp[i] = A[row][i] === 1 ? dp[i] + dp[i + 1] : 0;
        }
      }
      row--;
    }
    return dp[0];
  }
}

// const A = [
//   [1, 1, 1],
//   [1, 0, 1],
//   [1, 1, 1],
// ];
// const A = [
//   [1, 1, 1],
//   [0, 1, 1],
//   [1, 1, 1],
// ];
const A = Array(50)
  .fill(0)
  .map((_) => Array(20).fill(1));
console.log(PathCount.count(A));
console.log(PathCount.count2(A));
console.log(PathCount.count3(A));
