const EventEmitter = require("events");
const order = new EventEmitter();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">> ",
});

const menu = [
  { name: "아메리카노", time: 3 },
  { name: "돌체라떼", time: 5 },
  { name: "민트초코칩프라푸치노", time: 10 },
];
const waitingList = [];
const makingList = [];

const cashier = {
  takeOrder(input) {
    const [num, count] = input.split(":").map((e) => +e);
    this.addWaitingList(num, count);
  },
  addWaitingList(num, count) {
    const beverage = menu[num - 1].name;
    order.emit("order", beverage, count);
  },
};

const manager = {
  checkWaitingList() {
    return waitingList[0] ? 1 : 0;
  },
  checkMakingList() {
    return makingList.length < 2 ? 1 : 0;
  },
  callBarista() {
    return barista.getMenu(waitingList[0]);
  },
  getCompletion() {
    return console.log(`\n✔️ waitingList: /${makingList}/${waitingList}/\n`);
  },
};

const barista = {
  getMenu(beverage) {
    waitingList.shift();
    makingList.push(beverage);
    return this.startMakingBeverage();
  },
  startMakingBeverage() {
    return order.emit("make", makingList[1] ? makingList[1] : makingList[0]);
  },
  finishMakingBeverage(beverage) {
    const time = menu.find((e) => e.name === beverage).time;
    return order.emit("finish", beverage, time);
  },
};

order.on("order", (beverage, count) => {
  setImmediate(() => {
    console.log(`\n🌟새로운 주문이 들어왔습니다.\n☕${beverage} ${count}개\n`);
    for (let i = 0; i < count; i++) {
      waitingList.push(beverage);
    }
    console.log(`✔️ waitingList: /${makingList}/${waitingList}/\n`);
  });
});

order.on("make", (beverage) => {
  setImmediate(() => {
    console.log(`${beverage}를 만들기 시작합니다. ${new Date()}`);
    barista.finishMakingBeverage(beverage);
  });
});

order.on("finish", (beverage, time) => {
  const making = setTimeout(() => {
    console.log(`${beverage}가 완성되었습니다. ${new Date()}`);
    makingList.splice(makingList.indexOf(beverage), 1);
    manager.getCompletion();
  }, time * 1000);
});

console.log("\n🐻‍❄️  Welcome to DOTORI's Cafe  🐻‍❄️");
console.log(
  ">> 메뉴 = 1. 아메리카노(3s) 2. 돌체라떼(5s) 3. 민트초코칩프라푸치노(10s)"
);
console.log(">> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2\n");

rl.on("line", function (line) {
  cashier.takeOrder(line);
  const checkWL = setInterval(() => {
    manager.checkWaitingList() &&
      manager.checkMakingList() &&
      manager.callBarista();
  }, 1000);
});
rl.on("close", function () {
  process.exit();
});
