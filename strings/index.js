import { TrieST } from "./trie-st.js";
import { COLORS } from "../data/data.js";

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
}
