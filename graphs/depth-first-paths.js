export class DepthfirstPaths {
  constructor(G, s) {
    this.marked = [];
    this.parent = [];
    this.s = s;
    this.dfs(G, s);
  }

  dfs(G, v) {
    // recursive method
    this.marked[v] = true;
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.parent[w] = v;
        this.dfs(G, w);
      }
    }

    // // iterative method
    // const stack = [v];
    // this.marked[v] = true;
    // while (stack.length > 0) {
    //   const v = stack.pop();
    //   for (const w of G.adj(v)) {
    //     if (!this.marked[w]) {
    //       stack.push(w);
    //       this.marked[w] = true;
    //       this.parent[w] = v;
    //     }
    //   }
    // }
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
