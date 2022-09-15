import PriorityQueue from "../structures/priority-queue.js";

export class TaxicabNum {
  static find(n) {
    const pq = new PriorityQueue(false);
    for (let i = 1; i <= n; i++) {
      pq.insert(new Taxicab(i, i));
    }
    const result = [];
    let count = 1;
    let prev = new Taxicab(0, 0);
    while (!pq.isEmpty()) {
      const curr = pq.delete();
      if (curr.sum === prev.sum) {
        count++;
        if (count === 2) {
          result.push(curr.sum);
        }
      } else {
        if (count > 2) {
          result.pop();
        }
        count = 1;
      }
      prev = curr;
      if (curr.j < n) {
        pq.insert(new Taxicab(curr.i, curr.j + 1));
      }
    }
    return result;
  }

  static run() {
    const n = 100;
    const result = this.find(n);
    console.log(n, result.length);
    console.log(result);
  }
}

class Taxicab {
  constructor(i, j) {
    this.sum = i * i * i + j * j * j;
    this.i = i;
    this.j = j;
  }

  compare(that) {
    if (this.sum !== that.sum) {
      return this.sum - that.sum;
    } else {
      return this.i - that.i;
    }
  }
}
