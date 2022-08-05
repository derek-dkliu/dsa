export function less(arr, a, b, compareFn) {
  if (compareFn) {
    return compareFn(arr[a], arr[b]) < 0;
  } else {
    return arr[a] < arr[b];
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

export function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (less(arr[i], arr[i - 1])) {
      return false + " " + arr.join(" ");
    }
  }
  return true;
}

export function toAlphabet(num, uppercase = true) {
  const base = uppercase ? 65 : 97;
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
  if (less(arr, mid, lo)) {
    if (less(arr, hi, lo)) {
      if (less(arr, hi, mid)) {
        return mid;
      } else {
        return hi;
      }
    } else {
      return lo;
    }
  } else {
    if (less(arr, hi, mid)) {
      if (less(arr, hi, lo)) {
        return lo;
      } else {
        return hi;
      }
    } else {
      return mid;
    }
  }
}

export function showBorder(opts) {
  const { char, size, unit } = Object.assign(
    { char: "-", size: 20, unit: 4 },
    opts
  );
  console.log(char.repeat(Math.min(30, size) * unit));
}
