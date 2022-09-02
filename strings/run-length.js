import { ArgumentError } from "../common/errors.js";
import { BinaryStdIn, BinaryStdOut } from "../common/io.js";

export class RunLength {
  static R = 256;
  static LG_R = 8;

  static compress(msg) {
    const input = new BinaryStdIn().source(msg);
    const out = new BinaryStdOut();
    let bit = false;
    let count = 0;
    while (!input.isEmpty()) {
      if (input.readBoolean() === bit) {
        if (count === this.R - 1) {
          out.write(count, this.LG_R);
          out.write(0, this.LG_R);
          count = 0;
        }
        count++;
      } else {
        out.write(count, this.LG_R);
        count = 1;
        bit = !bit;
      }
    }
    // write in the last count
    out.write(count, this.LG_R);
    return out.toIn();
  }

  static expand(input) {
    if (!input instanceof BinaryStdIn) throw new ArgumentError("Illegal input");
    const out = new BinaryStdOut();
    let bit = false;
    while (!input.isEmpty()) {
      const n = input.readInt(this.LG_R);
      for (let i = 0; i < n; i++) {
        out.write(bit);
      }
      bit = !bit;
    }
    return out.toIn();
  }
}
