export class TarjanSCC {
  constructor(G) {
    this.marked = [];
    this.disc = [];
    this.low = [];
    this.stack = [];
    this.onstack = [];
    this.id = [];
    this.size = [];
    this.pre = 0;
    this.count = 0;
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
        // this.dfs2(G, v);
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.disc[v] = this.low[v] = this.pre++;
    this.stack.push(v);
    this.onstack[v] = true;
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
        this.low[v] = Math.min(this.low[v], this.low[w]);
      } else if (this.onstack[w]) {
        this.low[v] = Math.min(this.low[v], this.disc[w]);
      }
    }
    if (this.low[v] === this.disc[v]) {
      this.size[this.count] = 0;
      let x;
      do {
        x = this.stack.pop();
        this.onstack[x] = false;
        this.id[x] = this.count;
        this.size[this.count]++;
      } while (x !== v);
      this.count++;
    }
  }

  dfs2(G, v) {
    this.marked[v] = true;
    this.low[v] = this.pre++;
    this.stack.push(v);
    let min = this.low[v];
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs2(G, w);
      }
      if (this.low[w] < min) {
        min = this.low[w];
      }
    }
    if (min < this.low[v]) {
      this.low[v] = min;
      return;
    }
    this.size[this.count] = 0;
    let x;
    do {
      x = this.stack.pop();
      this.id[x] = this.count;
      this.low[x] = G.V();
      this.size[this.count]++;
    } while (x !== v);
    this.count++;
  }

  getCount() {
    return this.count;
  }

  getSize(v) {
    this.validateVertex(v);
    return this.size[this.id[v]];
  }

  getId(v) {
    this.validateVertex(v);
    return this.id[v];
  }

  connected(v, w) {
    this.validateVertex(v);
    this.validateVertex(w);
    return this.getId(v) === this.getId(w);
  }

  validateVertex(v) {
    if (v < 0 || v >= this.id.length) {
      throw new Error(`vertex ${v} is not between 0 and ${this.id.length - 1}`);
    }
  }
}
