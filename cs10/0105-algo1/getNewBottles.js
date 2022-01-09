const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let [bottles, finalBottles] = line.split(" ").map((el) => Number(el));
  console.log(getNewBottles(bottles, finalBottles));
});
rl.on("close", function () {
  process.exit();
});

function getNewBottles(bottles, finalBottles) {
  let answer = 0;

  while (checkSumBottles(bottles.toString(2)) > finalBottles) {
    let index =
      bottles.toString(2).length - 1 - bottles.toString(2).lastIndexOf(1);
    answer += 2 ** index;
    bottles += 2 ** index;
  }
  return answer;
}

function checkSumBottles(bin) {
  let cnt = 0;
  for (let i = 0; i < bin.length; i++) {
    if (bin[i] == 1) cnt++;
  }
  return cnt;
}
