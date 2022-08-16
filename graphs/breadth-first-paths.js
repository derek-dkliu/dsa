import { Queue } from "../structures/queue.js";

export class BreadthFirstPaths {
  constructor(G, s) {
    this.marked = [];
    this.parent = [];
    this.dist = [];
    this.s = s;
    this.bfs(G, s);
  }

  bfs(G, v) {
    const queue = new Queue();
    queue.enqueue(v);
    this.marked[v] = true;
    this.dist[v] = 0;
    while (!queue.isEmpty()) {
      const v = queue.dequeue();
      for (const w of G.adjSet(v)) {
        if (!this.marked[w]) {
          queue.enqueue(w);
          this.marked[w] = true;
          this.parent[w] = v;
          this.dist[w] = this.dist[v] + 1;
        }
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v];
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) return null;
    const path = [];
    let x = v;
    while (x !== null && x !== undefined) {
      path.push(x);
      x = this.parent[x];
    }
    return path.map((v) => `${v}(${this.dist[v]})`).reverse();
  }
}
