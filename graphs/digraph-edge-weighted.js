export class EdgeWeightedDigraph {
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

  addEdge(v, w, weight) {
    this.validateVertex(v);
    this.validateVertex(w);
    const edge = new DirectedEdge(v, w, weight);
    this.adjList[v].push(edge);
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

  toString() {
    let result = `V: ${this.V()}\tE: ${this.E()}\n`;
    for (let v = 0; v < this.V(); v++) {
      result += v + ":\t" + this.adjList[v] + "\n";
    }
    return result;
  }

  validateVertex(v) {
    if (v < 0 || v >= this.V()) {
      throw new Error(`vertex ${v} is not between 0 and ${this.V() - 1}`);
    }
  }
}

class DirectedEdge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  from() {
    return this.v;
  }

  to() {
    return this.w;
  }

  getWeight() {
    return this.weight;
  }

  toString() {
    return `${this.v}->${this.w}(${this.weight})`;
  }
}
