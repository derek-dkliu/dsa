class AmericanFlag {
  static sort(a) {
    const R = 256;
    const count = [];
    for (let i = 0; i < R + 1; i++) {
      count[i] = 0;
    }
    for (let i = 0; i < a.length; i++) {
      count[a[i].charCodeAt(0) + 1]++;
    }
    for (let i = 0; i < R; i++) {
      count[i + 1] += count[i];
    }
    const next = count.slice();
    for (let i = 0; i < a.length; i++) {
      let c = a[i].charCodeAt(0);
      while (i < count[c]) {
        this.swap(a, i, next[c]++);
        c = a[i].charCodeAt(0);
      }
      next[c]++;
    }
    return a.join("");
  }

  static sort2(a) {
    const R = 256;
    const count = [];
    for (let i = 0; i < R; i++) {
      count[i] = 0;
    }
    for (let i = 0; i < a.length; i++) {
      count[a[i].charCodeAt(0)]++;
    }
    for (let i = 0; i < R - 1; i++) {
      count[i + 1] += count[i];
    }
    for (let i = a.length - 1; i >= 0; i--) {
      let c = a[i].charCodeAt(0);
      while (i >= 0 && count[c] - 1 <= i) {
        if (count[c] - 1 === i) count[c]--;
        i--;
        if (i >= 0) c = a[i].charCodeAt(0);
      }
      if (i < 0) break;
      while (--count[c] !== i) {
        this.swap(a, i, count[c]);
        c = a[i].charCodeAt(0);
      }
    }
    return a.join("");
  }

  static swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

const cases = ["polynomial", "mississipi", "polly"];
cases.forEach((s, i) => {
  console.log(i + 1, s);
  console.log(AmericanFlag.sort(s.split("")));
  console.log(AmericanFlag.sort2(s.split("")));
});
