import { TrieST } from "./trie-st.js";
import { COLORS } from "../data/data.js";
import { KMP } from "./knuth-morris-pratt.js";
import { RabinKarp } from "./rabin-karp.js";
import { BoyerMoore } from "./boyer-moore.js";

export default function strings() {
  const st = new TrieST();
  COLORS.forEach((color, i) => {
    st.put(color, i);
  });

  for (const key of st.keys()) {
    console.log(key, st.get(key));
  }
  console.log("Prefix 'Dark':", st.keysWithPrefix("Dark"));
  console.log("Match 'B....':", st.keysThatMatch("B...."));
  console.log("Longest prefix 'Yellow Dog':", st.longestPrefixOf("Yellow Dog"));

  const pat = "ABABAC";
  const txt = "AABACAABABACAA";
  const kmp = new KMP(pat);
  console.log("KMP", kmp.search(txt));
  const bm = new BoyerMoore(pat);
  console.log("Boyer-Moore", bm.search(txt));
  const rk = new RabinKarp(pat);
  console.log("Rabin-Karp", rk.search(txt));
}
