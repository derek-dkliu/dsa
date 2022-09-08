import { Stack } from "../structures/stack.js";
import { randomSeq, sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class Queue2Stacks {
  constructor() {
    this.enstack = new Stack();
    this.destack = new Stack();
  }

  static run() {
    const size = 10;
    const cases = [
      sequence(size, { min: 0 }),
      sequence(size, { min: 0, reverse: true }),
      sequence(size, { min: 0, order: false }),
      randomSeq(size, { min: 0, unique: false }),
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      const q = new Queue2Stacks();
      for (const x of seq) {
        q.enqueue(x);
      }
      const result = [];
      while (!q.isEmpty()) {
        result.push(q.dequeue());
      }
      console.log(result.toString());
    });
  }

  isEmpty() {
    return this.getSize() === 0;
  }

  getSize() {
    return this.enstack.getSize() + this.destack.getSize();
  }

  enqueue(item) {
    this.enstack.push(item);
  }

  dequeue() {
    if (this.destack.isEmpty()) {
      if (this.enstack.isEmpty()) return null;
      while (!this.enstack.isEmpty()) {
        this.destack.push(this.enstack.pop());
      }
    }
    return this.destack.pop();
  }
}
