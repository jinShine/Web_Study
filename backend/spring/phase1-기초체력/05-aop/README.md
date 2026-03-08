# 05. AOP 실전

> **AOP(Aspect-Oriented Programming)** — 핵심 비즈니스 로직과 부가 기능(로깅, 트랜잭션, 보안 등)을 분리하는 프로그래밍 패러다임

"모든 메서드에 로그 찍는 코드를 복붙하고 있다면, 그건 AOP로 해결해야 할 문제다."

---

## 1. AOP가 왜 필요한가?

### 문제 상황 — 코드 중복 지옥

```java
@Service
public class OrderService {
    public void createOrder(Order order) {
        long start = System.currentTimeMillis();           // 😩 중복
        log.info("createOrder 시작");                       // 😩 중복

        // === 핵심 로직 ===
        orderRepository.save(order);
        // ==================

        log.info("createOrder 끝, 소요시간: {}ms",           // 😩 중복
            System.currentTimeMillis() - start);
    }

    public Order getOrder(Long id) {
        long start = System.currentTimeMillis();           // 😩 또 중복
        log.info("getOrder 시작");                          // 😩 또 중복

        // === 핵심 로직 ===
        Order order = orderRepository.findById(id);
        // ==================

        log.info("getOrder 끝, 소요시간: {}ms",              // 😩 또 중복
            System.currentTimeMillis() - start);
        return order;
    }
}
```

**문제:**
- 모든 메서드에 로깅/시간 측정 코드가 반복
- 핵심 로직과 부가 기능이 뒤섞임
- 부가 기능 수정하면 모든 메서드를 다 고쳐야 함

### AOP 해결 — 부가 기능을 한 곳에서 관리

```
Before AOP:
  OrderService.createOrder() = 로깅 + 핵심로직 + 로깅
  OrderService.getOrder()    = 로깅 + 핵심로직 + 로깅
  PaymentService.pay()       = 로깅 + 핵심로직 + 로깅

After AOP:
  LoggingAspect               = 로깅 (한 곳에서 관리!)
  OrderService.createOrder()  = 핵심로직만
  OrderService.getOrder()     = 핵심로직만
  PaymentService.pay()        = 핵심로직만
```

---

## 2. AOP 핵심 용어

| 용어 | 영어 | 한 줄 정의 | 비유 |
|------|------|-----------|------|
| **Aspect** | 관점 | 부가 기능을 모듈화한 클래스 | "로깅 담당자" |
| **Advice** | 조언 | 부가 기능의 실제 구현 (언제 실행할지) | "언제 개입할지" |
| **JoinPoint** | 합류 지점 | Advice가 적용될 수 있는 지점 (메서드 실행) | "개입 가능한 모든 지점" |
| **Pointcut** | 적용 대상 | 실제로 Advice를 적용할 대상을 선별하는 표현식 | "이 메서드에만 적용해" |
| **Target** | 대상 객체 | AOP가 적용되는 실제 객체 | "로깅이 걸리는 Service" |
| **Proxy** | 프록시 | Target을 감싸서 Advice를 실행하는 대리 객체 | "대리인" |

### 흐름도

```
클라이언트 → [Proxy] → [Advice 실행] → [Target 메서드 실행] → 결과 반환
              ↑
         Spring이 자동 생성
```

> Spring AOP는 **프록시 패턴**으로 동작한다.
> 클라이언트는 Target을 직접 호출하는 줄 알지만, 실제로는 Proxy가 중간에서 가로챈다.

---

## 3. Advice 종류 5가지

```java
@Aspect
@Component  // 빈으로 등록해야 동작한다!
public class LoggingAspect {

    // 1. @Before — 메서드 실행 전
    @Before("execution(* com.example.service.*.*(..))")
    public void beforeLog(JoinPoint joinPoint) {
        log.info("[Before] {}", joinPoint.getSignature().getName());
    }

    // 2. @AfterReturning — 메서드 정상 완료 후
    @AfterReturning(value = "execution(* com.example.service.*.*(..))",
                    returning = "result")
    public void afterReturningLog(JoinPoint joinPoint, Object result) {
        log.info("[AfterReturning] {} → 결과: {}",
            joinPoint.getSignature().getName(), result);
    }

    // 3. @AfterThrowing — 메서드 예외 발생 시
    @AfterThrowing(value = "execution(* com.example.service.*.*(..))",
                   throwing = "ex")
    public void afterThrowingLog(JoinPoint joinPoint, Exception ex) {
        log.error("[AfterThrowing] {} → 예외: {}",
            joinPoint.getSignature().getName(), ex.getMessage());
    }

    // 4. @After — 메서드 완료 후 (성공/실패 무관, finally처럼)
    @After("execution(* com.example.service.*.*(..))")
    public void afterLog(JoinPoint joinPoint) {
        log.info("[After] {} 완료", joinPoint.getSignature().getName());
    }

    // 5. @Around — 메서드 전후 모두 ⭐ 가장 강력
    @Around("execution(* com.example.service.*.*(..))")
    public Object aroundLog(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        log.info("[Around-시작] {}", joinPoint.getSignature().getName());

        Object result = joinPoint.proceed();  // 🔥 실제 메서드 실행!

        long end = System.currentTimeMillis();
        log.info("[Around-끝] {} ({}ms)", joinPoint.getSignature().getName(), end - start);
        return result;
    }
}
```

### Advice 실행 순서

```
@Around (전반부)
  └→ @Before
      └→ Target 메서드 실행
  └→ @AfterReturning (성공 시) 또는 @AfterThrowing (실패 시)
  └→ @After (항상)
@Around (후반부)
```

### 비교표

| Advice | 실행 시점 | proceed() 필요? | 반환값 조작 가능? | 사용 빈도 |
|--------|----------|-----------------|----------------|----------|
| `@Before` | 메서드 실행 전 | ❌ | ❌ | ⭐⭐⭐ |
| `@AfterReturning` | 정상 반환 후 | ❌ | 읽기만 가능 | ⭐⭐ |
| `@AfterThrowing` | 예외 발생 후 | ❌ | ❌ | ⭐⭐ |
| `@After` | 항상 (finally) | ❌ | ❌ | ⭐ |
| `@Around` | 전후 모두 | ✅ 필수 | ✅ 가능 | ⭐⭐⭐⭐⭐ |

> **실무에서 90%는 `@Around`를 쓴다.** 가장 유연하고 강력하다.

---

## 4. Pointcut 표현식 — "어디에 적용할지"

### execution 표현식 (가장 많이 씀)

```
execution(접근제어자? 반환타입 패키지.클래스.메서드(파라미터))
```

| 표현식 | 의미 |
|--------|------|
| `execution(* com.example.service.*.*(..))` | service 패키지의 모든 클래스, 모든 메서드 |
| `execution(* com.example.service..*.*(..))` | service 패키지와 **하위 패키지** 포함 |
| `execution(public * *(..))` | 모든 public 메서드 |
| `execution(* create*(..))` | create로 시작하는 모든 메서드 |
| `execution(* com.example.service.OrderService.*(..))` | OrderService의 모든 메서드 |
| `execution(String com.example.service.*.*(..))` | 반환타입이 String인 메서드만 |

### 와일드카드 정리

| 기호 | 의미 | 예시 |
|------|------|------|
| `*` | 아무 값 1개 | `*Service` → OrderService, PaymentService |
| `..` | 0개 이상 | `(..)` → 파라미터 뭐든 OK, `service..` → 하위 패키지 포함 |
| `+` | 해당 타입과 하위 타입 | `OrderService+` → OrderService와 자식 클래스 |

### @annotation으로 커스텀 적용

특정 어노테이션이 붙은 메서드에만 AOP 적용:

```java
// 1. 커스텀 어노테이션 정의
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecutionTime {
}

// 2. Aspect에서 사용
@Aspect
@Component
public class TimingAspect {

    @Around("@annotation(LogExecutionTime)")  // 이 어노테이션이 붙은 메서드만!
    public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long time = System.currentTimeMillis() - start;
        log.info("{} 실행시간: {}ms", joinPoint.getSignature().getName(), time);
        return result;
    }
}

// 3. 적용하고 싶은 메서드에 붙이기
@Service
public class OrderService {

    @LogExecutionTime  // 이 메서드만 시간 측정됨
    public void createOrder(Order order) {
        orderRepository.save(order);
    }

    // 이 메서드는 시간 측정 안 됨
    public Order getOrder(Long id) {
        return orderRepository.findById(id);
    }
}
```

> 실무 팁: `@annotation` 방식이 가장 깔끔하다. 필요한 메서드에만 골라서 붙일 수 있으니까.

### Pointcut 재사용 — `@Pointcut`

```java
@Aspect
@Component
public class LoggingAspect {

    // Pointcut을 따로 정의 → 재사용 가능
    @Pointcut("execution(* com.example.service..*.*(..))")
    private void serviceLayer() {}

    @Before("serviceLayer()")
    public void beforeLog(JoinPoint joinPoint) {
        log.info("[Before] {}", joinPoint.getSignature().getName());
    }

    @AfterReturning("serviceLayer()")
    public void afterLog(JoinPoint joinPoint) {
        log.info("[After] {}", joinPoint.getSignature().getName());
    }
}
```

### Pointcut 조합

```java
@Pointcut("execution(* com.example.service..*.*(..))")
private void serviceLayer() {}

@Pointcut("execution(* com.example.repository..*.*(..))")
private void repositoryLayer() {}

// AND — 둘 다 만족
@Before("serviceLayer() && repositoryLayer()")

// OR — 하나라도 만족
@Before("serviceLayer() || repositoryLayer()")

// NOT — 제외
@Before("serviceLayer() && !repositoryLayer()")
```

---

## 5. JoinPoint로 메서드 정보 가져오기

```java
@Before("execution(* com.example.service.*.*(..))")
public void logMethodInfo(JoinPoint joinPoint) {

    // 메서드 이름
    String methodName = joinPoint.getSignature().getName();
    // → "createOrder"

    // 클래스 이름
    String className = joinPoint.getTarget().getClass().getSimpleName();
    // → "OrderService"

    // 파라미터 값들
    Object[] args = joinPoint.getArgs();
    // → [Order{id=1, name="맥북"}]

    // 전체 시그니처
    String fullSignature = joinPoint.getSignature().toShortString();
    // → "OrderService.createOrder(..)"

    log.info("[{}] {} 호출, 파라미터: {}", className, methodName, Arrays.toString(args));
}
```

### ProceedingJoinPoint (`@Around` 전용)

```java
@Around("execution(* com.example.service.*.*(..))")
public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {

    // proceed() — 실제 메서드 실행
    Object result = joinPoint.proceed();

    // proceed(args) — 파라미터를 바꿔서 실행할 수도 있다!
    Object[] modifiedArgs = { new Order("수정된 주문") };
    Object result2 = joinPoint.proceed(modifiedArgs);

    return result;
}
```

> `JoinPoint`는 읽기 전용, `ProceedingJoinPoint`는 실행 제어까지 가능.

---

## 6. 실전 예제 모음

### 예제 1: API 실행 시간 측정

```java
@Aspect
@Component
@Slf4j
public class ExecutionTimeAspect {

    @Around("@annotation(LogExecutionTime)")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().toShortString();
        long start = System.currentTimeMillis();

        try {
            return joinPoint.proceed();
        } finally {
            long time = System.currentTimeMillis() - start;
            if (time > 1000) {
                log.warn("🐢 SLOW: {} ({}ms)", methodName, time);
            } else {
                log.info("⚡ {} ({}ms)", methodName, time);
            }
        }
    }
}
```

### 예제 2: 파라미터/결과 로깅

```java
@Aspect
@Component
@Slf4j
public class ApiLoggingAspect {

    @Around("execution(* com.example.controller..*.*(..))")
    public Object logApi(ProceedingJoinPoint joinPoint) throws Throwable {
        String method = joinPoint.getSignature().toShortString();
        Object[] args = joinPoint.getArgs();

        log.info("📥 요청: {} | 파라미터: {}", method, Arrays.toString(args));

        try {
            Object result = joinPoint.proceed();
            log.info("📤 응답: {} | 결과: {}", method, result);
            return result;
        } catch (Exception e) {
            log.error("💥 에러: {} | 예외: {}", method, e.getMessage());
            throw e;  // 예외를 다시 던져야 정상적인 예외 처리 흐름 유지
        }
    }
}
```

### 사용법: 예제 1 — `@annotation` 방식 (골라서 적용)

`@annotation(LogExecutionTime)` → 어노테이션을 **붙인 메서드에만** 동작한다.

**Step 1:** 커스텀 어노테이션 만들기
```java
// 📁 com/example/annotation/LogExecutionTime.java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecutionTime {
}
```

**Step 2:** Aspect 클래스 만들기 (위의 예제 1 코드)
```java
// 📁 com/example/aspect/ExecutionTimeAspect.java
@Aspect
@Component
@Slf4j
public class ExecutionTimeAspect { ... }  // 예제 1 코드 그대로
```

**Step 3:** 측정하고 싶은 메서드에 어노테이션 붙이기
```java
@Service
@RequiredArgsConstructor
public class OrderService {

    @LogExecutionTime   // ← 이것만 붙이면 끝! 시간 측정됨
    public void createOrder(Order order) {
        orderRepository.save(order);
    }

    // 이 메서드는 어노테이션 없음 → 시간 측정 안 됨
    public Order getOrder(Long id) {
        return orderRepository.findById(id);
    }
}

@RestController
@RequiredArgsConstructor
public class OrderController {

    @LogExecutionTime   // ← Controller에도 붙일 수 있다!
    @PostMapping("/api/orders")
    public String createOrder(@RequestBody Order order) {
        orderService.createOrder(order);
        return "주문 완료";
    }
}
```

**콘솔 출력:**
```
⚡ OrderService.createOrder(..) (45ms)
⚡ OrderController.createOrder(..) (52ms)
🐢 SLOW: PaymentService.processPayment(..) (2340ms)   ← 1초 넘으면 경고!
```

> 내가 원하는 메서드에만 골라서 붙일 수 있다 → **선택적 적용**

---

### 사용법: 예제 2 — `execution` 방식 (자동 전체 적용)

`execution(* com.example.controller..*.*(..))` → controller 패키지의 **모든 메서드에 자동 적용**.

**Step 1:** Aspect 클래스 만들기 (위의 예제 2 코드)
```java
// 📁 com/example/aspect/ApiLoggingAspect.java
@Aspect
@Component
@Slf4j
public class ApiLoggingAspect { ... }  // 예제 2 코드 그대로
```

**Step 2:** 끝. 더 할 거 없다!
```java
// controller 패키지에 있기만 하면 자동으로 로깅됨
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    // 어노테이션 안 붙여도 자동 로깅!
    @PostMapping
    public String createOrder(@RequestBody Order order) {
        orderService.createOrder(order);
        return "주문 완료";
    }

    // 이것도 자동 로깅!
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);
    }
}
```

**콘솔 출력:**
```
📥 요청: OrderController.createOrder(..) | 파라미터: [Order{productName="맥북", quantity=1}]
📤 응답: OrderController.createOrder(..) | 결과: 주문 완료

📥 요청: OrderController.getOrder(..) | 파라미터: [1]
📤 응답: OrderController.getOrder(..) | 결과: Order{id=1, productName="맥북"}

📥 요청: OrderController.getOrder(..) | 파라미터: [999]
💥 에러: OrderController.getOrder(..) | 예외: 주문을 찾을 수 없습니다
```

> 만들어두면 모든 Controller에 자동 적용 → **일괄 적용**

---

### 언제 뭘 쓰나?

| 상황 | 방식 | 이유 |
|------|------|------|
| 특정 메서드만 시간 측정하고 싶다 | `@annotation` | 골라서 붙일 수 있으니까 |
| 모든 API 요청/응답을 로깅하고 싶다 | `execution` | 하나하나 붙이기 귀찮으니까 |
| 특정 권한 체크가 필요한 API만 | `@annotation` | `@AdminOnly` 같은 커스텀 어노테이션 |
| Service 계층 전체 트랜잭션 로깅 | `execution` | 전체 감시용 |

---

### 프로젝트 폴더 구조 (실전)

```
com.example.myapp/
├── MyApplication.java
├── annotation/                    ← 커스텀 어노테이션
│   └── LogExecutionTime.java
├── aspect/                        ← AOP 클래스 모아두는 곳
│   ├── ExecutionTimeAspect.java
│   └── ApiLoggingAspect.java
├── controller/
│   └── OrderController.java
├── service/
│   └── OrderService.java
└── repository/
    └── OrderRepository.java
```

---

### 예제 3: 트랜잭션과 AOP의 관계

```java
// Spring의 @Transactional은 사실 AOP로 구현되어 있다!
@Service
public class OrderService {

    @Transactional  // ← 이것도 AOP다!
    public void createOrder(Order order) {
        orderRepository.save(order);
        paymentService.processPayment(order);
        // 중간에 예외 발생 시 → AOP가 자동 롤백
    }
}
```

```
@Transactional의 실제 동작:

[TransactionAspect]
  1. 트랜잭션 시작 (BEGIN)
  2. createOrder() 실행
  3-a. 성공 → COMMIT
  3-b. 예외 → ROLLBACK
```

> `@Transactional`은 Spring AOP의 가장 대표적인 활용 사례다.
> Phase 3에서 자세히 다룰 것.

---

## 7. AOP 적용 시 주의사항

### 7-1. Self-invocation 문제

```java
@Service
public class OrderService {

    @LogExecutionTime
    public void createOrder(Order order) {
        orderRepository.save(order);
        this.notify(order);  // 💥 AOP가 적용 안 된다!
    }

    @LogExecutionTime
    public void notify(Order order) {
        // 내부 호출이라 Proxy를 거치지 않음 → AOP 동작 X
    }
}
```

**이유:** Spring AOP는 **Proxy** 기반이다. 같은 클래스 안에서 `this.메서드()`를 호출하면 Proxy를 안 거친다.

```
외부 호출:  Client → [Proxy] → OrderService.createOrder()  ✅ AOP 동작
내부 호출:  OrderService.createOrder() → this.notify()      ❌ AOP 안 됨
```

**해결:** 내부 호출 대신 별도 클래스로 분리하거나, `@Transactional`도 같은 문제가 있으니 주의.

### 7-2. @Around에서 proceed() 빼먹지 마라

```java
@Around("execution(* com.example.service.*.*(..))")
public Object badAround(ProceedingJoinPoint joinPoint) throws Throwable {
    log.info("시작!");
    // joinPoint.proceed() 호출을 빼먹으면 → 원본 메서드가 실행 안 된다!
    return null;  // 💥 원본 메서드 실행 안 됨!
}
```

### 7-3. 예외를 삼키지 마라

```java
// ❌ 나쁜 예
@Around("execution(* com.example.service.*.*(..))")
public Object swallowException(ProceedingJoinPoint joinPoint) {
    try {
        return joinPoint.proceed();
    } catch (Throwable e) {
        log.error("에러 발생: {}", e.getMessage());
        return null;  // 💥 예외를 삼켜버리면 호출자가 에러를 모른다!
    }
}

// ✅ 좋은 예
@Around("execution(* com.example.service.*.*(..))")
public Object goodAround(ProceedingJoinPoint joinPoint) throws Throwable {
    try {
        return joinPoint.proceed();
    } catch (Throwable e) {
        log.error("에러 발생: {}", e.getMessage());
        throw e;  // ✅ 반드시 다시 던져라!
    }
}
```

---

## 8. Spring AOP vs AspectJ

| 구분 | Spring AOP | AspectJ |
|------|-----------|---------|
| **구현 방식** | 런타임 프록시 | 컴파일/로드 타임 위빙 |
| **JoinPoint** | 메서드 실행만 | 메서드, 필드, 생성자 등 |
| **Self-invocation** | ❌ 안 됨 | ✅ 됨 |
| **성능** | 약간 느림 (프록시 오버헤드) | 빠름 |
| **설정 난이도** | 쉬움 | 복잡함 |
| **실무 사용** | ⭐⭐⭐⭐⭐ 대부분 이걸 씀 | ⭐ 특수한 경우만 |

> 실무에서는 **Spring AOP로 충분**하다. AspectJ는 면접에서 차이점만 알면 된다.

---

## 9. AOP 설정

### 의존성 추가 (build.gradle)

```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-aop'
}
```

### AOP 활성화

```java
@SpringBootApplication
// Spring Boot에서는 자동 활성화됨! 별도 설정 불필요
// 명시적으로 하고 싶다면:
// @EnableAspectJAutoProxy
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

> `spring-boot-starter-aop`만 추가하면 `@EnableAspectJAutoProxy`는 자동으로 적용된다.

---

## 면접 대비 한 줄 요약

| 질문 | 한 줄 답변 |
|------|-----------|
| AOP란? | 핵심 로직과 부가 기능(횡단 관심사)을 분리하여 모듈화하는 프로그래밍 패러다임 |
| Aspect란? | 부가 기능(Advice) + 적용 대상(Pointcut)을 합친 모듈 |
| Advice 중 가장 많이 쓰는 것은? | `@Around`. 메서드 전후를 모두 제어할 수 있어 가장 유연함 |
| Pointcut 표현식 기본 형태는? | `execution(반환타입 패키지.클래스.메서드(파라미터))` |
| `@annotation`은 언제 쓰나? | 특정 커스텀 어노테이션이 붙은 메서드에만 AOP를 적용하고 싶을 때 |
| Spring AOP의 동작 원리는? | 런타임에 프록시 객체를 생성하여, 대상 메서드 호출을 가로채 Advice를 실행 |
| Self-invocation 문제란? | 같은 클래스 내부에서 `this.method()` 호출 시 프록시를 거치지 않아 AOP가 적용 안 되는 현상 |
| `@Transactional`과 AOP 관계는? | `@Transactional`은 AOP로 구현됨. 메서드 전후로 트랜잭션 시작/커밋/롤백을 처리 |
| Spring AOP vs AspectJ 차이? | Spring AOP는 런타임 프록시(메서드만), AspectJ는 컴파일 타임 위빙(필드/생성자까지) |
