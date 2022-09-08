export class LinkedListStack {
  constructor() {
    this.head = null;
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

  push(item) {
    const node = new Node(item);
    node.next = this.head;
    this.head = node;
    this.n++;
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.head.item;
    this.head = this.head.next;
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

export class ResizingArrayStack {
  constructor() {
    this.arr = [];
    this.arr.length = 1;
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
    return this.arr[this.n - 1];
  }

  push(item) {
    if (this.n === this.arr.length) {
      this.resize(this.arr.length * 2);
    }
    this.arr[this.n++] = item;
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.arr[--this.n];
    this.arr[this.n] = null;
    if (this.n > 0 && this.n === Math.floor(this.arr.length / 4)) {
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

  [Symbol.iterator]() {
    return {
      curr: this.n - 1,
      data: this.arr,
      next() {
        return { done: this.curr < 0, value: this.data[this.curr--] };
      },
    };
  }
}

export class Stack {
  constructor() {
    this.data = [];
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
    return this.data[this.n - 1];
  }

  push(item) {
    this.data[this.n++] = item;
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.data[--this.n];
    this.data[this.n] = null;
    return item;
  }

  [Symbol.iterator]() {
    return {
      curr: this.n - 1,
      data: this.data,
      next() {
        return { done: this.curr < 0, value: this.data[this.curr--] };
      },
    };
  }
}
