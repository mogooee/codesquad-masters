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
      this.orderQueue,
      this.customer,
      menu,
      this.barista
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
    setImmediate(() => {
      this.manager.on("quit", () => {
        this.close();
      });
    });
  }

  open() {
    this.printOpeningMessage();
    this.rl.on("line", (line) => {
      this.quit = 0;
      const [customer, ...orders] = input(line);
      this.cashier.takeOrder(customer, orders);
    });
    this.manager.checkOrderQueue();
  }

  close() {
    this.quit = 1;
    setTimeout(() => {
      if (this.quit) {
        this.printClosingMessage();
        process.exit();
      }
    }, 3000);
  }

  printOpeningMessage() {
    console.log(
      `\n๐ปโโ๏ธ  Welcome to DOTORI's Cafe  ๐ปโโ๏ธ\n>> ๋ฉ๋ด = 1. ์๋ฉ๋ฆฌ์นด๋ธ(3s) 2. ๋์ฒด๋ผ๋ผ(5s) 3. ๋ฏผํธ์ด์ฝ์นฉํ๋ผํธ์น๋ธ(10s)\n>> ์ฃผ๋ฌธํ  ์๋ฃ๋ฅผ ์๋ ฅํ์ธ์. ์) ์๋ฉ๋ฆฌ์นด๋ธ 2๊ฐ => 1:2\n`
    );
  }

  printClosingMessage() {
    console.log(`\n============ ์์์ ๋ง๊ฐํฉ๋๋ค ============\n`);
  }
}

module.exports = { Cafe };
