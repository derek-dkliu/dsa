class GrayCode {
  static generate(n) {
    if (n === 0) return [];
    if (n === 1) return ["0", "1"];
    const strs = [];
    const codes = this.generate(n - 1);
    for (const code of codes) {
      strs.push("0" + code);
    }
    for (let i = codes.length - 1; i >= 0; i--) {
      strs.push("1" + codes[i]);
    }
    return strs;
  }
}

console.log(GrayCode.generate(4).join("\n"));
