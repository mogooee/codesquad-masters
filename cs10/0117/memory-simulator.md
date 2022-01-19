## 테스트함수에서 스택과 힙

테스트 함수에 따라 수행되는 스택과 힙의 동작은 다음과 같다.
<br>
<br>

> `memory.init(12,14)`

init 함수에서 설정한 stackSize, heapSize의 length를 갖는 두가지 배열이 생성된다.
<br>
<br>
<br>

> `memory.malloc("boolean", 4)`

![malloc(boolean,4)](https://user-images.githubusercontent.com/92701121/150134192-5f001b70-57be-4de2-b83e-576e4bc8d5ea.PNG)

    힙에 1바이트 크기를 갖는 boolean이 7byte의 패딩 바이트가 합쳐져 총 8byte의 크기를 갖는다.
    총 4개의 boolean이 힙에 할당되고 stackPoint 주소가 저장된다.
    stack에는 heap 메모리 주소가 쌓이고 스택 포인터가 증가한다.

<br>
<br>
<br>

> `memory.free(1)`

![free(1)](https://user-images.githubusercontent.com/92701121/150134203-8dee86eb-25b8-494a-9845-fa5bea253a97.PNG)

     인자로 받은 힙 메모리주소에 해당하는 메모리를 해제한다.

  <br>
  <br>
  <br>

> `memory.call("foo", 2)`

![call(foo,2)](https://user-images.githubusercontent.com/92701121/150147557-0dffbd12-5c04-47aa-b6fb-9828e6e369a4.PNG)

     foo라는 이름의 2개의 포인터 변수를 가진 함수를 호출한다.
     stack에 foo라는 이름이 기록되고 2개의 포인터 변수가 쌓인다.

<br>
<br>
<br>

> `memory.malloc("num", 1)`

![malloc(num,1)](https://user-images.githubusercontent.com/92701121/150147240-55df3cad-de2a-4da3-887a-fda99088c810.PNG)

      힙에 8바이트의 크기를 갖는 num이 할당되고 힙을 참조하는 stack의 주소값을 stackPointer에 저장한다.
      stack에는 heap 메모리 주소가 쌓이고 스택 포인터가 증가한다.

<br>
<br>
<br>

> `memory.returnFrom("foo")`

![returnFrom(foo)](https://user-images.githubusercontent.com/92701121/150144719-5015d638-38fc-4501-a961-313f472a80c6.PNG)

     스택에서 foo를 호출한 후에 쌓였던 것들을 모두 비우고 stackPoint는 foo를 호출하기 이전으로 돌아간다.
     malloc에서 할당됐던 stack의 heap 메모리 주소도 해제된다.

<br>
<br>
<br>

> `memory.garbageCollect()`

![garbageCollect()](https://user-images.githubusercontent.com/92701121/150145022-97245ba0-3292-49f4-8d37-7f627b99877a.PNG)

     heap에서 stackPointer가 없는, 참조가 끊긴 것을 찾아 비운다.

<br>
<br>

> 테스트 함수 종료

     test 함수의 stack이 모두 비워진다.
