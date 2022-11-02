import { Huffman } from "../strings/huffman.js";
import { BinaryStdIn, BinaryStdOut } from "../common/io.js";
import LLRB from "../searchings/llrb.js";

const BYTE = 8;
const INT_LEN = BYTE * 4;
const R = Math.pow(2, BYTE);

class BurrowsWheeler {
  static compress(input) {
    return Huffman.compress(MoveToFront.encode(this.transform(input)));
  }

  static expand(input) {
    return this.inverseTransform(MoveToFront.decode(Huffman.expand(input)));
  }

  static transform(input) {
    let msg = input.toString();
    // add eof symbol to avoid issue of repeated string
    let eof = "";
    let mid = msg[Math.floor((msg.length - 1) / 2)];
    for (let i = 0; i < R; i++) {
      eof = String.fromCharCode(i);
      if (eof !== mid) break;
    }
    msg += eof;
    const csa = new CircularSuffixArray(msg);
    const out = new BinaryStdOut();
    for (let i = 0; i < csa.length(); i++) {
      if (csa.index(i) === 0) {
        out.write(i, INT_LEN);
        break;
      }
    }
    for (let i = 0; i < csa.length(); i++) {
      const s = csa.select(i);
      out.write(s[s.length - 1], BYTE);
    }
    return out.toIn();
  }

  static inverseTransform(input) {
    const first = input.readInt(INT_LEN);
    const indices = new Map();
    const ends = [];
    while (!input.isEmpty()) {
      const ch = input.readChar(BYTE);
      const arr = indices.get(ch) || [];
      arr.push(ends.length);
      indices.set(ch, arr);
      ends.push(ch);
    }
    const starts = ends.slice().sort();
    const next = [];
    let index = 0;
    while (index < starts.length) {
      const ch = starts[index];
      for (const i of indices.get(ch)) {
        next[index++] = i;
      }
    }
    const out = new BinaryStdOut();
    out.write(starts[first], BYTE);
    index = next[first];
    while (index !== first) {
      out.write(starts[index], BYTE);
      index = next[index];
    }
    // strip off the eof symbol
    const msg = out.toIn().toString();
    return new BinaryStdIn().source(msg.slice(0, msg.length - 1));
  }
}

class MoveToFront {
  static encode(input) {
    const map = new Map();
    const st = new LLRB();
    for (let i = 0; i < R; i++) {
      map.set(String.fromCharCode(i), i);
      st.put(i, i);
    }
    const out = new BinaryStdOut();
    while (!input.isEmpty()) {
      const ch = input.readChar(BYTE);
      let key = map.get(ch);
      out.write(st.rank(key), BYTE);
      st.delete(key);
      key = st.min() - 1;
      map.set(ch, key);
      st.put(key, key);
    }
    return out.toIn();
  }

  static decode(input) {
    const map = new Map();
    const st = new LLRB();
    for (let i = 0; i < R; i++) {
      map.set(i, String.fromCharCode(i));
      st.put(i, i);
    }
    const out = new BinaryStdOut();
    while (!input.isEmpty()) {
      const rank = input.readInt(BYTE);
      let key = st.select(rank);
      const ch = map.get(key);
      out.write(ch, BYTE);
      st.delete(key);
      map.delete(key);
      key = st.min() - 1;
      map.set(key, ch);
      st.put(key, key);
    }
    return out.toIn();
  }
}

class CircularSuffixArray {
  constructor(s) {
    this.suffixes = [];
    for (let i = 0; i < s.length; i++) {
      this.suffixes[i] = new CircularSuffix(s, i);
    }
    this.suffixes.sort((a, b) => a.compare(b));
  }

  length() {
    return this.suffixes.length;
  }

  index(i) {
    if (i < 0 || i >= this.length()) throw new ArgumentError("Illegal index");
    return this.suffixes[i].index;
  }

  select(i) {
    if (i < 0 || i >= this.length()) throw new ArgumentError("Illegal index");
    return this.suffixes[i].toString();
  }
}

class CircularSuffix {
  constructor(s, index) {
    this.s = s;
    this.index = index;
  }

  length() {
    return this.s.length;
  }

  charAt(i) {
    return this.s.charAt((i + this.index) % this.s.length);
  }

  charCodeAt(i) {
    return this.s.charCodeAt((i + this.index) % this.s.length);
  }

  compare(that) {
    if (this === that) return 0;
    const n = Math.min(this.length(), that.length());
    for (let i = 0; i < n; i++) {
      if (this.charCodeAt(i) < that.charCodeAt(i)) return -1;
      if (this.charCodeAt(i) > that.charCodeAt(i)) return 1;
    }
    return this.length() - that.length();
  }

  toString() {
    return this.s.slice(this.index) + this.s.slice(0, this.index);
  }
}

const msg = "ABRACADABRA!ABRACADABRA!";
const src = new BinaryStdIn().source(msg);
const dest = BurrowsWheeler.expand(BurrowsWheeler.compress(src));
console.log(msg, msg === dest.toString());
