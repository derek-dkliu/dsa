import { readFileSync } from "fs";
import { createInterface } from "readline";
import { Stack } from "../structures/stack.js";

class Tape {
  constructor(input) {
    this.left = new Stack();
    this.right = new Stack();
    for (let i = input.length - 1; i >= 0; i--) {
      this.right.push(input[i]);
    }
    if (this.right.isEmpty()) this.right.push("#");
    this.current = this.right.pop();
  }

  read() {
    return this.current;
  }
  write(symbol) {
    this.current = symbol;
  }
  moveRight() {
    this.left.push(this.current);
    if (this.right.isEmpty()) this.right.push("#");
    this.current = this.right.pop();
  }
  moveLeft() {
    this.right.push(this.current);
    if (this.left.isEmpty()) this.left.push("#");
    this.current = this.left.pop();
  }
  toString() {
    let str = "";
    for (const c of this.left) {
      if (c === "#") continue;
      str = c + str;
    }
    for (const c of this.right) {
      if (c === "#") continue;
      str += c;
    }
    return str;
  }
}

class TM {
  constructor(spec) {
    this.action = [];
    this.next = [];
    this.out = [];

    const rows = spec.split(/\n/);
    const n = parseInt(rows[0]);
    const alphabet = rows[1];
    const lines = rows.slice(2);
    for (let i = 0; i < n; i++) {
      const [label, nexts, outs] = lines[i].split(/\s/);
      this.action[i] = label;
      if (label !== "L" && label !== "R") continue;

      this.next[i] = new Map();
      for (let j = 0; j < alphabet.length; j++) {
        this.next[i].set(alphabet[j], nexts[j]);
      }
      this.out[i] = new Map();
      for (let j = 0; j < alphabet.length; j++) {
        this.out[i].set(alphabet[j], outs[j]);
      }
    }
  }

  simulate(input) {
    const tape = new Tape(input);
    let state = 0;
    while (this.action[state] === "L" || this.action[state] === "R") {
      const c = tape.read();
      tape.write(this.out[state].get(c));
      state = this.next[state].get(c);
      if (this.action[state] === "L") tape.moveLeft();
      if (this.action[state] === "R") tape.moveRight();
    }
    return [this.action[state], tape.toString()];
  }
}

const rl = createInterface({ input: process.stdin });
const filename = process.argv[2];
try {
  const spec = readFileSync("./data/" + filename, "utf8");
  const tm = new TM(spec);
  rl.on("line", (input) => {
    const [state, result] = tm.simulate(input);
    console.log(state, result);
  });
} catch (e) {
  console.log("Error:", e.message);
}
