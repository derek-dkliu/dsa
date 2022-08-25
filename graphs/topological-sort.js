import { Queue } from "../structures/queue.js";
import { DirectedCycle } from "./cycle-directed.js";

export class TopologicalSort {
  constructor(G) {
    this.marked = [];
    this.postorder = [];

    if (new DirectedCycle(G).hasCycle()) return false;

    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
    this.postorder.push(v);
  }

  hasOrder() {
    return this.postorder.length > 0;
  }

  getOrder() {
    return this.postorder.slice().reverse();
  }

  toString() {
    if (!this.hasOrder()) return false;
    return this.getOrder().join("->");
  }

  static nonrecursive(G) {
    const indegree = [];
    for (let v = 0; v < G.V(); v++) {
      indegree[v] = G.indegree(v);
    }

    const order = [];
    const q = new Queue();
    for (let v = 0; v < G.V(); v++) {
      if (indegree[v] === 0) q.enqueue(v);
    }
    while (!q.isEmpty()) {
      const v = q.dequeue();
      order.push(v);
      for (const w of G.adj(v)) {
        indegree[w]--;
        if (indegree[w] === 0) q.enqueue(w);
      }
    }

    for (let v = 0; v < G.V(); v++) {
      if (indegree[v] > 0) return false;
    }
    return order;
  }
}
