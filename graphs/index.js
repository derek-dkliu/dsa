import Graph from "./graph.js";
import { GRAPH1, GRAPH2, GRAPH3 } from "../common/data.js";
import { DepthfirstPaths } from "./depth-first-paths.js";
import { BreadthFirstPaths } from "./breadth-first-paths.js";
import { CC } from "./cc.js";
import { Bipartite } from "./bipartite.js";
import { Cycle } from "./cycle.js";
import { EulerianPath } from "./eulerian-path.js";

export default function graphs() {
  for (const data of [GRAPH1, GRAPH2, GRAPH3]) {
    const G = new Graph(data.v);
    for (const [v, w] of data.edges) {
      G.addEdge(v, w);
    }
    console.log(
      G.E(),
      G.degree(0),
      G.maxDegree(),
      G.avgDegree(),
      G.countSelfLoop()
    );
    console.log(G.toString());

    for (const p of [new DepthfirstPaths(G, 0), new BreadthFirstPaths(G, 0)]) {
      console.log(p.constructor.name, p.pathTo(3).join("->"));
    }

    const cc = new CC(G);
    console.log(
      "CC",
      cc.getCount(),
      cc.getId(5),
      cc.getSize(5),
      cc.connected(0, 5)
    );

    const bi = new Bipartite(G);
    console.log("Bipartite", bi.toString());

    const cycle = new Cycle(G);
    console.log("Cycle", cycle.toString());

    const eulerPath = new EulerianPath(G);
    console.log("EulerainPath", eulerPath.toString());
  }
}
