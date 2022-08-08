const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

export class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.resolveHandlers = [];
    this.rejectHandlers = [];
    if (executor) {
      executor(this.resolve.bind(this), this.reject.bind(this));
    }
  }

  isPending() {
    return this.state === PENDING;
  }

  then(resolveHandler, rejectHandler) {
    return new MyPromise((resolve, reject) => {
      const handler1 = () => {
        const res = resolveHandler(this.result);
        if (res instanceof MyPromise || res?.then === "function") {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      };
      const handler2 = () => {
        const res = rejectHandler(this.result);
        if (res instanceof MyPromise) {
          res.then(resolve, reject);
        } else {
          reject(res);
        }
      };
      if (this.isPending()) {
        this.addHandler(handler1, handler2);
      } else {
        setTimeout(() => (resolveHandler ? handler1() : handler2()));
      }
    });
  }

  catch(rejectHandler) {
    return new MyPromise((resolve, reject) => {
      const handler = () => {
        const res = rejectHandler(this.result);
        if (res instanceof MyPromise) {
          res.then(resolve, reject);
        } else {
          reject(res);
        }
      };
      if (this.isPending()) {
        this.addHandler(null, handler);
      } else {
        setTimeout(() => handler());
      }
    });
  }

  addHandler(handler1, handler2) {
    if (handler1) {
      this.resolveHandlers.push(handler1);
    }
    if (handler2) {
      this.rejectHandlers.push(handler2);
    }
  }

  resolve(value) {
    this.state = FULFILLED;
    this.result = value;
    this.resolveHandlers.forEach((handler) => handler(value));
    this.resolveHandlers.length = 0;
  }

  reject(err) {
    this.state = REJECTED;
    this.result = err;
    this.rejectHandlers.forEach((handler) => handler(err));
  }
}
