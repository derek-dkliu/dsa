import promptSync from "prompt-sync";
import { banner } from "../common/utils.js";
import { SuccessorUF } from "./successor-uf.js";
import { Bitonic } from "./bitonic.js";
import { KthTwoSortedArrays } from "./kth-two-sorted-arrays.js";
import { Queue2Stacks } from "./queue-2stacks.js";
import { StackWithMax } from "./stack-with-max.js";
import { LinkedListShuffle } from "./linkedlist-shuffle.js";
import { NutsAndBolts } from "./nuts-and-bolts.js";
import { DecimalDominant } from "./decimal-dominant.js";
import { DynamicMedian } from "./dyanimc-median.js";
import { TaxicabNum } from "./taxicab-num.js";
import { GeneralizedQueue } from "./generalized-queue.js";
import { DocumentSearch } from "./document-search.js";

const prompt = promptSync({ sigint: true });

const COMMANDS = [
  ["Successor with delete", SuccessorUF],
  ["Bitonic", Bitonic],
  ["K-th of two sorted arrays", KthTwoSortedArrays],
  ["Queue with 2 stacks", Queue2Stacks],
  ["Stack with max", StackWithMax],
  ["Shuffle linked list", LinkedListShuffle],
  ["Nuts and bolts", NutsAndBolts],
  ["Decimal dominant", DecimalDominant],
  ["Dynamic median", DynamicMedian],
  ["Taxicab number", TaxicabNum],
  ["Generalized queue", GeneralizedQueue],
  ["Document search", DocumentSearch],
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
