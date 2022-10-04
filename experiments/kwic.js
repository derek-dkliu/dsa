import SuffixArray from "../strings/suffix-array.js";
import promptSync from "prompt-sync";
import { readFileFromPrompt } from "../common/utils.js";

export class KWIC {
  constructor(text, context) {
    this.text = text;
    this.context = context; // char # of surrounding context on either side.
    this.sa = new SuffixArray(text);
  }

  search(query) {
    const result = [];
    const n = this.text.length;
    for (let i = this.sa.rank(query); i < n; i++) {
      const from1 = this.sa.index(i);
      const to1 = Math.min(n, from1 + query.length);
      if (query !== this.text.slice(from1, to1)) break;
      // create match with surrounding context;
      const from2 = Math.max(0, from1 - this.context);
      const to2 = Math.min(n, from1 + query.length + this.context);
      const quote = this.text.slice(from2, to2);
      const m1 = from1 - from2;
      const fnl = Math.max(0, quote.lastIndexOf("\n", m1) + 1);
      const lnl = quote.indexOf("\n", m1 + query.length);
      result.push({
        pos: from1,
        text: quote.slice(fnl, lnl === -1 ? quote.length : lnl),
      });
    }
    return result.sort((a, b) => a.pos - b.pos);
  }

  static run() {
    const file = readFileFromPrompt();
    if (!file) return;
    console.log(`Loading "${file.name}" ...`);
    const kwic = new KWIC(file.content, 30);
    console.log(`"${file.name}" loaded.`);
    const prompt = promptSync({ sigint: true });
    let query = prompt("- ");
    while (query !== "q" && query !== "quit" && query !== "exit") {
      const result = kwic.search(query);
      if (result.length === 0) {
        console.log("Not found.");
      } else {
        console.log(`Found ${result.length} results.`);
        console.log(result.map((r) => `[${r.pos}]\t${r.text}`).join("\n"));
      }
      query = prompt("- ");
    }
  }
}
