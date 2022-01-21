const classifierAlpha = require("./classifierAlpha");

const primeChecker = require("./primeChecker");

const isSquare = (number) => {
  return (
    Number.isInteger(Math.sqrt(number)) && Math.sqrt(number) ** 2 === number
  );
};

const print = (end) => {
  return Array.from({ length: end }, (x, i) => i + 2).reduce((acc, cur) => {
    return (acc += `${cur} : ${classifierAlpha.classifyAlpha(cur)}${
      primeChecker.isPrime(cur) ? ", prime" : isSquare(cur) ? ", squared" : ""
    }\n`);
  }, "");
};

console.log(print(99));

// 재귀 활용
// const print = (number) => {
//   return function recursive(number) {
//     console.log(
//       `${number} : ${Alpha.classifierAlpha(number)}${
//         prime.isPrime(number) ? ", prime" : isSquare(number) ? ", squared" : ""
//       }`
//     );
//     return number < 100 && recursive(number + 1);
//   };
// };
// const closure = print(2);
// closure(2);
