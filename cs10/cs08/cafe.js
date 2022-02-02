const readline = require("readline");
const EventEmitter = require("events");
const { Queue } = require("./queue");
const { Cashier } = require("./cashier");
const { Manager } = require("./manager");
const { Barista } = require("./barista");
const { menu } = require("./menu");
const { input } = require("./input");

class Cafe extends EventEmitter {
  constructor(baristaNum) {
    super();
    this.customer = [];
    this.barista = [];
    this.baristaNum = baristaNum;
    this.setBarista();
    this.orderQueue = new Queue();
    this.cashier = new Cashier(this.orderQueue, this.customer);
    this.manager = new Manager(
      this.barista,
      this.orderQueue,
      menu,
      this.customer,
      this.baristaNum
    );
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ">> ",
    });
    this.setEvent();
  }

  setBarista() {
    for (let i = 0; i < this.baristaNum; i++) {
      this.barista.push(new Barista(menu));
    }
  }

  setEvent() {
    this.manager.on("quit", () => {
      this.close();
    });
  }

  open() {
    this.printOpeningMessage();
    this.rl
      .on("line", (line) => {
        this.quit = 0;
        const [customer, ...orders] = input(line);
        this.cashier.takeOrder(customer, orders);
      })
      .on("close", () => {
        process.exit();
      });
    this.manager.checkOrderQueue();
  }

  close() {
    this.quit = 1;
    setTimeout(() => {
      if (this.quit) {
        this.printClosingMessage();
        this.rl.close();
      }
    }, 3000);
  }

  printOpeningMessage() {
    console.log(
      `\n🐻‍❄️  Welcome to DOTORI's Cafe  🐻‍❄️\n>> 메뉴 = 1. 아메리카노(3s) 2. 돌체라떼(5s) 3. 민트초코칩프라푸치노(10s)\n>> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2\n`
    );
  }

  printClosingMessage() {
    console.log(`\n============ 영업을 마감합니다 ============\n`);
  }
}

module.exports = { Cafe };
