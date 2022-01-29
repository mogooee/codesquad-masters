const readline = require("readline");
const { Queue } = require("./queue");
const { Cashier } = require("./cashier");
const { Manager } = require("./manager");
const { Barista } = require("./barista");
const { menu } = require("./menu");
const { input } = require("./input");

class Cafe {
  constructor() {
    this.orderQueue = new Queue();
    this.cashier = new Cashier(this.orderQueue, menu);
    this.manager = new Manager("_", this.orderQueue);
    this.barista = new Barista("_", menu);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ">> ",
    });
    this.init();
  }

  init() {
    this.manager.barista = this.barista;
    this.barista.manager = this.manager;
  }

  open() {
    this.printOpeningMessage();
    this.rl.on("line", (line) => {
      const [index, count] = input(line);
      this.cashier.takeOrder(index, count);
    });
    this.manager.checkOrderQueue();
  }

  printOpeningMessage() {
    console.log(
      `\n🐻‍❄️  Welcome to DOTORI's Cafe  🐻‍❄️\n>> 메뉴 = 1. 아메리카노(3s) 2. 돌체라떼(5s) 3. 민트초코칩프라푸치노(10s)\n>> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2\n`
    );
  }
}

const cafe = new Cafe();
cafe.open();
