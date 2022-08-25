import IndexPriorityQueue from "../structures/priority-queue-index.js";

export class DijkstraSP {
  constructor(G, s) {
    this.s = s;
    this.edgeTo = [];
    this.distTo = [];
    this.pq = new IndexPriorityQueue(G.V());
    for (let v = 0; v < G.V(); v++) {
      this.distTo[v] = Infinity;
    }
    this.distTo[s] = 0;
    this.pq.insert(s, 0);
    while (!this.pq.isEmpty()) {
      const v = this.pq.delete();
      for (const e of G.adj(v)) {
        this.relax(e);
      }
    }
  }

  relax(e) {
    const v = e.from();
    const w = e.to();
    if (this.distTo[w] > this.distTo[v] + e.getWeight()) {
      this.distTo[w] = this.distTo[v] + e.getWeight();
      this.edgeTo[w] = e;
      if (this.pq.contains(w)) this.pq.decreaseKey(w, this.distTo[w]);
      else this.pq.insert(w, this.distTo[w]);
    }
  }

  costTo(v) {
    return this.distTo[v];
  }

  pathTo(v) {
    const path = [];
    let e = this.edgeTo[v];
    while (e !== undefined) {
      path.push(e);
      e = this.edgeTo[e.from()];
    }
    return path.reverse();
  }

  hasPathTo(v) {
    return this.distTo[v] < Infinity;
  }

  toString() {
    let result = `shortest paths from single source ${this.s}:\n`;
    for (let v = 0; v < this.distTo.length; v++) {
      result += `to ${v}(${this.costTo(v)}): ${this.pathTo(v)}\n`;
    }
    return result;
  }
}
