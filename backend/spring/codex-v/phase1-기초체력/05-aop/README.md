# 05. AOP 실전

> 오늘의 목표: 로깅, 실행 시간 측정 같은 공통 로직을 왜 AOP로 분리하는지 이해하고, 프록시 기반 동작을 설명할 수 있다.

---

## 오늘 끝나면 되는 것

- AOP가 해결하려는 문제를 말할 수 있다.
- Advice, Pointcut, Join Point 개념을 구분할 수 있다.
- `@Around`를 이용한 실행 시간 측정 예제를 직접 만들 수 있다.
- self-invocation 문제가 왜 생기는지 설명할 수 있다.

---

## 머릿속 그림

```text
클라이언트
  -> 프록시 객체
     -> 부가 기능 실행
     -> 실제 대상 객체 호출
```

AOP는 대상 객체를 직접 바꾸는 것이 아니라,
대상 앞뒤에 끼어드는 프록시를 통해 동작합니다.

---

## 왜 필요한가

예를 들어 모든 서비스 메서드마다 실행 시간을 찍는다고 해봅시다.

```java
public void createOrder() {
    long start = System.currentTimeMillis();
    // 비즈니스 로직
    long end = System.currentTimeMillis();
    log.info("time={}", end - start);
}
```

이 코드가 서비스마다 들어가면:

- 중복 증가
- 비즈니스 로직 가독성 저하
- 수정 포인트 분산

이럴 때 AOP를 씁니다.

---

## 핵심 용어 한 번에 정리

- Aspect: 공통 관심사 묶음
- Advice: 실제로 실행되는 부가 로직
- Pointcut: 어디에 적용할지 고르는 조건
- Join Point: 적용 가능한 실행 지점

처음엔 이 정도 감각이면 충분합니다.

> "어디에, 무엇을, 어떻게 끼워넣을 것인가"가 AOP다.

---

## 가장 자주 쓰는 예제

```java
@Slf4j
@Aspect
@Component
public class ExecutionTimeAspect {

    @Around("execution(* com.example..service..*(..))")
    public Object measure(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            long end = System.currentTimeMillis();
            log.info("method={} time={}ms", joinPoint.getSignature(), end - start);
        }
    }
}
```

포인트:

- 서비스 계층에 있는 메서드에만 적용
- 원래 메서드 호출은 `proceed()`
- 전후로 공통 로직 추가 가능

---

## 언제 AOP가 좋은가

잘 맞는 경우:

- 로깅
- 실행 시간 측정
- 공통 보안 체크
- 트랜잭션 처리

안 맞는 경우:

- 비즈니스 핵심 규칙
- 서비스마다 다르게 동작하는 복잡한 로직

AOP는 "공통적"이고 "횡단적"인 관심사에 쓰는 것이 핵심입니다.

---

## self-invocation 문제

```java
public void outer() {
    inner();
}

@TrackTime
public void inner() {
}
```

같은 객체 내부에서 `this.inner()`처럼 호출하면 프록시를 거치지 않아 AOP가 적용되지 않을 수 있습니다.

이것이 면접에서 자주 나오는 self-invocation 문제입니다.

---

## 자주 하는 실수

- AOP를 만능 리팩터링 도구처럼 쓰는 것
- Pointcut 범위를 너무 넓게 잡는 것
- 프록시 기반이라는 사실을 잊고 self-invocation을 놓치는 것
- 로그를 너무 많이 남겨 오히려 읽기 어렵게 만드는 것

---

## 면접 체크

1. AOP는 왜 사용하나요?
2. `@Around` Advice는 어떤 장점이 있나요?
3. Spring AOP가 프록시 기반이라고 하는 이유는 무엇인가요?
4. self-invocation 문제가 왜 발생하나요?

---

## 직접 해보기

1. 서비스 계층 메서드 실행 시간을 찍는 Aspect를 작성해보세요.
2. 특정 어노테이션이 붙은 메서드에만 적용되도록 Pointcut을 바꿔보세요.
3. 동일 클래스 내부 호출에서 Aspect가 왜 안 붙는지 실험해보세요.

---

## 다음 주제 연결

공통 로직을 분리했다면, 이제 실패 상황도 구조적으로 다뤄야 합니다. 다음에는 예외 처리 전략을 정리합니다.
