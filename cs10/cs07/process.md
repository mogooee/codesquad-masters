# 📋 프로세스

> 프로세스란 프로그램(.exe)이 실행돼서 돌아가고 있는 상태이다. 운영체제는 여러개의 프로세스를 함께 돌리고 있다.
> <br>

<p align="center"><img src="https://user-images.githubusercontent.com/92701121/152329786-2fdf650c-d50e-4688-bfbd-d46b6e1600c1.PNG" width="50%" heigth="50%"></p>

###### <div align="center">그림1. 윈도우 작업 관리자</div>

<br>

    프로그램이 프로세스 되면 두가지 일이 발생한다.

    1. 프로세스가 필요로 하는 재료들이 메모리에 올라간다.
    2. 해당 프로세스의 정보를 담고있는 PCB(Process Control Block)가 생성된다.

<br>
<br>

## 📎 [ Memory ]

<p align="center"><img src="https://www.charlezz.com/wordpress/wp-content/uploads/2020/11/www.charlezz.com-process-thread-operationsystem.png" width="60%" height="60%"></

###### <div align="center">그림2. 프로세스의 메모리 영역</div>

<br>

- **code**: 실행 명령을 포함하는 코드들

- **data**: static 변수 혹은 global 변수
- **heap**: 동적 메모리 영역
- **stack**: 지역변수, 매개변수, 반환 값 등등 일시적인 데이터
  <br>
  <br>

## 📎 [ PCB ]

<p align="center"><img src="https://t1.daumcdn.net/cfile/tistory/99F6404A5B00FF8D16" width="60%" heigth="60%"></p>

###### <div align="center">그림3. Process Control Block</div>

<br>

> ### < Process Metadata >

    Metadata를 통해 CPU는 각 프로세스를 구분할 수 있고, 이를 통해 프로세스가 여러 개일 때 전부 관리할 수 있다.
    즉, CPU가 프로세스를 처리하는데 필요한 다양한 정보를 가지고 있다.

<br>

- **Pointer**: 준비중인 다음 프로세스의 주소를 가리킨다. 준비상태나 대기상태의 큐를 구현할 때 다음을 가리키는 포인터이다.
- **Process State**: 프로세스의 라이프 타임과 관련된 현재 프로세스 상태, `waiting`, `running`, `ready`, `blocked`, `end,` `suspend-wait`, `suspend-ready` 가 있다
- **Process Number(ID)**: 새로운 프로세스에 시스템이 할당해주는 고유 번호
- 여러 프로세스가 번갈아 실행하는 경우, 프로세스는 CPU를 시분할하여 점유한다. 이 때 다음 작업을 하게 되었을 때 위치를 저장한다.
  - **Program Counter**: 다음 실행할 명령어를 가리킨다
  - **CPU Registers**: `context switch`가 발생하면 이 때의 레지스터 정보를 기억해서 다시 프로세스가 CPU 할당을 받으면 사용한다.
- code, data, stack에 대한 정보...
  <br>
  <br>

> ### < Metadata의 생성과 PCB >

    Metadata는 프로세스가 생성되면 PCB에 저장된다.

1. 프로그램 실행
2. 프로세스 생성(프로그램을 메모리에 적재)
3. 프로세스 메타 데이터 생성
4. 메타 데이터를 PCB에 저장  
    이때, 한 PCB에는 한 프로세스의 정보가 담긴다.
   <br>
   <br>

> ### < PCB의 필요성 >

여러 개의 프로그램이 실행되고 있을 때, 즉 프로세스가 여러 개 생성될 때, CPU는 프로세스의 상태에 따라 교체 작업을 수행한다.

따라서, 수행 대기 중인 프로세스에 관한 저장 값을 PCB에 저장해 두어야 한다. PCB는 `LinkedList` 방식으로 관리되어 삽입과 삭제가 용이하다. 프로세스가 생성되면 PCB LIST Head에 PCB가 삽입되고, 프로세스가 완료되면 PCB가 삭제되는 식으로 관리된다.
<br>
<br>

## 📎 [ Process State ]

<p align="center"><img src="https://t1.daumcdn.net/cfile/tistory/99F0C23B5B00FF8D11" width="60%" heigth="60%"></p>

###### <div align="center">그림4. Process State</div>

<br>

#### 1. new

- 프로세스가 메모리에 올라와 실행 준비를 완료한 상태로, `PCB`가 생성된다.

#### 2. ready

- 메모리 등 다른 조건을 모두 만족하고 `CPU`를 기다리는 상태다.

#### 3. running

- `ready`상태의 프로세스가 `CPU`를 점유하여 `instruction`을 수행중인 상태
- `user mode` / `kernel mode`

#### 4. wait(blocked,sleep)

- `CPU`를 주어도 당장 `instruction`을 수행할 수없는 상태
- `Process` 자신이 요청한 `event`(예: I/O)가 즉시만족되지 않아 이를 기다리는 상태
- 예) 디스크에서 file을 얽어와야 하는 경우
- `blocked` -> 자신이 요청한 `event` 만족 -> `ready` -> `running`

#### 5. end(terminated)

- 프로세스가 종료된 상태로 사용했던 데이터를 삭제하고 PCB를 폐기한다.
  <br>
  <br>

> ### < 보류 상태 (inactive) >

메모리에서 쫓겨 난(`Swap out`) 프로세스는 `Swap` 영역에 보관된다.

#### 6. **Suspended(stopped)**

- 외부적인 이유로 프로세스의 수행이 정지된 상태
  1. 사용자가 프로그램을 일시 정지시킨 경우 (break key)
  2. 시스템이 여러 이유로 프로세스를 잠시 중단시킴
     (메모리에 너무 많은 프로세스가 올라와 있을 때)
- 프로세스는 통째로 디스크에 `swap out` 된다.
- 외부에서 `resume`해 주어야 `active`
- `suspended blocked`, `suspended ready` 두가지 상태가 있다.
  <br>
  <br>

## 📎 [ Context Switching ]

수행 중인 Task(Process/Thread)가 변경될 때, CPU의 레지스터 정보가 변경되는 것을 뜻한다. 즉, 이전 프로세스의 상태를 PCB에 보관하고, 다른 프로세스의 정보를 PCB에서 읽어와 CPU 레지스터에 적재하는 과정이다. 즉, CPU를 한 프로세스에서 다른 프로세스로 넘겨주는 과정이다.

System call이나 Interrupt 발생시 반드시 context switch가 일어나는 것은 아니다. interrupt 중에서도 `timer Interrupt`가 들어왔을 때와 `I/O요청`, `system call 요청`이 들어왔을 때 문맥교환이 일어난다.

다른 프로세스로 넘어가는 과정은 상당한 `오버헤드`를 발생시킨다. cache memory에 있던 진행하던 프로세스에 대한 `cache`를 모두 비워줘야하기 때문이다. (eg. cache memory flush)

<p align="center"><img src="https://www.charlezz.com/wordpress/wp-content/uploads/2020/11/www.charlezz.com-process-thread-context-switching.png" width="60%" heigth="60%"></p>

###### <div align="center">그림5. Context Switching</div>

<br>

      ⏳ Context: CPU가 다루는 프로세스/스레드에 대한 정보로, 대부분 레지스터에 저장되어 있고 PCB로 관리한다.

<br>
<br>

## 📎 [ Process Scheduling ]

    수행 가능한 여러 프로세스들 중에서 하나의 프로세스를 선택하는 것

<br>

> ### < 프로세스를 스케줄링하기 위한 큐 >

- `Job queue`: 현재 시스템 내에 있는 모든 프로세스의 집합
- `Ready queue`: 현재 메모리 내에 있으면서 CPU를 잡아서 실행되기를 기다리는 프로세스의 집합
- `Device queue`: I/O device의 처리를 기다리는 프로세스의 집합
- 프로세스들은 각 큐들을 오가며 수행된다.
- 큐들은 연결리스트를 기반으로 한다. 각 노드는 PCB가 되고 다음 연결의 정보를 알고 있는 next는 pointer가 된다.
  <br>
  <br>

> ### < 스케줄러(Scheduler) >

     스케줄러란 어떤 프로세스에게 자원을 할당할지를 결정하는 운영체제 커널의 코드를 의미한다. 스케줄러는 역할과 목적, 실행 빈도에 따라서 단기스케줄러, 중기스케줄러, 장기 스케줄러로 구분된다.

#### 1. 장기(job scheduler)

- `new` -> (admitted) -> `ready`
- 시작 프로세스 중 어떤 것들을 `ready queue`로 보낼지 결정
- 프로세스에 memory(및 각종 자원)을 주는 문제
- degree of Multiprogramming(메모리가 몇 개 올라가있는지)을 제어
- 범용 운영체제(`time sharing system`)는 장기 스케줄러가 없고 무조건 `ready`

#### 2. 단기(CPU scheduler)

- `ready` -> `running`
- 어떤 프로세스를 다음번에 running시킬지 결정
- 프로세스에 CPU를 주는 문제

#### 3. 중기(Swapper)

- 여유 공간 마련을 위해 프로세스를 통쨰로 메모리에서 디스크로 쫓아냄(`Swap out`)
- 프로세스에게서 memory를 뺏는 문제
- degree of Multiprogramming을 제어
- 현 시스템에서 메모리에 너무 많은 프로그램이 동시에 올라가는 것을 조절하는 스케줄러
- 프로세스 상태: `Suspended(stopped)`

<br>
<br>

> ### < 스케줄링 알고리즘 >

- CPU는 하나의 프로세스 작업이 끝나면 다음 프로세스 작업을 수행해야 한다. 어떤 프로세스를 다음에 처리할 지 선택하는 알고리즘이다.
- 스케줄링 알고리즘에는 `비선점 스케줄링 방식`과 `선점 스케줄링 방식`이 있다.

<br>
<br>
<br>

> [ Reference ]
>
> - [[운영체제] PCB & Context Switching](https://steady-coding.tistory.com/503)
> - [운영체제의 Process와 Thread 이야기](https://www.charlezz.com/?p=44590)
> - [운영체제(4)-프로세스 관리](https://getchan.github.io/cs/OS_4/)
> - [이화여대 운영체제-반효경교수님](http://www.kocw.net/home/search/kemView.do?kemId=1046323)
> - [[OS] 프로세스 스케줄러 및 CPU 스케줄러 및 알고리즘](https://qazyj.tistory.com/322)
> - [[운영체제]스케줄러(Scheduler)](https://dheldh77.tistory.com/entry/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%9F%ACScheduler)
