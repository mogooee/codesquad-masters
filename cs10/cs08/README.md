# CS08 카페 주문 이벤트

## ⛳ 설계 구조

![설계](https://user-images.githubusercontent.com/92701121/152210576-403440f8-79a5-4e45-83ae-f5afaee8e7b0.PNG)

`cafe` 클래스 안에 `cashier`, `manager`, `barista` 구성원이 있다. `manager`는 `barista`를 일방참조하고있다. 각 클래스는 `EventEmitter`를 상속받아 객체마다 이벤트를 생성하고 발생한다.

### [ cafe ]

#### 1. setBarista

입력받은 바리스타의 인원만큼 인스턴스를 생성하여 배열에 넣어준다.

```js
setBarista() {
    for (let i = 0; i < this.baristaNum; i++) {
      this.barista.push(new Barista(menu));
    }
  }
```

#### 2. setEvent

매니저가 `quit`이라는 이벤트를 emit하면 `close`메소드를 호출한다.

> ⏳ 매니저의 이벤트 발생으로 카페의 메소드를 호출한다.

#### 3. open

카페 영업을 알리는 문구를 출력하고 입력을 받을 때마다 cashier는 주문을 받는다. manager는 `orderQueue`를 1초마다 확인한다.

```js
  open() {
    this.printOpeningMessage();
    this.rl
      .on("line", (line) => {
        this.quit = 0;
        const [customer, ...orders] = input(line);
        this.cashier.takeOrder(customer, orders);
      })
    this.manager.checkOrderQueue();
  }
```

#### 4. close

3초 뒤에 `quit` 변수가 1이면 마감을 알리는 문구를 출력하고 readline을 종료한다. 3초 내에 주문을 받으면 `quit`변수는 0이 되어 조건문을 통과하지 못한다.

```js
  close() {
    this.quit = 1;
    setTimeout(() => {
      if (this.quit) {
        this.printClosingMessage();
        this.rl.close();
        this.rl.on("close", () => {
          process.exit();
        });
      }
    }, 3000);
  }
```

### [ cashier ]

#### 1. setEvent - order

- 주문이 들어 왔음을 알리는 알람 문구를 출력한다.
- `customer` 배열에 고객의 이름을 객체로 생성한다.
- 해당 인덱스를 찾아 주문을 저장할 `orders` 배열 또한 객체 형태로 생성한다. `orders`의 0번째 값은 모든 주문이 담겨 있어 고객마다 주문이 완성되면 이 값을 불러와 출력한다.
- `addOrder`메소드를 호출한다.
- 추가된 메뉴를 포함한 주문대기표를 출력한다.

예시) 입력: A, 1:2, 2:3  
`this.customer=[{customer:"A",orders:["1:2,2:3",2,3]}]`

#### 2. takeOrder

`order` 이벤트를 발생한다.

#### 3. addOrder

':'를 구분자로 `beverageIndex`와 `count`를 분리한다. `orderQueue`에는 "A1"과 같이 고객의 이름과 메뉴 번호를 함께 저장한다. customer 'A'의 `orders`에는 `beverageIndex`마다 `count`를 저장한다.

```js
  addOrder(orders, nowCustomer) {
    orders.forEach((element) => {
      const [beverageIndex, count] = element
        .trim()
        .split(":")
        .map((e) => +e);
      for (let i = 0; i < count; i++) {
        this.orderQueue.enQueue(nowCustomer.customer + beverageIndex);
        nowCustomer.orders[beverageIndex] = count;
      }
    });
  }
```

### [ manager ]

#### 1. setEvent

`barista`배열에 담겨있는 모든 `barista` 인스턴스에 `start`,`complete` 이벤트를 생성한다.

> ⏳ 바리스타가 매니저를 참조하지 않아도 이벤트 발생만으로 음료 제조 시작과 완성을 매니저에게 알릴 수 있다.

- `start`: 제조를 시작한 음료가 삭제된 주문대기표를 출력한다.
- `complete`: 고객별 주문 현황과 카페의 모든 주문 현황을 체크한다.

#### 2. checkOrderQueue

- `changeBarista` 메소드를 호출한다.
- 1초마다 바리스타가 제조하고 있는 음료의 개수가 2개 이하인지를 확인하고 맞다면 `callBarista` 메소드를 호출한다.

#### 3. changeBarista

가장 적은 음료를 제조하고 있는 바리스타를 선택한다. 바리스타 배열에 있는 바리스타 인스턴스들의 `makingCount`를 비교하여 가장 적은 수를 가지고 있는 바리스타의 인덱스를 리턴하고 이를 활용한다.

```js
changeBarista() {
    let min = this.barista[0].makingCount;
    let minIndex = 0;

    for (let i = 1; i < this.barista.length; i++) {
      if (min > this.barista[i].makingCount) {
        min = this.barista[i].makingCount;
        minIndex = i;
      }
    }
    return minIndex;
  }
```

#### 4. callBarista -> barista(make)

해당 바리스타에게 주문 대기표의 첫번째 음료를 전달한다.

#### 5. getCompletion

모든 바리스타들이 제조하고 있는 음료의 수(`makingCount`)가 0이고 주문 대기표에 남아 있는 음료가 없다면 모든 메뉴가 완성되었다는 문구를 출력한다. 다음으로 `quit`이벤트를 발생시켜 `cafe` 클래스에서 영업 마감을 확인하는 메소드를 호출하게 된다.

#### 6. checkCustomer

`barista`가 음료 제조를 완성하면 호출되는 메소드이다. `customer`배열에서 고객의 이름을 찾고 `orders` 배열에서 완성된 음료의 메뉴 번호를 찾아 1을 빼준다. 해당 고객의 `orders` 배열에서 메뉴 번호에 해당하는 인덱스의 값이 모두 0이라면 모든 음료 제조가 완료된 것이다. `orders` 배열의 `0번째 값`은 모든 주문을 문자열로 저장해놓은 값으로 메뉴판에서 해당 메뉴의 이름을 찾고 개수와 함께 주문 완성 문구를 출력한다.

```js
  checkCustomer(customerName, beverageIndex) {
    const nowCustomer = this.customer.find((e) => e.customer === customerName);
    nowCustomer.orders[beverageIndex]--;
    for (let i = 1; i < nowCustomer.orders.length; i++) {
      if (nowCustomer.orders[i] > 0) return;
    }
    const completedOrder = nowCustomer.orders[0].map(
      (e) =>
        `${this.menu[e.trim().split(":")[0] - 1].name}*${
          e.trim().split(":")[1]
        }잔`
    );
    console.log(
      `\n============ ${customerName} 고객님 주문 완성: ${completedOrder}\n`
    );
  }
```

### [ barista ]

#### 1. setEvent

- `make`
  음료를 제조하는 이벤트이다.
  - `splitBeverageInfo`를 호출하여 원하는 정보를 얻는다.
  - `startMakingBeverage`를 호출한다.
  - `start` 이벤트를 발생한다.
- `done`
  음료마다 정해진 제조 시간(`time`)뒤에 콜백함수를 실행한다.
  - `finishMakingBeverage`를 호출한다.
  - `complete` 이벤트를 발생한다.

#### 2. splitBeverageInfo

manager가 보낸 주문 대기표의 첫번째 음료 (A1)로 `customerName`(A), `beverageIndex`(1), 만들고자하는 메뉴의 이름과 제조 시간을 담고 있는 메뉴판의 해당 정보(`makingBeverage`)를 반환한다.

#### 3. startMakingBeverage

바리스타가 제조하고 있는 음료의 수(`makingCount`)를 `1만큼 증가`시키고 제조 시작을 알리는 문구를 출력한다.

#### 4. finishMakingBeverage

바리스타가 제조하고 있는 음료의 수(`makingCount`)를 `1만큼 감소`시키고 제조 완료를 알리는 문구를 출력한다.

## 출력 결과

![카페2AB](https://user-images.githubusercontent.com/92701121/152210291-7603374f-b2b2-4ec2-9f4c-fcdbfb08eb09.PNG)

바리스타 인원을 입력받고 설정한다. 바리스타의 선택 기준은 제조하고 있는 음료의 수(`makingCount`)가 최소인 것이다. 만일 최소인 바리스타가 두 명 이상일 경우 바리스타1이 바리스타2보다 먼저 오더를 받는다. 모든 바리스타는 2개 이상 음료를 제조할 수 없다.

![changeBarista](https://user-images.githubusercontent.com/92701121/152210293-2d6b2f20-5c94-4062-a0bd-3947579d841d.PNG)

바리스타3과 바리스타4는 모두 제조하고 있는 음료가 없으므로 바리스타3이 먼저 음료를 제조한다.

![영업마감](https://user-images.githubusercontent.com/92701121/152210297-661fe86a-a4bd-43ab-9661-a11936931dba.PNG)

고객별로 주문한 음료가 모두 완성되면 문구를 출력하고, 카페의 주문대기표에 있는 모든 음료가 완성되면 3초 이상 추가 주문이 없을 시 영업을 마감한다.
