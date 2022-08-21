export class KosarajuSharir {
  constructor(G) {
    this.marked = [];
    this.id = [];
    this.size = [];
    this.count = 0;
    const order = this.reversePostorder(G.reverse());
    for (const v of order) {
      if (!this.marked[v]) {
        this.dfs(G, v);
        this.count++;
      }
    }
  }

  reversePostorder(G) {
    this.postorder = [];
    this.visited = [];
    for (let v = 0; v < G.V(); v++) {
      if (!this.visited[v]) {
        this.dfsPostorder(G, v);
      }
    }
    return this.postorder.reverse();
  }

  dfsPostorder(G, v) {
    this.visited[v] = true;
    for (const w of G.adj(v)) {
      if (!this.visited[w]) {
        this.dfsPostorder(G, w);
      }
    }
    this.postorder.push(v);
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
