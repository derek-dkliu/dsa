export class SevenSegment {
  static run() {
    const num = 1729;
    console.log(num);
    console.log(this.convert(num));
  }

  static convert(num) {
    const a = [];
    // extract and segmentity num by digit
    while (num > 0) {
      a.push(this.segmentify(num % 10));
      num = Math.floor(num / 10);
    }
    a.reverse();
    // transpose table
    const t = [];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[0].length; j++) {
        t[j] ||= [];
        t[j][i] = a[i][j];
      }
    }
    // flatten table
    return t.map((r) => r.join(" ")).join("\n");
  }

  static segmentify(digit) {
    // byte values corresponding to [0-9] for 7-segment
    const byte = [125, 80, 55, 87, 90, 79, 111, 84, 127, 95];
    // convert byte value to 7-bit binary form
    const code = byte[digit].toString(2).padStart(7, "0");
    // following code uses 9-grid to simulate 7-segment device
    // map the index of 9-grid to the index of 7-bit binary
    const p = [7, 4, 7, 3, 5, 2, 1, 6, 0];
    const rows = [];
    for (let i = 0; i < 7; i += 3) {
      const c1 = code[p[i]] === "1" ? "|" : " ";
      const c2 = code[p[i + 1]] === "1" ? "_" : " ";
      const c3 = code[p[i + 2]] === "1" ? "|" : " ";
      rows.push(c1 + c2 + c3);
    }
    return rows;
  }
}
