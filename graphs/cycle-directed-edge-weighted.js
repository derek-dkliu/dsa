export class EdgeWeightedDirectedCycle {
  constructor(G) {
    this.marked = [];
    this.edgeTo = [];
    this.onStack = [];
    this.cycle = null;
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v] && !this.hasCycle()) {
        this.dfs(G, v);
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.onStack[v] = true;
    for (const e of G.adj(v)) {
      if (this.hasCycle()) return;
      const w = e.to();
      if (!this.marked[w]) {
        this.edgeTo[w] = e;
        this.dfs(G, w);
      } else if (this.onStack[w]) {
        this.cycle = [];
        let f = e;
        while (f.from() !== w) {
          this.cycle.push(f);
          f = this.edgeTo[f.from()];
        }
        this.cycle.push(f);
        return;
      }
    }
    this.onStack[v] = false;
  }

  hasCycle() {
    return this.cycle !== null;
  }

  getCycle() {
    return this.cycle;
  }

  toString() {
    if (!this.hasCycle()) return false;
    return this.cycle.join("->");
  }
}
