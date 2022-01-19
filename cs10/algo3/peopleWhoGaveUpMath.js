//TODO: 수포자 삼인방 중 가장 높은 점수를 받는 사람을 출력한다.
/*
- input: 세명 모두 무한히 반복되는 답(배열)을 갖는다. 
- output: 가장 높은 점수를 받는 사람이 여럿일 경우 오름차순 정렬한다.

[v] 세명에게 각각 반복되는 원소를 배열로 만들어 저장한다.
[v] answer의 길이만큼 채점하므로 저장된 배열보다 answer의 길이가 길다면 
   0부터 answer의 길이까지 증가하는 숫자를 배열의 길이로 나눈 나머지가 다음으로 채점해야할 답이다. 
   ex) 5번씩 반복되는 숫자를 8번 나열하려면 0,1,2,3,4,0,1,2 의 인덱스가 출력되야 하므로
   0부터 8까지 증가하는 i를 5로 나눈 나머지로 인덱스를 구할 수 있다.    
[v] 정답을 처음 맞추면 score의 값이 1이고 이후부터 1씩 증가한다.
[V] Math.max(...score)로 최고점수를 찾는다.
[v] 최고점과 같은 점수인 인덱스를 answer에 저장하고 리턴한다.   

*/

const person1 = [1, 2, 3, 4, 5];
const person2 = [2, 1, 2, 3, 2, 4, 2, 5];
const person3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

function solution(answers) {
  let score = [0, 0, 0];
  let answer = [];

  for (let i = 0; i < answers.length; i++) {
    if (person1[i % person1.length] === answers[i]) score[0]++;
    if (person2[i % person2.length] === answers[i]) score[1]++;
    if (person3[i % person3.length] === answers[i]) score[2]++;
  }

  const max = Math.max(...score);

  if (score[0] === max) answer.push(1);
  if (score[1] === max) answer.push(2);
  if (score[2] === max) answer.push(3);

  return answer;
}

//filter를 이용한 풀이
// function solution(answers) {
//   let answer = [];

//   const person1c = answers.filter((a, i) => a === person1[i % person1.length]).length;
//   const person2c = answers.filter((a, i) => a === person2[i % person2.length]).length;
//   const person3c = answers.filter((a, i) => a === person3[i % person3.length]).length;

//   const max = Math.max(person1c, person2c, person3c);

//   if (person1c === max) answer.push(1);
//   if (person2c === max) answer.push(2);
//   if (person3c === max) answer.push(3);

//   return answer;
// }
