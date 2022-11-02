import PriorityQueue from "../structures/priority-queue.js";
import { ArgumentError } from "../common/errors.js";
import { BinaryStdIn, BinaryStdOut } from "../common/io.js";

export class Huffman {
  static R = 256;

  static compress(input) {
    if (!input instanceof BinaryStdIn) throw new ArgumentError("Illegal input");
    const msg = input.toString();
    const freqs = this.countFreqs(msg);
    const root = this.buildTrie(freqs);
    const map = this.buildCode(root);
    const out = new BinaryStdOut();
    // write huffman code trie
    this.writeTrie(root, out);
    // write number of bytes of original msg;
    out.write(msg.length);
    // encode msg by huffman code
    for (let i = 0; i < msg.length; i++) {
      const code = map.get(msg.charAt(i));
      for (const c of code) {
        if (c === "0") out.write(false);
        else if (c === "1") out.write(true);
        else throw new Error("Illegal code bit");
      }
    }
    return out.toIn();
  }

  static expand(input) {
    if (!input instanceof BinaryStdIn) throw new ArgumentError("Illegal input");
    const out = new BinaryStdOut();
    const root = this.readTrie(input);
    const len = input.readInt();
    for (let i = 0; i < len; i++) {
      let node = root;
      while (!node.isLeaf()) {
        const bit = input.readBoolean();
        if (bit) node = node.right;
        else node = node.left;
      }
      out.write(node.ch);
    }
    return out.toIn();
  }

  static writeTrie(node, out) {
    if (node.isLeaf()) {
      out.write(true);
      out.write(node.ch);
      return;
    }
    out.write(false);
    this.writeTrie(node.left, out);
    this.writeTrie(node.right, out);
  }

  static readTrie(input) {
    const isLeaf = input.readBoolean();
    if (isLeaf) {
      return new Node(input.readChar());
    }
    const left = this.readTrie(input);
    const right = this.readTrie(input);
    return new Node("-", -1, left, right);
  }

  static countFreqs(msg) {
    const freqs = [];
    for (let i = 0; i < this.R; i++) {
      freqs[i] = 0;
    }
    for (let i = 0; i < msg.length; i++) {
      freqs[msg.charCodeAt(i)]++;
    }
    return freqs;
  }

  static buildTrie(freqs) {
    const minpq = new PriorityQueue(false);
    for (let i = 0; i < this.R; i++) {
      if (freqs[i] > 0) {
        const ch = String.fromCharCode(i);
        minpq.insert(new Node(ch, freqs[i]));
      }
    }
    while (minpq.size() > 1) {
      const left = minpq.delete();
      const right = minpq.delete();
      const node = new Node("-", left.freq + right.freq, left, right);
      minpq.insert(node);
    }
    return minpq.delete();
  }

  static buildCode(root) {
    const map = new Map();
    this._collect(root, "", map);
    return map;
  }

  static _collect(node, prefix, map) {
    if (node.isLeaf()) {
      map.set(node.ch, prefix);
      return;
    }
    this._collect(node.left, prefix + "0", map);
    this._collect(node.right, prefix + "1", map);
  }
}

class Node {
  constructor(ch, freq = -1, left = null, right = null) {
    this.ch = ch;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }

  isLeaf() {
    return this.left === null && this.right === null;
  }

  compare(that) {
    return this.freq - that.freq;
  }
}
