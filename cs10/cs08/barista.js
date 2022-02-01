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
    this.on("make", (beverage, index) => {
      setImmediate(() => {
        this.makingCount++;
        const regex = /[0-9]+/g;
        const time =
          this.menu[beverage.match(regex).map((e) => +e)[0] - 1].time;
        const name =
          this.menu[beverage.match(regex).map((e) => +e)[0] - 1].name;
        this.startMakingBeverage(index, name);
        this.manager.emit("start");
        this.emit("done", time, index, name);
      });
    });

    this.on("done", (time, index, name) => {
      setTimeout(() => {
        this.makingCount--;
        this.finishMakingBeverage(index, name);
        this.manager.emit("complete", this.makingCount);
      }, time * 1000);
    });
  }

  startMakingBeverage(index, beverage) {
    console.log(`바리스타${index + 1} - ${beverage}시작 ${new Date()}`);
  }

  finishMakingBeverage(index, beverage) {
    console.log(`바리스타${index + 1} - ${beverage}완성 ${new Date()}`);
  }
}

module.exports = { Barista };
