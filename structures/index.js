import promptSync from "prompt-sync";
import { banner } from "../common/utils.js";
import { LinkedListStack, ResizingArrayStack } from "./stack.js";
import { LinkedListQueue, Queue, ResizingArrayQueue } from "./queue.js";
import { test as UnionFindTest } from "./union-find.js";

const prompt = promptSync({ sigint: true });

function showHints() {
  banner("Structures", { center: true });
  console.log("(1) Stack");
  console.log("(2) Queue");
  console.log("(3) Union Find");
  console.log("(0) Back to main\n");
}

export default function structures() {
  let exit = false;
  while (!exit) {
    showHints();
    const opt = Number(prompt(">> "));
    switch (opt) {
      case 1:
        const seq1 = "to be or not to - be - - that - - - is".split(" ");
        for (const stack of [new LinkedListStack(), new ResizingArrayStack()]) {
          const result = [];
          for (const item of seq1) {
            if (item === "-") {
              result.push(stack.pop());
            } else {
              stack.push(item);
            }
          }
          console.log(result, stack.size(), ...stack);
        }
        break;
      case 2:
        const seq2 = "to be or not to - be - - that - - - is".split(" ");
        for (const queue of [
          new LinkedListQueue(),
          new ResizingArrayQueue(),
          new Queue(),
        ]) {
          const result = [];
          for (const item of seq2) {
            if (item === "-") {
              result.push(queue.dequeue());
            } else {
              queue.enqueue(item);
            }
          }
          console.log(result, queue.size(), ...queue);
        }
        break;
      case 3:
        UnionFindTest();
        break;
      case 0:
        exit = true;
        break;
      default:
        console.log("Invalid command.");
    }
  }
}
