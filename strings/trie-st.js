import { ArgumentError } from "../common/errors.js";

export class TrieST {
  constructor() {
    this.root = new Node();
  }

  put(key, val) {
    if (key === undefined || key === null)
      throw new ArgumentError("Key cannot be null or undefined");
    if (val === null) this.delete(key);
    else this.root = this._put(this.root, key, val, 0);
  }

  _put(node, key, val, d) {
    if (!node) node = new Node();
    if (d === key.length) {
      node.val = val;
      return node;
    }
    const c = key.charCodeAt(d);
    node.next[c] = this._put(node.next[c], key, val, d + 1);
    return node;
  }

  contains(key) {
    return this.get(key) !== null;
  }

  get(key) {
    if (key === undefined || key === null)
      throw new ArgumentError("Key cannot be null or undefined");
    const node = this._get(this.root, key, 0);
    return node !== null ? node.val : null;
  }

  _get(node, key, d) {
    if (!node) return null;
    if (d === key.length) return node;
    const c = key.charCodeAt(d);
    return this._get(node.next[c], key, d + 1);
  }

  delete(key) {
    this.root = this._delete(this.root, key, 0);
  }

  _delete(node, key, d) {
    if (!node) return null;
    if (d === key.length) {
      node.val = null;
    } else {
      const c = key.charCodeAt(d);
      node.next[c] = this._delete(node.next[c], key, d + 1);
    }
    if (node.val !== null) return node;
    for (const child of node.next) {
      if (!!child) return node;
    }
    return null;
  }

  keys() {
    return this.keysWithPrefix("");
  }

  keysWithPrefix(prefix) {
    const results = [];
    const node = this._get(this.root, prefix, 0);
    this.collect(node, [prefix], results);
    return results;
  }

  collect(node, prefixes, results) {
    if (!node) return;
    if (node.val !== null) results.push(prefixes.join(""));
    for (let i = 0; i < node.next.length; i++) {
      prefixes.push(String.fromCharCode(i));
      this.collect(node.next[i], prefixes, results);
      prefixes.pop();
    }
  }

  keysThatMatch(pattern) {
    const results = [];
    this._keysThatMatch(this.root, pattern, "", results);
    return results;
  }

  _keysThatMatch(node, pattern, prefix, results) {
    if (!node) return;
    const d = prefix.length;
    if (d === pattern.length) {
      if (node.val !== null) {
        results.push(prefix);
      }
      return;
    }
    const char = pattern.charAt(d);
    if (char === ".") {
      for (let i = 0; i < node.next.length; i++) {
        const ch = String.fromCharCode(i);
        this._keysThatMatch(node.next[i], pattern, prefix + ch, results);
      }
    } else {
      const c = pattern.charCodeAt(d);
      this._keysThatMatch(node.next[c], pattern, prefix + char, results);
    }
  }

  longestPrefixOf(query) {
    if (query === null) throw new ArgumentError("query cannot be null");
    const len = this._longestPrefixOf(this.root, query, 0, 0);
    return query.slice(0, len);
  }

  _longestPrefixOf(node, query, d, length) {
    if (!node) return length;
    if (node.val !== null) length = d;
    if (d === query.length) return length;
    const c = query.charCodeAt(d);
    return this._longestPrefixOf(node.next[c], query, d + 1, length);
  }
}

class Node {
  constructor() {
    this.val = null;
    this.next = [];
    for (let i = 0; i < 256; i++) {
      this.next[i] = null;
    }
  }
}
