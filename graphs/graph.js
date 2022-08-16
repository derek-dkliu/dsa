export default class Graph {
  constructor(size) {
    this.size = size;
    this.adj = [];
    for (let i = 0; i < this.size; i++) {
      this.adj[i] = new Set();
    }
  }

  addEdge(v, w) {
    this.adj[v].add(w);
    this.adj[w].add(v);
  }

  adjSet(v) {
    return this.adj[v];
  }

  V() {
    return this.size;
  }

  E() {
    return this.adj.reduce((acc, curr) => acc + curr.size, 0) / 2;
  }

  degree(v) {
    return this.adj[v]?.size || 0;
  }

  maxDegree() {
    let max = 0;
    for (let v = 0; v < this.V(); v++) {
      const degree = this.degree(v);
      if (degree > max) {
        max = degree;
      }
    }
    return max;
  }

  avgDegree() {
    return (this.E() * 2) / this.V();
  }

  countSelfLoop() {
    let count = 0;
    for (let v = 0; v < this.V(); v++) {
      for (const w of this.adjSet(v)) {
        if (w === v) count++;
      }
    }
    return count / 2;
  }

  toString() {
    let result = "";
    for (let v = 0; v < this.V(); v++) {
      result += v + ":\t" + [...this.adj[v].keys()] + "\n";
    }
    return result;
  }
}
