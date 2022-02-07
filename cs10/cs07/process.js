const workerThread = require("worker_threads");
const Worker = workerThread.Worker;

class PCB {
  constructor(id, time) {
    this.id = id;
    this.time = time;
    this.state = "new";
    this.register = 0;
  }
}

class Process {
  constructor(id, time) {
    this.pcb = new PCB(id, time);
    this.threads;
    this.init();
  }
  init() {
    this.makeThreads();
    this.setEventToWorkThreads();
  }
  makeThreads() {
    this.threads = new Set();

    for (let i = 0; i < 2; i++) {
      this.threads.add(new Worker("./worker.js"));
    }
  }

  setEventToWorkThreads() {
    // Woker가 들어있는 set을 순회하여 각 Worker에 이벤트를 등록

    for (let worker of this.threads) {
      worker.on("message", (msg) => {
        setImmediate(() => {
          this.pcb.register += msg;
        });
        //if (this.pcb.register < this.pcb.time)
      });
    }
  }
}
module.exports = { Process, workerThread, Worker };
