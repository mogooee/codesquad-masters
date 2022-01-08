const fullAdder = require("./full-adder");

function matchBitLength(A, B) {
  return A.length > B.length
    ? B.concat(new Array(A.length - B.length).fill(false))
    : A.concat(new Array(B.length - A.length).fill(false));
}

function byteAdder(byteA, byteB) {
  var answer = [];

  if (byteA.length !== byteB.length) {
    byteA.length > byteB.length
      ? (byteB = matchBitLength(byteA, byteB))
      : (byteA = matchBitLength(byteA, byteB));
  }

  let cIn = false;

  for (let i = 0; i < byteA.length; i++) {
    const fullAdderResult = fullAdder(byteA[i], byteB[i], cIn);
    const [fullAdderCarry, fullAdderSum] = [
      fullAdderResult[0],
      fullAdderResult[1],
    ];
    cIn = fullAdderCarry;
    answer.push(fullAdderSum);
  }
  answer.push(cIn);

  return answer;
}

module.exports = byteAdder;
