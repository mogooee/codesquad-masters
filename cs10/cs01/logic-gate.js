module.exports.AND = function AND(a, b) {
  return a && b;
};

module.exports.OR = function (a, b) {
  return a || b;
};

module.exports.NAND = function (a, b) {
  return !(a && b);
};

module.exports.NOR = function (a, b) {
  return !(a || b);
};

module.exports.XOR = function (a, b) {
  return a !== b;
};
