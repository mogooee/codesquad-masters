const halfAdder = require("./half-adder");
const fullAdder = require("./full-adder");
const byteAdder = require("./byte-adder");
const dec2bin = require("./dec2bin");
const bin2dec = require("./bin2dec");
const dec2hex = require("./dec2hex");

function print() {
  console.log("@@@@@@@@@@@@@@@@ half adder @@@@@@@@@@@@@@@@");
  console.log(halfAdder(false, false));
  console.log(halfAdder(false, true));
  console.log(halfAdder(true, false));
  console.log(halfAdder(true, true));

  console.log("@@@@@@@@@@@@@@@@ full adder @@@@@@@@@@@@@@@@");
  console.log(fullAdder(false, false, true));
  console.log(fullAdder(false, true, true));
  console.log(fullAdder(true, false, true));
  console.log(fullAdder(true, true, true));

  console.log("@@@@@@@@@@@@@@@@ byte adder @@@@@@@@@@@@@@@@");
  console.log(byteAdder([true], [true, false, true]));
  console.log(
    byteAdder(
      [true, true, false, true, true, false, true, false],
      [true, false, true, true, false, false, true, true]
    )
  );
  console.log(
    byteAdder(
      [true, true, false, false, true, false, true, false],
      [true, true, false, true, true, false, false, true]
    )
  );

  console.log("@@@@@@@@@@@@@@@@ dec2bin @@@@@@@@@@@@@@@@");
  console.log(dec2bin(10));
  console.log(dec2bin(173));

  console.log("@@@@@@@@@@@@@@@@ bin2dec @@@@@@@@@@@@@@@@");
  console.log(bin2dec([0, 1, 1, 1]));
  console.log(bin2dec([1, 1, 1, 1, 0, 1, 0, 1]));

  console.log("@@@@@@@@@@@@@@@@ dec2hex @@@@@@@@@@@@@@@@");
  console.log(dec2hex(10, 32));
}

print();
