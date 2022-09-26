import LLRB from "../searchings/llrb.js";
import { sequence } from "../common/helpers.js";
import { banner } from "../common/utils.js";

export class GeneralizedQueue {
  constructor() {
    this.st = new LLRB();
  }

  isEmpty() {
    return this.st.isEmpty();
  }

  size() {
    return this.st.size();
  }

  enqueue(item) {
    const key = this.st.isEmpty() ? 0 : this.st.max() + 1;
    this.st.put(key, item);
  }

  dequeue() {
    const item = this.st.get(this.st.min());
    this.st.deleteMin();
    return item;
  }

  get(i) {
    return this.st.get(this.st.select(i));
  }

  remove(i) {
    const key = this.st.select(i);
    const item = this.st.get(key);
    this.st.delete(key);
    return item;
  }

  toString() {
    return this.st
      .inorder()
      .map((k) => this.st.get(k))
      .toString();
  }

  static run() {
    const size = 10;
    const cases = [
      sequence(size, { numeric: false }),
      sequence(size, { reverse: true, numeric: false }),
      sequence(size, { order: false, numeric: false }),
    ];
    cases.forEach((seq, index) => {
      banner(`CASE ${index + 1}:`.padEnd(10) + seq.toString());
      const gq = new GeneralizedQueue();
      for (const x of seq) {
        gq.enqueue(x);
      }
      console.log(gq.toString());
      console.log(gq.dequeue(), gq.toString());
      const mid = Math.floor(gq.size() / 2);
      console.log(gq.get(mid), gq.remove(mid), gq.toString());
    });
  }
}
