import promptSync from "prompt-sync";
import { banner } from "../common/utils.js";
import { dir } from "./dir.js";
import { Percolation } from "./percolation.js";
import EvalArithmetic from "./eval-arithmetic.js";

const prompt = promptSync({ sigint: true });

function showHints() {
  banner("Examples & Explorations");
  console.log("(1) Show directory");
  console.log("(2) Percolation");
  console.log("(3) Eval arithmetic");
  console.log("(0) Back to main\n");
}

export default function examples() {
  let exit = false;
  while (!exit) {
    showHints();
    const opt = Number(prompt(">> "));
    switch (opt) {
      case 1:
        dir(process.cwd());
        break;
      case 2:
        Percolation.run();
        break;
      case 3:
        const expr = "( ( 7 - 1 ) + ( ( ( 2 + 3 ) * ( 4 * 5 ) ) / 10 ) )";
        console.log(expr, "=", EvalArithmetic.infix(expr));
        break;
      default:
        exit = true;
    }
  }
}