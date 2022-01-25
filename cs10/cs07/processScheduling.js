let jobQueue = [
  { process: "A", time: 3 },
  { process: "B", time: 5 },
  { process: "C", time: 7 },
  { process: "D", time: 10 },
  { process: "E", time: 15 },
];

class ProcessScheduling {
  constructor() {
    this.readyQueue = [];
    this.state = [];
    this.endCount = 0;
  }
  jobScheduling() {
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * jobQueue.length);
      if (!this.state.find((e) => e.time === jobQueue[randomNum].time)) {
        jobQueue[randomNum].state = "ready";
        jobQueue[randomNum].count = 0;
        this.readyQueue.push(jobQueue[randomNum].process);
        this.state.push(jobQueue[randomNum]);
      } else i--;
    }
    return this.print();
  }
  waitProcess() {
    return this.state.map((e) => (e.state = "wait"));
  }
  runProcess() {
    const running = this.state.find((e) => e.process === this.readyQueue[0]);
    running.state = "running";
    running.count++;
  }
  changeState() {
    const running = this.state.find((e) => e.process === this.readyQueue[0]);
    if (running.count === running.time) {
      running.state = "terminated";
      this.endCount++;
    } else {
      running.state = "wait";
      const temp = this.readyQueue[0];
      this.readyQueue.push(temp);
    }
    return this.readyQueue.shift();
  }
  isTerminated() {
    if (this.endCount === 3) {
      console.log("\n모든 프로세스가 종료되었습니다.\n");
      return clearInterval(run);
    }
  }
  print() {
    return console.log(
      this.state.reduce((acc, cur) => {
        return (acc += `${cur.process}(${cur.state}), ${cur.count} / ${cur.time}sec\n`);
      }, "")
    );
  }
}

const processScheduling = new ProcessScheduling();
processScheduling.jobScheduling();
console.log(".\n");

const run = setInterval(function (i) {
  if (i) {
    processScheduling.waitProcess();
    processScheduling.runProcess();
    i = 0;
  } else {
    processScheduling.runProcess();
    processScheduling.changeState();
  }
  processScheduling.print();
  processScheduling.isTerminated();
  console.log(".\n");
}, 1000);