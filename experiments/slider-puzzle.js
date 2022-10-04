import PriorityQueue from "../structures/priority-queue.js";
import { Stack } from "../structures/stack.js";
import { Queue } from "../structures/queue.js";
import { banner } from "../common/utils.js";
import { sequence } from "../common/helpers.js";

export class SliderPuzzle {
  static run() {
    const n = 3;
    const size = n * n;
    const cases = [
      sequence(size, { min: 0 }),
      sequence(size, { min: 0, reverse: true }),
      sequence(size, { min: 0, order: false }),
      // [8, 6, 7, 2, 5, 4, 3, 0, 1],
      // [6, 4, 7, 8, 5, 0, 3, 2, 1],
      // [8, 1, 3, 4, 0, 2, 7, 6, 5],
      // [0, 1, 2, 3, 4, 5, 6, 7, 8],
      // [1, 2, 3, 4, 5, 6, 8, 7, 0],
    ];
    // cases.forEach((tiles, index) => {
    //   const board = new Board(tiles);
    //   const solver = new Solver(board);
    //   banner(`CASE ${index + 1}:`.padEnd(10) + tiles.toString());
    //   console.log("Total moves:", solver.getMoves());
    //   console.log(solver.getSolution());
    // });

    // solve all
    puzzle(n);
  }
}

class Solver {
  constructor(board) {
    if (!(board instanceof Board)) throw new Error("Not a board");

    this.solution = null;

    if (!board.solvable()) return;

    const visited = new Set();
    visited.add(board.signature());
    const pq = new PriorityQueue(false);
    pq.insert(new Node(board, null, 0));

    while (!pq.isEmpty()) {
      const node = pq.delete();
      if (node.board.isGoal()) {
        this.solution = node;
        break;
      }
      for (const neighbor of node.board.neighbors()) {
        const sign = neighbor.signature();
        if (!visited.has(sign)) {
          pq.insert(new Node(neighbor, node, node.move + 1));
          visited.add(sign);
        }
      }
    }

    // // pq2 is used to check if the puzzle is solvable and ensure termination
    // // since either the original board or its twin will lead to the goal state.
    // const twin = board.twin();
    // const visited2 = new Set();
    // visited2.add(twin.toString());
    // const pq2 = new PriorityQueue(false);
    // pq2.insert(new Node(twin, null, 0));

    // while (!pq.isEmpty() || !pq2.isEmpty()) {
    //   if (!pq.isEmpty()) {
    //     const node = pq.delete();
    //     if (node.board.isGoal()) {
    //       this.solution = node;
    //       break;
    //     }
    //     for (const neighbor of node.board.neighbors()) {
    //       const sign = neighbor.signature();
    //       if (!visited.has(sign)) {
    //         pq.insert(new Node(neighbor, node, node.move + 1));
    //         visited.add(sign);
    //       }
    //     }
    //   }
    //   if (!pq2.isEmpty()) {
    //     const node = pq2.delete();
    //     if (node.board.isGoal()) {
    //       break;
    //     }
    //     for (const neighbor of node.board.neighbors()) {
    //       const sign = neighbor.signature();
    //       if (!visited2.has(sign)) {
    //         pq2.insert(new Node(neighbor, node, node.move + 1));
    //         visited2.add(sign);
    //       }
    //     }
    //   }
    // }
  }

  isSolvable() {
    return this.solution !== null;
  }

  getMoves() {
    return this.isSolvable() ? this.solution.move : -1;
  }

  getSolution() {
    if (!this.isSolvable()) return null;
    const n = this.solution.board.dimension();
    const divider = "\n" + "-".repeat(n * 2 - 1) + "\n";
    let node = this.solution;
    const stack = new Stack();
    while (node !== null) {
      stack.push(node.board);
      node = node.prev;
    }
    return [...stack].map((board) => board.toString()).join(divider);
  }
}

class Node {
  constructor(board, prev, move, priority = true) {
    this.board = board;
    this.prev = prev;
    this.move = move;
    this.priority = priority ? move + board.manhattan() : 0;
  }

  compare(that) {
    return this.priority - that.priority;
  }
}

class Board {
  constructor(tiles) {
    if (!Array.isArray(tiles)) {
      throw new Error("Invalid array");
    }
    if (!Array.isArray(tiles[0])) {
      tiles = Board.convert2d(tiles);
    }
    // Board.check(tiles);
    this.tiles = tiles;
  }

  static check(tiles) {
    const set = new Set();
    const n = tiles.length;
    const max = n * n - 1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const val = tiles[i][j];
        // check if tile value is valid and unique
        if (val < 0 || val > max || set.has(val)) {
          throw new Error("Invalid tile value");
        }
        set.add(val);
      }
    }
  }

  static convert2d(arr) {
    const n = Math.sqrt(arr.length);
    if (n * n !== arr.length) {
      throw new Error("Not a square tiles");
    }
    const tiles = [];
    for (let i = 0; i < n; i++) {
      tiles[i] = [];
      for (let j = 0; j < n; j++) {
        tiles[i][j] = arr[i * n + j];
      }
    }
    return tiles;
  }

  dimension() {
    return this.tiles.length;
  }

  hamming() {
    let dist = 0;
    const n = this.dimension();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if ((i !== n - 1 || j !== n - 1) && this.tiles[i][j] !== i * n + j + 1)
          dist++;
      }
    }
    return dist;
  }

  manhattan() {
    let dist = 0;
    const n = this.dimension();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const val = this.tiles[i][j];
        if (val > 0) {
          const p = Math.floor((val - 1) / n);
          const q = (val - 1) % n;
          dist += Math.abs(i - p) + Math.abs(j - q);
        }
      }
    }
    return dist;
  }

  isGoal() {
    const n = this.dimension();
    // last square should be empty
    if (this.tiles[n - 1][n - 1] !== 0) return false;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // tiles should be in row-major order
        if ((i !== n - 1 || j !== n - 1) && this.tiles[i][j] !== i * n + j + 1)
          return false;
      }
    }
    return true;
  }

  equals(that) {
    const n = this.dimension();
    if (that.dimension() !== n) return false;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.tiles[i][j] !== that.tiles[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  neighbors() {
    const boards = [];
    const n = this.dimension();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.tiles[i][j] === 0) {
          if (i - 1 >= 0) boards.push(this.swap(i, j, i - 1, j));
          if (i + 1 < n) boards.push(this.swap(i, j, i + 1, j));
          if (j - 1 >= 0) boards.push(this.swap(i, j, i, j - 1));
          if (j + 1 < n) boards.push(this.swap(i, j, i, j + 1));
          return boards;
        }
      }
    }
  }

  twin() {
    const n = this.dimension();
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.tiles[i][j] > 0) {
          if (i - 1 >= 0 && this.tiles[i - 1][j] > 0)
            return this.swap(i, j, i - 1, j);
          if (i + 1 < n && this.tiles[i + 1][j] > 0)
            return this.swap(i, j, i + 1, j);
          if (j - 1 >= 0 && this.tiles[i][j - 1] > 0)
            return this.swap(i, j, i, j - 1);
          if (j + 1 < n && this.tiles[i][j + 1] > 0)
            return this.swap(i, j, i, j + 1);
        }
      }
    }
  }

  swap(i, j, p, q) {
    // copy tiles
    const tiles = [];
    const n = this.dimension();
    for (let i = 0; i < n; i++) {
      tiles[i] = [];
      for (let j = 0; j < n; j++) {
        tiles[i][j] = this.tiles[i][j];
      }
    }
    // swap tile[i][j] with tile[p][q]
    const tmp = tiles[i][j];
    tiles[i][j] = tiles[p][q];
    tiles[p][q] = tmp;
    return new Board(tiles);
  }

  solvable() {
    const arr = [];
    const n = this.dimension();
    let blank = 0; // the row where empty square lies in
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const val = this.tiles[i][j];
        if (val === 0) {
          blank = i;
        } else {
          arr.push(val);
        }
      }
    }
    const inversion = Merge.inversion(arr);
    return n % 2 === 1 ? inversion % 2 === 0 : (inversion + blank) % 2 === 1;
  }

  signature() {
    return this.tiles.map((row) => row.join("")).join("");
  }

  toString() {
    return this.tiles.map((row) => row.join(" ")).join("\n");
  }
}

function puzzle(n) {
  const [map, total] = bfs(n);
  const num = n * n - 1;
  const max = map.size - 1;
  const boards = map.get(max);
  banner(`${num}-puzzle (total: ${total})`);
  console.log(
    [...map.entries()]
      .map((entry) => entry[0] + " => " + entry[1].length)
      .join("\n")
  );
  console.log(`\nMax moves: ${max} (${boards.length}/${total})`);
  console.log(boards.map((b) => b.toString()).join("\n\n"));
}

function bfs(n) {
  // create a goal board
  const goal = [];
  for (let i = 0; i < n; i++) {
    goal[i] = [];
    for (let j = 0; j < n; j++) {
      goal[i][j] = i * n + j + 1;
    }
  }
  goal[n - 1][n - 1] = 0;
  const root = new Board(goal);

  // search all boards from goal board using BFS
  const result = [];
  const visited = new Set();
  visited.add(root.signature());
  const q = new Queue();
  q.enqueue(new Node(root, null, 0, false));
  while (!q.isEmpty()) {
    const node = q.dequeue();
    result.push(node);
    for (const neighbor of node.board.neighbors()) {
      const sign = neighbor.signature();
      if (!visited.has(sign)) {
        q.enqueue(new Node(neighbor, node, node.move + 1, false));
        visited.add(sign);
      }
    }
  }
  const total = result.length;
  const map = new Map();
  for (const node of result) {
    const boards = map.get(node.move) || [];
    boards.push(node.board);
    map.set(node.move, boards);
  }
  return [map, total];
}

class Merge {
  static inversion(arr) {
    return this.count(arr, arr.slice(), 0, arr.length - 1);
  }

  static count(arr, aux, lo, hi) {
    if (lo >= hi) return 0;
    let inversion = 0;
    const mid = lo + Math.floor((hi - lo) / 2);
    inversion += this.count(arr, aux, lo, mid);
    inversion += this.count(arr, aux, mid + 1, hi);
    inversion += this.merge(arr, aux, lo, mid, hi);
    return inversion;
  }

  static merge(arr, aux, lo, mid, hi) {
    for (let k = lo; k <= hi; k++) {
      aux[k] = arr[k];
    }
    let inversion = 0;
    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        arr[k] = aux[j++];
      } else if (j > hi) {
        arr[k] = aux[i++];
      } else if (aux[i] <= aux[j]) {
        arr[k] = aux[i++];
      } else {
        arr[k] = aux;
        inversion += mid - i + 1;
      }
    }
    return inversion;
  }
}
