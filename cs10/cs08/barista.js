const EventEmitter = require("events");

class Barista extends EventEmitter {
  constructor(menu) {
    super();
    this.makingCount = 0;
    this.menu = menu;
    this.setEvent();
  }

  setEvent() {
    this.on("make", (beverage, barIndex) => {
      setImmediate(() => {
        const [customerName, beverageIndex, makingBeverage] =
          this.splitBeverageInfo(beverage);
        this.startMakingBeverage(barIndex, customerName, makingBeverage.name);
        this.emit("start");
        this.emit(
          "done",
          barIndex,
          makingBeverage.time,
          makingBeverage.name,
          customerName,
          beverageIndex
        );
      });
    });

    this.on(
      "done",
      (
        barIndex,
        makingBeverageTime,
        makingBeverageName,
        customerName,
        beverageIndex
      ) => {
        setTimeout(() => {
          this.finishMakingBeverage(barIndex, customerName, makingBeverageName);
          this.emit("complete", customerName, beverageIndex);
        }, makingBeverageTime * 1000);
      }
    );
  }

  splitBeverageInfo(beverage) {
    const regex = /[a-z]+|[0-9]+/gi;
    const customerName = beverage.match(regex)[0];
    const beverageIndex = beverage.match(regex).map((e) => +e)[1];
    const makingBeverage = this.menu[beverageIndex - 1];
    return [customerName, beverageIndex, makingBeverage];
  }

  startMakingBeverage(barIndex, customerName, beverageName) {
    this.makingCount++;
    console.log(
      `바리스타${
        barIndex + 1
      } - ${customerName}${beverageName} 시작 ${new Date()}`
    );
  }

  finishMakingBeverage(barIndex, customerName, beverageName) {
    this.makingCount--;
    console.log(
      `바리스타${
        barIndex + 1
      } - ${customerName}${beverageName} 완성 ${new Date()}`
    );
  }
}

module.exports = { Barista };
