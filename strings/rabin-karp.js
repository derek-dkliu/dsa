import Maths from "../exercises/maths.js";

// Monte Carlo version:
// *Always runs in linear time
// *Extremely likely to return correct answer(with large random prime)

// Las Vegas version:
// *Always return correct answer
// *Extremely likely to run in linear time(but worst-case is MN)

export class RabinKarp {
  constructor(pat) {
    this.pat = pat;
    this.M = pat.length;
    this.R = 256;
    this.Q = Maths.longRandomPrime(1000, 10000);
    // precompute R^(M-1) mod Q
    this.RM = 1;
    for (let i = 1; i <= this.M - 1; i++) {
      this.RM = (this.RM * this.R) % this.Q;
    }
    this.patHash = this.hash(pat);
  }

  search(txt) {
    let txtHash = this.hash(txt);
    if (txtHash === this.patHash && this.check(txt, 0)) return 0;
    const N = txt.length;
    for (let i = this.M; i < N; i++) {
      txtHash =
        (txtHash - ((txt.charCodeAt(i - this.M) * this.RM) % this.Q) + this.Q) %
        this.Q;
      txtHash = (txtHash * this.R + txt.charCodeAt(i)) % this.Q;

      const k = i - this.M + 1;
      // Monte Carlo version: Return if hash match (high probability if Q is large enough prime)
      // if (txtHash === this.patHash) return k;

      // Las Vegas version: Check for substring match if hash match
      if (txtHash === this.patHash && this.check(txt, k)) return k;
    }
    return N;
  }

  check(txt, i) {
    for (let j = 0; j < this.M; j++) {
      if (txt.charAt(i + j) !== this.pat.charAt(j)) {
        return false;
      }
    }
    return true;
  }

  hash(key) {
    let h = 0;
    for (let i = 0; i < this.M; i++) {
      h = (h * this.R + key.charCodeAt(i)) % this.Q;
    }
    return h;
  }
}

const pattern = new RabinKarp("ABABC");
console.log(pattern.search("ABCABABABABCA"));
