import { sequence } from "../common/helpers.js";

export class LinkedListShuffle {
  static run() {
    const seq = sequence(20);
    let list = this.buildLinkedList(seq);
    list = this.shuffle(list);
    const result = [];
    let curr = list;
    while (curr) {
      result.push(curr.item);
      curr = curr.next;
    }
    console.log(seq.join(" "));
    console.log(...result);
  }

  static buildLinkedList(arr) {
    const dummy = new Node();
    let tail = dummy;
    for (const x of arr) {
      const node = new Node(x);
      tail.next = node;
      tail = tail.next;
    }
    return dummy.next;
  }

  static shuffle(list) {
    if (!list || !list.next) return list;

    // find mid node in order to split the list
    let slow = list;
    let fast = list;
    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    let left = list;
    let right = slow.next;
    // split the list
    slow.next = null;

    // shuffle both halves
    left = this.shuffle(left);
    right = this.shuffle(right);

    // merge back
    return this.merge(left, right);
  }

  static merge(left, right) {
    const dummy = new Node();
    let tail = dummy;
    while (left && right) {
      if (Math.random() < 0.5) {
        tail.next = left;
        tail = tail.next;
        left = left.next;
      } else {
        tail.next = right;
        tail = tail.next;
        right = right.next;
      }
    }
    if (left) {
      tail.next = left;
    } else {
      tail.next = right;
    }
    return dummy.next;
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}
