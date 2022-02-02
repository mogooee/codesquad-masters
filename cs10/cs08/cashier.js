const EventEmitter = require("events");

class Cashier extends EventEmitter {
  constructor(orderQueue, customer) {
    super();
    this.orderQueue = orderQueue;
    this.customer = customer;
    this.setEvent();
  }

  setEvent() {
    this.on("order", (customer, orders) => {
      setImmediate(() => {
        this.printAlarm();
        this.customer.push({ customer });
        const nowCustomer = this.customer.find((e) => e.customer === customer);
        nowCustomer.orders = [orders];
        this.addOrderQueue(orders, nowCustomer);
        this.printOrderQueue();
      });
    });
  }

  takeOrder(consumer, orders) {
    this.emit("order", consumer, orders);
  }

  addOrderQueue(orders, nowCustomer) {
    orders.forEach((element) => {
      const [index, count] = element
        .trim()
        .split(":")
        .map((e) => +e);
      for (let i = 0; i < count; i++) {
        this.orderQueue.enQueue(nowCustomer.customer + index);
        nowCustomer.orders[index] = count;
      }
    });
  }

  printAlarm() {
    console.log(`\n☕ 새로운 주문이 들어왔습니다.\n`);
  }

  printOrderQueue() {
    console.log(`✔️ OrderQueue: /${this.orderQueue.queue}/\n`);
  }
}

module.exports = { Cashier };
