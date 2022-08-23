import PriorityQueue from "../structures/priority-queue.js";
import { UnionFind } from "../structures/union-find.js";

export class KruskalMST {
  constructor(G) {
    this.mst = []; // array of edges in mst
    this.pq = new PriorityQueue(false); // build min priority queue
    for (const edge of G.getEdges()) {
      this.pq.insert(edge);
    }

    this.uf = new UnionFind(G.V());
    while (!this.pq.isEmpty() && this.mst.length < G.V() - 1) {
      const edge = this.pq.delete(); // get edge with min weight
      const v = edge.either();
      const w = edge.other(v);
      // edge v-w does not create cycle
      if (!this.uf.connected(v, w)) {
        this.uf.union(v, w);
        this.mst.push(edge); // add edge to MST
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
