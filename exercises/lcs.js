class Suffix {
  static find(a, b) {
    const lcs = [];
    const m = a.length;
    const n = b.length;
    for (let i = m; i >= 0; i--) {
      lcs[i] = [];
      for (let j = n; j >= 0; j--) {
        if (i === m || j === n) {
          lcs[i][j] = 0;
        } else if (a[i] === b[j]) {
          lcs[i][j] = 1 + lcs[i + 1][j + 1];
        } else {
          lcs[i][j] = Math.max(lcs[i + 1][j], lcs[i][j + 1]);
        }
      }
    }

    // recover
    let result = "";
    let i = 0;
    let j = 0;
    while (i < m && j < n) {
      if (a[i] === b[j]) {
        result += a[i];
        i++;
        j++;
      } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
        i++;
      } else {
        j++;
      }
    }
    return result;
    // return lcs[0][0];
  }
}

class Prefix {
  static find(a, b) {
    const lcs = [];
    const m = a.length;
    const n = b.length;
    for (let i = 0; i <= m; i++) {
      lcs[i] = [];
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          lcs[i][j] = 0;
        } else if (a[i - 1] === b[j - 1]) {
          lcs[i][j] = 1 + lcs[i - 1][j - 1];
        } else {
          lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
        }
      }
    }

    let result = "";
    let i = m;
    let j = n;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) {
        result = a[i - 1] + result;
        i--;
        j--;
      } else if (lcs[i - 1][j] >= lcs[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    return result;
    // return lcs[m][n];
  }
}

class LCS {
  static run() {
    const a = "GGCACCACG";
    const b = "ACGGCGGATACG";
    // result is GGCAACG
    console.log(Suffix.find(a, b));
    console.log(Prefix.find(a, b));
  }
}

LCS.run();
