import { Digraph } from "../graphs/digraph.js";
import { Stack } from "../structures/stack.js";
import { createInterface } from "readline";

class RE {
  constructor(regex) {
    this.re = "(" + regex + ")";
    this.G = RE.buildEpsilonDigraph(this.re);
  }

  recognize(input) {
    const M = this.re.length;
    let states = RE.epsilonTransit(this.G, [0]);
    for (const symbol of input) {
      const match = [];
      for (const state of states) {
        if (state === M) continue;
        if (this.re[state] === symbol || this.re[state] === ".") {
          match.push(state + 1);
        }
      }
      states = RE.epsilonTransit(this.G, match);
    }
    return states.includes(M);
  }

  static buildEpsilonDigraph(re) {
    const M = re.length;
    const G = new Digraph(M + 1);
    const ops = new Stack();
    for (let i = 0; i < M; i++) {
      let lp = i;

      if (re[i] === "(" || re[i] === "|") ops.push(i);
      else if (re[i] === ")") {
        const or = ops.pop();
        if (re[or] === "|") {
          lp = ops.pop();
          G.addEdge(lp, or + 1);
          G.addEdge(or, i);
        } else {
          lp = or;
        }
      }
      if (i < M - 1 && re[i + 1] === "*") {
        G.addEdge(lp, i + 1);
        G.addEdge(i + 1, lp);
      }
      if (re[i] === "(" || re[i] === ")" || re[i] === "*") {
        G.addEdge(i, i + 1);
      }
    }
    return G;
  }

  static epsilonTransit(G, currs) {
    const marked = [];
    for (let v of currs) {
      if (!marked[v]) {
        this.dfs(G, v, marked);
      }
    }
    const states = [];
    for (let v = 0; v < G.V(); v++) {
      if (marked[v]) states.push(v);
    }
    return states;
  }

  static dfs(G, v, marked) {
    marked[v] = true;
    for (const w of G.adj(v)) {
      if (!marked[w]) {
        this.dfs(G, w, marked);
      }
    }
  }
}

// (A*B|AC)D
const regex = process.argv[2];
const re = new RE(regex);
const rl = createInterface({ input: process.stdin });
rl.on("line", (input) => {
  console.log(re.recognize(input));
});
