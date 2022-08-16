export class LinkedListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(item) {
    const node = new Node(item);
    if (this.tail !== null) {
      this.tail.next = node;
    }
    this.tail = node;
    if (this.head === null) {
      this.head = this.tail;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.head.item;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail == null;
    }
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

export class ResizingArrayQueue {
  constructor() {
    this.arr = [];
    this.arr.length = 1;
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(item) {
    if (this.size === this.arr.length) {
      this.resize(this.arr.length * 2);
    }
    this.arr[this.tail] = item;
    this.tail = (this.tail + 1) % this.arr.length;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.arr[this.head];
    this.arr[this.head] = null;
    this.head = (this.head + 1) % this.arr.length;
    this.size--;
    if (this.size > 0 && this.size === Math.floor(this.arr.length / 4)) {
      this.resize(Math.floor(this.arr.length / 2));
    }
    return item;
  }

  resize(capicity) {
    const copy = [];
    copy.length = capicity;
    for (let i = 0; i < this.arr.length; i++) {
      copy[i] = this.arr[this.head];
      this.head = (this.head + 1) % this.arr.length;
    }
    this.head = 0;
    this.tail = this.arr.length;
    this.arr = copy;
  }
}

export class Queue extends LinkedListQueue {}
