export default class Graph {
  constructor(vn) {
    this.vn = vn;
    this.en = 0;
    this.adjList = [];
    for (let i = 0; i < this.V(); i++) {
      this.adjList[i] = [];
    }
  }

  addEdge(v, w) {
    this.adjList[v].push(w);
    this.adjList[w].push(v);
    this.en++;
  }

  adj(v) {
    return this.adjList[v] || [];
  }

  V() {
    return this.vn;
  }

  E() {
    return this.en;
  }

  degree(v) {
    return this.adjList[v]?.length || 0;
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

  toString() {
    let result = "";
    for (let v = 0; v < this.V(); v++) {
      result += v + ":\t" + this.adjList[v] + "\n";
    }
    return result;
  }
}
