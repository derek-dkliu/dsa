export class EdgeWeightedGraph {
  constructor(vn) {
    this.vn = vn;
    this.en = 0;
    this.adjList = [];
    for (let v = 0; v < this.vn; v++) {
      this.adjList[v] = [];
    }
  }

  getEdges() {
    const edges = [];
    for (let v = 0; v < this.V(); v++) {
      for (const e of this.adj(v)) {
        let selfLoop = 0;
        if (e.other(v) > v) {
          edges.push(e);
        }
        // add only one copy of each self loop
        else if (e.other(v) === v) {
          if (selfLoop % 2 === 0) edges.push(e);
          selfLoop++;
        }
      }
    }
    return edges;
  }

  //   addEdge(edge) {
  //     const v = edge.either();
  //     const w = edge.other(v);
  //     this.validateVertex(v);
  //     this.validateVertex(w);
  //     this.adjList[v].push(edge);
  //     this.adjList[w].push(edge);
  //     this.en++;
  //   }

  addEdge(v, w, weight) {
    this.validateVertex(v);
    this.validateVertex(w);
    const edge = new Edge(v, w, weight);
    this.adjList[v].push(edge);
    this.adjList[w].push(edge);
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

  validateVertex(v) {
    if (v < 0 || v >= this.V()) {
      throw new Error(`vertex ${v} is not between 0 and ${this.vn - 1}`);
    }
  }

  toString() {
    let result = `V: ${this.V()}\tE: ${this.E()}\n`;
    for (let v = 0; v < this.V(); v++) {
      result += v + ":\t" + this.adjList[v] + "\n";
    }
    return result;
  }
}

class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  either() {
    return this.v;
  }

  other(v) {
    return v === this.v ? this.w : this.v;
  }

  compare(edge) {
    const diff = this.weight - edge.getWeight();
    return diff < 0 ? -1 : diff > 0 ? 1 : 0;
  }

  getWeight() {
    return this.weight;
  }

  toString() {
    return `${this.v}-${this.w}(${this.weight})`;
  }
}
