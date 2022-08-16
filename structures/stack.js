export class LinkedListStack {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  push(item) {
    const node = new Node(item);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.head.item;
    this.head = this.head.next;
    this.size--;
    return item;
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

export class ResizingArrayStack {
  constructor() {
    this.arr = [];
    this.arr.length = 1;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  push(item) {
    if (this.size === this.arr.length) {
      this.resize(this.arr.length * 2);
    }
    this.arr[this.size++] = item;
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.arr[--this.size];
    this.arr[this.size] = null;
    if (this.size > 0 && this.size === Math.floor(this.arr.length / 4)) {
      this.resize(Math.floor(this.arr.length / 2));
    }
    return item;
  }

  resize(capicity) {
    const copy = [];
    copy.length = capicity;
    for (let i = 0; i < this.arr.length; i++) {
      copy[i] = this.arr[i];
    }
    this.arr = copy;
  }
}
