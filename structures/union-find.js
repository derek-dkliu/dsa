import { randomInt } from "../common/utils.js";

class UF {
  constructor() {
    this.id = [];
  }

  init(n) {
    this.id.length = 0;
    for (let i = 0; i < n; i++) {
      this.id[i] = [i];
    }
    if (n > 0) {
      const c = Math.ceil(n / 2) + 1;
      for (let i = 0; i < c; i++) {
        const p = randomInt(0, n - 1);
        const q = randomInt(0, n - 1);
        this.union(p, q);
      }
    }
    this.inspect();
  }

  inspect() {
    const map = new Map();
    Array(this.id.length)
      .fill()
      .map((_, i) => this.root(i))
      .forEach((v, i) => {
        const component = map.get(v) || [];
        component.push(i);
        map.set(v, component);
      });
    console.log(...map.values());
  }
}

export class QuickFind extends UF {
  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const proot = this.root(p);
    const qroot = this.root(q);
    if (proot === qroot) {
      return false;
    }
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === proot) {
        this.id[i] = qroot;
      }
    }
    return true;
  }

  root(i) {
    return this.id[i] ?? (this.id[i] = i);
  }
}

export class QuickUnion extends UF {
  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const proot = this.root(p);
    const qroot = this.root(q);
    if (proot === qroot) {
      return false;
    }
    this.id[proot] = qroot;
    return true;
  }

  root(i) {
    this.id[i] = this.id[i] ?? i;
    while (i !== this.id[i]) {
      i = this.id[i];
    }
    return i;
  }
}

export class UnionFind extends QuickUnion {
  constructor(n = 10) {
    super();
    this.init(n);
  }

  init(n) {
    this.sz = [];
    for (let i = 0; i < n; i++) {
      this.sz[i] = 1;
    }
    super.init(n);
  }

  union(p, q) {
    const proot = this.root(p);
    const qroot = this.root(q);
    if (proot === qroot) {
      return false;
    }
    // improve 1
    if (this.sz[proot] <= this.sz[qroot]) {
      this.id[proot] = qroot;
      this.sz[qroot] += this.sz[proot];
    } else {
      this.id[qroot] = proot;
      this.sz[proot] += this.sz[qroot];
    }
    return true;
  }

  root(i) {
    while (i !== this.id[i]) {
      // improve 2: repoints every other node to its grandparent
      this.id[i] = this.id[this.id[i]];
      i = this.id[i];
    }

    // improve 2 (alternative): repoints nodes along the path to the root
    // const path = [];
    // while (i !== this.id[i]) {
    //   path.push(i);
    //   i = this.id[i];
    // }
    // for (const n of path) {
    //   this.id[n] = i;
    // }
    return i;
  }
}

import { banner } from "../common/utils.js";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

const UNION = "c";
const FIND = "t";
const RANDOM = "r";
const BACK = "0";

export function test() {
  banner("Union-Find Client", { center: true });
  console.log("c <1> <2>\t Connect <1> and <2>.");
  console.log("t <1> <2>\t Test if <1> and <2> are connected.");
  console.log("r <n>\t\t Reset with <n> random nodes.");
  console.log("0\t Back to main\n");

  const uf = new UnionFind();
  let exit = false;
  while (!exit) {
    const line = prompt(">>> ");
    const arr = line.split(/\s+/);
    const op = arr[0].toLowerCase();
    const p = Number(arr[1]) || 0;
    const q = Number(arr[2]) || 0;
    switch (op) {
      case UNION:
        if (uf.union(p, q)) {
          uf.inspect();
        } else {
          console.log(`${p} and ${q} is already connected.`);
        }
        break;
      case FIND:
        console.log(uf.connected(p, q));
        break;
      case RANDOM:
        uf.init(p);
        break;
      case BACK:
        exit = true;
        break;
      default:
        uf.inspect();
    }
  }
}
