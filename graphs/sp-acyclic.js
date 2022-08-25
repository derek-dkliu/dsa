import { TopologicalSort } from "./topological-sort.js";

export class AcyclicSP {
  constructor(G, s) {
    this.s = s;
    this.edgeTo = [];
    this.distTo = [];
    for (let v = 0; v < G.V(); v++) {
      this.distTo[v] = Infinity;
    }
    this.distTo[s] = 0;
    const topological = new TopologicalSort(G);
    for (const v of topological.getOrder()) {
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
      this.edge[w] = e;
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
