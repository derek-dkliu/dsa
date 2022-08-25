import { Queue } from "../structures/queue.js";
import { EdgeWeightedDigraph } from "./digraph-edge-weighted.js";
import { EdgeWeightedDirectedCycle } from "./cycle-directed-edge-weighted.js";

export class BellmanFordSP {
  constructor(G, s) {
    this.s = s;
    this.cycle = null;
    this.nRelex = 0; // number of edge relaxation
    this.edgeTo = [];
    this.distTo = [];
    for (let v = 0; v < G.V(); v++) {
      this.distTo[v] = Infinity;
    }
    this.distTo[s] = 0;
    this.onQueue = [];
    this.queue = new Queue();
    this.queue.enqueue(s);
    this.onQueue[s] = true;
    while (!this.queue.isEmpty() && !this.hasNegativeCycle()) {
      const v = this.queue.dequeue();
      this.onQueue[v] = false;
      this.relax(G, v);
    }
  }

  relax(G, v) {
    for (const e of G.adj(v)) {
      const w = e.to();
      if (this.distTo[w] > this.distTo[v] + e.getWeight()) {
        this.distTo[w] = this.distTo[v] + e.getWeight();
        this.edgeTo[w] = e;
        if (!this.onQueue[w]) {
          this.queue.enqueue(w);
          this.onQueue[w] = true;
        }
      }
      if (++this.nRelex % G.V() == 0) {
        this._findNegativeCycle();
        if (this.hasNegativeCycle()) return;
      }
    }
  }

  _findNegativeCycle() {
    const V = this.edgeTo.length;
    const spt = new EdgeWeightedDigraph(V);
    for (let v = 0; v < V; v++) {
      const e = this.edgeTo[v];
      if (e !== undefined) {
        spt.addEdge(e.from(), e.to(), e.getWeight());
      }
    }
    this.cycle = new EdgeWeightedDirectedCycle(spt).getCycle();
  }

  hasNegativeCycle() {
    return this.cycle !== null;
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
