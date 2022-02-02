function dec2bin(decimal) {
  var answer = [];
  while (decimal > 0) {
    answer.push(decimal % 2);
    decimal = parseInt(decimal / 2);
  }
  return answer;
}

module.exports = dec2bin;
