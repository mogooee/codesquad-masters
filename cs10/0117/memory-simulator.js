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
        type,
        memory: `${obj.length + padding}byte`,
        stackPointer: this.sp,
      };
      this.stack[this.sp] = { heapAddress: this.heapAddress };
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

    for (let i = 0; i < paramCount; i++, this.sp++) {
      this.stack[this.sp] = { type: "pointer", size: "4byte" };
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
        this.heap[this.stack[i].heapAddress].stackPointer = null;
      this.stack[i] = null;
    }
  }
  garbageCollect() {
    for (let i = 0; i < this.heap.length; i++) {
      if (this.heap[i] && this.heap[i].stackPointer === null)
        this.heap[i] = null;
    }
  }
  usage() {
    const heapSize = this.heap.filter((e) => e !== null).length;
    return `스택 영역 전체크기: ${this.stack.length}, 사용중인 용량: ${
      this.sp
    }, 남은 용량: ${this.stack.length - this.sp},
  힙 영역전체크기: ${this.heap.length}, 사용중인 용량: ${heapSize}, 남은 용량:${
      this.heap.length - heapSize
    }`;
  }
  heapDump() {
    return this.heap;
  }
  returnAddress(address) {
    if (address === "basic") return [0, 0];
    return address;
  }
}

module.exports = Memory;
