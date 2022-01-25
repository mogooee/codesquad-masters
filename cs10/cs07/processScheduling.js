const jobQueue = [
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
      if (!this.state.find((e) => e === jobQueue[randomNum])) {
        jobQueue[randomNum].state = "ready";
        jobQueue[randomNum].count = 0;
        this.readyQueue.push(jobQueue[randomNum].process);
        this.state.push(jobQueue[randomNum]);
      } else i--;
    }
  }
  timeout() {
    if (this.state.filter((e) => e.count === 0).length === 3) {
      this.state.map((e) => (e.state = "wait"));
      return;
    }
    const beforeRunning = this.state.find(
      (e) => e.process === this.readyQueue[this.readyQueue.length - 1]
    );
    beforeRunning.state = "wait";
  }
  dispatch() {
    const running = this.state.find((e) => e.process === this.readyQueue[0]);
    running.state = "running";
    running.count++;
  }
  terminate() {
    const running = this.state.find((e) => e.process === this.readyQueue[0]);
    if (running.count === running.time) {
      running.state = "terminated";
      this.endCount++;
    }
  }
  changeReadyQueue() {
    const running = this.state.find((e) => e.process === this.readyQueue[0]);
    if (running.count !== running.time) {
      const temp = this.readyQueue[0];
      this.readyQueue.push(temp);
    }
    this.readyQueue.shift();
  }
  exit() {
    if (this.endCount === 3) {
      this.print();
      console.log("\n모든 프로세스가 종료되었습니다.\n");
      return 1;
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

(function (i) {
  const run = setInterval(function () {
    if (i) {
      processScheduling.jobScheduling();
      i = 0;
    } else {
      processScheduling.timeout();
      processScheduling.dispatch();
      processScheduling.terminate();
      processScheduling.changeReadyQueue();
      if (processScheduling.exit()) return clearInterval(run);
    }
    processScheduling.print();
    console.log(".\n");
  }, 50);
})(1);
