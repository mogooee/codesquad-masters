# 함수형 프로그래밍

- 함수를 **타입**으로 지정하거나, **인자값**으로 넘기거나, **리턴값**으로 받을 수 있다.
- 자료처리를 수학적 함수의 계산으로 표현하고 상태와 가변 데이터 대신 불변 데이터를 프로그래밍하는 패러다임
- 언제 평가해도 상관없는 순수함수를 많이 만들고 그러한 순수함수를 적절한 시점에 사용해나가는 것이다.
- 함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다.
- 함수형 사고방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것
  <br>
  <br>

## 순수함수

- 동일한 입력은 항상 동일한 출력

```js
//순수함수
function add(a, b) {
  return a + b;
}

add(10, 20);

//비순수함수
let c = 10;
function add2(a, b) {
  return a + b + c;
}

add(10, 20); //40

c = 20;
add(10, 20); //50
```

<br>
<br>

- side-effect가 없는 함수

```js
//비순수함수
let c = 20;
function add3(a, b) {
  c = b;
  return a + b;
}

console.log(c); //20
add(20, 30); //50
console.log(c); //30
add(20, 30); //50

let obj1 = { val: 10 };
function add4(obj, b) {
  obj.val += b;
}
console.log(obj1.val); //10
add(obj1, 20);
console.log(obj1.val); //30

//순수함수
let obj2 = { val: 10 };
function add5(obj, b) {
  return { val: obj2.val + b };
}
```

- 변경 불가한 데이터 (immutable)
- 참조 투명성 (referential transparency)
- 느긋한 계산 (lazy evaluation)
- 조합성을 강조 -> 모듈화 수준이 높음
- 모듈화 수준이 높음 -> 생산성을 높임
  <br>
  <br>

## 일급 함수 vs 고차함수

- 일급함수: 함수를 값으로 다룰 수 있다. 함수를 변수에 담을 수 있다.

```js
function f1(f) {
  return f();
}

console.log(
  f1(function () {
    return 10;
  })
);
```

<br>
<br>

- 고차함수: map, filter, reduce

```js
//리스트에서 홀수를 length 만큼 뽑아서 제곱한 후 모두 더하기
function take(length, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === length) return res;
  }
  return res;
}

const add = (a, b) => a + b;

const f = (list, length) =>
  take(
    length,
    list.map((a) => a * a).filter((a) => a % 2)
  ).reduce(add, 0);

function main() {
  console.log(f([1, 2, 3, 4, 5], 2));
}

main();
```

<br>
<br>

## 클로저

### 함수와 메소드는 이름을 가진 클로저다. (Named Closure)

```js
//예제1
function add_maker(a) {
  //순수함수이자 상위 함수인 a의 값을 기억하는 클로저
  return (b) => {
    return a + b;
  };

  //예제2
  function f4(f1, f2, f3) {
    return f3(f1() + f2()); //f3(3)
  }

  //9
  console.log(
    f4(
      function () {
        return 2;
      },
      function () {
        return 1;
      },
      function (a) {
        return a * a;
      }
    )
  );
}

//상위 함수의 a값(10)을 기억하는 클로저
const add10 = add_maker(10);

console.log(add10(20)); //30
```

<br>
<br>
<br>
<br>

> [ Reference ]
>
> - [[코드스쿼드]함수형패러다임](https://www.youtube.com/watch?time_continue=933&v=jwMLVL2rjCY&feature=emb_title)
> - [[naver d2]함수형 프로그래밍과 ES6+](https://www.youtube.com/watch?v=4sO0aWTd3yc&ab_channel=naverd2)
> - [[인프런]함수형 프로그래밍](https://www.youtube.com/watch?v=C4uj9EuLhu8&ab_channel=%EC%9D%B8%ED%94%84%EB%9F%B0-%EC%A7%80%EC%8B%9D%EC%9D%84%EB%B0%B0%EC%9A%B0%EA%B3%A0%EB%82%98%EB%88%A0%EC%9A%94)
> - [JavaScript\_함수형 프로그래밍이란?](https://dlwlrma0203.tistory.com/51)
> - [[자바스크립트딥다이브]클로저](https://poiemaweb.com/js-closure)
