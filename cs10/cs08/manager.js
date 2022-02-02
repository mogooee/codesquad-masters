const EventEmitter = require("events");
const makingMax = 2;

class Manager extends EventEmitter {
  constructor(orderQueue, customer, menu, barista) {
    super();
    this.orderQueue = orderQueue;
    this.customer = customer;
    this.menu = menu;
    this.barista = barista;
    this.setEvent();
  }

  setEvent() {
    for (let i = 0; i < this.barista.length; i++) {
      this.barista[i].on("start", () => {
        setImmediate(() => {
          this.printOrderQueue();
        });
      });

      this.barista[i].on("complete", (customerName, beverageIndex) => {
        setImmediate(() => {
          this.checkCustomer(customerName, beverageIndex);
          this.getCompletion();
        });
      });
    }
  }

  checkOrderQueue() {
    setInterval(() => {
      let barIndex = this.changeBarista();
      if (this.orderQueue.queue[0]) {
        if (this.barista[barIndex].makingCount < makingMax)
          this.callBarista(barIndex);
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

  callBarista(barIndex) {
    this.barista[barIndex].emit("make", this.orderQueue.deQueue(), barIndex);
  }

  getCompletion() {
    for (let i = 0; i < this.barista.length; i++) {
      if (this.barista[i].makingCount > 0) return;
    }
    if (this.orderQueue.queue.length === 0) {
      console.log("\n🌟 모든 메뉴가 완성되었습니다.\n");
      this.emit("quit");
    }
  }

  checkCustomer(customerName, beverageIndex) {
    const nowCustomer = this.customer.find((e) => e.customer === customerName);
    nowCustomer.orders[beverageIndex]--;
    for (let i = 1; i < nowCustomer.orders.length; i++) {
      if (nowCustomer.orders[i] > 0) return;
    }
    const completedOrder = nowCustomer.orders[0].map(
      (e) =>
        `${this.menu[e.trim().split(":")[0] - 1].name}*${
          e.trim().split(":")[1]
        }잔`
    );
    console.log(
      `\n============ ${customerName} 고객님 주문 완성: ${completedOrder}\n`
    );
  }

  printOrderQueue() {
    console.log(`\n✔️ OrderQueue: /${this.orderQueue.queue}/\n`);
  }
}

module.exports = { Manager };
