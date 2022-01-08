const logicGate = require("./logic-gate");
const halfAdder = require("./half-adder");

function fullAdder(bitA, bitB, cIn) {
  const firstHalfAdderResult = halfAdder(bitA, bitB);
  const [firstHalfAdderCarry, firstHalfAdderSum] = [
    firstHalfAdderResult[0],
    firstHalfAdderResult[1],
  ];

  const secondHalfAdderResult = halfAdder(firstHalfAdderSum, cIn);
  const [secondHalfAdderCarry, secondHalfAdderSum] = [
    secondHalfAdderResult[0],
    secondHalfAdderResult[1],
  ];

  const fullAdderSum = secondHalfAdderSum;
  const fullAdderCarry = logicGate.OR(
    firstHalfAdderCarry,
    secondHalfAdderCarry
  );
  return [fullAdderCarry, fullAdderSum];
}

module.exports = fullAdder;
