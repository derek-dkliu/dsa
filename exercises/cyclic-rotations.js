class CyclicRotations {
  static check(arr) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      // caculate string's fingerprint using BWT, such that
      // cyclic rotated strings have the same fingerprint.
      const suffixes = [];
      const s = arr[i];
      for (let j = 0; j < s.length; j++) {
        suffixes[j] = s.slice(j) + s.slice(0, j);
      }
      // improve sort with Manber-Myers algorithm
      suffixes.sort();
      const fingerprint = suffixes
        .map((suffix) => suffix[suffix.length - 1])
        .join("");
      if (map.has(fingerprint)) {
        return [map.get(fingerprint), i];
      }
      map.set(fingerprint, i);
    }
    return false;
  }

  static check2(arr) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      const s = arr[i];
      for (let j = 0; j < s.length; j++) {
        const str = s.slice(j) + s.slice(0, j);
        const index = map.get(str);
        if (index >= 0 && index !== i) {
          return [index, i];
        }
        map.set(str, i);
      }
    }
    return false;
  }
}

const A = [
  "algorithms",
  "polynomial",
  "sortsuffix",
  "suffixorts",
  "boyermoore",
  "structures",
  "minimumcut",
  "suffixsort",
  "stackstack",
  "binaryheap",
  "digraphdfs",
  "stringsort",
  "digraphbfs",
];
console.log(CyclicRotations.check(A));
console.log(CyclicRotations.check2(A));
