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
  }
}

module.exports = { Process };
