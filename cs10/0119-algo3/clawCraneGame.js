//TODO: 크레인 인형 뽑기
/*
- input
   - board: 게임 화면의 격자 상태인 5x5크기의 2차원 배열
   - moves: 크레인을 작동시킨 위치 
- output: 크레인을 모두 작동시킨 후 터트려져 사라진 인형의 개수 

[v] moves의 배열을 순회하며 하나씩 움직임을 수행한다.
[v] 게임 화면의 행은 board 배열의 인덱스이고 열은 중첩된 배열의 인덱스이다. 
   첫번째 움직임은 크레인이 뽑기를 수행할 게임화면의 열이므로 
   열은 고정되고 행을 순회하는데, 0이면 아무 일도 일어나지 않고 다음 행을 탐색한다.
   탐색을 하다가 인형을 찾으면 basket배열에 담고 담겨있던 인형은 0으로 비워준다.
[v] 한 움직임이 끝나면 basket에 쌓인 배열의 가장 마지막 요소와 그 앞의 요소를 확인하여 같은 숫자라면 제거한다.  
[v] 제거된 인형의 수인 2만큼씩 answer에 더해준다.
[v] moves를 모두 수행한 후 answer을 리턴한다.  
*/

function solution(board, moves) {
  let answer = 0;
  let basket = [];

  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[j][moves[i] - 1]) {
        basket.push(board[j][moves[i] - 1]);
        board[j][moves[i] - 1] = 0;
        break;
      }
    }

    if (
      basket.length > 1 &&
      basket[basket.length - 1] === basket[basket.length - 2]
    ) {
      basket.splice(basket.length - 2, 2);
      answer += 2;
    }
  }

  return answer;
}

// console.log(
//   solution(
//     [
//       [0, 0, 0, 0, 0],
//       [0, 0, 1, 0, 3],
//       [0, 2, 5, 0, 1],
//       [4, 2, 4, 4, 2],
//       [3, 5, 1, 3, 1],
//     ],
//     [1, 5, 3, 5, 1, 2, 1, 4]
//   )
// );
