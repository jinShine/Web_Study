# 16. 디버깅 완벽 가이드

> **한 줄 정의:** IntelliJ 디버거를 활용하여 코드 실행 흐름을 한 줄씩 추적하고, 변수 값을 실시간으로 확인하며, 버그의 원인을 찾아내는 기술

---

## 목차
1. [디버깅이란?](#1-디버깅이란)
2. [println 디버깅 vs 디버거](#2-println-디버깅-vs-디버거)
3. [Breakpoint — 코드 멈추기](#3-breakpoint--코드-멈추기)
4. [디버그 모드 실행하기](#4-디버그-모드-실행하기)
5. [실행 제어 — Step Over / Step Into / Step Out](#5-실행-제어--step-over--step-into--step-out)
6. [변수 확인 — Variables와 Watches](#6-변수-확인--variables와-watches)
7. [조건부 Breakpoint](#7-조건부-breakpoint)
8. [Evaluate Expression — 실행 중 코드 평가](#8-evaluate-expression--실행-중-코드-평가)
9. [예외 Breakpoint — 에러 발생 지점 자동 탐지](#9-예외-breakpoint--에러-발생-지점-자동-탐지)
10. [실전 디버깅 시나리오](#10-실전-디버깅-시나리오)
11. [디버깅 팁 & 체크리스트](#11-디버깅-팁--체크리스트)
12. [실습 퀴즈](#12-실습-퀴즈)
13. [면접 대비 한 줄 요약](#13-면접-대비-한-줄-요약)

---

## 1. 디버깅이란?

> **한 줄 정의:** 코드에서 예상과 다르게 동작하는 부분(버그)을 찾아서 수정하는 과정

### 버그의 종류

| 종류 | 예시 | 발견 방법 |
|---|---|---|
| **컴파일 에러** | 문법 오류, 타입 불일치 | IDE가 빨간 줄로 알려줌 |
| **런타임 에러** | NullPointerException, StackOverflow | 실행하면 터짐 |
| **논리 에러** | 계산 결과가 틀림, 조건이 잘못됨 | **가장 찾기 어려움** → 디버거 필요 |

### 디버깅의 핵심 질문

```
"이 시점에서 이 변수의 값이 내가 예상한 값이 맞나?"
```

이 질문을 코드 한 줄 한 줄 따라가면서 확인하는 게 디버깅이다.

---

## 2. println 디버깅 vs 디버거

> **한 줄 정의:** println은 간단하지만 한계가 크고, 디버거는 강력하지만 익숙해져야 한다

### println 디버깅

```java
public OrderResponse createOrder(OrderCreateRequest request) {
    System.out.println("=== request: " + request);           // 여기 찍고
    Order order = orderMapper.toEntity(request);
    System.out.println("=== order: " + order);               // 여기 찍고
    Order saved = orderRepository.save(order);
    System.out.println("=== saved id: " + saved.getId());    // 여기도 찍고
    return orderMapper.toResponse(saved);                     // 다 지워야 함...
}
```

### 비교표

| | println 디버깅 | IntelliJ 디버거 |
|---|---|---|
| **속도** | 빠르게 한두 개 확인 | 초기 세팅 필요 |
| **변수 확인** | 찍은 것만 보임 | **모든 변수** 실시간 확인 |
| **코드 수정** | 매번 println 추가/삭제 | 코드 수정 없음 |
| **흐름 추적** | 어려움 | Step Over/Into로 한 줄씩 |
| **조건부 확인** | if문으로 감싸야 함 | 조건부 Breakpoint |
| **실무** | 간단한 확인용 | **메인 디버깅 도구** |

> 실무에서는 **디버거가 기본**이고, println은 정말 간단한 확인용으로만 쓴다

---

## 3. Breakpoint — 코드 멈추기

> **한 줄 정의:** 코드의 특정 라인에 빨간 점을 찍어서, 실행이 그 지점에서 멈추게 하는 것

### Breakpoint 설정 방법

```
IntelliJ에서:
1. 멈추고 싶은 라인의 왼쪽 여백(gutter) 클릭 → 🔴 빨간 점 생성
2. 다시 클릭하면 해제
3. 단축키: Cmd + F8 (Mac) / Ctrl + F8 (Windows)
```

### Breakpoint를 어디에 찍을까?

```java
@PostMapping
public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreateRequest request) {
    // 🔴 여기! — request 값이 제대로 들어왔는지 확인
    OrderResponse response = orderService.create(request);
    return ResponseEntity.ok(response);
}
```

```java
public OrderResponse create(OrderCreateRequest request) {
    // 🔴 여기! — 비즈니스 로직 시작 지점
    Order order = orderMapper.toEntity(request);
    // 🔴 여기! — 매핑 결과 확인
    Order saved = orderRepository.save(order);
    return orderMapper.toResponse(saved);
}
```

### Breakpoint 관리

```
View > Tool Windows > Breakpoints (Cmd + Shift + F8)

→ 모든 Breakpoint 목록 확인
→ 일괄 활성화/비활성화
→ 조건 설정
```

---

## 4. 디버그 모드 실행하기

> **한 줄 정의:** 일반 실행(Run) 대신 디버그 모드(Debug)로 실행해야 Breakpoint에서 멈춘다

### 실행 방법

```
일반 실행:  ▶️  Run (Shift + F10)           → Breakpoint 무시
디버그 실행: 🪲  Debug (Shift + F9)          → Breakpoint에서 멈춤
```

### Spring Boot 디버그 실행

```
방법 1: main 메서드 왼쪽 🪲 아이콘 클릭
방법 2: 상단 툴바 🪲 버튼 클릭
방법 3: Shift + F9
```

### 디버그 모드에서 요청 보내기

```
1. 디버그 모드로 Spring Boot 실행
2. Postman이나 Swagger UI에서 API 요청 전송
3. Breakpoint가 있는 라인에서 실행이 멈춤
4. IntelliJ로 돌아가서 변수 확인 & 코드 추적
```

---

## 5. 실행 제어 — Step Over / Step Into / Step Out

> **한 줄 정의:** Breakpoint에서 멈춘 후, 코드를 한 줄씩 또는 메서드 안으로 따라가며 실행하는 방법

### 핵심 4가지 동작

| 동작 | 단축키 (Mac) | 단축키 (Win) | 설명 |
|---|---|---|---|
| **Step Over** | F8 | F8 | 현재 줄 실행 → 다음 줄로 (메서드 안으로 안 들어감) |
| **Step Into** | F7 | F7 | 현재 줄의 메서드 **안으로** 들어감 |
| **Step Out** | Shift + F8 | Shift + F8 | 현재 메서드에서 **빠져나옴** (호출한 곳으로) |
| **Resume** | Cmd + Opt + R | F9 | 다음 Breakpoint까지 실행 계속 |

### 시각적 이해

```java
public OrderResponse create(OrderCreateRequest request) {
    Order order = orderMapper.toEntity(request);    // ← 🔴 여기서 멈춤
    Order saved = orderRepository.save(order);
    return orderMapper.toResponse(saved);
}
```

```
F8 (Step Over)  → orderMapper.toEntity() 실행하고 다음 줄로
                   "toEntity 안에서 뭐 하는지는 관심 없어"

F7 (Step Into)  → orderMapper.toEntity() 메서드 안으로 들어감
                   "toEntity 안에서 뭐가 잘못됐는지 보고 싶어"

Shift+F8 (Step Out) → 현재 메서드를 빠져나와서 호출한 곳으로 돌아감
                       "이 메서드는 문제 없네, 나갈래"
```

### 언제 뭘 쓸까?

```
Step Over  → 이 메서드는 문제없을 것 같아 → 건너뛰기
Step Into  → 이 메서드 안에서 뭔가 잘못된 것 같아 → 들어가기
Step Out   → 들어왔는데 여긴 문제없네 → 나가기
Resume     → 여기서 다음 Breakpoint까지 그냥 실행
```

---

## 6. 변수 확인 — Variables와 Watches

> **한 줄 정의:** 디버거가 멈춘 시점에서 모든 변수의 현재 값을 실시간으로 볼 수 있다

### Variables 패널

```
디버그 모드에서 Breakpoint에 멈추면 하단에 자동으로 표시:

Variables:
├── this = OrderService@1234
├── request = OrderCreateRequest(productId=1, quantity=3, address="서울시")
├── order = Order(id=null, productId=1, quantity=3, status=PENDING)
└── saved = null  ← 아직 실행 안 된 변수
```

### Watches — 특정 표현식 감시

```
원하는 표현식을 등록해두면 값이 계속 추적됨:

Watches:
├── request.getProductId()  → 1
├── order.getStatus()       → PENDING
├── saved != null           → false
└── request.getQuantity() > 10  → false
```

### Watch 추가 방법

```
방법 1: Variables 패널에서 변수 우클릭 → "Add to Watches"
방법 2: Watches 패널에서 + 버튼 → 표현식 직접 입력
방법 3: 코드에서 변수 선택 → Alt + F8 (Evaluate Expression)
```

### 인라인 변수 값 표시

```java
// IntelliJ가 코드 옆에 변수 값을 직접 보여줌
Order order = orderMapper.toEntity(request);    // order = Order{id=null, productId=1}
Order saved = orderRepository.save(order);       // saved = Order{id=42, productId=1}
return orderMapper.toResponse(saved);            // ← 여기서 멈춤
```

> 코드를 수정하지 않고도 모든 변수의 값을 확인할 수 있다!

---

## 7. 조건부 Breakpoint

> **한 줄 정의:** 특정 조건을 만족할 때만 Breakpoint에서 멈추도록 설정하는 기능

### 왜 필요한가?

```java
// 100명의 주문을 반복 처리하는데, 47번째만 에러가 남
for (Order order : orders) {
    // 🔴 일반 Breakpoint → 100번 다 멈춤 → 47번까지 F8 연타?!
    processOrder(order);
}
```

### 조건부 Breakpoint 설정

```
1. Breakpoint(🔴) 우클릭
2. Condition 필드에 Java 표현식 입력:
   order.getId() == 47
3. 이제 order.getId()가 47일 때만 멈춤!
```

### 자주 쓰는 조건 예시

```java
// 특정 ID
order.getId() == 47

// null 체크
order.getAddress() == null

// 특정 상태
order.getStatus() == OrderStatus.FAILED

// 문자열 비교
request.getEmail().contains("test")

// 복합 조건
order.getQuantity() > 100 && order.getStatus() == OrderStatus.PENDING
```

### 로그 Breakpoint (멈추지 않고 로그만)

```
1. Breakpoint 우클릭
2. "Suspend" 체크 해제
3. "Evaluate and log" 체크 → 표현식 입력:
   "Order ID: " + order.getId() + ", Status: " + order.getStatus()

→ 코드를 멈추지 않고 콘솔에 로그만 찍힘
→ println을 코드에 안 넣어도 됨!
```

---

## 8. Evaluate Expression — 실행 중 코드 평가

> **한 줄 정의:** 디버거가 멈춘 상태에서 임의의 Java 코드를 실행해볼 수 있는 기능

### 사용법

```
단축키: Alt + F8 (Mac/Win 동일)
또는: 메뉴 > Run > Evaluate Expression
```

### 활용 예시

```
Breakpoint에서 멈춘 상태에서:

> request.getProductId()
→ 1

> order.getStatus().name()
→ "PENDING"

> orderRepository.count()
→ 42

> order.getQuantity() * 1000
→ 3000

> orders.stream().filter(o -> o.getStatus() == OrderStatus.FAILED).count()
→ 3
```

### 핵심 포인트

```
✅ 현재 스코프의 모든 변수 접근 가능
✅ 메서드 호출 가능 (DB 조회도!)
✅ 복잡한 표현식도 OK
⚠️ 값을 변경하면 실제 실행에 영향을 줌 (주의!)
```

---

## 9. 예외 Breakpoint — 에러 발생 지점 자동 탐지

> **한 줄 정의:** 특정 예외가 발생하는 순간 자동으로 멈추게 하여, 에러 원인을 즉시 확인한다

### 왜 필요한가?

```
콘솔에 NullPointerException이 뜨는데...
스택 트레이스가 길어서 어디서 터진 건지 모르겠다?
→ 예외 Breakpoint!
```

### 설정 방법

```
1. Run > View Breakpoints (Cmd + Shift + F8)
2. 좌측 상단 + 버튼 → "Java Exception Breakpoints"
3. 예외 클래스 입력: NullPointerException
4. OK

→ 이제 NullPointerException이 발생하는 바로 그 줄에서 자동으로 멈춤!
```

### 자주 등록하는 예외

| 예외 | 용도 |
|---|---|
| `NullPointerException` | null 참조 버그 |
| `IllegalArgumentException` | 잘못된 인자 |
| `IndexOutOfBoundsException` | 배열/리스트 범위 초과 |
| `ConstraintViolationException` | DB 제약조건 위반 |

---

## 10. 실전 디버깅 시나리오

> 실제 개발에서 마주치는 버그 상황과 디버깅 접근법

### 시나리오 1: "API 요청은 보냈는데 응답이 이상해요"

```
접근법:
1. Controller 메서드 첫 줄에 Breakpoint
2. request 값 확인 → 원하는 값이 맞나?
3. Step Over로 Service 호출 결과 확인
4. 값이 이상한 지점 발견 → Step Into로 들어가기
```

### 시나리오 2: "특정 데이터에서만 에러가 나요"

```
접근법:
1. 조건부 Breakpoint 설정 (문제 데이터 조건)
2. 해당 데이터가 처리될 때만 멈춤
3. Variables 패널에서 값 확인
4. Evaluate Expression으로 추가 검증
```

### 시나리오 3: "NullPointerException이 나는데 어디서 나는지 모르겠어요"

```
접근법:
1. 예외 Breakpoint 등록: NullPointerException
2. 디버그 모드로 실행
3. NPE가 발생하는 바로 그 줄에서 자동 멈춤
4. Variables에서 어떤 변수가 null인지 즉시 확인
```

### 디버깅 흐름 요약

```
1. 버그 재현 조건 파악
        ↓
2. 의심 지점에 Breakpoint 설정
        ↓
3. 디버그 모드로 실행 + 요청 전송
        ↓
4. 멈춘 지점에서 변수 값 확인
        ↓
5. Step Over/Into로 흐름 추적
        ↓
6. 원인 발견 → 코드 수정
        ↓
7. 다시 실행해서 수정 확인
```

---

## 11. 디버깅 팁 & 체크리스트

### 디버깅 전 체크리스트

```
□ 에러 메시지를 정확히 읽었는가?
□ 스택 트레이스에서 "내 코드" 라인을 찾았는가?
□ 어떤 입력에서 에러가 나는지 재현 가능한가?
□ 최근에 뭘 바꿨는지 기억나는가? (git diff 확인)
```

### 자주 쓰는 단축키 정리

| 동작 | Mac | Windows |
|---|---|---|
| Breakpoint 토글 | `Cmd + F8` | `Ctrl + F8` |
| 디버그 실행 | `Shift + F9` | `Shift + F9` |
| Step Over | `F8` | `F8` |
| Step Into | `F7` | `F7` |
| Step Out | `Shift + F8` | `Shift + F8` |
| Resume | `Cmd + Opt + R` | `F9` |
| Evaluate Expression | `Alt + F8` | `Alt + F8` |
| Breakpoint 목록 | `Cmd + Shift + F8` | `Ctrl + Shift + F8` |

### 꿀팁

```
1. Breakpoint는 적게, 핵심 지점에만
   → 너무 많으면 F8 연타 지옥

2. 의심 범위를 좁혀가기 (이분 탐색)
   → 코드 중간에 Breakpoint → 여기까지는 정상? → 범위 절반으로

3. 로그 Breakpoint 적극 활용
   → 코드 수정 없이 변수 값 추적

4. 디버깅 후 Breakpoint 정리
   → Cmd + Shift + F8 → 불필요한 것 삭제
```

---

## 12. 실습 퀴즈

### Q1. Step Over와 Step Into의 차이는?

<details>
<summary>정답 보기</summary>

- **Step Over (F8)** — 현재 줄을 실행하고 다음 줄로 넘어감. 메서드 내부로 들어가지 않음.
- **Step Into (F7)** — 현재 줄에서 호출하는 메서드 내부로 들어감.

"이 메서드 안이 의심되면 Step Into, 아니면 Step Over"

</details>

### Q2. 1000개 데이터 중 id=500인 것만 디버깅하고 싶으면?

<details>
<summary>정답 보기</summary>

**조건부 Breakpoint** 사용:
1. Breakpoint 우클릭
2. Condition에 `data.getId() == 500` 입력
3. id가 500인 데이터가 처리될 때만 멈춤

</details>

### Q3. println 대신 코드 수정 없이 로그를 찍는 방법은?

<details>
<summary>정답 보기</summary>

**로그 Breakpoint** 사용:
1. Breakpoint 우클릭
2. "Suspend" 체크 해제 (멈추지 않음)
3. "Evaluate and log" 체크 → 로그 표현식 입력
4. 코드를 멈추지 않고 콘솔에 로그만 출력됨

</details>

---

## 13. 면접 대비 한 줄 요약

| 키워드 | 한 줄 요약 |
|---|---|
| **Breakpoint** | 코드의 특정 라인에서 실행을 일시 정지시키는 디버거의 핵심 기능이다 |
| **Step Over (F8)** | 현재 줄을 실행하고 다음 줄로 넘어가며, 메서드 내부로 들어가지 않는다 |
| **Step Into (F7)** | 현재 줄에서 호출하는 메서드의 내부로 진입하여 추적한다 |
| **Step Out** | 현재 메서드를 빠져나와 호출했던 곳으로 돌아간다 |
| **조건부 Breakpoint** | 특정 조건을 만족할 때만 멈추도록 설정하여, 대량 데이터 디버깅에 유용하다 |
| **Evaluate Expression** | 디버거가 멈춘 상태에서 임의의 Java 코드를 실행하여 값을 확인할 수 있다 |
| **예외 Breakpoint** | 특정 예외가 발생하는 순간 자동으로 멈추어 에러 원인을 즉시 파악할 수 있다 |
| **Variables 패널** | 현재 스코프의 모든 변수 값을 실시간으로 표시한다 |
| **Watches** | 특정 표현식을 등록하여 디버깅 중 값 변화를 지속적으로 추적한다 |
| **로그 Breakpoint** | 코드를 수정하지 않고 콘솔에 로그를 출력할 수 있는 Breakpoint 기법이다 |
