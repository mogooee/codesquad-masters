const readline = require("readline");
const { Queue } = require("./queue");
const { Cashier } = require("./cashier");
const { Manager } = require("./manager");
const { Barista } = require("./barista");
const { menu } = require("./menu");
const { input } = require("./input");

class Cafe {
  constructor(baristaNum) {
    this.orderQueue = new Queue();
    this.cashier = new Cashier(this.orderQueue, menu);
    this.manager = new Manager("_", this.orderQueue);
    this.barista = [];
    this.baristaNum = baristaNum;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ">> ",
    });
    this.init();
  }

  init() {
    for (let i = 0; i < this.baristaNum; i++) {
      this.barista.push(new Barista("_", menu));
      this.barista[i].manager = this.manager;
    }
    this.manager.barista = this.barista;
  }

  open() {
    this.printOpeningMessage();
    this.rl.on("line", (line) => {
      const [consumer, ...orders] = input(line);
      this.cashier.takeOrder(consumer, orders);
    });
    this.manager.checkOrderQueue();
  }

  printOpeningMessage() {
    console.log(
      `\n🐻‍❄️  Welcome to DOTORI's Cafe  🐻‍❄️\n>> 메뉴 = 1. 아메리카노(3s) 2. 돌체라떼(5s) 3. 민트초코칩프라푸치노(10s)\n>> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2\n`
    );
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("How many baristas would you like to set up?", (baristaNum) => {
  console.log(`There are ${baristaNum} baristas.`);
  rl.close();
  const cafe = new Cafe(baristaNum);
  cafe.open();
});
