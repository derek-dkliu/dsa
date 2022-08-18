export class CC {
  constructor(G) {
    this.marked = [];
    this.id = []; // id[v] = id of connected component containing v
    this.size = []; // size[id] = number of vertices in given component
    this.count = 0; // number of connected component
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
        this.count++;
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.id[v] = this.count;
    this.size[this.count] = (this.size[this.count] || 0) + 1;
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  getCount() {
    return this.count;
  }

  getSize(v) {
    return this.size[this.id[v]];
  }

  getId(v) {
    return this.id[v];
  }

  connected(v, w) {
    return this.getId(v) === this.getId(w);
  }
}
