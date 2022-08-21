import { Queue } from "../structures/queue.js";

export class Bipartite {
  constructor(G) {
    this.marked = [];
    this.parent = [];
    this.color = [];
    this.cycle = null;
    for (let v = 0; v < G.V() && this.isBipartite(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v);
        // this.bfs(G, v);
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    for (const w of G.adj(v)) {
      // return if odd-length cycle found
      if (this.cycle !== null) return;
      if (!this.marked[w]) {
        this.color[w] = !this.color[v];
        this.parent[w] = v;
        this.dfs(G, w);
      } else if (this.color[w] === this.color[v]) {
        // create an odd-length cycle once found
        this.cycle = [w];
        let x = v;
        while (x !== w) {
          this.cycle.push(x);
          x = this.parent[x];
        }
        this.cycle.push(w);
      }
    }
  }

  // alternative
  bfs(G, v) {
    const q = new Queue();
    q.enqueue(v);
    this.marked[v] = true;
    while (!q.isEmpty()) {
      const v = q.dequeue();
      for (const w of G.adj(v)) {
        if (!this.marked[w]) {
          this.marked[w] = true;
          this.parent[w] = v;
          this.color[w] = !this.color[v];
          q.enqueue(w);
        } else if (this.color[w] === this.color[v]) {
          // Note: dist[v] equals dist[w] due to the feature of bfs,
          // find the closest common ancestor x of v and w,
          // then the odd cycle is (v->x) + (x->w) + (w->v)
          this.cycle = [];
          const stack = [];
          let x = v;
          let y = w;
          while (x !== y) {
            this.cycle.push(x);
            stack.push(y);
            x = this.parent[x];
            y = this.parent[y];
          }
          this.cycle.push(x);
          while (stack.length > 0) {
            this.cycle.push(stack.pop());
          }
          this.cycle.push(v);
          return;
        }
      }
    }
  }

  isBipartite() {
    return !this.cycle;
  }

  getColor(v) {
    return this.isBipartite() ? this.color[v] : null;
  }

  getOddCycle() {
    return this.cycle;
  }

  toString() {
    if (this.isBipartite()) {
      const partitions = [[], []];
      for (let v = 0; v < this.color.length; v++) {
        const i = this.color[v] ? 1 : 0;
        partitions[i].push(v);
      }
      return partitions;
    } else {
      return this.getOddCycle().slice().reverse().join("->");
    }
  }
}
