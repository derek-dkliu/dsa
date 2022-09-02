import { ArgumentError } from "../common/errors.js";
import { BinaryStdIn, BinaryStdOut } from "../common/io.js";
import { TrieST } from "./trie-st.js";

export class LZW {
  static R = 256; // input radix
  static W = 10; // codeword width
  static L = 2 ** this.W; // number of codewords

  static compress(msg) {
    const st = new TrieST();
    for (let i = 0; i < this.R; i++) {
      st.put(String.fromCharCode(i), i);
    }
    const out = new BinaryStdOut();
    let code = this.R + 1; // R is codeword for EOF
    let len = 0;
    for (let i = 0; i < msg.length; i += len) {
      const s = st.longestPrefixOf(msg.slice(i));
      // encode longest prefix
      out.write(st.get(s), this.W);
      len = s.length;
      // Add code for new symbol
      if (i + len < msg.length && code < this.L) {
        st.put(msg.slice(i, i + len + 1), code++);
      }
    }
    out.write(this.R, this.W);
    return out.toIn();
  }

  static expand(input) {
    if (!input instanceof BinaryStdIn) throw new ArgumentError("Illegal input");
    const out = new BinaryStdOut();
    // init decoder
    const decoder = [];
    for (let i = 0; i < this.L; i++) {
      decoder[i] = i < this.R ? String.fromCharCode(i) : null;
    }
    let code = this.R + 1;
    let prefix = "";
    // decode input
    while (!input.isEmpty()) {
      const i = input.readInt(this.W);
      if (i === this.R) break;
      let s = decoder[i];
      // special case
      if (i === code) {
        s = prefix + prefix.charAt(0);
      }
      out.write(s);
      if (prefix.length > 0 && code < this.L) {
        decoder[code++] = prefix + s.charAt(0);
      }
      prefix = s;
    }
    return out.toIn();
  }
}
