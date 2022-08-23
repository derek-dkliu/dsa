import PriorityQueue from "../structures/priority-queue.js";

export class LazyPrimMST {
  constructor(G) {
    this.mst = [];
    this.marked = [];
    this.pq = new PriorityQueue(false);

    // run Prim from all vertices to get a minimum spanning forest
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.prim(G, v);
    }
  }

  prim(G, s) {
    this._visit(G, s);
    while (!this.pq.isEmpty()) {
      const edge = this.pq.delete();
      const v = edge.either();
      const w = edge.other(v);
      if (this.marked[v] && this.marked[w]) {
        continue;
      }
      this.mst.push(edge);
      if (!this.marked[v]) this._visit(G, v);
      if (!this.marked[w]) this._visit(G, w);
    }
  }

  _visit(G, v) {
    this.marked[v] = true;
    for (const e of G.adj(v)) {
      if (!this.marked[e.other(v)]) {
        this.pq.insert(e);
      }
    }
  }

  edges() {
    return this.mst;
  }

  toString() {
    return this.mst.map((edge) => edge.toString());
  }
}
