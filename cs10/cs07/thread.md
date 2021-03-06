# 📋 스레드

     스레드는 한 프로세스 내에서 나뉘어진 하나 이상의 '실행 단위'이다. 프로세스는 최소 하나의 메인 스레드를 갖는다.

<br>

## 📎 싱글 스레드

    하나의 프로세스에서 하나의 스레드 실행

#### < 싱글 스레드의 장점 >

- 공유 자원 접근에 대한 동기화 작업을 고려하지 않아도 된다.
- context switch 작업을 요구하지 않으므로 전환비용이 들지 않느다.
- 두 개의 작업에 대해 두 개의 스레드를 할당하여 작업할 경우(프로세스당 하나의 메인스레드)에도 CPU를 선점하는 과정에서 context switch가 발생하는데, 단일 스레드에 비해 비용이 증가할 수 있다. (프로세스 context switch가 되므로)

#### < 싱글 스레드의 단점 >

- 멀티 코어(여러 개의 CPU - 엄밀히 말하면 여러 개 CPU에 들어 있던 코어를 빼내어 하나의 CPU에 넣은 것)를 활용하지 못한다.
  <br>
  <br>

## 📎 멀티 스레드

    하나의 프로세스에서 다수의 스레드 실행, 하나의 `Process`에 2가지 이상의 작업을 처리할 수 있는 것

#### < 멀티 스레드의 장점 >

- 새로운 프로세스를 생성하는 것보다 기존 프로세스에서 스레드를 생성하는 것이 빠르다.
- 프로세스의 작업전환보다 스레드의 작업전환이 더 빠르다.
- 프로세스 내에서 자원을 공유하여 자원 생성과 관리 중복을 최소화

#### < 멀티 스레드의 단점 >

- 하나의 스레드만 실행중일 때는 실행시간이 오히려 지연 될 수 있다.
- 멀티 스레딩을 위해 운영체제의 지원이 필요하다.
- 스레드 스케줄링을 신경써야 한다.
- 공유자원을 관리해야 한다. -> `Semaphore`, `Mutex`
  <br>
  <br>

> ### < 멀티 스레드가 공용 리소스에 접근할 때 임계구역을 다루는 방식>

동시성 프로그래밍은 '공유자원
을 관리하는 것이 가장 중요하다. 공유 자원을 안전하게 관리하기 위해서는 상호배제(Mutual Exclusion)를 달성하는 기법이 필요하다.

세마포어와 뮤텍스는 이를 위해 고안된 기법이다.

#### 1. Semaphore

    현재 공유 자원에 접근할 수 있는 스레드, 프로세스의 수를 나타내는 값을 두어 상호배제를 달성하는 기법

#### 2. Mutex

    한 스레드, 프로세스에 의해 소유될 수 있는 Key🔑를 기반으로 한 상호배제기법

두 기법 모두 완벽한 기법은 아니다. 이 기법들을 쓰더라도 데이터 무결성을 보장할 수 없으며 데드락이 발생할 수도 있다.
<br>
<br>

> ### < 멀티스레드의 필요성 >

프로세스의 잦은 `Context Switching`은 cost가 비싸고 성능 저하를 야기한다.

한 개의 프로세스 안에서도 여러 작업이 동시에 진행되어야 한다. 예를 들어, 유튜브에서 영상을 보려면 파일이 로딩되면서 동시에 재생도 되어야한다.

이러한 배경에서 경량화된 프로세스(`lightWeight process`) 버전인 스레드가 등장한다.
하나의 프로세스 안에 다수의 스레드가 있을 때 스레드들은 부모 프로세스의 `code`, `data`, `heap`영역을 공통된 자원으로 사용한다. 각각의 스레드들은 각자의 `stack`과 `PC`, `register`값을 가지고 있다. 따라서 `Context Switching`이 일어날 때 저장된 캐시 데이터는 스레드가 바뀌어도 공유하는 데이터가 있으므로 의미있고 그러므로 `캐시 적중률`이 높아 컨텍스트 스위칭이 빠른 것이다.

다중 스레드로 구성된 태스크 구조에서는 하나의 서버 스레드가 `blocked(waiting)`상태인 동안에도 동일한 태스크 내의 다른 스레드가 실행(`running`)되어 빠른 처리를 할 수 있다.

> ⏳ 캐시(cache): CPU와 메인메모리 사이에 위치하며 CPU에서 한번 이상 읽어 들인 메모리의 데이터를 저장하고 있다가, CPU가 다시 그 메모리에 저장된 데이터를 요구할 때, 메인 메모리를 통하지 않고 데이터를 전달해 주는 용도이다.

 <br>
 <br>

> ### < 멀티 스레드 스케줄링 >

- 우선 순위 방식 (Priority)  
  우선 순위가 높은 스레드가 실행 상태를 더 많이 가지록 스케줄링
  우선 순위는 시간 제한, 메모리 요구량 등 외부에서 이미 설정된 기준이다.

- 순환 할당 방식 (Round-Robin)  
  시간 할당량을 정해서 하나의 스레드를 정해진 시간만큼 실행하고 다시 다른 스레드를 실행하는 방식

<br> <br>

## 📎 스레드를 무작정 생성하면 안되는 이유

각 스레드가 서료 교체될 때 스레드 간의 `문맥교환(Context Switching)`이 발생한다. 이는 현재까지의 작업 상태나 다음 작업에 필요한 각종 데이터를 저장하고 읽어오는 작업을 가리킨다.

이러한 문맥 교환에 걸리는 시간이 커지면 커질수록, 멀티 스레딩의 효율은 저하된다. 오히려 많은 양의 단순한 계산은 싱글 스레드로 동작하는 것이 더 효율적일 수 있다. 따라서 많은 수의 스레드를 실행하는 것이 언제나 좋은 성능을 보이는 것은 아니다.

스레드가 너무 많으면 프로그램의 성능이 심각하게 떨어진다. 그 영향은 두가지로 이루어진다.

    1.  정해진 분량의 일을 여러 스레드에 분배하면 스레드 하나하나는 할 일이 별로 없게 된다. 그래서 스레드를 시작하고 종료하는 비용이 실제로 하는 일의 양을 압도하게 된다.

    2. 소프트웨어 스레드가 너무 많으면 한정된 하드웨어 자원을 공유하는데 드는 비용이 커진다.

`소프트웨어 스레드`가 너무 많으면 `하드웨어 스레드`를 공정하게 분배하는 데 `오버헤드`가 걸린다. 이 오버헤드 때문에 성능이 심각하게 저하될 수 있다. 오버헤드는 종류가 다양하다.
<br>

> ⏳ 운영체제는 소프웨어 스레드를 하드웨어 스레드(1코어 1스레드 지원 - 하이퍼 스레딩은 1코어:n스레드 지원)에 지정하여 CPU 코어가 프로그램을 실행시킬 수 있도록 한다.

    그렇다면? 실행 가능한 스레드의 개수를 하드웨어 스레드의 개수에 맞추어 제한하라!!

> ### < 스레드 레지스터 상태 >

소프트웨어 스레드를 일시 중단(suspend)하려면 하드웨어 스레드의 레지스터 상태를 저장해야 한다. 그래야 다음 타임 슬라이스 때 소프트웨어 스레드가 값을 복구할 수 있기 때문이다. 일반적으로, 스레드 스케줄러는 타임 슬라이스를 상당히 크게 잡기 때문에 레지스터를 저장하고 복구하는 오버헤드는 미미하다.

> ### < 스레드 캐시 상태 >

현대 프로세서는 캐시 메모리에 상당히 의존한다. 캐시 메모리는 메인 메모리보다 10배에서 100배 빠르다. 캐시에 적중하는 경우는 접근이 빠를 뿐더러 메모리 버스의 대역폭도 소모하지 않는다. 하지만 캐시는 빠르긴 해도 유한한 자원이다.

캐시가 꽉 찼을 땐, 프로세서가 새 데이터가 들어갈 자리를 마련하기 위해 캐시에서 데이터를 제거해야 한다. 보통 제거할 데이터를 고를 때 최근에 사용되지 않은 데이터(Least Recently Use, LRU)를 고른다. 이렇게 하면 대개 이전 타임 슬라이스의 데이터가 선택된다. 그렇기 때문에 스레드는 서로 상대방의 데이털르 제거하곤 한다. 즉, 스레드가 너무 많으면 서로 캐시를 차지하려고 다투기 때문에 성능이 저하된다.

> ### < 스레드를 무제한으로 만들수 없다면, 프로세스가 많아질 때 성능 향상을 할 수 있는 방법이 무엇일까? >

- `병렬처리(Parallelism)`을 통하여 하나의 프로그램을 처리해 속도를 향상 시킨다.
  <br>
  <br>

## 📎 스레드풀(pool of threads)

프로세스 중 `병렬 작업처리`가 많아지면 스레드 개수가 증가되고 그에따른 스레드생성과 스케줄링으로 인해 CPU가 바빠져 메모리 사용량이 늘어난다. 따라서 시스템성능이 저하되고, 갑작스러운 병렬작업의 폭증에 따른 스레드 폭증을 막으려면 스레드 풀 Thread Pool을 사용해야 한다.

스레드 풀은 작업처리에 사용되는 스레드를 제한된 개수만큼 정해놓고 `작업큐 (Queue)`에 들어오는 작업들을 하나씩 스레드가 맡아 처리한다. 그렇게 하면 작업처리 요청이 폭증되어도 스레드의 전체개수가 늘어나지 않으므로(제한해서 하나씩 처리하기 때문) 시스템 성능이 급격히 저하되지 않는다.

<!-- <p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTLegy%2Fbtq18oTtGcB%2FkxvtInKlhFKQ8MctYRSKEk%2Fimg.png" width="60%" heigth="60%"></p> -->

###### <div align="center">그림1. 스레드풀</div>

<br>
<br>

## 📎 윈도우 스레드 동작 방식

윈도우는 기본적으로 우선 순위 기반의 `선점형 스케줄링`을 사용한다.

<br>
<br>
<br>

> [ Reference ]
>
> - [프로세스와 스레드 완벽 비교(멀티 스레드/프로세스, 싱글/멀티 스레드)](https://student513.tistory.com/74)
> - [[Context Switching] 프로세스와 쓰레드에서의 컨텍스트 스위칭](https://agh2o.tistory.com/12)
> - [뮤텍스(Mutex)와 세마포어(Semaphore)의 차이](https://medium.com/@kwoncharles/%EB%AE%A4%ED%85%8D%EC%8A%A4-mutex-%EC%99%80-%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4-semaphore-%EC%9D%98-%EC%B0%A8%EC%9D%B4-de6078d3c453)
> - [멀티코어 프로그래밍에서 흔히 발생하는 문제, 1부](https://andromedarabbit.net/%EB%A9%80%ED%8B%B0%EC%BD%94%EC%96%B4-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%97%90%EC%84%9C-%ED%9D%94%ED%9E%88-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EB%AC%B8%EC%A0%9C-1%EB%B6%80/)
> - [[java] Thread Pool 쓰레드 풀이란 ?](https://cheershennah.tistory.com/170)
> - [Concurrency, Parallelism, Parallel and Concurrency](https://lob-dev.tistory.com/entry/Concurrency-Parallelism-Parallel-and-Concurrency)
