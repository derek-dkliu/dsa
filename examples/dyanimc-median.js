import PriorityQueue from "../structures/priority-queue.js";
import { randomSeq, sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class DynamicMedian {
  constructor() {
    this.maxpq = new PriorityQueue(); // keep nums smaller than or equal to median
    this.minpq = new PriorityQueue(false); // keep nums larger than or equal to median
  }

  find() {
    if (this.maxpq.size() > this.minpq.size()) return this.maxpq.peek();
    if (this.maxpq.size() < this.minpq.size()) return this.minpq.peek();
    return Math.min(this.maxpq.peek(), this.minpq.peek());
  }

  insert(item) {
    if (this.maxpq.size() > this.minpq.size()) {
      this.maxpq.insert(item);
      this.minpq.insert(this.maxpq.delete());
    } else {
      this.minpq.insert(item);
      this.maxpq.insert(this.minpq.delete());
    }
  }

  delete() {
    if (this.maxpq.size() > this.minpq.size()) {
      return this.maxpq.delete();
    } else if (this.maxpq.size() < this.minpq.size()) {
      return this.minpq.delete();
    } else {
      if (this.maxpq.peek() <= this.minpq.peek()) {
        return this.maxpq.delete();
      } else {
        return this.minpq.delete();
      }
    }
  }

  static run() {
    const size = 10;
    const cases = [
      sequence(size),
      sequence(size, { reverse: true }),
      sequence(size, { order: false }),
      randomSeq(size, { unique: false }),
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      const dm = new DynamicMedian();
      for (const x of seq) {
        dm.insert(x);
        console.log(x, dm.find());
      }
      seq.sort((a, b) => a - b);
      const m1 = Math.floor((seq.length - 1) / 2);
      const m2 = seq.length % 2 === 1 ? m1 - 1 : m1 + 1;
      console.log(dm.delete() === seq[m1], dm.find());
      console.log(dm.delete() === seq[m2], dm.find());
    });
  }
}
