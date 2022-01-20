const Alpha = require("./classifyAlpha");

const prime = require("./isPrimeAlpha");

const isSquare = (number) => {
  return (
    Number.isInteger(Math.sqrt(number)) && Math.sqrt(number) ** 2 === number
  );
};

const print = (end) => {
  return Array.from({ length: end }, (x, i) => i + 1).reduce((acc, cur, i) => {
    console.log(
      `${cur} : ${Alpha.classifyAlpha(cur)}${
        prime.isPrime(cur) ? ", prime" : isSquare(cur) ? ", squared" : ""
      }`
    );
  });
};

print(100);
