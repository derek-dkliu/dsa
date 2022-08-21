import { G1, G2, G3, DG1, DG2 } from "../common/data.js";
import { Graph } from "./graph.js";
import { DepthfirstPaths } from "./depth-first-paths.js";
import { BreadthFirstPaths } from "./breadth-first-paths.js";
import { CC } from "./cc.js";
import { Bipartite } from "./bipartite.js";
import { Cycle } from "./cycle.js";
import { EulerianPath } from "./eulerian-path.js";
import { ArticulationPoint } from "./ap.js";
import { Bridge } from "./bridge.js";
import { Digraph } from "./digraph.js";
import { DirectedCycle } from "./directed-cycle.js";
import { TopologicalSort } from "./topological-sort.js";
import { KosarajuSharir } from "./kosaraju-sharir.js";
import { TarjanScc } from "./tarjan-scc.js";

export default function graphs() {
  // graph();
  digraph();
}

function graph() {
  for (const data of [G1, G2, G3]) {
    const G = new Graph(data.v);
    for (const [v, w] of data.edges) {
      G.addEdge(v, w);
    }
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

    const ap = new ArticulationPoint(G);
    console.log("Articulations", ap.getAPs());

    const bridge = new Bridge(G);
    console.log("Bridges", bridge.getBridges());
  }
}

function digraph() {
  for (const data of [DG1, DG2]) {
    const G = new Digraph(data.v);
    for (const [v, w] of data.edges) {
      G.addEdge(v, w);
    }
    console.log(G.toString());

    const cycle = new DirectedCycle(G);
    console.log("Cycle", cycle.toString(), DirectedCycle.nonrecursive(G));

    const topological = new TopologicalSort(G);
    console.log(
      "Topological",
      topological.toString(),
      TopologicalSort.nonrecursive(G)
    );

    const scc = new KosarajuSharir(G);
    console.log(
      "Kosaraju",
      scc.getCount(),
      scc.getId(5),
      scc.getSize(5),
      scc.connected(0, 5)
    );

    const tarjanScc = new TarjanScc(G);
    console.log(
      "Tarjan",
      tarjanScc.getCount(),
      tarjanScc.getId(5),
      tarjanScc.getSize(5),
      tarjanScc.connected(0, 5)
    );
  }
}
