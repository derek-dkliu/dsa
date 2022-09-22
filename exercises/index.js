import promptSync from "prompt-sync";
import { banner } from "../common/utils.js";
import { SuccessorUF } from "./successor-uf.js";
import { ArrayRotation } from "./array-rotation.js";
import { SevenSegment } from "./seven-segment.js";
import { Bitonic } from "./bitonic.js";
import { MissingInteger } from "./missing-integer.js";
import { KthTwoSortedArrays } from "./kth-two-sorted-arrays.js";
import { ThreeSum } from "./three-sum.js";
import { Queue2Stacks } from "./queue-2stacks.js";
import { StackWithMax } from "./stack-with-max.js";
import { LinkedListShuffle } from "./linkedlist-shuffle.js";
import { NutsAndBolts } from "./nuts-and-bolts.js";
import { DecimalDominant } from "./decimal-dominant.js";
import { DynamicMedian } from "./dyanimc-median.js";
import { TaxicabNum } from "./taxicab-num.js";
import { TopM } from "./top-m.js";
import { BinaryTree } from "./binary-tree.js";

const prompt = promptSync({ sigint: true });

const COMMANDS = [
  ["Array rotation", ArrayRotation],
  ["Seven segment device", SevenSegment],
  ["Successor with delete", SuccessorUF],
  ["Bitonic", Bitonic],
  ["Missing integer", MissingInteger],
  ["K-th of two sorted arrays", KthTwoSortedArrays],
  ["Three sum", ThreeSum],
  ["Queue with 2 stacks", Queue2Stacks],
  ["Stack with max", StackWithMax],
  ["Shuffle linked list", LinkedListShuffle],
  ["Nuts and bolts", NutsAndBolts],
  ["Decimal dominant", DecimalDominant],
  ["Top m number", TopM],
  ["Dynamic median", DynamicMedian],
  ["Taxicab number", TaxicabNum],
  ["Binary tree", BinaryTree],
  ["Back to main", null],
];

function showHints() {
  banner("Exercises");
  COMMANDS.forEach((command, i) => {
    console.log(`(${i + 1}) ${command[0]}`);
  });
  console.log();
}

export default function exercises() {
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
