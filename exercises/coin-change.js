class CoinChange {
  // Time:  O(n^m), where n is amount, and m is number of coins
  // Space: O(m)
  static count1(coins, amount) {
    coins.sort((a, b) => b - a);
    return this._count1(amount, coins, 0, new Map());
  }
  static _count1(amount, coins, start, memo) {
    if (amount === 0) return 0;
    const key = amount + "-" + start;
    if (memo.has(key)) return memo.get(key);

    for (let i = start; i < coins.length; i++) {
      const x = Math.floor(amount / coins[i]);
      for (let j = x; j >= 0; j--) {
        const ans = this._count1(amount - coins[i] * j, coins, i + 1, memo);
        if (ans !== -1) {
          memo.set(amount + "-" + i, ans + j);
          return ans + j;
        }
      }
    }
    memo.set(key, -1);
    return -1;
  }

  // Time:  O(m*n), would be O(m^n) without memoization
  // Space: O(n)
  static count2(coins, amount) {
    return this._count2(amount, coins, new Map());
  }
  static _count2(amount, coins, memo) {
    if (amount === 0) return 0;
    if (memo.has(amount)) return memo.get(amount);
    let min = Infinity;
    for (const coin of coins) {
      if (coin <= amount) {
        const res = this._count2(amount - coin, coins, memo);
        if (res !== -1 && res + 1 < min) {
          min = res + 1;
        }
      }
    }
    const ans = min === Infinity ? -1 : min;
    memo.set(amount, ans);
    return ans;
  }

  // Time:  O(m*n), would be O(2^(m+n)) without memoization
  // Space: O(m*n)
  static count3(coins, amount) {
    const ans = this._count3(amount, coins, 0, new Map());
    return ans === Infinity ? -1 : ans;
  }
  static _count3(amount, coins, index, memo) {
    if (amount === 0) return 0;
    if (amount < 0 || index === coins.length) return Infinity;
    const key = amount + "-" + index;
    if (memo.has(key)) return memo.get(key);
    const ans = Math.min(
      this._count3(amount, coins, index + 1, memo),
      1 + this._count3(amount - coins[index], coins, index, memo)
    );
    memo.set(key, ans);
    return ans;
  }

  // Time:  O(m*n)
  // Space: O(n)
  static count4(coins, amount) {
    const dp = [0];
    for (let i = 1; i <= amount; i++) {
      dp[i] = Infinity;
      for (const coin of coins) {
        if (i - coin >= 0 && dp[i - coin] !== -1) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
      if (dp[i] === Infinity) dp[i] = -1;
    }
    return dp[amount];
  }

  // Time:  O(m*n)
  // Space: O(n)
  static count5(coins, amount) {
    const dp = [0];
    for (let i = coins.length - 1; i >= 0; i--) {
      for (let j = 1; j <= amount; j++) {
        if (i === coins.length - 1) {
          dp[j] = Infinity;
        }
        if (coins[i] <= j) {
          dp[j] = Math.min(dp[j], 1 + dp[j - coins[i]]);
        }
      }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
  }

  static search1(coins, amount) {
    const results = [];
    coins.sort((a, b) => b - a);
    const valid = this._search1(amount, coins, 0, results);
    return valid ? results : -1;
  }

  static _search1(amount, coins, start, results) {
    if (amount === 0) return true;
    for (let i = start; i < coins.length; i++) {
      const remain = amount - coins[i];
      if (remain >= 0) {
        results.push(coins[i]);
        if (this._search1(remain, coins, i, results)) {
          return true;
        }
        results.pop();
      }
    }
    return false;
  }

  static search2(coins, amount) {
    const results = [];
    coins.sort((a, b) => b - a);
    if (this._search2(amount, coins, 0, results)) {
      let ans = [];
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i]; j++) {
          ans.push(coins[i]);
        }
      }
      return ans;
    }
    return -1;
  }

  static _search2(amount, coins, start, results) {
    if (amount === 0) return true;
    for (let i = start; i < coins.length; i++) {
      const x = Math.floor(amount / coins[i]);
      for (let j = x; j >= 0; j--) {
        const remain = amount - coins[i] * j;
        results[i] = j;
        if (this._search2(remain, coins, i + 1, results)) {
          return true;
        }
      }
    }
    return false;
  }

  static search3(coins, amount) {
    const results = [];
    const memo = new Map();
    coins.sort((a, b) => b - a);
    if (this._search3(amount, coins, 0, results, memo)) {
      let ans = [];
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i]; j++) {
          ans.push(coins[i]);
        }
      }
      return ans;
    }
    return -1;
  }

  static _search3(amount, coins, start, results, memo) {
    const key = amount + "-" + start;
    if (amount === 0) {
      memo.set(key, results.slice(start));
      return true;
    }
    if (memo.has(key)) {
      const res = memo.get(key);
      for (const x of res) {
        results[start++] = x;
      }
      return res.length > 0;
    }
    for (let i = start; i < coins.length; i++) {
      const x = Math.floor(amount / coins[i]);
      for (let j = x; j >= 0; j--) {
        const remain = amount - coins[i] * j;
        results[i] = j;
        if (this._search3(remain, coins, i + 1, results, memo)) {
          return true;
        }
      }
    }
    memo.set(key, []);
    return false;
  }
}

const cases = [
  [[1, 2, 5], 11],
  [[2], 3],
  [[1], 0],
  [[2, 3, 5], 14],
  // [[411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422], 9864],
];
for (const [coins, amount] of cases) {
  console.log(coins, amount);
  // console.log("1:", CoinChange.search1(coins, amount));
  // console.log("2:", CoinChange.search2(coins, amount));
  console.log("3:", CoinChange.search3(coins, amount));
  console.log("c1:", CoinChange.count1(coins, amount));
  console.log("c2:", CoinChange.count2(coins, amount));
  console.log("c3:", CoinChange.count3(coins, amount));
  console.log("c4:", CoinChange.count4(coins, amount));
  console.log("c5:", CoinChange.count5(coins, amount));
  console.log("--------------");
}
