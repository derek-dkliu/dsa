export default class SuffixArray {
  constructor(text) {
    this.suffixes = [];
    for (let i = 0; i < text.length; i++) {
      this.suffixes[i] = new Suffix(text, i);
    }
    this.suffixes.sort((a, b) => a.compare(b));
  }

  length() {
    return this.suffixes.length;
  }

  index(i) {
    return this.suffixes[i].index;
  }

  select(i) {
    if (i < 0 || i >= this.length()) throw new Error("Illegal Argument");
    return this.suffixes[i].toString();
  }

  rank(query) {
    let lo = 0;
    let hi = this.length() - 1;
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const cmp = SuffixArray.compare(query, this.suffixes[mid]);
      if (cmp < 0) hi = mid - 1;
      else if (cmp > 0) lo = mid + 1;
      else return mid;
    }
    return lo;
  }

  // Returns the length of the longest common prefix of
  // the ith smallest suffix and i-1st smallest suffix.
  lcp(i) {
    if (i < 1 || i >= this.length()) throw new Error("Illegal Argument");
    return SuffixArray.lcpSuffix(this.suffixes[i], this.suffixes[i - 1]);
  }

  // longest common prefix of s and t
  static lcpSuffix(s, t) {
    const n = Math.min(s.length(), t.length());
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) !== t.charCodeAt(i)) return i;
    }
    return n;
  }

  static compare(query, suffix) {
    const n = Math.min(query.length, suffix.length());
    for (let i = 0; i < n; i++) {
      if (query.charCodeAt(i) < suffix.charCodeAt(i)) return -1;
      if (query.charCodeAt(i) > suffix.charCodeAt(i)) return 1;
    }
    return query.length - suffix.length();
  }
}

class Suffix {
  constructor(text, index) {
    this.text = text;
    this.index = index;
  }

  length() {
    return this.text.length - this.index;
  }

  charAt(i) {
    return this.text.charAt(this.index + i);
  }

  charCodeAt(i) {
    return this.text.charCodeAt(this.index + i);
  }

  compare(that) {
    if (this === that) return 0;
    const n = Math.min(this.length(), that.length());
    for (let i = 0; i < n; i++) {
      if (this.charCodeAt(i) < that.charCodeAt(i)) return -1;
      if (this.charCodeAt(i) > that.charCodeAt(i)) return 1;
    }
    return this.length() - that.length();
  }

  toString() {
    return this.text.slice(this.index);
  }
}
