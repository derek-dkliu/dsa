import { Queue } from "../structures/queue.js";

class Combination {
  static generate(n) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate("", seq, result);
    return result;
  }

  static _generate(curr, seq, result) {
    if (seq.length === 0) {
      result.push(curr);
      return;
    }
    this._generate(curr + seq[0], seq.slice(1), result);
    this._generate(curr, seq.slice(1), result);
  }

  static generate2(n) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate2("", seq, result);
    return result;
  }

  static _generate2(curr, seq, result) {
    result.push(curr);
    for (let i = 0; i < seq.length; i++) {
      this._generate2(curr + seq[i], seq.slice(i + 1), result);
    }
  }

  static generate3(n) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    const q = new Queue();
    q.enqueue(["", 0]);
    while (!q.isEmpty()) {
      const [c, start] = q.dequeue();
      result.push(c);
      for (let i = start; i < seq.length; i++) {
        q.enqueue([c + seq[i], i + 1]);
      }
    }
    return result;
  }
}

class CombinationK {
  static generate(n, k) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate("", seq, k, result);
    return result;
  }

  static _generate(curr, seq, k, result) {
    if (seq.length < k) return;
    if (k === 0) {
      result.push(curr);
      return;
    }
    this._generate(curr + seq[0], seq.slice(1), k - 1, result);
    this._generate(curr, seq.slice(1), k, result);
  }

  static generate2(n, k) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate2("", seq, k, result);
    return result;
  }

  static _generate2(curr, seq, k, result) {
    if (k === 0) {
      result.push(curr);
      return;
    }
    for (let i = 0; i < seq.length; i++) {
      this._generate2(curr + seq[i], seq.slice(i + 1), k - 1, result);
    }
  }

  static generate3(n, k) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    const q = new Queue();
    q.enqueue(["", 0]);
    while (!q.isEmpty()) {
      const [c, start] = q.dequeue();
      if (c.length === k) {
        result.push(c);
        continue;
      }
      for (let i = start; i < seq.length; i++) {
        q.enqueue([c + seq[i], i + 1]);
      }
    }
    return result;
  }
}

console.log(Combination.generate(3));
console.log(Combination.generate2(3));
console.log(Combination.generate3(3));
console.log(CombinationK.generate(3, 2));
console.log(CombinationK.generate2(3, 2));
console.log(CombinationK.generate3(3, 2));
