import Insertion from "../sortings/insertion.js";
import PriorityQueue from "../structures/priority-queue.js";

class BranchAndBound {
  static search(values, weights, W) {
    // sort above arrays by ratio=v/w
    const ratios = [];
    for (let i = 0; i < values.length; i++) {
      ratios.push(values[i] / weights[i]);
    }
    const index = Insertion.indexSort(ratios).reverse();
    const vs = values.map((_, i) => values[index[i]]);
    const ws = weights.map((_, i) => weights[index[i]]);

    let best = null;
    const root = new Node(null, false, vs, ws, W);
    const pq = new PriorityQueue();
    pq.insert(root);
    while (!pq.isEmpty()) {
      const node = pq.delete();
      if (best !== null && node.u <= best.v) continue;

      if (best === null || node.v > best.v) {
        best = node;
      }
      if (node.level < vs.length - 1) {
        const left = new Node(node, true, vs, ws, W);
        if (left.feasible) {
          pq.insert(left);
        }
        const right = new Node(node, false, vs, ws, W);
        pq.insert(right);
      }
    }

    if (best === null) {
      console.log("No solution!");
    } else {
      const result = [];
      let curr = best;
      while (curr.level >= 0) {
        if (curr.included) {
          result.push(vs[curr.level]);
        }
        curr = curr.parent;
      }
      console.log(best.v, result);
    }
  }
}

class Node {
  constructor(parent, included, vs, ws, W) {
    if (parent === null) {
      this.level = -1;
      this.parent = null;
      this.included = false;
      this.v = 0;
      this.w = 0;
    } else {
      this.level = parent.level + 1;
      this.parent = parent;
      this.included = included;
      this.v = included ? parent.v + vs[this.level] : parent.v;
      this.w = included ? parent.w + ws[this.level] : parent.w;
    }
    this.feasible = this.w <= W;
    if (this.feasible) {
      const i = this.level + 1;
      const r = i < vs.length ? vs[i] / ws[i] : 0;
      this.u = this.v + (W - this.w) * r;
    }
  }

  compare(that) {
    return this.u - that.u;
  }
}

class DynamicProgramming {
  static search(values, weights, W) {
    const n = values.length;
    const opt = []; // max value
    const sol = []; // item included?
    for (let i = 0; i <= n; i++) {
      opt[i] = [0];
      sol[i] = [];
    }
    for (let j = 0; j <= W; j++) opt[0][j] = 0;
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= W; j++) {
        // don't take item i
        const option1 = opt[i - 1][j];
        // take item i
        let option2 = -Infinity;
        // minus one since values and weights start from 0
        if (weights[i - 1] <= j) {
          option2 = values[i - 1] + opt[i - 1][j - weights[i - 1]];
        }
        // select better of two options
        opt[i][j] = Math.max(option1, option2);
        sol[i][j] = option2 > option1;
      }
    }
    const max = opt[n][W];
    console.log(max, this.getItems(sol, W, values, weights));
  }

  static getItems(sol, W, values, weights) {
    const n = values.length;
    const take = [];
    for (let i = n, w = W; i > 0; i--) {
      if (sol[i][w]) {
        take[i - 1] = true;
        w = w - weights[i - 1];
      } else {
        take[i - 1] = false;
      }
    }
    return values.filter((_, i) => take[i]);
  }
}

class Knapsack {
  static search1(values, weights, W) {
    return this._search1(values, weights, W, 0);
  }

  static _search1(values, weights, W, i) {
    if (i === values.length || W === 0) return 0;
    let val = 0;
    if (weights[i] <= W) {
      val = values[i] + this._search1(values, weights, W - weights[i], i + 1);
    }
    return Math.max(val, this._search1(values, weights, W, i + 1));
  }

  static search2(values, weights, W) {
    return this._search2(values, weights, W, 0, new Map());
  }

  static _search2(values, weights, W, i, memo) {
    if (i === values.length || W === 0) return 0;

    const key = W + "-" + "i";
    if (memo.has(key)) return memo.get(key);

    let val = 0;
    if (weights[i] <= W) {
      val =
        values[i] + this._search2(values, weights, W - weights[i], i + 1, memo);
    }
    val = Math.max(val, this._search2(values, weights, W, i + 1, memo));
    memo.set(key, val);
    return val;
  }

  static search3(values, weights, W) {
    const N = values.length;
    const dp = [];
    const sol = []; // mark selected item in optimal solution
    for (let i = N; i >= 0; i--) {
      dp[i] = [];
      sol[i] = [];
      for (let j = 0; j <= W; j++) {
        if (i === N || j === 0) dp[i][j] = 0;
        else {
          const opt1 = dp[i + 1][j];
          let opt2 = -1;
          if (weights[i] <= j) {
            opt2 = values[i] + dp[i + 1][j - weights[i]];
          }
          dp[i][j] = Math.max(opt1, opt2);
          sol[i][j] = opt2 > opt1;
        }
      }
    }

    // build the solution
    const taken = [];
    let w = W;
    for (let i = 0; i < N; i++) {
      taken[i] = sol[i][w];
      if (taken[i]) {
        w -= weights[i];
      }
    }
    console.log(values.filter((_, i) => taken[i]));
    return dp[0][W];
  }
}

const values = [70, 20, 39, 37, 7, 5, 10];
const weights = [31, 10, 20, 19, 4, 3, 6];
const W = 50;
// const values = [442, 525, 511, 593, 546, 564, 617];
// const weights = [41, 50, 49, 59, 55, 57, 60];
// const W = 170;
// const values = [10, 40, 30, 50];
// const weights = [5, 4, 6, 3];
// const W = 10;
BranchAndBound.search(values, weights, W);
DynamicProgramming.search(values, weights, W);
console.log(Knapsack.search1(values, weights, W));
console.log(Knapsack.search2(values, weights, W));
console.log(Knapsack.search3(values, weights, W));
