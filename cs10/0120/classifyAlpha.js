const add = (a, b) => a + b;

const reduce = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const makeArray = (number) => {
  return Array.from({ length: number }, (x, i) => i + 1);
};

const factors = (number) => {
  return reduce(
    add,
    0,
    makeArray(number).filter((e) => number % e == 0)
  );
};

module.exports.classifierAlpha = (number) => {
  const result = factors(number) - number;
  return result == number
    ? "perfect"
    : result > number
    ? "abundant"
    : "deficient";
};
