import PriorityQueue from "../structures/priority-queue.js";
import { randomSeq, sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class TopM {
  static find(seq, m) {
    const minpq = new PriorityQueue(false);
    for (const x of seq) {
      minpq.insert(x);
      if (minpq.size() > m) {
        minpq.delete();
      }
    }
    return minpq.getData();
  }

  static run() {
    const size = 20;
    const cases = [
      sequence(size),
      sequence(size, { reverse: true }),
      sequence(size, { order: false }),
      randomSeq(size, { unique: false }),
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      console.log(this.find(seq, 6));
    });
  }
}
