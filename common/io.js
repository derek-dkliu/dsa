const BYTE = 8;

export class BinaryStdIn {
  constructor(stream = "") {
    this.pos = 0;
    this.stream = stream;
  }

  source(chars) {
    for (let i = 0; i < chars.length; i++) {
      this.stream += chars.charCodeAt(i).toString(2).padStart(BYTE, 0);
    }
    return this;
  }

  isEmpty() {
    return this.pos >= this.stream.length;
  }

  readBoolean() {
    return this.stream.charAt(this.pos++) === "1";
  }

  readChar(len = BYTE) {
    return String.fromCharCode(this.readInt(len));
  }

  readInt(len = BYTE) {
    const bits = this.stream.slice(this.pos, this.pos + len);
    this.pos += len;
    return parseInt(bits, 2);
  }

  equal(msg) {
    return this.toString() === msg;
  }

  toString() {
    let str = "";
    this.pos = 0;
    while (!this.isEmpty()) {
      str += this.readChar();
    }
    return str;
  }
}

export class BinaryStdOut {
  constructor() {
    this.stream = "";
  }

  write(s, len = BYTE) {
    if (typeof s === "boolean") {
      this.stream += s ? "1" : "0";
    } else if (typeof s === "number") {
      this.stream += s.toString(2).padStart(len, 0);
    } else {
      for (let i = 0; i < s.length; i++) {
        this.stream += s.charCodeAt(i).toString(2).padStart(len, 0);
      }
    }
  }

  toIn() {
    return new BinaryStdIn(this.stream);
  }
}
