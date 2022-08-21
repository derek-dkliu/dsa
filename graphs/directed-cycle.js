import { Queue } from "../structures/queue.js";

export class DirectedCycle {
  constructor(G) {
    this.marked = [];
    this.parent = [];
    this.onstack = [];
    this.cycle = null;
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v] && this.cycle === null) {
        this.dfs(G, v);
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.onstack[v] = true;
    for (const w of G.adj(v)) {
      if (this.cycle !== null) return;
      if (!this.marked[w]) {
        this.parent[w] = v;
        this.dfs(G, w);
      } else if (this.onstack[w]) {
        this.cycle = [w];
        let x = v;
        while (x !== w) {
          this.cycle.push(x);
          x = this.parent[x];
        }
        this.cycle.push(w);
      }
    }
    this.onstack[v] = false;
  }

  hasCycle() {
    return this.cycle !== null;
  }

  getCycle() {
    return this.cycle;
  }

  toString() {
    if (!this.hasCycle()) return false;
    return this.cycle.join("->");
  }

  static nonrecursive(G) {
    // initialize indegree for all vertices
    const indegree = [];
    for (let v = 0; v < G.V(); v++) {
      indegree[v] = G.indegree(v);
    }

    // enqueue all vertices with zero indegree
    const q = new Queue();
    for (let v = 0; v < G.V(); v++) {
      if (indegree[v] === 0) q.enqueue(v);
    }
    while (!q.isEmpty()) {
      const v = q.dequeue();
      for (const w of G.adj(v)) {
        indegree[w]--;
        if (indegree[w] === 0) q.enqueue(w);
      }
    }

    // set parent for vertices with indegree >= 1,
    const parent = [];
    let root = -1;
    for (let v = 0; v < G.V(); v++) {
      if (indegree[v] >= 1) {
        root = v;
        for (const w of G.adj(v))
          if (indegree[w] >= 1) {
            parent[w] = v;
          }
      }
    }

    // no cycle
    if (root === -1) return false;

    // find any vertex in a cycle
    const visited = [];
    while (!visited[root]) {
      visited[root] = true;
      root = parent[root];
    }

    // form the cycle
    const cycle = [];
    let x = root;
    do {
      cycle.push(x);
      x = parent[x];
    } while (x !== root);
    cycle.push(root);
    return cycle.reverse();
  }
}
