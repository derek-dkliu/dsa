class Hashable {
  constructor(m) {
    this.m = m;
    this.n = 0;
  }

  size() {
    return this.n;
  }

  isEmpty() {
    return this.size() === 0;
  }

  contains(key) {
    if (key === null) throw new Error("Null key");
    return this.get(key) !== null;
  }

  hash(val) {
    let hash = 0;
    if (typeof val === "string") {
      for (let i = 0; i < val.length; i++) {
        hash = (hash << 5) - hash + val.charCodeAt(i);
        hash &= hash;
      }
    } else if (typeof val === "number") {
      hash = val;
    } else {
      throw new TypeError("Type not supported for this hash function");
    }
    return (hash & 0x7fffffff) % this.m;
  }
}

class Node {
  constructor(key, val, next) {
    this.key = key;
    this.val = val;
    this.next = next || null;
  }
}

export class SeparateChaining extends Hashable {
  static INIT_CAPACITY = 4;

  constructor(m = SeparateChaining.INIT_CAPACITY) {
    super(m);
    this.arr = [];
    for (let i = 0; i < this.m; i++) {
      this.arr[i] = null;
    }
  }

  get(key) {
    if (key === null) throw new Error("Null key");
    const i = this.hash(key);
    for (let x = this.arr[i]; x !== null; x = x.next) {
      if (x.key === key) return x.val;
    }
    return null;
  }

  put(key, val) {
    if (key === null) throw new Error("Null key");
    if (val === null) {
      this.delete(key);
      return;
    }

    // double table size if average length of list >= 10
    if (this.n >= this.m * 10) this.resize(this.m * 2);

    const i = this.hash(key);
    for (let x = this.arr[i]; x !== null; x = x.next) {
      if (x.key === key) {
        x.val = val;
        return;
      }
    }
    this.arr[i] = new Node(key, val, this.arr[i]);
    this.n++;
  }

  delete(key) {
    if (key === null) throw new Error("Null key");
    const i = this.hash(key);
    this.arr[i] = this._delete(this.arr[i], key);

    // halve table size if average length of list <= 2
    if (this.m > SeparateChaining.INIT_CAPACITY && this.n <= this.m * 2) {
      this.resize(Math.floor(this.m / 2));
    }
  }

  _delete(node, key) {
    if (node === null) return null;
    if (node.key === key) {
      this.n--;
      return node.next;
    }
    node.next = this._delete(node.next, key);
    return node;
  }

  resize(capicity) {
    const temp = new SeparateChaining(capicity);
    for (let i = 0; i < this.m; i++) {
      for (let x = this.arr[i]; x !== null; x = x.next) {
        temp.put(x.key, x.val);
      }
    }
    this.arr = temp.arr;
    this.m = temp.m;
    this.n = temp.n;
  }

  keys() {
    if (this.isEmpty()) return [];
    const result = [];
    for (let i = 0; i < this.m; i++) {
      for (let x = this.arr[i]; x !== null; x = x.next) {
        result.push(x.key);
      }
    }
    return result;
  }

  toString() {
    let result = "";
    let i = 0;
    for (let i = 0; i < this.arr.length; i++) {
      const tmp = [];
      let node = this.arr[i];
      while (node) {
        tmp.push(`${node.key}(${node.val})`);
        node = node.next;
      }
      result += `${i}:\t${tmp.join(" -> ")}\n`;
    }
    return result;
  }
}

export class LinearProbing extends Hashable {
  static INIT_CAPACITY = 4;

  constructor(m = LinearProbing.INIT_CAPACITY) {
    super(m);
    this.key = [];
    this.val = [];
    for (let i = 0; i < this.m; i++) {
      this.key[i] = null;
      this.val[i] = null;
    }
  }

  get(key) {
    if (key === null) throw new Error("Null key");
    let i = this.hash(key);
    while (this.key[i] !== null) {
      if (this.key[i] === key) {
        return this.val[i];
      }
      i = (i + 1) % this.m;
    }
    return null;
  }

  put(key, val) {
    if (key === null) throw new Error("Null key");
    if (val === null) {
      this.delete(key);
      return;
    }

    // double table size if 50% full
    if (this.n >= this.m / 2) this.resize(this.m * 2);

    let i = this.hash(key);
    while (this.key[i] !== null) {
      if (this.key[i] === key) {
        this.val[i] = val;
        return;
      }
      i = (i + 1) % this.m;
    }
    this.key[i] = key;
    this.val[i] = val;
    this.n++;
  }

  delete(key) {
    if (key === null) throw new Error("Null key");
    if (!this.contains(key)) return;

    // find key position i
    let i = this.hash(key);
    while (this.key[i] !== key) {
      i = (i + 1) % this.m;
    }
    // delete key and associated value
    this.key[i] = null;
    this.val[i] = null;
    this.n--;
    // rehash keys in same cluster after deleted key
    i = (i + 1) % this.m;
    while (this.key[i] !== null) {
      const k = this.key[i];
      const v = this.val[i];
      this.key[i] = null;
      this.val[i] = null;
      this.n--;
      this.put(k, v);
      i = (i + 1) % this.m;
    }

    // halve table size if 12.5% full
    if (this.m >= LinearProbing.INIT_CAPACITY * 2 && this.n <= this.m / 8) {
      this.resize(Math.floor(this.m / 2));
    }
  }

  resize(capicity) {
    const temp = new LinearProbing(capicity);
    for (let i = 0; i < this.m; i++) {
      if (this.key[i] !== null) {
        temp.put(this.key[i], this.val[i]);
      }
    }
    this.key = temp.key;
    this.val = temp.val;
    this.m = temp.m;
    this.n = temp.n;
  }

  keys() {
    if (this.isEmpty()) return [];
    const result = [];
    for (let i = 0; i < this.m; i++) {
      if (this.key[i] !== null) {
        result.push(this.key[i]);
      }
    }
    return result;
  }

  toString() {
    const width = 20;
    let result = "";
    for (let i = 0; i < this.m; i++) {
      result += i + "\t";
      if ((i + 1) % width === 0 || i === this.m - 1) {
        result += "\n";
        result += this.val
          .slice(Math.floor(i / width) * width, i + 1)
          .join("\t");
        result += "\n";
      }
    }
    return result;
  }
}
