class LongestCommonSubsequence {
  static count1(a, b) {
    return this._count1(a, b, 0, 0);
  }

  static _count1(a, b, i, j) {
    if (i === a.length || j === b.length) return 0;
    let max = 0;
    if (a[i] === b[j]) {
      max = 1 + this._count1(a, b, i + 1, j + 1);
    } else {
      max = Math.max(
        this._count1(a, b, i + 1, j),
        this._count1(a, b, i, j + 1)
      );
    }
    return max;
  }

  static count2(a, b) {
    return this._count1(a, b, 0, 0, new Map());
  }

  static _count2(a, b, i, j, memo) {
    if (i === a.length || j === b.length) return 0;
    const key = i + "-" + j;
    if (memo.has(key)) return memo.get(key);

    let max = 0;
    if (a[i] === b[i]) {
      max = 1 + this._count2(a, b, i + 1, j + 1, memo);
    } else {
      max = Math.max(
        this._count2(a, b, i + 1, j, memo),
        this._count2(a, b, i, j + 1)
      );
    }
    memo.set(key, max);
    return max;
  }

  static count3(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = [];
    for (let i = m - 1; i >= 0; i--) {
      dp[i] = [];
      for (let j = n - 1; j >= 0; j--) {
        if (a[i] === b[j]) {
          dp[i][j] = i === m - 1 || j === n - 1 ? 1 : 1 + dp[i + 1][j + 1];
        } else {
          const v1 = i === m - 1 ? 0 : dp[i + 1][j];
          const v2 = j === n - 1 ? 0 : dp[i][j + 1];
          dp[i][j] = Math.max(v1, v2);
        }
      }
    }

    // build the subsequence
    let seq = "";
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
      if (a[i] === b[j]) {
        seq += a[i];
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][i + j]) {
        i++;
      } else {
        j++;
      }
    }
    console.log(seq);
    return dp[0][0];
  }
}

const a = "abcbacbac";
const b = "acbacbaca";
console.log(LongestCommonSubsequence.count1(a, b));
console.log(LongestCommonSubsequence.count2(a, b));
console.log(LongestCommonSubsequence.count3(a, b));
