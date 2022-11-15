class CoinChange2 {
  static count1a(coins, amount) {
    return this._count1a(coins, amount, 0);
  }
  static _count1a(coins, amount, index) {
    if (amount === 0) return 1;
    let count = 0;
    for (let i = index; i < coins.length; i++) {
      const coin = coins[i];
      if (coin <= amount) {
        count += this._count1a(coins, amount - coin, i);
      }
    }
    return count;
  }

  static count1b(coins, amount) {
    return this._count1b(coins, amount, 0, new Map());
  }
  static _count1b(coins, amount, index, memo) {
    if (amount === 0) return 1;
    const key = amount + "-" + index;
    if (memo.has(key)) return memo.get(key);
    let count = 0;
    for (let i = index; i < coins.length; i++) {
      const coin = coins[i];
      if (coin <= amount) {
        count += this._count1b(coins, amount - coin, i, memo);
      }
    }
    memo.set(key, count);
    return count;
  }

  // Time:  O(m^2*n)
  // Space: O(m*n)
  static count1c(coins, amount) {
    const dp = [];
    dp[0] = [];
    for (let j = 0; j < coins.length; j++) {
      dp[0][j] = 1;
    }
    for (let i = 1; i <= amount; i++) {
      dp[i] = [];
      for (let j = coins.length - 1; j >= 0; j--) {
        let count = 0;
        for (let k = j; k < coins.length; k++) {
          const coin = coins[k];
          if (coin <= i) {
            count += dp[i - coin][k];
          }
        }
        dp[i][j] = count;
      }
    }
    return dp[amount][0];
  }

  // Time:  O(m^n)
  // Space: O(n)
  static count2a(coins, amount) {
    return this._count2a(coins, amount, 0);
  }
  static _count2a(coins, amount, index) {
    if (amount === 0) return 1;
    if (amount < 0 || index === coins.length) return 0;
    const count =
      this._count2a(coins, amount - coins[index], index) +
      this._count2a(coins, amount, index + 1);
    return count;
  }

  // Time:  O(m*n)
  // Space: O(m*n)
  static count2b(coins, amount) {
    return this._count2b(coins, amount, 0, new Map());
  }
  static _count2b(coins, amount, index, memo) {
    if (amount === 0) return 1;
    if (amount < 0 || index === coins.length) return 0;
    const key = amount + "-" + index;
    if (memo.has(key)) return memo.get(key);
    const count =
      this._count2b(coins, amount - coins[index], index, memo) +
      this._count2b(coins, amount, index + 1, memo);
    memo.set(key, count);
    return count;
  }

  // Time:  O(m*n)
  // Space: O(m*n)
  static count2c(coins, amount) {
    const dp = [];
    dp[0] = [];
    for (let j = 0; j < coins.length; j++) {
      dp[0][j] = 1;
    }
    for (let i = 1; i <= amount; i++) {
      dp[i] = [];
      for (let j = coins.length - 1; j >= 0; j--) {
        dp[i][j] = 0;
        const coin = coins[j];
        if (coin <= i) {
          dp[i][j] += dp[i - coin][j];
        }
        if (j < coins.length - 1) {
          dp[i][j] += dp[i][j + 1];
        }
      }
    }
    return dp[amount][0];
  }

  // Time:  O(m*n)
  // Space: O(m*n)
  static count2d(coins, amount) {
    const dp = [];
    for (let i = coins.length - 1; i >= 0; i--) {
      dp[i] = [];
      for (let j = 0; j <= amount; j++) {
        if (j === 0) dp[i][j] = 1;
        else {
          dp[i][j] = 0;
          if (i < coins.length - 1) {
            dp[i][j] += dp[i + 1][j];
          }
          const coin = coins[i];
          if (coin <= j) {
            dp[i][j] += dp[i][j - coin];
          }
        }
      }
    }
    return dp[0][amount];
  }

  // Time:  O(m*n)
  // Space: O(n)
  static count2e(coins, amount) {
    const dp = [];
    dp[0] = 1;
    for (let i = coins.length - 1; i >= 0; i--) {
      for (let j = 1; j <= amount; j++) {
        let count = 0;
        if (i < coins.length - 1) {
          count += dp[j];
        }
        const coin = coins[i];
        if (coin <= j) {
          count += dp[j - coin];
        }
        dp[j] = count;
      }
    }
    return dp[amount];
  }
}

const cases = [
  [[1, 2, 5], 11],
  [[2], 3],
  [[1], 0],
  [[2, 3, 5], 14],
  [[1, 2, 3], 3],
  [[411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422], 9864],
];
for (const [coins, amount] of cases) {
  console.log(coins, amount);
  // console.log("1a:", CoinChange2.count1a(coins, amount));
  console.log("1b:", CoinChange2.count1b(coins, amount));
  console.log("1c:", CoinChange2.count1c(coins, amount));
  // console.log("2a:", CoinChange2.count2a(coins, amount));
  console.log("2b:", CoinChange2.count2b(coins, amount));
  console.log("2c:", CoinChange2.count2c(coins, amount));
  console.log("2d:", CoinChange2.count2d(coins, amount));
  console.log("2e:", CoinChange2.count2e(coins, amount));
  console.log("--------------");
}
