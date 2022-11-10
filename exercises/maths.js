export default class Maths {
  static factor(n) {
    const results = [];
    for (let i = 2; i <= n / i; i++) {
      while (n % i === 0) {
        results.push(i);
        n = n / i;
      }
    }
    if (n > 1) {
      results.push(n);
    }
    return results;
  }

  static convert(n, k) {
    if (n === 0) return "0";
    const hex = ["A", "B", "C", "D", "E", "F"];
    let ans = "";
    while (n > 0) {
      const r = n % k;
      const c = r >= 10 ? hex[r - 10] : r;
      ans = c + ans;
      n = Math.floor(n / k);
    }
    return ans;
  }

  static primeCount(n) {
    let count = 0;
    for (let i = 2; i <= n; i++) {
      let prime = true;
      for (let j = 2; j <= i / j; j++) {
        if (i % j === 0) {
          prime = false;
          break;
        }
      }
      if (prime) count++;
    }
    return count;
  }

  static primeSieve(n) {
    const isPrime = [];
    for (let i = 2; i <= n; i++) isPrime[i] = true;
    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        for (let j = i; i * j <= n; j++) {
          isPrime[i * j] = false;
        }
      }
    }
    // get count
    let count = 0;
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) count++;
    }
    return count;
  }

  static longRandomPrime(m, n) {
    // mark all primes less or equal to n
    const isPrime = [];
    for (let i = 2; i <= n; i++) isPrime[i] = true;
    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        for (let j = i; i * j <= n; j++) {
          isPrime[i * j] = false;
        }
      }
    }
    // get all prime between m and n
    const primes = [];
    for (let i = m; i <= n; i++) {
      if (isPrime[i]) primes.push(i);
    }
    // select one randomly
    const r = Math.floor(Math.random() * primes.length);
    return primes[r];
  }

  static binomialCoefficients(n) {
    const pascal = [];
    for (let i = 0; i <= n; i++) {
      pascal[i] = [0];
    }
    pascal[1][1] = 1;
    for (let i = 2; i <= n; i++) {
      for (let j = 1; j <= i; j++) {
        pascal[i][j] = (pascal[i - 1][j] || 0) + pascal[i - 1][j - 1];
      }
    }

    const binomial = [];
    let denominator = 1;
    for (let i = 1; i <= n; i++) {
      binomial[i - 1] = [];
      for (let j = 1; j <= i; j++) {
        binomial[i - 1][j - 1] = pascal[i][j] + "/" + denominator;
      }
      denominator += denominator;
    }
    return binomial;
  }
}

const n = parseInt(process.argv[2]);
const k = parseInt(process.argv[3]);

// console.log(Maths.factor(n));
// console.log(Maths.convert(n, k));
// console.log(Maths.primeCount(n));
// console.log(Maths.primeSieve(n));
// console.log(Maths.binomialCoefficients(n));
