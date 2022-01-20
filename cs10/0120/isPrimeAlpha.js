const equalSet = (factors, prime) => {
  return JSON.stringify(factors) === JSON.stringify(prime);
};

const makeArray = (number) => {
  return Array.from(Array(number), (x, i) => i + 1);
};

const factors = (number) => {
  return makeArray(number).filter((e) => number % e == 0);
};

module.exports.isPrime = (number) => {
  return number > 1 && equalSet(factors(number), [1, number]);
};
