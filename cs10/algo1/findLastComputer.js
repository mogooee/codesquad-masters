const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let t = -1;
let count = 0;

rl.on("line", (line) => {
  if (t < 0) {
    t = parseInt(line);
  } else {
    count++;
    let [base, exponent] = line.split(" ").map((el) => Number(el));
    console.log(findLastComputer(base, exponent));
    if (count === t) {
      rl.close();
    }
  }
});

const lastComputers = [
  [10],
  [1],
  [2, 4, 8, 6],
  [3, 9, 7, 1],
  [4, 6],
  [5],
  [6],
  [7, 9, 3, 1],
  [8, 4, 2, 6],
  [9, 1],
];

function findLastComputer(base, exponent) {
  const i = base % 10;
  const remainders = lastComputers[i];

  if (remainders.length === 1) return remainders[0];

  let remainderIndex = (exponent % remainders.length) - 1;

  if (remainderIndex < 0) remainderIndex = remainders.length - 1;
  return remainders[remainderIndex];
}
