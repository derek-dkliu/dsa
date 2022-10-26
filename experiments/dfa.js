import { readFileSync } from "fs";
import { createInterface } from "readline";

class DFA {
  constructor(spec) {
    this.action = [];
    this.next = [];

    const rows = spec.split(/\n/);
    const n = parseInt(rows[0]);
    const alphabet = rows[1];
    const lines = rows.slice(2);
    for (let i = 0; i < n; i++) {
      const [label, nexts] = lines[i].split(/\s/);
      this.action[i] = label;
      this.next[i] = new Map();
      for (let j = 0; j < alphabet.length; j++) {
        this.next[i].set(alphabet[j], nexts[j]);
      }
    }
  }

  simulate(input) {
    let state = 0;
    for (const char of input) {
      state = this.next[state].get(char);
    }
    return this.action[state];
  }
}

const rl = createInterface({ input: process.stdin });
const filename = process.argv[2];
try {
  const spec = readFileSync("./data/" + filename, "utf8");
  const dfa = new DFA(spec);
  rl.on("line", (input) => {
    const result = dfa.simulate(input);
    console.log(result);
  });
} catch (e) {
  console.log("Error:", e.message);
}
