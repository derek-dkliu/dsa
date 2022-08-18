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
    const q = new Queue();
    q.enqueue(v);
    this.marked[v] = true;
    this.dist[v] = 0;
    while (!q.isEmpty()) {
      const v = q.dequeue();
      for (const w of G.adj(v)) {
        if (!this.marked[w]) {
          q.enqueue(w);
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
