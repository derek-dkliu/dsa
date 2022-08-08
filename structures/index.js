import promptSync from "prompt-sync";
import { banner } from "../common/utils.js";
import { UnionFind } from "./union-find.js";

const UNION = "c";
const FIND = "t";
const RANDOM = "r";
const BACK = "b";
const QUIT = "Back";

const prompt = promptSync({ sigint: true });

export default function structures() {
  banner("Union-Find Client", { center: true });
  console.log("c <1> <2>\t Connect <1> and <2>.");
  console.log("t <1> <2>\t Test if <1> and <2> are connected.");
  console.log("r <n>\t\t Reset with <n> random nodes.");
  console.log("b or back \t Back to main\n");

  const uf = new UnionFind();
  let exit = false;
  while (!exit) {
    const line = prompt(">> ");
    const arr = line.split(/\s+/);
    const op = arr[0].toLowerCase();
    const p = Number(arr[1]) || 0;
    const q = Number(arr[2]) || 0;
    switch (op) {
      case UNION:
        if (uf.union(p, q)) {
          uf.inspect();
        } else {
          console.log(`${p} and ${q} is already connected.`);
        }
        break;
      case FIND:
        console.log(uf.connected(p, q));
        break;
      case RANDOM:
        uf.init(p);
        break;
      case BACK:
      case QUIT:
        exit = true;
        break;
      default:
        uf.inspect();
    }
  }
}
