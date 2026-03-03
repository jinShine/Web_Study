# 04. IoC와 DI 깊게 파기

> **IoC(Inversion of Control)** — 객체의 생성과 관리를 개발자가 아닌 프레임워크(컨테이너)가 대신 해주는 것
> **DI(Dependency Injection)** — IoC를 구현하는 방법으로, 필요한 객체를 외부에서 주입받는 것

Spring의 심장이다. 이걸 모르면 나머지가 전부 공중에 뜬다.

---

## 1. IoC가 왜 필요한가?

### 기존 방식 — 개발자가 직접 객체 생성

```java
public class OrderService {
    // OrderService가 직접 new로 생성 → 강한 결합(tight coupling)
    private final OrderRepository repository = new OrderRepository();

    public void createOrder(Order order) {
        repository.save(order);
    }
}
```

**문제점:**
- `OrderService`가 `OrderRepository`의 **구체적인 클래스**를 알고 있다
- `OrderRepository`를 `JpaOrderRepository`로 바꾸고 싶으면? → `OrderService` 코드를 수정해야 한다
- 테스트할 때 가짜(Mock) 객체로 바꿀 수 없다

### IoC 방식 — 컨테이너가 객체를 관리

```java
public class OrderService {
    // 인터페이스에만 의존 → 느슨한 결합(loose coupling)
    private final OrderRepository repository;

    // 생성자를 통해 외부에서 주입받음 (DI)
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public void createOrder(Order order) {
        repository.save(order);
    }
}
```

```
[ Spring 컨테이너 (IoC Container) ]
    │
    ├── OrderRepository 빈 생성
    │
    └── OrderService 빈 생성
            └── OrderRepository를 주입 (DI)
```

> 핵심: **"내가 필요한 걸 내가 만들지 않는다. 누군가 갖다 준다."**

---

## 2. Spring IoC 컨테이너

### ApplicationContext

Spring의 IoC 컨테이너 = `ApplicationContext`

```java
// 컨테이너 직접 조회 (실무에서는 거의 안 씀, 이해용)
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
OrderService orderService = context.getBean(OrderService.class);
```

### 컨테이너가 하는 일

| 역할 | 설명 |
|------|------|
| **빈(Bean) 등록** | 객체를 생성하고 컨테이너에 등록 |
| **의존 관계 주입** | 빈 간의 의존 관계를 자동으로 연결 |
| **생명주기 관리** | 빈의 생성 → 초기화 → 사용 → 소멸 관리 |

### BeanFactory vs ApplicationContext

| 구분 | BeanFactory | ApplicationContext |
|------|------------|-------------------|
| **역할** | IoC 컨테이너의 최상위 인터페이스 | BeanFactory + 부가 기능 |
| **빈 로딩** | Lazy Loading (호출 시 생성) | Eager Loading (시작 시 전부 생성) |
| **부가 기능** | 없음 | 이벤트, 메시지 국제화, 환경변수 처리 등 |
| **실무에서** | 직접 사용 안 함 | **이것을 사용** |

> 면접 포인트: "ApplicationContext는 BeanFactory를 상속한 확장 컨테이너이며, 실무에서는 ApplicationContext를 사용합니다."

---

## 3. 빈(Bean) 등록 방법

### 방법 1: `@Component` + 컴포넌트 스캔 (자동 등록)

```java
@Component  // Spring이 자동으로 빈으로 등록
public class OrderRepository {
    public void save(Order order) {
        // DB 저장 로직
    }
}
```

```java
@Component
public class OrderService {
    private final OrderRepository repository;

    @Autowired  // 자동 주입
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

#### `@Component`의 파생 어노테이션

| 어노테이션 | 용도 | 예시 |
|-----------|------|------|
| `@Component` | 일반적인 빈 등록 | 유틸리티 클래스 |
| `@Controller` | 웹 요청 처리 (MVC 컨트롤러) | `UserController` |
| `@RestController` | REST API 컨트롤러 (`@Controller` + `@ResponseBody`) | `ApiController` |
| `@Service` | 비즈니스 로직 계층 | `OrderService` |
| `@Repository` | 데이터 접근 계층 + **예외 변환** 기능 | `OrderRepository` |
| `@Configuration` | 설정 클래스 (빈 수동 등록용) | `AppConfig` |

> `@Service`, `@Repository`, `@Controller`는 전부 내부에 `@Component`가 붙어있다.
> 기능은 같지만, **계층을 명확하게 표현**하기 위해 구분해서 쓴다.

```java
// @Service 내부를 까보면
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component   // ← 여기! @Component가 있다
public @interface Service {
    // ...
}
```

### 방법 2: `@Bean` + `@Configuration` (수동 등록)

```java
@Configuration
public class AppConfig {

    @Bean  // 메서드의 리턴 객체를 빈으로 등록
    public OrderRepository orderRepository() {
        return new JpaOrderRepository();
    }

    @Bean
    public OrderService orderService() {
        // 직접 의존 관계를 설정
        return new OrderService(orderRepository());
    }
}
```

### 자동 vs 수동 — 언제 뭘 쓰나?

| 상황 | 방법 | 이유 |
|------|------|------|
| 일반적인 비즈니스 로직 | `@Component` 자동 등록 | 간편하고, 대부분의 빈은 이걸로 충분 |
| 외부 라이브러리 빈 등록 | `@Bean` 수동 등록 | 외부 클래스에 `@Component` 못 붙이니까 |
| 같은 인터페이스의 구현체가 여러 개 | `@Bean` 수동 등록 | 어떤 구현체를 쓸지 명시적으로 설정 |
| 기술적 설정 (DataSource, ObjectMapper 등) | `@Bean` 수동 등록 | 한눈에 설정을 볼 수 있어야 하니까 |

---

## 4. DI(의존성 주입) 3가지 방법

### 4-1. 생성자 주입 (Constructor Injection) ⭐ 추천

```java
@Service
public class OrderService {
    private final OrderRepository repository;  // final 가능!

    // 생성자가 1개면 @Autowired 생략 가능 (Spring 4.3+)
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

### 4-2. 필드 주입 (Field Injection) — 비추천

```java
@Service
public class OrderService {
    @Autowired  // 필드에 직접 주입
    private OrderRepository repository;  // final 불가!
}
```

### 4-3. Setter 주입 (Setter Injection) — 거의 안 씀

```java
@Service
public class OrderService {
    private OrderRepository repository;

    @Autowired
    public void setRepository(OrderRepository repository) {
        this.repository = repository;
    }
}
```

### 3가지 비교

| 구분 | 생성자 주입 ⭐ | 필드 주입 | Setter 주입 |
|------|-------------|----------|------------|
| **`final` 사용** | ✅ 가능 | ❌ 불가 | ❌ 불가 |
| **불변성** | ✅ 보장 | ❌ 변경 가능 | ❌ 변경 가능 |
| **NullPointer 방지** | ✅ 컴파일 시점 체크 | ❌ 런타임에 터짐 | ❌ 런타임에 터짐 |
| **테스트 용이성** | ✅ new로 직접 생성 가능 | ❌ Spring 없이 테스트 불가 | △ |
| **순환 참조 감지** | ✅ 앱 시작 시 바로 발견 | ❌ 늦게 발견 | ❌ 늦게 발견 |

> **결론: 생성자 주입만 써라.** Spring 공식 문서에서도 생성자 주입을 권장한다.

### Lombok으로 더 간결하게

```java
@Service
@RequiredArgsConstructor  // final 필드의 생성자를 자동 생성
public class OrderService {
    private final OrderRepository repository;
    // 생성자를 안 써도 된다! Lombok이 만들어줌
}
```

> 실무에서 가장 많이 보는 패턴: `@Service` + `@RequiredArgsConstructor` + `private final`

---

## 5. 같은 타입의 빈이 2개 이상일 때

```java
public interface PaymentGateway {
    void pay(int amount);
}

@Component
public class KakaoPayGateway implements PaymentGateway {
    public void pay(int amount) { /* 카카오페이 결제 */ }
}

@Component
public class TossPayGateway implements PaymentGateway {
    public void pay(int amount) { /* 토스페이 결제 */ }
}
```

이 상태에서 주입하면?

```java
@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentGateway gateway;  // 💥 에러! 어떤 빈을 넣어야 해?
}
```

> `NoUniqueBeanDefinitionException` — 빈이 2개라 Spring이 뭘 넣어야 할지 모른다

### 해결 방법 3가지

#### 방법 1: `@Qualifier` — 이름으로 지정

```java
@Service
public class PaymentService {
    private final PaymentGateway gateway;

    public PaymentService(@Qualifier("kakaoPayGateway") PaymentGateway gateway) {
        this.gateway = gateway;
    }
}
```

#### 방법 2: `@Primary` — 기본값 지정

```java
@Component
@Primary  // 같은 타입이 여러 개면 이걸 기본으로 사용
public class KakaoPayGateway implements PaymentGateway { ... }

@Component
public class TossPayGateway implements PaymentGateway { ... }
```

```java
@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentGateway gateway;  // KakaoPayGateway가 주입됨
}
```

#### 방법 3: 필드명 매칭 — 변수 이름으로 매칭

```java
@Service
@RequiredArgsConstructor
public class PaymentService {
    // 변수 이름이 "tossPayGateway" → TossPayGateway 빈이 주입됨
    private final PaymentGateway tossPayGateway;
}
```

### 우선순위

```
@Qualifier > @Primary > 필드명 매칭
```

> 면접 포인트: "`@Qualifier`가 가장 우선순위가 높고, `@Primary`는 기본값, 필드명 매칭은 최후의 수단입니다."

---

## 6. Bean Scope (빈 스코프)

빈이 **언제 생성되고, 얼마나 유지되는가**를 결정한다.

### Singleton (기본값) ⭐

```java
@Component
// @Scope("singleton")  ← 생략해도 기본이 싱글톤
public class OrderService {
    // 앱 전체에서 딱 1개만 존재
}
```

```
요청 1 → OrderService@1234 ─┐
요청 2 → OrderService@1234 ─┤  전부 같은 인스턴스!
요청 3 → OrderService@1234 ─┘
```

### Prototype

```java
@Component
@Scope("prototype")  // 요청할 때마다 새로 생성
public class PrototypeBean {
    // ...
}
```

```
요청 1 → PrototypeBean@1111
요청 2 → PrototypeBean@2222  ← 매번 다른 인스턴스!
요청 3 → PrototypeBean@3333
```

### 전체 스코프 비교

| Scope | 인스턴스 수 | 생존 범위 | 사용 빈도 |
|-------|-----------|----------|----------|
| **singleton** (기본) | 1개 | 스프링 컨테이너와 동일 | ⭐⭐⭐⭐⭐ |
| **prototype** | 요청마다 새로 | 컨테이너가 생성만, 관리 안 함 | ⭐ |
| **request** | HTTP 요청당 1개 | 요청 시작 ~ 끝 | ⭐⭐ |
| **session** | HTTP 세션당 1개 | 세션 유지 기간 | ⭐ |

> **99%는 singleton이다.** prototype은 특수한 경우에만 쓴다.

### ⚠️ Singleton 주의사항 — 상태를 갖지 마라!

```java
@Component
public class OrderService {
    private int count = 0;  // 💥 위험! 모든 요청이 같은 인스턴스를 쓴다

    public void createOrder() {
        count++;  // 동시에 여러 스레드가 접근하면 데이터 꼬임!
    }
}
```

> Singleton 빈은 **무상태(stateless)**로 설계해야 한다.
> 공유 변수를 두면 멀티스레드 환경에서 버그가 생긴다.

---

## 7. Bean Lifecycle (빈 생명주기)

```
1. 스프링 컨테이너 생성
2. 빈 생성 (생성자 호출)
3. 의존 관계 주입 (DI)
4. 초기화 콜백  ← @PostConstruct
5. 사용
6. 소멸 콜백    ← @PreDestroy
7. 스프링 컨테이너 종료
```

### 초기화 / 소멸 콜백

```java
@Component
public class DatabaseClient {

    @PostConstruct  // DI 완료 후 호출 → 초기화 로직
    public void init() {
        System.out.println("DB 연결 풀 생성");
        // 커넥션 풀 설정 등
    }

    @PreDestroy  // 컨테이너 종료 전 호출 → 정리 로직
    public void destroy() {
        System.out.println("DB 연결 풀 정리");
        // 리소스 해제 등
    }
}
```

### 콜백 방법 비교

| 방법 | 예시 | 추천 |
|------|------|------|
| `@PostConstruct` / `@PreDestroy` | 위 예시 | ⭐ 가장 추천 |
| `InitializingBean` / `DisposableBean` | 인터페이스 구현 | ❌ 옛날 방식 |
| `@Bean(initMethod, destroyMethod)` | 수동 등록 시 | 외부 라이브러리용 |

---

## 8. 컴포넌트 스캔 동작 원리

```java
@SpringBootApplication  // 이 안에 @ComponentScan이 포함되어 있다!
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### `@ComponentScan`이 하는 일

```
com.example.myapp/              ← @SpringBootApplication 위치
├── MyApplication.java
├── controller/
│   └── OrderController.java    ← @RestController → 스캔됨 ✅
├── service/
│   └── OrderService.java       ← @Service → 스캔됨 ✅
├── repository/
│   └── OrderRepository.java    ← @Repository → 스캔됨 ✅
└── config/
    └── AppConfig.java          ← @Configuration → 스캔됨 ✅
```

> `@SpringBootApplication`이 있는 패키지와 그 **하위 패키지**를 모두 스캔한다.
> 그래서 메인 클래스는 항상 **최상위 패키지**에 둬야 한다!

### 스캔 대상 필터링

```java
@ComponentScan(
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ANNOTATION,
        classes = Configuration.class  // @Configuration 제외
    )
)
```

---

## 9. 실전 예제 — 계층 구조 한번에 보기

```java
// 1. Entity
public class Order {
    private Long id;
    private String productName;
    private int quantity;
    // getter, setter, constructor ...
}

// 2. Repository 계층
public interface OrderRepository {
    void save(Order order);
    Order findById(Long id);
}

@Repository
public class JpaOrderRepository implements OrderRepository {
    @Override
    public void save(Order order) {
        // JPA로 DB에 저장
    }

    @Override
    public Order findById(Long id) {
        // JPA로 DB에서 조회
        return null;
    }
}

// 3. Service 계층
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;  // 인터페이스에 의존

    public void createOrder(Order order) {
        // 비즈니스 로직
        orderRepository.save(order);
    }

    public Order getOrder(Long id) {
        return orderRepository.findById(id);
    }
}

// 4. Controller 계층
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;  // Service에 의존

    @PostMapping
    public String createOrder(@RequestBody Order order) {
        orderService.createOrder(order);
        return "주문 완료";
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);
    }
}
```

```
[클라이언트] → [Controller] → [Service] → [Repository] → [DB]
                    ↓              ↓             ↓
               @RestController  @Service    @Repository
               DI: Service     DI: Repo     DI: EntityManager
```

> 모든 계층이 **인터페이스에 의존**하고, **구현체는 Spring이 주입**한다.
> 이것이 IoC/DI의 실전 적용이다.

---

## 면접 대비 한 줄 요약

| 질문 | 한 줄 답변 |
|------|-----------|
| IoC란? | 객체의 생성·관리 주체가 개발자에서 프레임워크(컨테이너)로 역전되는 것 |
| DI란? | IoC를 구현하는 방법으로, 필요한 의존 객체를 외부에서 주입받는 패턴 |
| IoC 컨테이너란? | 빈의 생성, 의존 관계 주입, 생명주기를 관리하는 Spring의 핵심 컨테이너 (ApplicationContext) |
| DI 방법 중 뭘 써야 하나? | 생성자 주입. 불변성 보장, 테스트 용이, 순환 참조 조기 발견 가능 |
| `@Component` vs `@Bean`? | `@Component`는 클래스에 붙여 자동 등록, `@Bean`은 메서드에 붙여 수동 등록 |
| `@Primary` vs `@Qualifier`? | `@Primary`는 기본값, `@Qualifier`는 이름 지정. `@Qualifier`가 우선순위 높음 |
| Bean Scope 기본값은? | Singleton. 앱 전체에서 1개의 인스턴스만 존재 |
| Singleton 주의점은? | 상태를 갖지 않도록 무상태(stateless)로 설계해야 함 (멀티스레드 안전) |
| `@PostConstruct`는 언제 실행? | 빈 생성 + DI 완료 직후에 호출되는 초기화 콜백 |
| `@ComponentScan` 범위는? | `@SpringBootApplication`이 위치한 패키지와 그 하위 패키지 전체 |
