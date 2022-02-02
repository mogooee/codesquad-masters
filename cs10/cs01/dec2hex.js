const byteAdder = require("./byte-adder");
const dec2bin = require("./dec2bin");
const bin2dec = require("./bin2dec");

const binTF = (bin) => bin.map((e) => (e ? true : false));

function dec2hex(decA, decB) {
  let answer = [];
  const hex = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };
  const bin = byteAdder(binTF(dec2bin(decA)), binTF(dec2bin(decB)));

  while (bin.length > 0) {
    const sum = bin2dec(bin.splice(0, 4));
    answer.push(sum > 9 ? hex[sum] : sum);
  }

  return answer.reverse();
}

module.exports = dec2hex;
