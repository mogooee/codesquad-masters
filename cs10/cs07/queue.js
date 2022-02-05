class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(item) {
    return this.queue.push(item);
  }
  dequeue() {
    return this.queue.shift();
  }
}

module.exports = { Queue };
