const EventEmitter = require("events");

class Barista extends EventEmitter {
  constructor(manager, menu) {
    super();
    this.manager = manager;
    this.makingCount = 0;
    this.menu = menu;
    this.init();
  }

  init() {
    this.on("make", (beverage) => {
      setImmediate(() => {
        this.makingCount++;
        const time = this.menu.find((e) => e.name === beverage).time;
        this.startMakingBeverage(beverage);
        this.emit("done", beverage, time);
      });
    });

    this.on("done", (beverage, time) => {
      setTimeout(() => {
        this.makingCount--;
        this.finishMakingBeverage(beverage);
        this.manager.emit("complete");
      }, time * 1000);
    });
  }

  startMakingBeverage(beverage) {
    console.log(`${beverage}를 만들기 시작합니다. ${new Date()}`);
  }

  finishMakingBeverage(beverage) {
    console.log(`${beverage}가 완성되었습니다. ${new Date()}`);
  }
}

module.exports = { Barista };
