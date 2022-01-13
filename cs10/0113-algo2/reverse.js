const reverse = (x) => {
  let answer = [];
  let negative;
  const MIN_VALUE = (-2) ** 31;
  const MAX_VALUE = 2 ** 31 - 1;
  if (x < 0) {
    x = x * -1;
    negative = 1;
  }
  while (x > 0) {
    const units = x % 10;
    answer.push(units);
    x = parseInt(x / 10);
  }

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === 0) answer[i] = "";
    else break;
  }

  if (negative) answer.unshift("-");
  answer = Number(answer.join(""));

  return answer > MIN_VALUE && answer < MAX_VALUE ? answer : 0;
};
