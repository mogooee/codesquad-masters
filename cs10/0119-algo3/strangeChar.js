//TODO: 이상한 문자 만들기
/*
- input: 한 개 이상의 단어
- output: 각 단어(문자열 전체x)의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열

[v] 입력받은 문자열을 공백을 기준으로 단어별로 분리하여 배열에 담는다.
[v] 이중포문을 순회하며 단어별로 짝수 인덱스는 replace, toUpperCase을 사용하여 대문자로 변환한다.
[v] 변환을 마친 단어는 join으로 단어 사이에 공백을 붙여 리턴한다.
*/

function solution(s) {
  let word = s.split(" ");
  let answer = [];

  for (let i = 0; i < word.length; i++) {
    answer.push(
      word[i]
        .split("")
        .map((e, i) => (i % 2 ? e.toLowerCase() : e.toUpperCase()))
        .join("")
    );
  }

  return answer.join(" ");
}

// console.log(solution("a  Aaaa a a    aA "));
