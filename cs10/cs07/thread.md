# π μ€λ λ

     μ€λ λλ ν νλ‘μΈμ€ λ΄μμ λλμ΄μ§ νλ μ΄μμ 'μ€ν λ¨μ'μ΄λ€. νλ‘μΈμ€λ μ΅μ νλμ λ©μΈ μ€λ λλ₯Ό κ°λλ€.

<br>

## π μ±κΈ μ€λ λ

    νλμ νλ‘μΈμ€μμ νλμ μ€λ λ μ€ν

#### < μ±κΈ μ€λ λμ μ₯μ  >

- κ³΅μ  μμ μ κ·Όμ λν λκΈ°ν μμμ κ³ λ €νμ§ μμλ λλ€.
- context switch μμμ μκ΅¬νμ§ μμΌλ―λ‘ μ νλΉμ©μ΄ λ€μ§ μλλ€.
- λ κ°μ μμμ λν΄ λ κ°μ μ€λ λλ₯Ό ν λΉνμ¬ μμν  κ²½μ°(νλ‘μΈμ€λΉ νλμ λ©μΈμ€λ λ)μλ CPUλ₯Ό μ μ νλ κ³Όμ μμ context switchκ° λ°μνλλ°, λ¨μΌ μ€λ λμ λΉν΄ λΉμ©μ΄ μ¦κ°ν  μ μλ€. (νλ‘μΈμ€ context switchκ° λλ―λ‘)

#### < μ±κΈ μ€λ λμ λ¨μ  >

- λ©ν° μ½μ΄(μ¬λ¬ κ°μ CPU - μλ°ν λ§νλ©΄ μ¬λ¬ κ° CPUμ λ€μ΄ μλ μ½μ΄λ₯Ό λΉΌλ΄μ΄ νλμ CPUμ λ£μ κ²)λ₯Ό νμ©νμ§ λͺ»νλ€.
  <br>
  <br>

## π λ©ν° μ€λ λ

    νλμ νλ‘μΈμ€μμ λ€μμ μ€λ λ μ€ν, νλμ `Process`μ 2κ°μ§ μ΄μμ μμμ μ²λ¦¬ν  μ μλ κ²

#### < λ©ν° μ€λ λμ μ₯μ  >

- μλ‘μ΄ νλ‘μΈμ€λ₯Ό μμ±νλ κ²λ³΄λ€ κΈ°μ‘΄ νλ‘μΈμ€μμ μ€λ λλ₯Ό μμ±νλ κ²μ΄ λΉ λ₯΄λ€.
- νλ‘μΈμ€μ μμμ νλ³΄λ€ μ€λ λμ μμμ νμ΄ λ λΉ λ₯΄λ€.
- νλ‘μΈμ€ λ΄μμ μμμ κ³΅μ νμ¬ μμ μμ±κ³Ό κ΄λ¦¬ μ€λ³΅μ μ΅μν

#### < λ©ν° μ€λ λμ λ¨μ  >

- νλμ μ€λ λλ§ μ€νμ€μΌ λλ μ€νμκ°μ΄ μ€νλ € μ§μ° λ  μ μλ€.
- λ©ν° μ€λ λ©μ μν΄ μ΄μμ²΄μ μ μ§μμ΄ νμνλ€.
- μ€λ λ μ€μΌμ€λ§μ μ κ²½μ¨μΌ νλ€.
- κ³΅μ μμμ κ΄λ¦¬ν΄μΌ νλ€. -> `Semaphore`, `Mutex`
  <br>
  <br>

> ### < λ©ν° μ€λ λκ° κ³΅μ© λ¦¬μμ€μ μ κ·Όν  λ μκ³κ΅¬μ­μ λ€λ£¨λ λ°©μ>

λμμ± νλ‘κ·Έλλ°μ 'κ³΅μ μμ
μ κ΄λ¦¬νλ κ²μ΄ κ°μ₯ μ€μνλ€. κ³΅μ  μμμ μμ νκ² κ΄λ¦¬νκΈ° μν΄μλ μνΈλ°°μ (Mutual Exclusion)λ₯Ό λ¬μ±νλ κΈ°λ²μ΄ νμνλ€.

μΈλ§ν¬μ΄μ λ?€νμ€λ μ΄λ₯Ό μν΄ κ³ μλ κΈ°λ²μ΄λ€.

#### 1. Semaphore

    νμ¬ κ³΅μ  μμμ μ κ·Όν  μ μλ μ€λ λ, νλ‘μΈμ€μ μλ₯Ό λνλ΄λ κ°μ λμ΄ μνΈλ°°μ λ₯Ό λ¬μ±νλ κΈ°λ²

#### 2. Mutex

    ν μ€λ λ, νλ‘μΈμ€μ μν΄ μμ λ  μ μλ Keyπλ₯Ό κΈ°λ°μΌλ‘ ν μνΈλ°°μ κΈ°λ²

λ κΈ°λ² λͺ¨λ μλ²½ν κΈ°λ²μ μλλ€. μ΄ κΈ°λ²λ€μ μ°λλΌλ λ°μ΄ν° λ¬΄κ²°μ±μ λ³΄μ₯ν  μ μμΌλ©° λ°λλ½μ΄ λ°μν  μλ μλ€.
<br>
<br>

> ### < λ©ν°μ€λ λμ νμμ± >

νλ‘μΈμ€μ μ¦μ `Context Switching`μ costκ° λΉμΈκ³  μ±λ₯ μ νλ₯Ό μΌκΈ°νλ€.

ν κ°μ νλ‘μΈμ€ μμμλ μ¬λ¬ μμμ΄ λμμ μ§νλμ΄μΌ νλ€. μλ₯Ό λ€μ΄, μ νλΈμμ μμμ λ³΄λ €λ©΄ νμΌμ΄ λ‘λ©λλ©΄μ λμμ μ¬μλ λμ΄μΌνλ€.

μ΄λ¬ν λ°°κ²½μμ κ²½λνλ νλ‘μΈμ€(`lightWeight process`) λ²μ μΈ μ€λ λκ° λ±μ₯νλ€.
νλμ νλ‘μΈμ€ μμ λ€μμ μ€λ λκ° μμ λ μ€λ λλ€μ λΆλͺ¨ νλ‘μΈμ€μ `code`, `data`, `heap`μμ­μ κ³΅ν΅λ μμμΌλ‘ μ¬μ©νλ€. κ°κ°μ μ€λ λλ€μ κ°μμ `stack`κ³Ό `PC`, `register`κ°μ κ°μ§κ³  μλ€. λ°λΌμ `Context Switching`μ΄ μΌμ΄λ  λ μ μ₯λ μΊμ λ°μ΄ν°λ μ€λ λκ° λ°λμ΄λ κ³΅μ νλ λ°μ΄ν°κ° μμΌλ―λ‘ μλ―Έμκ³  κ·Έλ¬λ―λ‘ `μΊμ μ μ€λ₯ `μ΄ λμ μ»¨νμ€νΈ μ€μμΉ­μ΄ λΉ λ₯Έ κ²μ΄λ€.

λ€μ€ μ€λ λλ‘ κ΅¬μ±λ νμ€ν¬ κ΅¬μ‘°μμλ νλμ μλ² μ€λ λκ° `blocked(waiting)`μνμΈ λμμλ λμΌν νμ€ν¬ λ΄μ λ€λ₯Έ μ€λ λκ° μ€ν(`running`)λμ΄ λΉ λ₯Έ μ²λ¦¬λ₯Ό ν  μ μλ€.

> β³ μΊμ(cache): CPUμ λ©μΈλ©λͺ¨λ¦¬ μ¬μ΄μ μμΉνλ©° CPUμμ νλ² μ΄μ μ½μ΄ λ€μΈ λ©λͺ¨λ¦¬μ λ°μ΄ν°λ₯Ό μ μ₯νκ³  μλ€κ°, CPUκ° λ€μ κ·Έ λ©λͺ¨λ¦¬μ μ μ₯λ λ°μ΄ν°λ₯Ό μκ΅¬ν  λ, λ©μΈ λ©λͺ¨λ¦¬λ₯Ό ν΅νμ§ μκ³  λ°μ΄ν°λ₯Ό μ λ¬ν΄ μ£Όλ μ©λμ΄λ€.

 <br>
 <br>

> ### < λ©ν° μ€λ λ μ€μΌμ€λ§ >

- μ°μ  μμ λ°©μ (Priority)  
  μ°μ  μμκ° λμ μ€λ λκ° μ€ν μνλ₯Ό λ λ§μ΄ κ°μ§λ‘ μ€μΌμ€λ§
  μ°μ  μμλ μκ° μ ν, λ©λͺ¨λ¦¬ μκ΅¬λ λ± μΈλΆμμ μ΄λ―Έ μ€μ λ κΈ°μ€μ΄λ€.

- μν ν λΉ λ°©μ (Round-Robin)  
  μκ° ν λΉλμ μ ν΄μ νλμ μ€λ λλ₯Ό μ ν΄μ§ μκ°λ§νΌ μ€ννκ³  λ€μ λ€λ₯Έ μ€λ λλ₯Ό μ€ννλ λ°©μ

<br> <br>

## π μ€λ λλ₯Ό λ¬΄μμ  μμ±νλ©΄ μλλ μ΄μ 

κ° μ€λ λκ° μλ£ κ΅μ²΄λ  λ μ€λ λ κ°μ `λ¬Έλ§₯κ΅ν(Context Switching)`μ΄ λ°μνλ€. μ΄λ νμ¬κΉμ§μ μμ μνλ λ€μ μμμ νμν κ°μ’ λ°μ΄ν°λ₯Ό μ μ₯νκ³  μ½μ΄μ€λ μμμ κ°λ¦¬ν¨λ€.

μ΄λ¬ν λ¬Έλ§₯ κ΅νμ κ±Έλ¦¬λ μκ°μ΄ μ»€μ§λ©΄ μ»€μ§μλ‘, λ©ν° μ€λ λ©μ ν¨μ¨μ μ νλλ€. μ€νλ € λ§μ μμ λ¨μν κ³μ°μ μ±κΈ μ€λ λλ‘ λμνλ κ²μ΄ λ ν¨μ¨μ μΌ μ μλ€. λ°λΌμ λ§μ μμ μ€λ λλ₯Ό μ€ννλ κ²μ΄ μΈμ λ μ’μ μ±λ₯μ λ³΄μ΄λ κ²μ μλλ€.

μ€λ λκ° λλ¬΄ λ§μΌλ©΄ νλ‘κ·Έλ¨μ μ±λ₯μ΄ μ¬κ°νκ² λ¨μ΄μ§λ€. κ·Έ μν₯μ λκ°μ§λ‘ μ΄λ£¨μ΄μ§λ€.

    1.  μ ν΄μ§ λΆλμ μΌμ μ¬λ¬ μ€λ λμ λΆλ°°νλ©΄ μ€λ λ νλνλλ ν  μΌμ΄ λ³λ‘ μκ² λλ€. κ·Έλμ μ€λ λλ₯Ό μμνκ³  μ’λ£νλ λΉμ©μ΄ μ€μ λ‘ νλ μΌμ μμ μλνκ² λλ€.

    2. μννΈμ¨μ΄ μ€λ λκ° λλ¬΄ λ§μΌλ©΄ νμ λ νλμ¨μ΄ μμμ κ³΅μ νλλ° λλ λΉμ©μ΄ μ»€μ§λ€.

`μννΈμ¨μ΄ μ€λ λ`κ° λλ¬΄ λ§μΌλ©΄ `νλμ¨μ΄ μ€λ λ`λ₯Ό κ³΅μ νκ² λΆλ°°νλ λ° `μ€λ²ν€λ`κ° κ±Έλ¦°λ€. μ΄ μ€λ²ν€λ λλ¬Έμ μ±λ₯μ΄ μ¬κ°νκ² μ νλ  μ μλ€. μ€λ²ν€λλ μ’λ₯κ° λ€μνλ€.
<br>

> β³ μ΄μμ²΄μ λ μνμ¨μ΄ μ€λ λλ₯Ό νλμ¨μ΄ μ€λ λ(1μ½μ΄ 1μ€λ λ μ§μ - νμ΄νΌ μ€λ λ©μ 1μ½μ΄:nμ€λ λ μ§μ)μ μ§μ νμ¬ CPU μ½μ΄κ° νλ‘κ·Έλ¨μ μ€νμν¬ μ μλλ‘ νλ€.

    κ·Έλ λ€λ©΄? μ€ν κ°λ₯ν μ€λ λμ κ°μλ₯Ό νλμ¨μ΄ μ€λ λμ κ°μμ λ§μΆμ΄ μ ννλΌ!!

> ### < μ€λ λ λ μ§μ€ν° μν >

μννΈμ¨μ΄ μ€λ λλ₯Ό μΌμ μ€λ¨(suspend)νλ €λ©΄ νλμ¨μ΄ μ€λ λμ λ μ§μ€ν° μνλ₯Ό μ μ₯ν΄μΌ νλ€. κ·ΈλμΌ λ€μ νμ μ¬λΌμ΄μ€ λ μννΈμ¨μ΄ μ€λ λκ° κ°μ λ³΅κ΅¬ν  μ μκΈ° λλ¬Έμ΄λ€. μΌλ°μ μΌλ‘, μ€λ λ μ€μΌμ€λ¬λ νμ μ¬λΌμ΄μ€λ₯Ό μλΉν ν¬κ² μ‘κΈ° λλ¬Έμ λ μ§μ€ν°λ₯Ό μ μ₯νκ³  λ³΅κ΅¬νλ μ€λ²ν€λλ λ―Έλ―Ένλ€.

> ### < μ€λ λ μΊμ μν >

νλ νλ‘μΈμλ μΊμ λ©λͺ¨λ¦¬μ μλΉν μμ‘΄νλ€. μΊμ λ©λͺ¨λ¦¬λ λ©μΈ λ©λͺ¨λ¦¬λ³΄λ€ 10λ°°μμ 100λ°° λΉ λ₯΄λ€. μΊμμ μ μ€νλ κ²½μ°λ μ κ·Όμ΄ λΉ λ₯Ό λΏλλ¬ λ©λͺ¨λ¦¬ λ²μ€μ λμ­ν­λ μλͺ¨νμ§ μλλ€. νμ§λ§ μΊμλ λΉ λ₯΄κΈ΄ ν΄λ μ νν μμμ΄λ€.

μΊμκ° κ½ μ°Όμ λ, νλ‘μΈμκ° μ λ°μ΄ν°κ° λ€μ΄κ° μλ¦¬λ₯Ό λ§λ ¨νκΈ° μν΄ μΊμμμ λ°μ΄ν°λ₯Ό μ κ±°ν΄μΌ νλ€. λ³΄ν΅ μ κ±°ν  λ°μ΄ν°λ₯Ό κ³ λ₯Ό λ μ΅κ·Όμ μ¬μ©λμ§ μμ λ°μ΄ν°(Least Recently Use, LRU)λ₯Ό κ³ λ₯Έλ€. μ΄λ κ² νλ©΄ λκ° μ΄μ  νμ μ¬λΌμ΄μ€μ λ°μ΄ν°κ° μ νλλ€. κ·Έλ κΈ° λλ¬Έμ μ€λ λλ μλ‘ μλλ°©μ λ°μ΄νΈλ₯΄ μ κ±°νκ³€ νλ€. μ¦, μ€λ λκ° λλ¬΄ λ§μΌλ©΄ μλ‘ μΊμλ₯Ό μ°¨μ§νλ €κ³  λ€ν¬κΈ° λλ¬Έμ μ±λ₯μ΄ μ νλλ€.

> ### < μ€λ λλ₯Ό λ¬΄μ νμΌλ‘ λ§λ€μ μλ€λ©΄, νλ‘μΈμ€κ° λ§μμ§ λ μ±λ₯ ν₯μμ ν  μ μλ λ°©λ²μ΄ λ¬΄μμΌκΉ? >

- `λ³λ ¬μ²λ¦¬(Parallelism)`μ ν΅νμ¬ νλμ νλ‘κ·Έλ¨μ μ²λ¦¬ν΄ μλλ₯Ό ν₯μ μν¨λ€.
  <br>
  <br>

## π μ€λ λν(pool of threads)

νλ‘μΈμ€ μ€ `λ³λ ¬ μμμ²λ¦¬`κ° λ§μμ§λ©΄ μ€λ λ κ°μκ° μ¦κ°λκ³  κ·Έμλ°λ₯Έ μ€λ λμμ±κ³Ό μ€μΌμ€λ§μΌλ‘ μΈν΄ CPUκ° λ°λΉ μ Έ λ©λͺ¨λ¦¬ μ¬μ©λμ΄ λμ΄λλ€. λ°λΌμ μμ€νμ±λ₯μ΄ μ νλκ³ , κ°μμ€λ¬μ΄ λ³λ ¬μμμ ν­μ¦μ λ°λ₯Έ μ€λ λ ν­μ¦μ λ§μΌλ €λ©΄ μ€λ λ ν Thread Poolμ μ¬μ©ν΄μΌ νλ€.

μ€λ λ νμ μμμ²λ¦¬μ μ¬μ©λλ μ€λ λλ₯Ό μ νλ κ°μλ§νΌ μ ν΄λκ³  `μμν (Queue)`μ λ€μ΄μ€λ μμλ€μ νλμ© μ€λ λκ° λ§‘μ μ²λ¦¬νλ€. κ·Έλ κ² νλ©΄ μμμ²λ¦¬ μμ²­μ΄ ν­μ¦λμ΄λ μ€λ λμ μ μ²΄κ°μκ° λμ΄λμ§ μμΌλ―λ‘(μ νν΄μ νλμ© μ²λ¦¬νκΈ° λλ¬Έ) μμ€ν μ±λ₯μ΄ κΈκ²©ν μ νλμ§ μλλ€.

<!-- <p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTLegy%2Fbtq18oTtGcB%2FkxvtInKlhFKQ8MctYRSKEk%2Fimg.png" width="60%" heigth="60%"></p> -->

###### <div align="center">κ·Έλ¦Ό1. μ€λ λν</div>

<br>
<br>

## π μλμ° μ€λ λ λμ λ°©μ

μλμ°λ κΈ°λ³Έμ μΌλ‘ μ°μ  μμ κΈ°λ°μ `μ μ ν μ€μΌμ€λ§`μ μ¬μ©νλ€.

<br>
<br>
<br>

> [ Reference ]
>
> - [νλ‘μΈμ€μ μ€λ λ μλ²½ λΉκ΅(λ©ν° μ€λ λ/νλ‘μΈμ€, μ±κΈ/λ©ν° μ€λ λ)](https://student513.tistory.com/74)
> - [[Context Switching] νλ‘μΈμ€μ μ°λ λμμμ μ»¨νμ€νΈ μ€μμΉ­](https://agh2o.tistory.com/12)
> - [λ?€νμ€(Mutex)μ μΈλ§ν¬μ΄(Semaphore)μ μ°¨μ΄](https://medium.com/@kwoncharles/%EB%AE%A4%ED%85%8D%EC%8A%A4-mutex-%EC%99%80-%EC%84%B8%EB%A7%88%ED%8F%AC%EC%96%B4-semaphore-%EC%9D%98-%EC%B0%A8%EC%9D%B4-de6078d3c453)
> - [λ©ν°μ½μ΄ νλ‘κ·Έλλ°μμ νν λ°μνλ λ¬Έμ , 1λΆ](https://andromedarabbit.net/%EB%A9%80%ED%8B%B0%EC%BD%94%EC%96%B4-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%97%90%EC%84%9C-%ED%9D%94%ED%9E%88-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EB%AC%B8%EC%A0%9C-1%EB%B6%80/)
> - [[java] Thread Pool μ°λ λ νμ΄λ ?](https://cheershennah.tistory.com/170)
> - [Concurrency, Parallelism, Parallel and Concurrency](https://lob-dev.tistory.com/entry/Concurrency-Parallelism-Parallel-and-Concurrency)
