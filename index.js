import promptSync from "prompt-sync";
import examples from "./examples/index.js";
import structures from "./structures/index.js";
import sortings from "./sortings/index.js";
import searchings from "./searchings/index.js";
import { banner } from "./common/utils.js";

const prompt = promptSync({ sigint: true });

function showHints() {
  banner("Welcome to DSA", { char: "*", center: true });
  console.log("(1) Union-Find");
  console.log("(2) Sortings");
  console.log("(3) Searchings");
  console.log("(4) Examples");
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
      examples();
      break;
    default:
      console.log("Bye.");
      exit = true;
  }
}
