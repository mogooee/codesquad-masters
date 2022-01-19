//TODO: k번째수
/*
- input
    - array: 숫자가 담긴 배열
    - commands: i, j, k가 담긴 중첩 배열 
- output: 배열 array의 i번째 숫자부터 j번재 숫자까지 자르고 정렬했을 때, k번째에 있는 수  

[v] commands의 length만큼 output이 생기므로 반복문으로 각 배열의 값을 받아온다. 
[v] array의 i-1부터 j 인덱스까지 slice로 잘라 새로운 배열을 만든다.
[v] 자른 배열을 오름차순으로 정렬한다.
[v] k번째에 있는 수를 answer에 담는다. 
[v] 모든 순회를 마친 후 answer를 리턴한다. 
*/

function solution(array, commands) {
  let answer = [];
  for (let i = 0; i < commands.length; i++) {
    answer.push(
      array.slice(commands[i][0] - 1, commands[i][1]).sort((a, b) => a - b)[
        commands[i][2] - 1
      ]
    );
  }
  return answer;
}

// console.log(
//   solution(
//     [1, 5, 2, 6, 3, 7, 4],
//     [
//       [2, 5, 3],
//       [4, 4, 1],
//       [1, 7, 3],
//     ]
//   )
// );
