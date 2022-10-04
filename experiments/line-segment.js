import PriorityQueue from "../structures/priority-queue.js";
import LLRB from "../searchings/llrb.js";

export class LineSegment {
  static run() {
    const segments = [
      [
        [4, 7],
        [8, 7],
      ],
      [
        [10, 8],
        [13, 8],
      ],
      [
        [15, 9],
        [15, 0],
      ],
      [
        [11, 10],
        [11, 4],
      ],
      [
        [6, 5],
        [6, 2.5],
      ],
      [
        [8.5, 1.5],
        [8.5, 0.5],
      ],
      [
        [1, 1],
        [9, 1],
      ],
      [
        [9, 1.8],
        [13.5, 1.8],
      ],
      [
        [2, 3],
        [7, 3],
      ],
      [
        [8, 2.5],
        [14, 2.5],
      ],
      [
        [3, 4],
        [5, 4],
      ],
      [
        [7.5, 4.5],
        [12, 4.5],
      ],
    ];
    const result = OrthogonalLineSegement.intersect(segments);
    console.log(
      result.map((segments) => segments.map((seg) => seg.toString()))
    );
  }
}

class OrthogonalLineSegement {
  static intersect(segs) {
    const pq = new PriorityQueue(false);
    const segments = segs.map((seg) => new Segment(seg));
    for (const segment of segments) {
      if (segment.horizontal) {
        pq.insert(new Event(segment.start.x, false, segment));
        pq.insert(new Event(segment.end.x, true, segment));
      } else {
        pq.insert(new Event(segment.start.x, false, segment));
      }
    }

    const result = [];
    const bst = new LLRB();
    while (!pq.isEmpty()) {
      const e = pq.delete();
      if (e.segment.horizontal) {
        if (e.isEnd) {
          bst.delete(e.segment);
        } else {
          bst.put(e.segment, "");
        }
      } else {
        let lo = e.segment;
        let hi = e.segment.swap();
        if (lo.compare(hi) > 0) [lo, hi] = [hi, lo];
        for (const segment of bst.rangeSearch(lo, hi)) {
          result.push([e.segment, segment]);
        }
      }
    }
    return result;
  }
}

class Event {
  constructor(val, isEnd, segment) {
    this.val = val;
    this.isEnd = isEnd;
    this.segment = segment;
  }

  compare(that) {
    return this.val - that.val;
  }
}

class Segment {
  constructor(segment) {
    this.start = new Point(segment[0]);
    this.end = new Point(segment[1]);
    this.horizontal = this.start.y === this.end.y;
  }

  compare(that) {
    return this.start.y - that.start.y;
  }

  swap() {
    const segment = [
      [this.end.x, this.end.y],
      [this.start.x, this.start.y],
    ];
    return new Segment(segment);
  }

  toString() {
    return `${this.start.toString()} - ${this.end.toString()}`;
  }
}

class Point {
  constructor(point) {
    this.x = point[0];
    this.y = point[1];
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
