import { readFileSync } from "fs";

// improvement
// 1. reuse board to mark as visited
// 2. store word in trie-node instead of boolean
// 3. set word to null in trie-node to avoid duplicates instead of using hashset
// 4. check board indices and visit mark before recursive calls

// Time: max(O(l * wl), O(m * n * 3^wl)), where l is the length of the dictionary, wl is the average word length in the dictionary.
// Space: O(l * wl), requried for building trie for the dictionary.
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
      node.word = key;
      return node;
    }
    const c = key.charCodeAt(d) - 65;
    node.next[c] = this._put(node.next[c], key, d + 1);
    return node;
  }

  search(board) {
    const results = [];
    const rows = board.length;
    const cols = board[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this._search(this.root, board, i, j, results);
      }
    }
    return [...results];
  }

  _search(node, board, i, j, results) {
    const ch = board[i][j];
    node = node.next[ch.charCodeAt(0) - 65];
    if (node && ch.length === 2) {
      node = node.next["U".charCodeAt(0) - 65];
    }
    if (node === null) return;
    if (node.word !== null && node.word.length >= 3) {
      results.push(node.word);
      node.word = null;
    }

    board[i][j] = "";
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
      if (
        row >= 0 &&
        row < board.length &&
        col >= 0 &&
        col < board[0].length &&
        board[row][col] !== ""
      ) {
        this._search(node, board, row, col, results);
      }
    }
    board[i][j] = ch;
  }
}

class Node {
  constructor() {
    this.word = null;
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
