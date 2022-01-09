const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let [num1, num2] = line.split(" ");
  console.log(sumBigNum(num1, num2));
});
rl.on("close", function () {
  process.exit();
});

function sumBigNum(num1, num2) {
  let carry = 0;
  let answer = [];

  num1 = num1.split("").reverse();
  num2 = num2.split("").reverse();

  if (num1.length !== num2.length)
    num1.length > num2.length
      ? (num2 = num2.concat(new Array(num1.length - num2.length).fill(0)))
      : (num1 = num1.concat(new Array(num2.length - num1.length).fill(0)));

  for (let i = 0; i < num1.length; i++) {
    let sum = Number(num1[i]) + Number(num2[i]) + carry;

    if (sum > 9) {
      carry = 1;
      answer.push(sum % 10);
    } else {
      carry = 0;
      answer.push(sum);
    }
  }
  if (carry) answer.push(carry);

  return answer.reverse().join("");
}
