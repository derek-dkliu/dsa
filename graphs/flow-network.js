export class FlowNetwork {
  constructor(vn) {
    this.vn = vn;
    this.en = 0;
    this.adjList = [];
    for (let v = 0; v < this.vn; v++) {
      this.adjList[v] = [];
    }
  }

  addEdge(v, w, capacity) {
    this.validateVertex(v);
    this.validateVertex(w);
    const edge = new FlowEdge(v, w, capacity);
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

class FlowEdge {
  constructor(v, w, capacity) {
    this.v = v;
    this.w = w;
    this.capacity = capacity;
    this.flow = 0;
  }

  from() {
    return this.v;
  }

  to() {
    return this.w;
  }

  other(v) {
    if (v === this.v) return this.w;
    else return this.v;
  }

  getcapacity() {
    return this.capacity;
  }

  getFlow() {
    return this.flow;
  }

  residualCapacityTo(v) {
    if (v === this.w) return this.capacity - this.flow;
    else return this.flow;
  }

  addResidualFlowTo(v, delta) {
    if (v === this.w) this.flow += delta;
    else this.flow -= delta;

    this.flow = Math.max(0, Math.min(this.capacity, this.flow));
  }

  toString() {
    return this.v + "->" + this.w + " " + this.flow + "/" + this.capacity;
  }
}
