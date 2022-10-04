import SuffixArray from "../strings/suffix-array.js";
import { readFileFromPrompt } from "../common/utils.js";

export class LRS {
  static find(text) {
    this.sa = new SuffixArray(text);
    let lrs = "";
    for (let i = 1; i < this.sa.length(); i++) {
      const len = this.sa.lcp(i);
      if (len > lrs.length) {
        lrs = this.sa.select(i).slice(0, len);
      }
    }
    return lrs;
  }

  static run() {
    const file = readFileFromPrompt();
    if (!file) return;
    console.log(`Searching "${file.name}" ...`);
    const text = file.content.replaceAll("\n", " ");
    const lrs = LRS.find(text);
    console.log("LRS:", lrs);
  }
}
