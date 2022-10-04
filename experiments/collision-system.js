import PriorityQueue from "../structures/priority-queue.js";

// https://introcs.cs.princeton.edu/java/assignments/collisions.html
export class CollisionSystem {
  constructor(n) {
    this.pq = new PriorityQueue(false);
    this.t = 0;
    this.particles = [];
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle());
    }

    // initialize pq with collision events
    for (const a of this.particles) {
      this.predict(a);
    }
  }

  predict(a) {
    if (!a) return;

    // particle-particle collisions
    for (const b of this.particles) {
      const dt = a.timeToHit(b);
      this.pq.insert(new Event(this.t + dt, a, b));
    }

    // particle-wall collisions
    const dtx = a.timeToHitVerticalWall();
    const dty = a.timeToHitHorizontalWall();
    this.pq.insert(new Event(this.t + dtx, a, null));
    this.pq.insert(new Event(this.t + dty, null, a));
  }

  simulate() {
    while (!this.pq.isEmpty()) {
      const e = this.pq.delete();
      if (!e.isValid()) continue;

      console.log("time", e.time);

      // update positions
      const dt = e.time - this.t;
      for (const particle of this.particles) {
        particle.move(dt);
      }
      // update current time
      this.t = e.time;

      // update particles on collision event
      const a = e.a;
      const b = e.b;
      if (a !== null && b !== null) a.bounceOff(b);
      if (a !== null && b === null) a.bounceOffVerticalWall();
      if (a === null && b !== null) b.bounceOffHorizontalWall();

      // update pq with collisions involving a or b
      this.predict(a);
      this.predict(b);
    }
  }

  static run() {
    const system = new CollisionSystem(10);
    system.simulate();
  }
}

class Event {
  constructor(time, a, b) {
    this.time = time;
    this.a = a;
    this.b = b;
    this.countA = this.a === null ? -1 : a.count;
    this.countB = this.b === null ? -1 : b.count;
  }

  compare(that) {
    return this.time - that.time;
  }

  isValid() {
    if (this.a !== null && this.a.count !== this.countA) return false;
    if (this.b !== null && this.b.count !== this.countB) return false;
    return true;
  }
}

class Particle {
  constructor() {
    this.rx = Math.random(); // position x
    this.ry = Math.random(); // position y
    this.vx = Math.random() * 0.01 - 0.005; // [-0.005, 0.005]
    this.vy = Math.random() * 0.01 - 0.005; // [-0.005, 0.005]
    this.radius = 0.02;
    this.mass = 0.5;
    this.count = 0; // number of collisions so far
  }

  move(dt) {
    this.rx += this.vx * dt;
    this.ry += this.vy * dt;
  }

  timeToHit(that) {
    if (this === that) return Infinity;
    const dx = that.rx - this.rx;
    const dy = that.ry - this.ry;
    const dvx = that.vx - this.vx;
    const dvy = that.vy - this.vy;
    const dvdr = dx * dvx + dy * dvy;
    if (dvdr > 0) return Infinity;
    const dvdv = dvx * dvx + dvy * dvy;
    if (dvdv === 0) return Infinity;
    const drdr = dx * dx + dy * dy;
    const sigma = this.radius + that.radius;
    const d = dvdr * dvdr - dvdv * (drdr - sigma * sigma);
    if (d < 0) return Infinity;
    return -(dvdr + Math.sqrt(d)) / dvdv;
  }

  timeToHitVerticalWall() {
    if (this.vx > 0) return (1 - this.rx - this.radius) / this.vx;
    else if (this.vx < 0) return (this.radius - this.rx) / this.vx;
    else return Infinity;
  }

  timeToHitHorizontalWall() {
    if (this.vy > 0) return (1 - this.ry - this.radius) / this.vy;
    else if (this.vy < 0) return (this.radius - this.ry) / this.vy;
    else return Infinity;
  }

  bounceOff(that) {
    const dx = that.rx - this.rx;
    const dy = that.ry - this.ry;
    const dvx = that.vx - this.vx;
    const dvy = that.vy - this.vy;
    const dvdr = dx * dvx + dy * dvy;
    const dist = this.radius + that.radius;
    // magnitude of normal force
    const magnitude =
      (2 * this.mass * that.mass * dvdr) / ((this.mass + that.mass) * dist);
    // normal force
    const fx = (magnitude * dx) / dist;
    const fy = (magnitude * dy) / dist;
    // update velocities according to normal force
    this.vx += fx / this.mass;
    this.vy += fy / this.mass;
    that.vx -= fx / that.mass;
    that.vy -= fy / that.mass;
    // update collision counts
    this.count++;
    that.count++;
  }

  bounceOffVerticalWall() {
    this.vx = -this.vx;
    this.count++;
  }

  bounceOffHorizontalWall() {
    this.vy = -this.vy;
    this.count++;
  }
}
