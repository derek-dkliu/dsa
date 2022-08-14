import { sequence, banner } from "../common/utils.js";
import BST from "./bst.js";
import LLRB from "./llrb.js";

export default function searchings(size = 20) {
  const cases = [
    // sequence(size, { order: false }),
    // sequence(size),
    // sequence(size, { reverse: true }),
    // randomSeq(size, { unique: false }),
    sequence(size, { order: false, numeric: false }),
    // sequence(size, { numeric: false }),
    // sequence(size, { reverse: true, numeric: false }),
    // randomSeq(size, { unique: false, numeric: false }),
  ];

  cases.forEach((seq, index) => {
    seq = seq.slice();
    banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
    const k0 = seq.pop();
    [new BST(), new LLRB()].forEach((bst) => {
      seq.forEach((val) => bst.put(val, val));
      const inorderSeq = bst.inorder();
      console.log(bst.constructor.name, ...inorderSeq);
      console.log("min", bst.min());
      console.log("max", bst.max());
      console.log("size", bst.size());
      console.log(`floor(${k0})`, bst.floor(k0));
      console.log(`ceil(${k0})`, bst.ceil(k0));
      const mid = Math.floor(bst.size() / 2);
      const key = inorderSeq[mid];
      const key1 = inorderSeq[mid - 2];
      const key2 = inorderSeq[mid + 2];
      console.log(`contains(${k0})`, bst.contains(k0));
      console.log(`contains(${key})`, bst.contains(key));
      console.log(`get(${key})`, bst.get(key) === key, bst.get2(key) === key);
      console.log(`select(${mid})`, bst.select(mid) === key, key);
      console.log(`rank(${key})`, bst.rank(key) === mid, mid);
      console.log(`rangeCount(${key1}, ${key2})`, bst.rangeCount(key1, key2));
      console.log(`rangeSearch(${key1}, ${key2})`, bst.rangeSearch(key1, key2));
      console.log(`delete(${key})`, bst.delete(key), ...bst.inorder());
      console.log("deleteMin", bst.deleteMin(), ...bst.inorder());
      console.log("deleteMax", bst.deleteMax(), ...bst.inorder());
      console.log();
    });
  });
}
