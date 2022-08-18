export class EulerianPath {
  constructor(G) {
    if (G.E() === 0) return;

    let s = this.nonIsolatedVertex(G);
    let oddDegreeVertices = 0;
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) % 2 !== 0) {
        oddDegreeVertices++;
        s = v;
      }
    }

    // either exactly 2 vertices with odd degree, or
    // all vertices with even degree (i.e. eulerian cycle)
    if (oddDegreeVertices !== 2 && oddDegreeVertices !== 0) {
      return;
    }

    this.visited = new Set();
    this.cycle = [];
    this.dfs(G, s);
  }

  nonIsolatedVertex(G) {
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) > 0) {
        return v;
      }
    }
    return -1;
  }

  dfs(G, v) {
    for (const w of G.adj(v)) {
      if (!this.visited.has(v + "-" + w)) {
        this.visited.add(v + "-" + w);
        this.visited.add(w + "-" + v);
        this.dfs(G, w);
      }
    }
    this.cycle.push(v);
  }

  hasCycle() {
    return !!this.cycle;
  }

  getCycle() {
    return this.cycle;
  }

  toString() {
    if (!this.hasCycle()) return false;
    return this.getCycle().reverse().join("->");
  }
}
