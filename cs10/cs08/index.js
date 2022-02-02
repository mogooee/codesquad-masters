const readline = require("readline");
const { Cafe } = require("./cafe");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\nHow many baristas would you like to set up? ", (baristaNum) => {
  console.log(`There are ${baristaNum} baristas.`);
  rl.close();
  const cafe = new Cafe(baristaNum);
  cafe.open();
});
