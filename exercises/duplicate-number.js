function duplicate(a) {
  for (let i = 0; i < a.length; i++) {
    while (a[i] !== i + 1) {
      const x = a[i] - 1;
      if (a[i] === a[x]) return true;
      const tmp = a[i];
      a[i] = a[x];
      a[x] = tmp;
    }
  }
  return false;
}
const a1 = [2, 3, 1, 5, 4];
console.log(duplicate(a1));

function duplicateReadOnly(a) {
  let slow = a[0];
  let fast = a[0];
  do {
    slow = a[slow];
    fast = a[a[fast]];
  } while (slow !== fast);
  console.log(slow);
  slow = a[0];
  while (slow !== fast) {
    slow = a[slow];
    fast = a[fast];
  }
  return fast;
}

// const a2 = [1, 2, 3, 4, 6, 2, 3, 8, 2];
// const a2 = [1, 2, 3, 4, 6, 2, 7, 8, 5];
const a2 = [1, 1, 3, 4, 6, 2, 7, 8, 5];
console.log(duplicateReadOnly(a2));
