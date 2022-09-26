import { readFileSync } from "fs";
import { banner } from "../common/utils.js";

export class DocumentSearch {
  static run() {
    const document = readFileSync("./data/tale.txt", "utf8");
    const words = [];
    for (const line of document.split(/\r?\n/)) {
      for (const word of line.split(/\s+/)) {
        words.push(word.toLowerCase());
      }
    }
    console.log("word count", words.length);
    const cases = [
      ["it", "was", "the"],
      ["wife", "husband", "very"],
      ["very", "wife", "husband"],
    ];
    cases.forEach((query, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + query.toString());
      console.log(this.search(words, query));
    });
  }

  static search(words, query) {
    const doc = new Map();
    words.forEach((word, i) => {
      const arr = doc.get(word) || [];
      arr.push(i);
      doc.set(word, arr);
    });

    // valid query
    for (const w of query) {
      if (!doc.has(w)) throw new Error("Invalid query: " + w);
    }
    let interval = [];
    // find the shortest interval in a greedy manner
    for (const s of doc.get(query[0])) {
      let t = s;
      for (let i = 1; i < query.length; i++) {
        const arr = doc.get(query[i]);
        if (arr[arr.length - 1] <= t + 1) return interval;
        t = this.binarySearch(arr, t + 1);
      }
      if (interval.length === 0 || t - s < interval[1] - interval[0]) {
        interval = [s, t];
      }
      // return when reach the shortest possible interval which is the number of words in query
      if (interval[1] - interval[0] + 1 === query.length) {
        return interval;
      }
    }
    return interval;
  }

  static binarySearch(arr, key) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (arr[mid] === key) {
        return key;
      } else if (arr[mid] < key) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return arr[lo];
  }
}
