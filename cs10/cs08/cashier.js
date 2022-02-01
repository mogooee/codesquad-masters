const EventEmitter = require("events");

class Cashier extends EventEmitter {
  constructor(orderQueue, menu) {
    super();
    this.orderQueue = orderQueue;
    this.menu = menu;
    this.init();
  }

  init() {
    this.on("order", (consumer, orders) => {
      setImmediate(() => {
        this.printAlarm();
        orders.forEach((element) => {
          const [index, count] = element
            .trim()
            .split(":")
            .map((e) => +e);
          for (let i = 0; i < count; i++) {
            this.orderQueue.enQueue(consumer + index);
          }
        });
        this.printOrderQueue();
      });
    });
  }

  takeOrder(consumer, orders) {
    this.emit("order", consumer, orders);
  }

  printAlarm() {
    console.log(`\n☕ 새로운 주문이 들어왔습니다.\n`);
  }

  printOrderQueue() {
    console.log(`✔️ OrderQueue: /${this.orderQueue.queue}/\n`);
  }
}

module.exports = { Cashier };
