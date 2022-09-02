import { TrieST } from "./trie-st.js";
import { COLORS } from "../data/data.js";
import { KMP } from "./knuth-morris-pratt.js";
import { RabinKarp } from "./rabin-karp.js";
import { BoyerMoore } from "./boyer-moore.js";
import { RunLength } from "./run-length.js";
import { Huffman } from "./huffman.js";
import { LZW } from "./lzw.js";

export default function strings() {
  tries();
  substrings();
  compressions();
}

function tries() {
  const st = new TrieST();
  COLORS.forEach((color, i) => {
    st.put(color, i);
  });
  // for (const key of st.keys()) {
  //   console.log(key, st.get(key));
  // }
  console.log("Prefix 'Dark':", st.keysWithPrefix("Dark"));
  console.log("Match 'B....':", st.keysThatMatch("B...."));
  console.log("Longest prefix 'Yellow Dog':", st.longestPrefixOf("Yellow Dog"));
}

function substrings() {
  const pat = "ABABAC";
  const txt = "AABACAABABACAA";
  const kmp = new KMP(pat);
  console.log("KMP", kmp.search(txt));
  const bm = new BoyerMoore(pat);
  console.log("Boyer-Moore", bm.search(txt));
  const rk = new RabinKarp(pat);
  console.log("Rabin-Karp", rk.search(txt));
}

function compressions() {
  const msg1 = "ABABAC";
  console.log(msg1, RunLength.expand(RunLength.compress(msg1)).equal(msg1));
  const msg2 = "ABRACADABRA!";
  console.log(msg2, Huffman.expand(Huffman.compress(msg2)).equal(msg2));
  const msg3 = "ABABABA";
  console.log(msg3, LZW.expand(LZW.compress(msg3)).equal(msg3));
}
