import { sequence, randomInt, randomSeq } from "../common/helpers.js";
import { banner } from "../common/utils.js";
import { COLORS } from "../data/data.js";
import BinarySearch from "./binary-search.js";
import BST from "./bst.js";
import LLRB from "./llrb.js";
import KdTree from "./kd-tree.js";
import IntervalSearchTree from "./interval-search-tree.js";
import { LinearProbing, SeparateChaining } from "./hashtable.js";

export default function searchings() {
  // testBSTs();
  // testKdTrees();
  // testIntervalSearchTrees();
  testHashTables();
}

function testBSTs() {
  const size = 20;
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
    for (const bst of [new BST(), new LLRB()]) {
      seq.forEach((val) => bst.put(val, val));
      const inorderSeq = bst.inorder();
      const hasLevelorder = typeof bst["levelorder"] === "function";
      console.log(bst.constructor.name, ...inorderSeq);
      console.log("levelorder", hasLevelorder ? bst.levelorder() : undefined);
      console.log("min", bst.min());
      console.log("max", bst.max());
      console.log("size", bst.size());
      console.log(`floor(${k0})`, bst.floor(k0), bst.floor2(k0));
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
      console.log(
        `rangeCount(${key1}, ${key2})`,
        bst.rangeCount(key1, key2),
        bst.rangeCount2(key1, key2)
      );
      console.log(`rangeSearch(${key1}, ${key2})`, bst.rangeSearch(key1, key2));
      console.log(`delete(${key})`, bst.delete(key), ...bst.inorder());
      console.log("deleteMin", bst.deleteMin(), ...bst.inorder());
      console.log("deleteMax", bst.deleteMax(), ...bst.inorder());
      console.log("putMinNull", bst.put(bst.min(), null), ...bst.inorder());
      console.log();
    }
  });
}

function testKdTrees() {
  const points = [
    [5, 5],
    [8, 4],
    [3, 6],
    [2, 1],
    [1, 5.5],
    [4, 6.5],
    [6, 3],
    [11, 8],
    [10, 7],
    [7, 2],
  ];
  const rect = [
    [1.5, 3],
    [0.5, 7],
  ];
  console.log("2d range search:", KdTree.search(points, rect));
  console.log("Nearest neighbor:", KdTree.nearest(points, [0.5, 6.1]));
  console.log();
}

function testIntervalSearchTrees() {
  const intervals = [
    [17, 19],
    [5, 8],
    [4, 8],
    [21, 24],
    [15, 18],
    [16, 22],
    [7, 10],
  ];
  const tree = new IntervalSearchTree();
  for (const [key1, key2] of intervals) {
    tree.insert(key1, key2);
  }
  const query1 = [21, 23];
  const query2 = [12, 14];
  console.log("Interval search:");
  console.log(query1, tree.search(...query1));
  console.log(query2, tree.search(...query2));
  console.log();
}

function testHashTables() {
  const r = randomInt(0, COLORS.length - 1);
  const key = COLORS[r];
  for (const ht of [new SeparateChaining(), new LinearProbing()]) {
    COLORS.forEach((color, i) => ht.put(color, i));
    console.log(ht.constructor.name);
    console.log(ht.toString());
    console.log(key, r, ht.hash(key), ht.m, ht.get(key) === r, "\n");
    ht.delete(key);
    console.log(ht.toString());
  }

  const seq = randomSeq(20, { numeric: false, unique: false }).sort();
  console.log(
    seq.toString(),
    BinarySearch.rank(seq, "E"),
    BinarySearch.indexOf(seq, "E"),
    BinarySearch.searchDuplicates(seq, "E")
  );
}
