class Permutation {
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
    for (let i = 0; i < seq.length; i++) {
      const rest = seq.slice(0, i) + seq.slice(i + 1, seq.length);
      this._generate(curr + seq[i], rest, result);
    }
  }

  static generate2(n) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n).split("");
    this._generate2(0, seq, result);
    return result;
  }

  static _generate2(start, seq, result) {
    if (start === seq.length) {
      result.push(seq.join(""));
      return;
    }
    for (let i = start; i < seq.length; i++) {
      this.swap(seq, i, start);
      this._generate2(start + 1, seq, result);
      this.swap(seq, i, start);
    }
  }

  static swap(seq, i, j) {
    const tmp = seq[i];
    seq[i] = seq[j];
    seq[j] = tmp;
  }
}

class PermutationK {
  static generate(n, k) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n);
    this._generate("", seq, k, result);
    return result;
  }

  static _generate(curr, seq, k, result) {
    if (curr.length === k) {
      result.push(curr);
      return;
    }
    for (let i = 0; i < seq.length; i++) {
      const rest = seq.slice(0, i) + seq.slice(i + 1, seq.length);
      this._generate(curr + seq[i], rest, k, result);
    }
  }

  static generate2(n, k) {
    const result = [];
    const seq = "abcdefghijklmnopqrstuvwxyz".slice(0, n).split("");
    this._generate2(0, seq, k, result);
    return result;
  }

  static _generate2(start, seq, k, result) {
    if (start === k) {
      result.push(seq.slice(0, k).join(""));
      return;
    }
    for (let i = start; i < seq.length; i++) {
      this.swap(seq, i, start);
      this._generate2(start + 1, seq, k, result);
      this.swap(seq, i, start);
    }
  }

  static swap(seq, i, j) {
    const tmp = seq[i];
    seq[i] = seq[j];
    seq[j] = tmp;
  }
}

console.log(Permutation.generate(3));
console.log(Permutation.generate2(3));
console.log(PermutationK.generate(3, 3));
console.log(PermutationK.generate2(3, 3));
