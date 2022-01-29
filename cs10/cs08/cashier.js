const EventEmitter = require("events");

class Cashier extends EventEmitter {
  constructor(orderQueue, menu) {
    super();
    this.orderQueue = orderQueue;
    this.menu = menu;
    this.init();
  }

  init() {
    this.on("order", (beverage, count) => {
      setImmediate(() => {
        this.printAlarm(beverage, count);
        for (let i = 0; i < count; i++) {
          this.orderQueue.enQueue(beverage.name);
        }
        this.printOrderQueue();
      });
    });
  }

  takeOrder(index, count) {
    const beverage = this.menu[index - 1];
    this.emit("order", beverage, count);
  }

  printAlarm(beverage, count) {
    console.log(
      `\n🌟새로운 주문이 들어왔습니다.\n☕${beverage.name} ${count}개\n`
    );
  }

  printOrderQueue() {
    console.log(`✔️ OrderQueue: /${this.orderQueue.queue}/\n`);
  }
}

module.exports = { Cashier };
