const EventEmitter = require("events");

class Manager extends EventEmitter {
  constructor(barista, orderQueue) {
    super();
    this.barista = barista;
    this.orderQueue = orderQueue;
    this.init();
  }

  init() {
    this.on("complete", () => {
      setImmediate(() => {
        this.getCompletion();
      });
    });
  }

  checkOrderQueue() {
    setInterval(() => {
      if (this.orderQueue.queue[0] && this.barista.makingCount < 2)
        this.callBarista();
    }, 1000);
  }

  callBarista() {
    this.barista.emit("make", this.orderQueue.deQueue());
  }

  getCompletion() {
    if (this.orderQueue.queue.length === 0 && this.barista.makingCount === 0) {
      console.log("\n😆 모든 메뉴가 완성되었습니다.\n");
      return;
    }
    return this.printOrderQueue();
  }

  printOrderQueue() {
    console.log(`\n✔️ OrderQueue: /${this.orderQueue.queue}/\n`);
  }
}

module.exports = { Manager };
