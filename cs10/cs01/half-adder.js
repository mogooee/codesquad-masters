const logicGate = require("./logic-gate");

function halfAdder(bitA, bitB) {
  const halfAdderCarry = logicGate.AND(bitA, bitB);
  const halfAdderSum = logicGate.XOR(bitA, bitB);
  return [halfAdderCarry, halfAdderSum];
}

module.exports = halfAdder;
