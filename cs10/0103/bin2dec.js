function bin2dec(bin) {
  let answer = 0;
  for (let i = 0; i < bin.length; i++) {
    answer += bin[i] * 2 ** i;
  }
  return answer;
}

module.exports = bin2dec;
