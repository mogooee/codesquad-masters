//TODO: 이상한 문자 만들기
/*
- input: 한 개 이상의 단어
- output: 각 단어(문자열 전체x)의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열

[v] 입력받은 문자열을 공백을 기준으로 단어별로 분리하여 배열에 담는다.
[v] 단어별로 알파벳으로 다시 분리한다.
[v] map을 이용해 알파벳을 순회하고 짝수 인덱스는 toUpperCase, 홀수 인덱스는 toLowerCase를 사용하여 변환한다.
[v] 변환을 마친 단어는 join으로 한 단어로 만든다.
[v] 처음에 나누어줬던 공백을 다시 단어 사이에 넣어 리턴한다. 
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
