import { Stack } from "../structures/stack.js";
import { randomSeq, sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class StackWithMax {
  static run() {
    const size = 8;
    const cases = [
      sequence(size, { min: 0 }),
      sequence(size, { min: 0, reverse: true }),
      sequence(size, { min: 0, order: false }),
      randomSeq(size, { min: 0, unique: false }),
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      const sm = new StackMax1();
      for (const x of seq) {
        sm.push(x);
      }
      while (!sm.isEmpty()) {
        console.log(sm.pop(), sm.getMax());
      }
    });
  }
}

class StackMax1 {
  constructor() {
    this.stack = new Stack();
    this.maxes = new Stack();
  }

  isEmpty() {
    return this.stack.isEmpty();
  }

  push(item) {
    this.stack.push(item);
    if (this.isEmpty()) {
      this.maxes.push(item);
    } else if (item >= this.maxes.peek()) {
      this.maxes.push(item);
    }
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.stack.pop();
    if (item === this.maxes.peek()) {
      this.maxes.pop();
    }
    return item;
  }

  getMax() {
    if (this.isEmpty()) return null;
    return this.maxes.peek();
  }
}

class StackMax2 {
  constructor() {
    this.stack = new Stack();
    this.max = null;
  }

  isEmpty() {
    return this.stack.isEmpty();
  }

  push(item) {
    if (this.isEmpty()) {
      this.stack.push(item);
      this.max = item;
    } else {
      if (item <= this.max) {
        this.stack.push(item);
      } else {
        this.stack.push(2 * item - this.max);
        this.max = item;
      }
    }
  }

  pop() {
    if (this.isEmpty()) return null;
    let item = this.stack.pop();
    if (item > this.max) {
      const x = this.max;
      this.max = 2 * this.max - item;
      item = x;
    }
    return item;
  }

  getMax() {
    if (this.isEmpty()) return null;
    return this.max;
  }
}
