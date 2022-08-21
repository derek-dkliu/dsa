export class Bridge {
  constructor(G) {
    this.marked = [];
    this.disc = [];
    this.low = [];
    this.bridge = [];
    this.pre = 0; // preorder number counter
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v, null);
      }
    }
  }

  dfs(G, v, parent) {
    this.marked[v] = true;
    this.disc[v] = this.low[v] = this.pre++;
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w, v);
        this.low[v] = Math.min(this.low[v], this.low[w]);
        if (this.low[w] > this.disc[v]) {
          this.bridge.push([v, w]);
        }
      } else if (w !== parent) {
        this.low[v] = Math.min(this.low[v], this.disc[w]);
      }
    }
  }

  getBridges() {
    return this.bridge;
  }
}
