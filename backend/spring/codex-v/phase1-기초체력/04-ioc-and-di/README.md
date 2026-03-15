# 04. IoC와 DI 깊게 파기

> 오늘의 목표: Spring이 왜 편한지의 핵심인 `컨테이너`와 `의존성 주입`을 스스로 설명할 수 있다.

---

## 오늘 끝나면 되는 것

- IoC와 DI의 차이를 말할 수 있다.
- Bean이 무엇이고 누가 만들고 관리하는지 이해한다.
- 생성자 주입이 왜 기본 선택인지 설명할 수 있다.
- `@Component`, `@Service`, `@Repository`, `@Bean`을 구분할 수 있다.

---

## 머릿속 그림

```text
개발자: 필요한 객체를 직접 new 하지 않는다
Spring Container: 객체를 만들고 연결해준다
```

즉:

- IoC: 제어권이 개발자에서 컨테이너로 넘어감
- DI: 그 제어를 실제로 수행하는 방법 중 하나

---

## 왜 필요한가

### 직접 생성하는 코드

```java
public class OrderService {
    private final OrderRepository repository = new MemoryOrderRepository();
}
```

문제:

- 구현체가 바뀌면 서비스 코드도 수정해야 함
- 테스트 대체 객체 넣기가 어려움
- 결합도가 높아짐

### 주입받는 코드

```java
@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

좋아지는 점:

- 인터페이스에 의존할 수 있음
- 구현 교체가 쉬움
- 테스트에서 가짜 객체를 넣기 쉬움

---

## Bean과 컨테이너

Bean은 Spring이 관리하는 객체입니다.

컨테이너는 아래를 합니다.

- 객체 생성
- 의존 관계 연결
- 생명주기 관리

대표 컨테이너가 `ApplicationContext`입니다.

---

## Bean 등록 방법 두 가지

### 1. 컴포넌트 스캔

```java
@Repository
public class MemoryOrderRepository implements OrderRepository {
}

@Service
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

### 2. 수동 등록

```java
@Configuration
public class AppConfig {

    @Bean
    public OrderRepository orderRepository() {
        return new MemoryOrderRepository();
    }

    @Bean
    public OrderService orderService() {
        return new OrderService(orderRepository());
    }
}
```

실무 감각:

- 일반 서비스/리포지토리: 컴포넌트 스캔
- 외부 라이브러리, 기술 설정: `@Bean`

---

## 왜 생성자 주입이 기본인가

```java
@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
}
```

이 방식이 좋은 이유:

- `final` 가능
- 필수 의존성 누락 방지
- 테스트하기 좋음
- 순환 참조를 빨리 발견하기 쉬움

필드 주입은 짧아 보이지만 구조를 숨깁니다.

---

## `@Autowired`는 언제 쓰나

생성자가 하나면 생략 가능합니다.

```java
public StudyService(StudyRepository studyRepository) {
    this.studyRepository = studyRepository;
}
```

그래서 최근 코드는 보통:

- `@RequiredArgsConstructor`
- `final` 필드
- `@Autowired` 생략

이 조합을 많이 씁니다.

---

## 자주 하는 실수

- 인터페이스 없이 구현체 타입에 바로 의존하는 것
- 필드 주입을 습관처럼 사용하는 것
- Bean 등록 방식을 섞어 쓰면서 어디서 생성되는지 모르는 것
- 순환 참조를 설계 문제로 보지 않고 우회하려는 것

---

## 면접 체크

1. IoC와 DI는 무엇이 다르나요?
2. 생성자 주입을 권장하는 이유는 무엇인가요?
3. `@Component`와 `@Bean`은 언제 각각 사용하나요?
4. Spring Bean은 누가 생성하고 관리하나요?

---

## 직접 해보기

1. `StudyRepository` 인터페이스와 `MemoryStudyRepository` 구현체를 만들어보세요.
2. `StudyService`가 `StudyRepository`를 생성자 주입받게 해보세요.
3. `@RequiredArgsConstructor`를 적용해보고 생성자를 직접 지운 뒤 동작을 확인해보세요.
4. 일부러 순환 참조 구조를 만들어보고 어떤 예외가 나는지 보세요.

---

## 다음 주제 연결

객체가 잘 연결됐더라도 공통 로직이 서비스마다 복붙되면 다시 지저분해집니다. 다음에는 AOP로 공통 관심사를 분리합니다.
