export function dec2bin(n) {
  let str = "";
  let signed = false;
  // in case of negative number
  if (n < 0) {
    signed = true;
    n = -n;
  }
  // in case of fraction number
  let precision = 0;
  while (n % 1 !== 0) {
    n *= 2;
    precision++;
  }

  while (n) {
    // big numbers are truncated to 32 bits with bitwise operators since JS uses 64-bit floating point number
    // https://stackoverflow.com/questions/337355/javascript-bitwise-shift-of-long-long-number
    str = (n % 2) + str;
    n = Math.floor(n / 2);
  }

  if (precision > 0) {
    str = str.padStart(precision + 1, "0");
    str =
      str.slice(0, str.length - precision) +
      "." +
      str.slice(str.length - precision);
  }
  return signed ? "-" + str : str || "0";
}

// const cases = [0, 1, 10, 123, -1, -123, 0.375, 12.3];
// cases.forEach((n) => {
//   const str = dec2bin(n);
//   console.log(str === n.toString(2), str, n.toString(2));
// });

export function frac2bin(n) {
  let str = "";
  let int = Math.trunc(n);
  let frac = n - int;
  while (frac > 0) {
    frac *= 2;
    const i = Math.trunc(frac);
    str += i;
    frac -= i;
  }
  return int + "." + str;
}

// const cases2 = [0.375, 0.1, 0.2];
// cases2.forEach((n) => {
//   const str = frac2bin(n);
//   console.log(str === n.toString(2), str, n.toString(2));
// });
