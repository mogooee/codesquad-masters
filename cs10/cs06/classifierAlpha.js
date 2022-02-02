const makeArray = (number) => {
  return Array.from({ length: number }, (x, i) => i + 1);
};

const factors = (number) => {
  return makeArray(number)
    .filter((e) => number % e == 0)
    .reduce((acc, cur) => {
      return acc + cur;
    });
};

module.exports.classifyAlpha = (number) => {
  const result = factors(number) - number;
  return result == number
    ? "perfect"
    : result > number
    ? "abundant"
    : "deficient";
};
