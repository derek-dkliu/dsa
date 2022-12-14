export class Graph {
  constructor(vn) {
    this.vn = vn;
    this.en = 0;
    this.adjList = [];
    for (let v = 0; v < this.vn; v++) {
      this.adjList[v] = [];
    }
  }

  addEdge(v, w) {
    this.validateVertex(v);
    this.validateVertex(w);
    this.adjList[v].push(w);
    this.adjList[w].push(v);
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

  degree(v) {
    this.validateVertex(v);
    return this.adjList[v].length;
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
      for (const w of this.adj(v)) {
        if (w === v) count++;
      }
    }
    return count / 2;
  }

  validateVertex(v) {
    if (v < 0 || v >= this.vn) {
      throw new Error(`vertex ${v} is not between 0 and ${this.vn - 1}`);
    }
  }

  toString() {
    let result = `V: ${this.V()}\tE: ${this.E()}\nDegree: ${this.maxDegree()}(max) ${this.avgDegree()}(avg)\n`;
    result += `SelfLoop: ${this.countSelfLoop()}\n`;
    for (let v = 0; v < this.V(); v++) {
      result += v + ":\t" + this.adjList[v] + "\n";
    }
    return result;
  }
}
