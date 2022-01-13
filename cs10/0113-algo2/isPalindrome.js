/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const array = x.toString().split("");
  return array.join("") === array.reverse().join("") ? true : false;
};
