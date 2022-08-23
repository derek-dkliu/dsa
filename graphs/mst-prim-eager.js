import IndexPriorityQueue from "../structures/priority-queue-index.js";

export class EagerPrimMST {
  constructor(G) {
    this.mst = [];
    this.marked = [];
    this.pq = new IndexPriorityQueue(G.V());

    // run Prim from all vertices to get a minimum spanning forest
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.prim(G, v);
    }
  }

  prim(G, s) {
    this._visit(G, s);
    while (!this.pq.isEmpty()) {
      const edge = this.pq.peekKey();
      const v = this.pq.delete();
      this.mst.push(edge);
      this._visit(G, v);
    }
  }

  _visit(G, v) {
    this.marked[v] = true;
    for (const e of G.adj(v)) {
      const w = e.other(v);
      if (!this.marked[w]) {
        if (!this.pq.contains(w)) {
          this.pq.insert(w, e);
        } else if (e.getWeight() < this.pq.keyOf(w).getWeight()) {
          this.pq.decreaseKey(w, e);
        }
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
