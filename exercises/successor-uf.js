import { randomSeq, sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class SuccessorUF {
  static run() {
    const size = 10;
    const cases = [
      sequence(size, { min: 0 }),
      sequence(size, { min: 0, reverse: true }),
      sequence(size, { min: 0, order: false }),
      randomSeq(size, { min: 0, unique: false }),
      //   [4, 5, 0, 1, 2, 3, 6, 7, 0, 8, 9, 0],
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      const uf = new SuccessorUF(size);
      for (const x of seq) {
        uf.delete(x);
        console.log(x, uf.successor(x));
      }
    });
  }

  constructor(N) {
    this.id = [];
    this.size = [];
    this.max = [];
    for (let i = 0; i < N + 1; i++) {
      this.id[i] = i;
      this.size[i] = 1;
      this.max[i] = i;
    }
  }

  delete(i) {
    if (i >= this.id.length - 1) return;
    this.union(i, i + 1);
  }

  successor(i) {
    const succ = this.max[this.root(i)];
    return succ === this.id.length - 1 ? null : succ;
  }

  union(p, q) {
    const proot = this.root(p);
    const qroot = this.root(q);
    if (proot === qroot) return;
    if (this.size[proot] <= this.size[qroot]) {
      this.id[proot] = qroot;
      this.size[qroot] += this.size[proot];
    } else {
      this.id[qroot] = proot;
      this.size[proot] += this.size[qroot];
      if (this.max[qroot] > this.max[proot]) {
        this.max[proot] = this.max[qroot];
      }
    }
  }

  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  root(i) {
    while (i !== this.id[i]) {
      i = this.id[i];
    }
    return i;
  }
}
