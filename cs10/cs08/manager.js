const EventEmitter = require("events");

class Manager extends EventEmitter {
  constructor(barista, orderQueue) {
    super();
    this.barista = barista;
    this.orderQueue = orderQueue;
    this.index = 0;
    this.init();
  }

  init() {
    this.on("complete", () => {
      setImmediate(() => {
        this.getCompletion();
      });
    });
    this.on("start", () => {
      setImmediate(() => {
        this.printOrderQueue();
      });
    });
  }

  checkOrderQueue() {
    setInterval(() => {
      let index = this.changeBarista();
      if (this.orderQueue.queue[0]) {
        if (this.barista[index].makingCount < 2) this.callBarista(index);
      }
    }, 1000);
  }

  changeBarista() {
    let min = this.barista[0].makingCount;
    let minIndex = 0;

    for (let i = 1; i < this.barista.length; i++) {
      if (min > this.barista[i].makingCount) {
        min = this.barista[i].makingCount;
        minIndex = i;
      }
    }
    return minIndex;
  }

  callBarista(index) {
    this.barista[index].emit("make", this.orderQueue.deQueue(), index);
  }

  getCompletion() {
    for (let i = 0; i < this.barista.length; i++) {
      if (this.barista[i].makingCount > 0) return;
    }
    if (this.orderQueue.queue.length === 0) {
      console.log("\n😆 모든 메뉴가 완성되었습니다.\n");
    }
  }

  printOrderQueue() {
    console.log(`\n✔️ OrderQueue: /${this.orderQueue.queue}/\n`);
  }
}

module.exports = { Manager };
