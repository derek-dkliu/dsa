class BinaryString {
  static generate(n, k = 2) {
    if (n === 0) return [];
    if (n === 1)
      return Array(k)
        .fill("")
        .map((_, i) => i + "");
    const strs = [];
    for (const pre of this.generate(n - 1, k)) {
      for (const s of this.generate(1, k)) {
        strs.push(pre + s);
      }
    }
    return strs;
  }
}

console.log(BinaryString.generate(4));
