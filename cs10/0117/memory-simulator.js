class Memory {
  constructor() {
    this.stack = [];
    this.heap = [];
    this.size = [];
    this.sp = 0;
    this.heapAddress = 0;
    this.callStk = [];
  }
  init(stackSize, heapSize) {
    this.stack.length = stackSize;
    this.heap.length = heapSize;
    return this.returnAddress("basic");
  }
  setSize(type, length) {
    this.size.push({ type, length });
  }
  malloc(type, count) {
    let padding = 0;
    let heapAdd = [];
    const obj = this.size.find((obj) => obj.type === type);

    if (obj.length < 8) padding = 8 - obj.length;

    for (let i = 0; i < count; i++, this.heapAddress++, this.sp++) {
      this.heap[this.heapAddress] = {
        memory: `${obj.length + padding}byte`,
        connect: 1,
      };
      this.stack[this.sp] = { type, heapAddress: this.heapAddress };
      heapAdd.push(this.heapAddress);
    }
    return this.returnAddress(heapAdd);
  }
  free(pointer) {
    const obj = this.stack.find((obj) => obj.heapAddress === pointer);
    obj.heapAddress = null;
    this.heap[pointer] = null;
    return this.returnAddress(pointer);
  }
  call(name, paramCount) {
    this.stack[this.sp] = { type: "func", name };
    this.sp++;
    this.callStk.push(name);

    for (let i = 0; i < paramCount; i++, this.sp++, this.heapAddress++) {
      this.stack[this.sp] = { type: "pointer", heapAddress: this.heapAddress };
      this.heap[this.heapAddress] = { memory: "4byte", connect: 1 };
    }
  }
  callStack() {
    return this.callStk;
  }
  returnFrom(name) {
    let breakPoint;
    for (let i = this.sp - 1; i >= 0; i--, this.sp--) {
      if (breakPoint) break;
      if (this.stack[i].name === name) {
        breakPoint = 1;
      }
      if (this.heap[this.stack[i].heapAddress])
        this.heap[this.stack[i].heapAddress].connect = 0;
      this.stack[i] = null;
    }
  }
  garbageCollect() {
    for (let i = 0; i < this.heap.length; i++) {
      if (this.heap[i] && this.heap[i].connect === 0) this.heap[i] = null;
    }
  }
  returnAddress(address) {
    if (address === "basic") return [0, 0];
    return address;
  }
}

function test() {
  const memory = new Memory();
  console.log(memory.init(20, 20));
  memory.setSize("boolean", 1);
  memory.setSize("num", 8);
  memory.setSize("str", 16);

  console.log(memory.size);

  console.log(memory.malloc("boolean", 4));
  console.log(memory.free(1));

  memory.call("foo", 2);
  console.log(memory.malloc("num", 1));
  console.log(memory.callStack());

  memory.returnFrom("foo");
  memory.garbageCollect();
}

test();
