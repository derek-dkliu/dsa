class Hashable {
  constructor(size) {
    this.size = size;
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
    return (hash & 0x7fffffff) % this.size;
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
  constructor(size) {
    super(size);
    this.arr = [];
  }

  get(key) {
    const i = this.hash(key);
    let node = this.arr[i];
    while (node) {
      if (node.key === key) {
        return node.val;
      }
      node = node.next;
    }
    return null;
  }

  put(key, val) {
    const i = this.hash(key);
    let node = this.arr[i];
    while (node) {
      if (node.key == key) {
        node.val = val;
        return;
      }
      node = node.next;
    }
    this.arr[i] = new Node(key, val, this.arr[i]);
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
  constructor(size) {
    super(size);
    this.keys = [];
    this.vals = [];
  }

  get(key) {
    let i = this.hash(key);
    let curr = this.keys[i];
    while (curr !== undefined && curr !== null) {
      if (curr === key) {
        return this.vals[i];
      }
      i = (i + 1) % this.size;
      curr = this.keys[i];
    }
    return null;
  }

  put(key, val) {
    let i = this.hash(key);
    let curr = this.keys[i];
    while (curr !== undefined && curr !== null) {
      if (curr === key) {
        this.vals[i] = val;
        return;
      }
      i = (i + 1) % this.size;
      curr = this.keys[i];
    }
    this.keys[i] = key;
    this.vals[i] = val;
  }

  toString() {
    // const result = [];
    // this.vals.forEach((val, i) => result.push(i + ": " + val));
    // return result.join("\n");

    const width = 20;
    let result = "";
    for (let i = 0; i < this.size; i++) {
      result += i + "\t";
      if ((i + 1) % width === 0 || i === this.size - 1) {
        result += "\n";
        result += this.vals
          .slice(Math.floor(i / width) * width, i + 1)
          .join("\t");
        result += "\n";
      }
    }
    return result;
  }
}
