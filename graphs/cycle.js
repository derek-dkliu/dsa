export class Cycle {
  constructor(G) {
    if (this.hasSelfLoop(G)) return;
    if (this.hasParallelEdges(G)) return;

    this.marked = [];
    this.parent = [];
    this.cycle = null;
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
      }
    }
  }

  hasSelfLoop(G) {
    for (let v = 0; v < G.V(); v++) {
      for (const w of G.adj(v)) {
        if (w === v) {
          this.cycle = [v, v];
          return true;
        }
      }
    }
    return false;
  }

  hasParallelEdges(G) {
    this.marked = [];
    for (let v = 0; v < G.V(); v++) {
      // check for parallel edges from v
      for (const w of G.adj(v)) {
        if (this.marked[w]) {
          this.cycle = [v, w, v];
          return true;
        }
        this.marked[w] = true;
      }
      // reset marked
      for (const w of G.adj(v)) {
        this.marked[w] = false;
      }
    }
    return false;
  }

  dfs(G, v) {
    this.marked[v] = true;
    for (const w of G.adj(v)) {
      // return if cycle already found
      if (this.cycle !== null) return;
      if (!this.marked[w]) {
        this.parent[w] = v;
        this.dfs(G, w);
      } else {
        // disregard reversed edge leading to parent
        if (w !== this.parent[v]) {
          this.cycle = [w];
          let x = v;
          while (x !== w) {
            this.cycle.push(x);
            x = this.parent[x];
          }
          this.cycle.push(w);
        }
      }
    }
  }

  hasCycle() {
    return this.cycle !== null;
  }

  getCycle() {
    return this.cycle;
  }

  toString() {
    if (!this.hasCycle()) return false;
    return this.getCycle().join("->");
  }
}
