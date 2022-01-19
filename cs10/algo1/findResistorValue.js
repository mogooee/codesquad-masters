const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);

  if (input.length === 3) {
    print(calculateResistorsValue(input[0], input[1], input[2]));
    input.length = 0;
  }
});
rl.on("close", function () {
  process.exit();
});

const resistors = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

const findResistorValue = (resistor) => {
  return resistors.indexOf(resistor);
};

function calculateResistorsValue(resistor1, resistor2, resistor3) {
  return (
    (findResistorValue(resistor1) * 10 + findResistorValue(resistor2)) *
    10 ** findResistorValue(resistor3)
  );
}
