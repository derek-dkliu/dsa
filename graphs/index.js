import { G1, G2, G3, DG1, DG2, EWG1, EWDG1, EWDG2 } from "../data/data.js";
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
import { DirectedCycle } from "./cycle-directed.js";
import { TopologicalSort } from "./topological-sort.js";
import { KosarajuSharirSCC } from "./scc-kosaraju-sharir.js";
import { TarjanSCC } from "./scc-tarjan.js";
import { EdgeWeightedGraph } from "./graph-edge-weighted.js";
import { KruskalMST } from "./mst-kruskal.js";
import { LazyPrimMST } from "./mst-prim-lazy.js";
import { EagerPrimMST } from "./mst-prim-eager.js";
import { EdgeWeightedDigraph } from "./digraph-edge-weighted.js";
import { DijkstraSP } from "./sp-dijkstra.js";
import { AcyclicSP } from "./sp-acyclic.js";
import { BellmanFordSP } from "./sp-bellman-ford.js";

export default function graphs() {
  // graph();
  // digraph();
  // graphEdgeWeighted();
  digraphEdgeWeighted();
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

    const scc = new KosarajuSharirSCC(G);
    console.log(
      "Kosaraju SCC",
      scc.getCount(),
      scc.getId(5),
      scc.getSize(5),
      scc.connected(0, 5)
    );

    const tarjanSCC = new TarjanSCC(G);
    console.log(
      "Tarjan SCC",
      tarjanSCC.getCount(),
      tarjanSCC.getId(5),
      tarjanSCC.getSize(5),
      tarjanSCC.connected(0, 5)
    );
  }
}

function graphEdgeWeighted() {
  for (const data of [EWG1]) {
    const G = new EdgeWeightedGraph(data.v);
    for (const [v, w, weight] of data.edges) {
      G.addEdge(v, w, weight);
    }
    console.log(G.toString());

    const kruskalMST = new KruskalMST(G);
    console.log("KruskalMST", kruskalMST.toString());

    const lazyPrimMST = new LazyPrimMST(G);
    console.log("LazyPrimMST", lazyPrimMST.toString());

    const eagerPrimMST = new EagerPrimMST(G);
    console.log("EagerPrimMST", eagerPrimMST.toString());
  }
}

function digraphEdgeWeighted() {
  for (const data of [EWDG1, EWDG2]) {
    const G = new EdgeWeightedDigraph(data.v);
    for (const [v, w, weight] of data.edges) {
      G.addEdge(v, w, weight);
    }
    console.log(G.toString());

    const dijkstraSP = new DijkstraSP(G, 0);
    console.log("DijkstraSP", dijkstraSP.toString());

    // const acyclicSP = new AcyclicSP(G, 0);
    // console.log("AcyclicSP", acyclicSP.toString());

    const bellmanfordSP = new BellmanFordSP(G, 0);
    console.log("BellmanFordSP", bellmanfordSP.toString());
  }
}
