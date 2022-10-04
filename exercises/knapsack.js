import Insertion from "../sortings/insertion.js";
import PriorityQueue from "../structures/priority-queue.js";

class BranchAndBound {
  static search(values, weights, limit) {
    // sort above arrays by ratio=v/w
    const ratios = [];
    for (let i = 0; i < values.length; i++) {
      ratios.push(values[i] / weights[i]);
    }
    const index = Insertion.indexSort(ratios).reverse();
    const vs = values.map((_, i) => values[index[i]]);
    const ws = weights.map((_, i) => weights[index[i]]);

    let best = null;
    const root = new Node(null, false, vs, ws, limit);
    const pq = new PriorityQueue();
    pq.insert(root);
    while (!pq.isEmpty()) {
      const node = pq.delete();
      if (best !== null && node.u <= best.v) continue;

      if (best === null || node.v > best.v) {
        best = node;
      }
      if (node.level < vs.length - 1) {
        const left = new Node(node, true, vs, ws, limit);
        if (left.feasible) {
          pq.insert(left);
        }
        const right = new Node(node, false, vs, ws, limit);
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
  constructor(parent, included, vs, ws, limit) {
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
    this.feasible = this.w <= limit;
    if (this.feasible) {
      const i = this.level + 1;
      const r = i < vs.length ? vs[i] / ws[i] : 0;
      this.u = this.v + (limit - this.w) * r;
    }
  }

  compare(that) {
    return this.u - that.u;
  }
}

class DynamicProgramming {
  static search(values, weights, limit) {
    const n = values.length;
    const knapsack = [];
    for (let i = 0; i < n; i++) {
      knapsack[i] = [0];
      for (let j = 1; j <= limit; j++) {
        const old = i - 1 < 0 ? 0 : knapsack[i - 1][j];
        if (weights[i] > j) {
          knapsack[i][j] = old;
        } else {
          knapsack[i][j] = Math.max(
            old,
            values[i] + (i - 1 < 0 ? 0 : knapsack[i - 1][j - weights[i]])
          );
        }
      }
    }
    const max = knapsack[n - 1][limit];
    console.log("max", max);
  }
}

class Knapsack {
  static run() {
    // const values = [70, 20, 39, 37, 7, 5, 10];
    // const weights = [31, 10, 20, 19, 4, 3, 6];
    // const limit = 50;
    // const values = [442, 525, 511, 593, 546, 564, 617];
    // const weights = [41, 50, 49, 59, 55, 57, 60];
    // const limit = 170;
    const values = [10, 40, 30, 50];
    const weights = [5, 4, 6, 3];
    const limit = 10;
    BranchAndBound.search(values, weights, limit);
    DynamicProgramming.search(values, weights, limit);
  }
}

Knapsack.run();
