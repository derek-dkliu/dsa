import { sequence, randomSeq, isSorted, showBorder } from "./common/utils.js";
import Selection from "./sortings/selection.js";
import Insertion from "./sortings/insertion.js";
import Shellsort from "./sortings/shellsort.js";
import MergeSort from "./sortings/mergesort.js";
import { QuickSortHoare, QuickSort } from "./sortings/quicksort.js";

const size = 20;
const cases = [
  sequence(size, { order: false }),
  // sequence(size, { reverse: true }),
  // sequence(size),
  randomSeq(size, { unique: false }),
  sequence(size, { order: false, numeric: false }),
  randomSeq(size, { unique: false, numeric: false }),
];

showBorder({ size });
cases.forEach((seq, index) => {
  console.log(`CASE ${index + 1}:\t\t`, seq.toString());
  showBorder({ size });
  console.log("selection:\t", isSorted(Selection.sort(seq)));
  console.log("insertion:\t", isSorted(Insertion.sort(seq)));
  console.log("shellsort:\t", isSorted(Shellsort.sort(seq)));
  console.log("mergesort:\t", isSorted(MergeSort.sort(seq)));
  console.log("mergesort(BU):\t", isSorted(MergeSort.sortBottomUp(seq)));
  console.log("quicksort(3way):", isSorted(QuickSort.sort(seq)));
  console.log("quicksort:\t", isSorted(QuickSortHoare.sort(seq)));
  console.log("quickselect:\t", QuickSortHoare.select(seq, 10));
  showBorder({ size });
});

for (let i = 0; i < 50; i++) {}
