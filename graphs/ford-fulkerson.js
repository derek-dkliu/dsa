import { Queue } from "../structures/queue.js";

export class FordFulkerson {
  constructor(G, s, t) {
    this.edgeTo = [];
    this.marked = [];
    this.value = 0; // current value of max flow
    this.vn = G.V();

    while (this.hasAugmentingPath(G, s, t)) {
      // compute bottleneck capacity
      let bottle = Infinity;
      for (let v = t; v !== s; v = this.edgeTo[v].other(v)) {
        bottle = Math.min(bottle, this.edgeTo[v].residulCapacityTo(v));
      }

      // augment flow
      for (let v = t; v !== s; v = this.edgeTo[v].other(v)) {
        this.edgeTo[v].addResidualFlowTo(v, bottle);
      }

      this.value += bottle;
    }
  }

  hasAugmentingPath(G, s, t) {
    this.edgeTo = [];
    this.marked = [];
    const q = new Queue();
    q.enqueue(s);
    this.marked[s] = true;
    while (!q.isEmpty() && !this.marked[t]) {
      const v = q.dequeue();
      for (const e of G.adj(v)) {
        const w = e.other(v);
        if (!this.marked[w] && e.residulCapacityTo(w) > 0) {
          this.marked[w] = true;
          this.edgeTo[w] = e;
          this.enqueue(w);
        }
      }
    }
    return this.marked[t];
  }

  getValue() {
    return this.value;
  }

  inCut() {
    return this.marked[v];
  }
}
