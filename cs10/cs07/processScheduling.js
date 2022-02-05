const { Process } = require("./process");
const { Queue } = require("./queue");

class ProcessScheduling {
  constructor() {
    this.jobQueue = new Queue();
    this.readyQueue = new Queue();
  }
  makeJobQueue() {
    let id = 65;
    for (let i = 0; i < 3; i++) {
      let randomNum = Math.floor(Math.random() * 10) + 1;
      if (
        this.jobQueue.queue.filter((process) => process.pcb.time === randomNum)
          .length == 0
      ) {
        let process = new Process(String.fromCharCode(id), randomNum);
        this.jobQueue.enqueue(process);
        id++;
      } else i--;
    }
  }
  addReadyQueue() {
    for (let i = 0; i < this.jobQueue.queue.length; i++) {
      this.readyQueue.enqueue(this.jobQueue.queue[i]);
      this.readyQueue.queue[i].pcb.state = "ready";
    }
  }

  emitEvent(process) {
    if (process) return (process.state = "wait");
    for (let i = 0; i < this.readyQueue.queue.length; i++) {
      this.readyQueue.queue[i].pcb.state = "wait";
    }
  }

  dispatch() {
    const process = this.readyQueue.queue[0].pcb;
    process.state = "running";
    process.register++;
  }
  timeout(run) {
    const process = this.readyQueue.queue[0].pcb;
    if (process.register < process.time) {
      this.emitEvent(process);
      return this.readyQueue.enqueue(this.readyQueue.dequeue());
    }
    this.terminate(run);
  }

  terminate(run) {
    const process = this.readyQueue.queue[0].pcb;
    process.state = "terminated";
    this.readyQueue.dequeue();

    if (this.readyQueue.queue.length === 0) this.exit(run);
  }

  exit(run) {
    this.print();
    console.log("\n모든 프로세스가 종료되었습니다.\n");
    clearInterval(run);
  }

  print() {
    let print = "";
    for (let i = 0; i < this.jobQueue.queue.length; i++) {
      let process = this.jobQueue.queue[i].pcb;
      print += `${process.id}(${process.state}), ${process.register} / ${process.time}sec\n`;
    }
    console.log(`${print}.`);
  }
}

module.exports = { ProcessScheduling };
