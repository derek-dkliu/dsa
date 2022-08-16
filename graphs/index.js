import Graph from "./graph.js";
import { GRAPH1, GRAPH2 } from "../common/data.js";
import { DepthfirstPaths } from "./depth-first-paths.js";
import { BreadthFirstPaths } from "./breadth-first-paths.js";

export default function graphs() {
  for (const data of [GRAPH1, GRAPH2]) {
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
      console.log(p.constructor.name);
      console.log(p.pathTo(3).join("->"));
    }
  }
}
