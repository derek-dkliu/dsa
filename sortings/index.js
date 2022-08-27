import { sequence, randomSeq, isSorted, banner } from "../common/utils.js";
import Selection from "./selection.js";
import Insertion from "./insertion.js";
import Shellsort from "./shellsort.js";
import MergeSort from "./mergesort.js";
import { QuickSort3Way, QuickSort } from "./quicksort.js";
import HeapSort from "./heapsort.js";
import LSD from "../strings/lsd.js";
import MSD from "../strings/msd.js";
import Quick3String from "../strings/quick3string.js";

export default function sortings(size = 20) {
  const cases = [
    sequence(size, { order: false }),
    // sequence(size),
    // sequence(size, { reverse: true }),
    randomSeq(size, { unique: false }),
    // sequence(size, { order: false, numeric: false }),
    randomSeq(size, { unique: false, numeric: false }),
  ];

  cases.forEach((seq, index) => {
    banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
    console.log("selection\t", isSorted(Selection.sort(seq)));
    console.log("insertion\t", isSorted(Insertion.sort(seq)));
    console.log("shellsort\t", isSorted(Shellsort.sort(seq)));
    console.log("mergesort\t", isSorted(MergeSort.sort(seq)));
    console.log("mergesort(BU)\t", isSorted(MergeSort.sortBottomUp(seq)));
    // console.log("quickselect:\t", QuickSort.select(seq, 10));
    console.log("quicksort\t", isSorted(QuickSort.sort(seq)));
    console.log("quicksort(3Way)\t", isSorted(QuickSort3Way.sort(seq)));
    console.log("heapsort\t", isSorted(HeapSort.sort(seq)));
    // console.log("heapsort(PQ)\t", isSorted(HeapSort.pqSort(seq)));
    // console.log("heapsort(Keep)\t", HeapSort.keep(seq, 5));
    console.log("LSD\t\t", isSorted(LSD.sort(seq)));
    console.log("MSD\t\t", isSorted(MSD.sort(seq)));
    console.log("quick3string\t", isSorted(Quick3String.sort(seq)));
  });
}
