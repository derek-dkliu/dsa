export class Digraph {
  constructor(vn) {
    this.vn = vn;
    this.en = 0;
    this.adjList = [];
    this.indegrees = [];
    for (let v = 0; v < this.vn; v++) {
      this.adjList[v] = [];
      this.indegrees[v] = 0;
    }
  }

  addEdge(v, w) {
    this.validateVertex(v);
    this.validateVertex(w);
    this.adjList[v].push(w);
    this.indegrees[w]++;
    this.en++;
  }

  adj(v) {
    this.validateVertex(v);
    return this.adjList[v];
  }

  V() {
    return this.vn;
  }

  E() {
    return this.en;
  }

  outdegree(v) {
    this.validateVertex(v);
    return this.adjList[v].length;
  }

  indegree(v) {
    this.validateVertex(v);
    return this.indegrees[v];
  }

  reverse() {
    const g = new Digraph(this.V());
    for (let v = 0; v < this.V(); v++) {
      for (const w of this.adj(v)) {
        g.addEdge(w, v);
      }
    }
    return g;
  }

  toString() {
    let result = `V: ${this.V()}\tE: ${this.E()}\n`;
    for (let v = 0; v < this.V(); v++) {
      result += v + ":\t" + this.adjList[v] + "\n";
    }
    return result;
  }

  validateVertex(v) {
    if (v < 0 || v >= this.vn) {
      throw new Error(`vertex ${v} is not between 0 and ${this.vn - 1}`);
    }
  }
}
