import promptSync from "prompt-sync";
import structures from "./structures/index.js";
import sortings from "./sortings/index.js";
import searchings from "./searchings/index.js";
import strings from "./strings/index.js";
import graphs from "./graphs/index.js";
import examples from "./examples/index.js";
import experiments from "./experiments/index.js";
import { banner } from "./common/utils.js";

const prompt = promptSync({ sigint: true });

function showHints() {
  banner("Welcome to DSA", { char: "*", center: true });
  console.log("(1) Structures");
  console.log("(2) Sortings");
  console.log("(3) Searchings");
  console.log("(4) Graphs");
  console.log("(5) Strings");
  console.log("(6) Examples");
  console.log("(7) Experiments");
  console.log("(0) Exit\n");
}

let exit = false;
while (!exit) {
  showHints();
  const opt = Number(prompt("> "));
  switch (opt) {
    case 1:
      structures();
      break;
    case 2:
      sortings();
      break;
    case 3:
      searchings();
      break;
    case 4:
      graphs();
      break;
    case 5:
      strings();
      break;
    case 6:
      examples();
      break;
    case 7:
      experiments();
      break;
    default:
      console.log("Bye.");
      exit = true;
  }
}
