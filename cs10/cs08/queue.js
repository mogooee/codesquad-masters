class Queue {
  constructor() {
    this.queue = [];
  }

  enQueue(item) {
    return this.queue.push(item);
  }

  deQueue() {
    return this.queue.shift();
  }
}

module.exports = { Queue };
