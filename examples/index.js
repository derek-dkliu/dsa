import promptSync from "prompt-sync";
import { banner } from "../common/utils.js";
import { Dir } from "./dir.js";
import { Percolation } from "./percolation.js";
import { EvalArithmetic } from "./eval-arithmetic.js";
import { CollisionSystem } from "./collision-system.js";
import { SliderPuzzle } from "./slider-puzzle.js";
import { KWIC } from "./kwic.js";
import { LRS } from "./lrs.js";

const prompt = promptSync({ sigint: true });

const COMMANDS = [
  ["Show directory", Dir],
  ["Percolation", Percolation],
  ["Evaluate expression", EvalArithmetic],
  ["Particle collisions", CollisionSystem],
  ["Slider puzzle", SliderPuzzle],
  ["Keyword in context", KWIC],
  ["Longest repeated substring", LRS],
  ["Back to main", null],
];

function showHints() {
  banner("Examples");
  COMMANDS.forEach((command, i) => {
    console.log(`(${i + 1}) ${command[0]}`);
  });
  console.log();
}

export default function examples() {
  let exit = false;
  while (!exit) {
    showHints();
    const opt = Number(prompt(">> "));
    if (opt === 0 || opt >= COMMANDS.length) {
      exit = true;
      break;
    }
    COMMANDS[opt - 1][1].run();
  }
}
