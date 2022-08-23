export function less(a, b, compareFn) {
  if (compareFn) {
    return compareFn(a, b) < 0;
  } else if (typeof a?.compare === "function") {
    return a.compare(b) < 0;
  } else {
    return a < b;
  }
}

export function swap(arr, a, b) {
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

export function shuffle(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(arr, i, j);
  }
  return arr;
}

export function sum(arr) {
  return arr.reduce((acc, v) => acc + v, 0);
}

export function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (less(arr[i], arr[i - 1])) {
      return false + " " + arr.join(" ");
    }
  }
  return true;
}

export function toAlphabet(num, uppercase = true) {
  const base = uppercase ? 64 : 96;
  return String.fromCharCode(base + (num % base));
}

export function sequence(n, opts) {
  const { min, reverse, order, numeric } = Object.assign(
    { min: 1, reverse: false, order: true, numeric: true },
    opts
  );
  const seq = Array(n)
    .fill()
    .map((_, i) => {
      const num = i + min;
      return numeric ? num : toAlphabet(num);
    });
  if (reverse) {
    seq.reverse();
  }
  if (!order) {
    shuffle(seq);
  }
  return seq;
}

export function randomSeq(n, opts) {
  const { min, unique, numeric } = Object.assign(
    { min: 1, unique: true, numeric: true },
    opts
  );
  const max = opts?.max ?? min + n - 1;
  const seq = [];
  const set = new Set();
  while (seq.length < n) {
    const num = randomInt(min, max);
    if (unique) {
      if (!set.has(num)) {
        set.add(num);
        seq.push(num);
      }
    } else {
      seq.push(num);
    }
  }
  return numeric ? seq : seq.map((num) => toAlphabet(num));
}

export function randomInt(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function medianOfThree(arr, lo, mid, hi) {
  if (less(arr[mid], arr[lo])) {
    if (less(arr[hi], arr[lo])) {
      if (less(arr[hi], arr[mid])) {
        return mid;
      } else {
        return hi;
      }
    } else {
      return lo;
    }
  } else {
    if (less(arr[hi], arr[mid])) {
      if (less(arr[hi], arr[lo])) {
        return lo;
      } else {
        return hi;
      }
    } else {
      return mid;
    }
  }
}

export function progress(text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(text);
}

export function banner(text, { char = "-", min = 30, center = false } = {}) {
  let title = text.padEnd(min);
  if (center) {
    const len = text.length;
    const margin = Math.ceil((min - len) / 2);
    title = text.padStart(len + margin).padEnd(len + margin * 2);
  }
  const count = Math.min(100, title.length);
  console.log(char.repeat(count));
  console.log(title);
  console.log(char.repeat(count));
}
