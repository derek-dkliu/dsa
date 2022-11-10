class LongestPanlindromicSubstring {
  static search(s) {
    const N = s.length;
    const palin = [];
    for (let i = 0; i < N; i++) {
      palin[i] = [];
    }
    let max = 0;
    let start = 0,
      end = 0;
    for (let k = 0; k < N; k++) {
      for (let i = 0; i < N - k; i++) {
        palin[i][i + k] =
          k === 0 ||
          ((k === 1 || palin[i + 1][i + k - 1]) &&
            s.charAt(i) === s.charAt(i + k));
        if (palin[i][i + k] && k + 1 > max) {
          max = k + 1;
          start = i;
          end = i + k;
        }
      }
    }
    return [start, end];
  }

  static search2(s) {
    const N = s.length;
    const even = [];
    const odd = [];
    let max = 0;
    let start = 0,
      end = 0;
    for (let k = 0; k < N; k++) {
      const d1 = Math.floor(k / 2);
      const d2 = Math.ceil(k / 2);
      for (let i = d1; i + d2 < N; i++) {
        let isPalin = false;
        if (k % 2 === 0) {
          even[i] =
            k === 0 || (even[i] && s.charAt(i - d1) === s.charAt(i + d2));
          isPalin = even[i];
        } else {
          odd[i] = (k === 1 || odd[i]) && s.charAt(i - d1) === s.charAt(i + d2);
          isPalin = odd[i];
        }
        if (isPalin && k + 1 > max) {
          max = k + 1;
          start = i - d1;
          end = i + d2;
        }
      }
    }
    return [start, end];
  }

  static search3(s) {
    const N = s.length;
    let start = 0;
    let end = 0;
    for (let i = 0; i < N; i++) {
      const len1 = this.expandAroundCenter(s, i, i);
      const len2 = this.expandAroundCenter(s, i, i + 1);
      const len = Math.max(len1, len2);
      if (len > end - start + 1) {
        if (len1 > len2) {
          start = i - (len1 - 1) / 2;
          end = i + (len1 - 1) / 2;
        } else {
          start = i - (len2 - 2) / 2;
          end = i + 1 + (len2 - 2) / 2;
        }
      }
    }
    return [start, end];
  }

  static expandAroundCenter(s, left, right) {
    let L = left;
    let R = right;
    while (L >= 0 && R < s.length && s.charAt(L) === s.charAt(R)) {
      L--;
      R++;
    }
    return R - 1 - (L + 1) + 1;
  }

  static manacher(s) {
    s = this.preprocess(s);
    const N = s.length;
    const palinRadii = [];
    let center = 0;
    let radius = 0;
    while (center < N) {
      while (
        center - (radius + 1) >= 0 &&
        center + (radius + 1) < N &&
        s.charAt(center - (radius + 1)) === s.charAt(center + (radius + 1))
      ) {
        radius++;
      }
      palinRadii[center] = radius;
      const c = center;
      const r = radius;
      center++;
      radius = 0;
      while (center <= c + r) {
        const mirror = c - (center - c);
        const length = r - (center - c);
        if (palinRadii[mirror] < length) {
          palinRadii[center] = palinRadii[mirror];
          center++;
        } else if (palinRadii[mirror] > length) {
          palinRadii[center] = length;
          center++;
        } else {
          radius = length;
          break;
        }
      }
    }
    let max = 0;
    let start = 0;
    for (let i = 0; i < N; i++) {
      if (palinRadii[i] > max) {
        max = palinRadii[i];
        start = Math.floor((i - max) / 2);
      }
    }
    return [start, start + max - 1];
  }

  static preprocess(s) {
    let str = "|";
    for (const c of s) {
      str += c + "|";
    }
    return str;
  }
}

const cases = [
  "abacdfgdcaba",
  "abcba",
  "aabbccbbab",
  "abracadabra",
  "bananas",
  "abcbpbcbp",
];
for (const s of cases) {
  console.log(
    s,
    LongestPanlindromicSubstring.search(s),
    LongestPanlindromicSubstring.search2(s),
    LongestPanlindromicSubstring.search3(s),
    LongestPanlindromicSubstring.manacher(s)
  );
}
