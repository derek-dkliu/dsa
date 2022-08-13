import { sequence, banner } from "../common/utils.js";
import BST from "./bst.js";
import LLRB from "./llrb.js";

export default function searchings(size = 20) {
  const cases = [
    sequence(size, { order: false }),
    // sequence(size),
    // sequence(size, { reverse: true }),
    // randomSeq(size, { unique: false }),
    // sequence(size, { order: false, numeric: false }),
    // sequence(size, { numeric: false }),
    // sequence(size, { reverse: true, numeric: false }),
    // randomSeq(size, { unique: false, numeric: false }),
  ];

  cases.forEach((seq, index) => {
    seq = seq.slice();
    banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
    const key = seq.pop();
    const bst = new BST();
    seq.forEach((key) => bst.put(key, key));
    console.log("BST", ...bst.inorder());
    console.log("min", bst.min());
    console.log("max", bst.max());
    console.log("floor", bst.floor(key));
    console.log("ceil", bst.ceil(key));
    console.log("size", bst.size());
    const midRank = Math.floor(bst.size() / 2);
    const midKey = seq[midRank];
    console.log(`rank(${midKey})`, bst.rank(midKey));
    const selected = bst.select(midRank);
    console.log(`select(${midRank})`, selected);
    console.log(`delete(${selected})`, bst.delete(selected), ...bst.inorder());
    console.log("deleteMin", bst.deleteMin(), ...bst.inorder());
    console.log("deleteMax", bst.deleteMax(), ...bst.inorder());
  });

  cases.forEach((seq, index) => {
    seq = seq.slice();
    banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
    const key = seq.pop();
    const llrb = new LLRB();
    seq.forEach((key) => llrb.put(key, key));
    console.log("LLRB", ...llrb.inorder());
    console.log("min", llrb.min());
    console.log("max", llrb.max());
    console.log("floor", llrb.floor(key));
    console.log("ceil", llrb.ceil(key));
    console.log("size", llrb.size());
    const midRank = Math.floor(llrb.size() / 2);
    const midKey = seq[midRank];
    console.log(`rank(${midKey})`, llrb.rank(midKey));
    const selected = llrb.select(midRank);
    console.log(`select(${midRank})`, selected);
    // console.log(
    //   `delete(${selected})`,
    //   llrb.delete(selected),
    //   ...llrb.inorder()
    // );
    // console.log("deleteMin", llrb.deleteMin(), ...llrb.inorder());
    // console.log("deleteMax", llrb.deleteMax(), ...llrb.inorder());
  });
}
