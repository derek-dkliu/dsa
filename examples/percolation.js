import { UnionFind } from "../structures/union-find.js";
import { sum, progress } from "../common/utils.js";

export class Percolation extends UnionFind {
  static async run() {
    const n = 1000;
    const iter = 100;
    const start = performance.now();
    const rates = [];
    for (let i = 0; i < iter; i++) {
      rates.push(new Percolation(n).simulate());
      progress(`Iteration: ${i + 1}/${iter}`);
    }
    const elapsedTime = (performance.now() - start) / 1000;
    const avg = sum(rates) / iter;
    console.log("\nPercolation threshold:", avg);
    console.log("Running time (s):", elapsedTime, "\n");
  }

  simulate(verbal = false) {
    while (!this.connected(this.total, this.total + 1)) {
      this.next();
    }
    if (verbal) {
      this.inspect();
    }
    return sum(this.op) / this.total;
  }

  init(n) {
    this.id = [];
    this.sz = [];
    this.op = [];
    this.n = n;
    this.total = n ** 2;
    // virtual nodes total and total+1 are used as a convenient trick to check percolcation
    for (let i = 0; i < this.total + 2; i++) {
      this.id[i] = i;
      this.sz[i] = 1;
      this.op[i] = 0;
    }
    // connect nodes at the first row to node total
    for (let i = 0; i < this.n; i++) {
      this.union(i, this.total);
    }
    // connect nodes at the last row to node total+1
    for (let i = this.total - this.n; i < this.total; i++) {
      this.union(i, this.total + 1);
    }
  }

  inspect() {
    let grid = "";
    let row = [];
    for (let i = 0; i < this.total; i++) {
      if (i && i % this.n === 0) {
        grid += row.join(" ") + "\n";
        row = [];
      }
      row.push(this.op[i]);
    }
    console.log(grid);
  }

  next() {
    let i = this.getRandom();
    while (this.op[i]) {
      i = this.getRandom();
    }
    this.op[i] = 1;
    // connect left
    const left = this.getLeft(i);
    if (this.isOpen(left)) {
      this.union(i, left);
    }
    // connect right
    const right = this.getRight(i);
    if (this.isOpen(right)) {
      this.union(i, right);
    }
    // connect top
    const top = this.getTop(i);
    if (this.isOpen(top)) {
      this.union(i, top);
    }
    // connect bottom
    const bottom = this.getBottom(i);
    if (this.isOpen(bottom)) {
      this.union(i, bottom);
    }
  }

  isOpen(i) {
    return i >= 0 && i < this.total && this.op[i];
  }

  getRandom() {
    return Math.floor(Math.random() * this.total);
  }

  getLeft(i) {
    return i - 1;
  }

  getRight(i) {
    return i + 1;
  }

  getTop(i) {
    return i - this.n;
  }

  getBottom(i) {
    return i + this.n;
  }
}
