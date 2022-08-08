import promptSync from "prompt-sync";
import { Percolation } from "./percolation.js";
import { dir } from "./dir.js";
import { banner } from "../common/utils.js";

const prompt = promptSync({ sigint: true });

function showHints() {
  banner("Examples & Explorations");
  console.log("(1) Percolation");
  console.log("(2) Show directory");
  console.log("(0) Back to main\n");
}

export default function examples() {
  let exit = false;
  while (!exit) {
    showHints();
    const opt = Number(prompt(">> "));
    switch (opt) {
      case 1:
        Percolation.run();
        break;
      case 2:
        dir(process.cwd());
        break;
      default:
        exit = true;
    }
  }
}
