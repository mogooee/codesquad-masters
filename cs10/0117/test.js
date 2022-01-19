const Memory = require("./memory-simulator.js");

function test() {
  const memory = new Memory();

  console.log(memory.init(14, 15));

  memory.setSize("boolean", 1);
  memory.setSize("num", 8);
  memory.setSize("str", 16);
  console.log(memory.size);

  console.log(memory.malloc("boolean", 4));
  console.log(memory.free(1));

  memory.call("foo", 2);

  console.log(memory.malloc("num", 1));
  console.log(memory.callStack());

  console.log(memory.usage());
  console.log(memory.heapDump());

  memory.returnFrom("foo");
  memory.garbageCollect();
}

test();
