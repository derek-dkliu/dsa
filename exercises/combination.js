import { Queue } from "../structures/queue.js";

class Combination {
  // Binary counting order
  static generate(n) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate("", seq, 0, result);
    return result;
  }

  static _generate(curr, seq, index, result) {
    if (index === seq.length) {
      result.push(curr);
      return;
    }
    this._generate(curr, seq, index + 1, result);
    this._generate(curr + seq[index], seq, index + 1, result);
  }

  // Lexicographic order
  static generate2(n) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate2("", seq, 0, result);
    return result;
  }

  static _generate2(curr, seq, index, result) {
    result.push(curr);
    for (let i = index; i < seq.length; i++) {
      this._generate2(curr + seq[i], seq, i + 1, result);
    }
  }

  // Order by length then lexicographic order
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
    this._generate("", seq, k, 0, result);
    return result;
  }

  static _generate(curr, seq, k, index, result) {
    if (seq.length - index < k) return;
    if (k === 0) {
      result.push(curr);
      return;
    }
    this._generate(curr, seq, k, index + 1, result);
    this._generate(curr + seq[index], seq, k - 1, index + 1, result);
  }

  static generate2(n, k) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate2("", seq, k, 0, result);
    return result;
  }

  static _generate2(curr, seq, k, index, result) {
    if (k === 0) {
      result.push(curr);
      return;
    }
    for (let i = index; i < seq.length; i++) {
      this._generate2(curr + seq[i], seq, k - 1, i + 1, result);
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
