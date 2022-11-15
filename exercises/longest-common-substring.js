class LongestCommonSubstring {
  // Time:  O(3^(m+n)), where m and n is length of a and b, respectively
  // Space: O(m+n)
  static count1a(a, b) {
    return this._count1a(a, b, 0, 0, 0);
  }

  static _count1a(a, b, i, j, count) {
    if (i === a.length || j === b.length) return count;
    if (a[i] === b[j]) {
      count = this._count1a(a, b, i + 1, j + 1, count + 1);
    }
    count = Math.max(
      count,
      this._count1a(a, b, i, j + 1, 0),
      this._count1a(a, b, i + 1, j, 0)
    );
    return count;
  }

  // Time:  O(m*n*L), where L is the length of longest substring
  // Space: O(m*n*L)
  static count1b(a, b) {
    const memo = new Map();
    return this._count1b(a, b, 0, 0, 0, memo);
  }

  static _count1b(a, b, i, j, count, memo) {
    if (i === a.length || j === b.length) return count;

    const key = i + "-" + j + "-" + count;
    if (memo.has(key)) return memo.get(key);

    if (a[i] === b[j]) {
      count = this._count1b(a, b, i + 1, j + 1, count + 1, memo);
    }
    count = Math.max(
      count,
      this._count1b(a, b, i, j + 1, 0, memo),
      this._count1b(a, b, i + 1, j, 0, memo)
    );
    memo.set(key, count);
    return count;
  }

  // Idea:  Find the longest commom prefix between the remaining suffix strings by increasing
  //        i or j in a way depends on whether current chars are equal or not. The longest
  //        common substring is the longest common prefix found.
  // Time:  O(m*n*L), where L is the length of longest substring
  // Space: O(1)
  static count2(a, b) {
    let max = 0;
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        // find the longest common prefix between suffix strings starting from i and j
        let k = 0;
        while (i + k < a.length && j + k < b.length && a[i + k] === b[j + k]) {
          k++;
        }
        if (k > max) max = k;
      }
    }
    return max;
  }

  // Idea:  Find the longest commom prefix between the remaining suffix strings by increasing
  //        i or j in a way depends on whether current chars are equal or not. The longest
  //        common substring is the longest common prefix found.
  // Time:  O(3^(m+n))
  // Space: O(m+n)
  static count2a(a, b) {
    const count = { max: 0 };
    this._count2a(a, b, 0, 0, count);
    return count.max;
  }

  static _count2a(a, b, i, j, count) {
    if (i === a.length || j === b.length) return 0;
    let res = 0;
    if (a[i] === b[j]) {
      res = 1 + this._count2a(a, b, i + 1, j + 1, count);
      if (res > count.max) count.max = res;
    }
    const max = Math.max(
      this._count2a(a, b, i, j + 1, count),
      this._count2a(a, b, i + 1, j, count)
    );
    if (max > count.max) count.max = max;
    return res;
  }

  // Time:  O(m*n)
  // Space: O(m*n)
  static count2b(a, b) {
    const count = { max: 0 };
    const memo = new Map();
    this._count2b(a, b, 0, 0, count, memo);
    return count.max;
  }

  static _count2b(a, b, i, j, count, memo) {
    if (i === a.length || j === b.length) return 0;

    const key = i + "-" + j;
    if (memo.has(key)) return memo.get(key);

    let res = 0;
    if (a[i] === b[j]) {
      res = 1 + this._count2b(a, b, i + 1, j + 1, count, memo);
      if (res > count.max) count.max = res;
    }
    const max = Math.max(
      this._count2b(a, b, i, j + 1, count, memo),
      this._count2b(a, b, i + 1, j, count, memo)
    );
    if (max > count.max) count.max = max;
    memo.set(key, res);
    return res;
  }

  // Time:  O(m*n)
  // Space: O(m*n)
  static count3(a, b) {
    const m = a.length;
    const n = b.length;
    let max = 0;
    const dp = [];
    for (let i = m - 1; i >= 0; i--) {
      dp[i] = [];
      for (let j = n - 1; j >= 0; j--) {
        if (a[i] === b[j]) {
          dp[i][j] = i === m - 1 || j === n - 1 ? 1 : 1 + dp[i + 1][j + 1];
          if (dp[i][j] > max) {
            max = dp[i][j];
          }
        } else {
          dp[i][j] = 0;
        }
      }
    }
    return max;
  }
}

function randomStr(len) {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(97 + Math.floor(Math.random() * 3));
  }
  return str;
}

// const a = randomStr(100);
// const b = randomStr(100);
const a = "aacbacbac";
const b = "acbacbaca";
console.log(LongestCommonSubstring.count1a(a, b));
console.log(LongestCommonSubstring.count1b(a, b));
console.log(LongestCommonSubstring.count2(a, b));
console.log(LongestCommonSubstring.count2a(a, b));
console.log(LongestCommonSubstring.count2b(a, b));
console.log(LongestCommonSubstring.count3(a, b));
