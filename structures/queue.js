export class LinkedListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.n = 0;
  }

  isEmpty() {
    return this.n === 0;
  }

  size() {
    return this.n;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.head.item;
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
    this.n++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.head.item;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail == null;
    }
    this.n--;
    return item;
  }

  [Symbol.iterator]() {
    return {
      curr: this.head,
      next() {
        if (this.curr === null) return { done: true };
        const value = this.curr.item;
        this.curr = this.curr.next;
        return { done: false, value };
      },
    };
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
    this.n = 0;
  }

  isEmpty() {
    return this.n === 0;
  }

  size() {
    return this.n;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.arr[this.head];
  }

  enqueue(item) {
    if (this.n === this.arr.length) {
      this.resize(this.arr.length * 2);
    }
    this.arr[this.tail] = item;
    this.tail = (this.tail + 1) % this.arr.length;
    this.n++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.arr[this.head];
    this.arr[this.head] = null;
    this.head = (this.head + 1) % this.arr.length;
    this.n--;
    if (this.n > 0 && this.n === Math.floor(this.arr.length / 4)) {
      this.resize(Math.floor(this.arr.length / 2));
    }
    return item;
  }

  resize(capicity) {
    const copy = [];
    copy.length = capicity;
    for (let i = 0; i < this.n; i++) {
      copy[i] = this.arr[(this.head + i) % this.arr.length];
    }
    this.arr = copy;
    this.head = 0;
    this.tail = this.n;
  }

  [Symbol.iterator]() {
    return {
      arr: this.arr,
      curr: this.head,
      n: this.n,
      next() {
        return {
          done: this.n-- === 0,
          value: this.arr[this.curr++ % this.arr.length],
        };
      },
    };
  }
}

export class Queue {
  constructor() {
    this.q = [];
    this.head = 0;
    this.tail = 0;
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.q[this.head];
  }

  enqueue(item) {
    this.q[this.tail++] = item;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.q[this.head];
    this.q[this.head++] = null;
    this.adjust();
    return item;
  }

  adjust() {
    if (this.q.length > 20 && this.head > this.q.length / 2) {
      const copy = [];
      const n = this.size();
      for (let i = 0; i < n; i++) {
        copy[i] = this.q[(this.head + i) % this.q.length];
      }
      this.q = copy;
      this.head = 0;
      this.tail = n;
    }
  }

  [Symbol.iterator]() {
    return {
      q: this.q,
      curr: this.head,
      n: this.size(),
      next() {
        if (this.n === 0) return { done: true };
        this.n--;
        return { done: false, value: this.q[this.curr++ % this.q.length] };
      },
    };
  }
}
