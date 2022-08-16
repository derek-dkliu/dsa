export class DepthfirstPaths {
  constructor(G, s) {
    this.marked = [];
    this.parent = [];
    this.s = s;
    this.dfs(G, s);
  }

  dfs(G, v) {
    this.marked[v] = true;
    for (const w of G.adjSet(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
        this.parent[w] = v;
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v];
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) return null;
    const path = [];
    let x = v;
    while (x !== null && x !== undefined) {
      path.push(x);
      x = this.parent[x];
    }
    return path.reverse();
  }
}
