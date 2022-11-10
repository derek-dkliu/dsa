import { readFileSync } from "fs";

class BoggleSolver {
  constructor(dictionary) {
    this.root = new Node();
    for (const word of dictionary) {
      this.put(word);
    }
  }

  put(key) {
    if (!key) return;
    this.root = this._put(this.root, key, 0);
  }

  _put(node, key, d) {
    if (node === null) node = new Node();
    if (d === key.length) {
      node.word = true;
      return node;
    }
    const c = key.charCodeAt(d) - 65;
    node.next[c] = this._put(node.next[c], key, d + 1);
    return node;
  }

  search(board) {
    const results = new Set();
    const rows = board.length;
    const cols = board[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this._search(this.root, board, i, j, "", results);
      }
    }
    return [...results];
  }

  _search(node, board, i, j, prefix, results) {
    if (node === null) return;
    if (node.word && prefix.length >= 3) results.add(prefix);
    if (
      i < 0 ||
      i >= board.length ||
      j < 0 ||
      j >= board[0].length ||
      board[i][j] === ""
    ) {
      return;
    }
    const ch = board[i][j];
    board[i][j] = "";
    const index = ch.charCodeAt(0) - 65;
    let next = node.next[index];
    if (next && ch.length === 2) {
      next = next.next["U".charCodeAt(0) - 65];
    }
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (const [r, c] of neighbors) {
      const row = i + r;
      const col = j + c;
      this._search(next, board, row, col, prefix + ch, results);
    }
    board[i][j] = ch;
  }
}

class Node {
  constructor() {
    this.word = false;
    this.next = [];
    for (let i = 0; i < 26; i++) {
      this.next[i] = null;
    }
  }
}

class Boggle {
  static run(boardFile) {
    const board = this.readBoard(boardFile);
    const dictionary = this.readDictionary("dictionary-algs4.txt");
    const solver = new BoggleSolver(dictionary);
    const words = solver.search(board);
    // compute scores
    let score = 0;
    for (const word of words) {
      const L = word.length;
      if (L >= 3 && L <= 4) score += 1;
      else if (L <= 5) score += 2;
      else if (L <= 6) score += 3;
      else if (L <= 7) score += 5;
      else if (L >= 8) score += 11;
    }
    console.log(score, words);
  }

  static readBoard(file) {
    const board = [];
    const lines = readFileSync(`./data/${file}`, "utf8").split("\n");
    const [m, n] = lines[0].split(/\s+/).map((v) => parseInt(v));
    for (let i = 0; i < m; i++) {
      board[i] = [];
      const row = lines[i + 1].split(/\s+/);
      for (let j = 0; j < n; j++) {
        board[i][j] = row[j];
      }
    }
    return board;
  }

  static readDictionary(file) {
    return readFileSync(`./data/${file}`, "utf8").split("\n");
  }
}

const board = process.argv[2];
Boggle.run(board);
