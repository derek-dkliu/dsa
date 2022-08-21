export class ArticulationPoint {
  constructor(G) {
    this.marked = [];
    this.disc = [];
    this.low = [];
    this.ap = [];
    this.pre = 0; // preorder number counter
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v, null);
      }
    }
  }

  dfs(G, v, parent) {
    let nChildren = 0;
    this.marked[v] = true;
    this.disc[v] = this.low[v] = this.pre++;
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        nChildren++;
        this.dfs(G, w, v);
        this.low[v] = Math.min(this.low[v], this.low[w]);
        if (parent !== null && this.low[w] >= this.disc[v]) {
          this.ap[v] = true;
        }
      } else if (w !== parent) {
        this.low[v] = Math.min(this.low[v], this.disc[w]);
      }
    }
    if (parent === null && nChildren > 1) {
      this.ap[v] = true;
    }
  }

  isAP(v) {
    return this.ap[v];
  }

  getAPs() {
    return this.ap.reduce((acc, ap, v) => (ap ? acc.concat(v) : acc), []);
  }
}
