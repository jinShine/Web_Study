# 01. Servlet, Spring, Spring Boot

> **날짜**: 2026-02-23
> **키워드**: `Servlet` `Spring` `Spring Boot` `POJO` `AOP` `WebMVC` `DispatcherServlet` `@SpringBootApplication` `@Configuration` `@SpringBootConfiguration` `@EnableAutoConfiguration` `@ComponentScan` `@Bean`

---

## 1. Servlet (서블릿)

### 한 줄 정의

Java로 HTTP 요청/응답을 처리하는 서버 측 프로그램 규약(API)이다.

### 개념

웹 브라우저가 서버에 요청을 보내면, 서블릿 컨테이너(Tomcat 등)가 해당 요청을 받아서 적절한 Servlet 클래스에 전달한다. 개발자는 `HttpServlet`을 상속받아 `doGet()`, `doPost()` 같은 메서드를 오버라이딩해서 요청을 처리했다.

### 코드로 보는 서블릿

```java
// web.xml에 URL 매핑 필수 (설정 파일)
// <servlet-mapping>
//   <servlet-name>hello</servlet-name>
//   <url-pattern>/hello</url-pattern>
// </servlet-mapping>

public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // 1. 파라미터를 직접 꺼낸다
        String name = req.getParameter("name");

        // 2. 인코딩을 직접 설정한다
        resp.setContentType("text/html; charset=UTF-8");

        // 3. 출력 스트림으로 HTML을 직접 쓴다
        PrintWriter out = resp.getWriter();
        out.println("<html><body>");
        out.println("<h1>안녕하세요, " + name + "</h1>");
        out.println("</body></html>");
    }
}
```

### 서블릿의 문제점

| 문제 | 설명 |
|------|------|
| **설정 지옥** | URL 하나 매핑할 때마다 `web.xml`에 복잡한 XML 태그를 작성해야 했다 |
| **중복 코드** | 파라미터 파싱, 인코딩 처리, 응답 헤더 세팅 등 모든 서블릿에서 반복 |
| **비즈니스 로직과 뒤섞임** | HTML 출력, 데이터 처리, 요청 파싱이 한 클래스에 전부 들어간다 |
| **테스트 어려움** | `HttpServletRequest`를 직접 만들어야 테스트가 가능하다 |

---

## 2. Spring Framework

### 한 줄 정의

서블릿의 불편함을 해소하고, 객체 지향적으로 엔터프라이즈 애플리케이션을 개발할 수 있게 해주는 프레임워크다.

### Spring이 해결한 것

- **IoC (Inversion of Control, 제어의 역전)**: 객체 생성과 생명주기를 개발자가 아닌 Spring 컨테이너가 관리한다.
- **DI (Dependency Injection, 의존성 주입)**: 필요한 객체를 직접 `new`로 만들지 않고, Spring이 알아서 넣어준다.
- **AOP**: 공통 관심사(로깅, 트랜잭션 등)를 비즈니스 로직과 분리한다.
- **POJO 기반**: 특정 클래스를 상속받지 않아도 프레임워크 기능을 사용할 수 있다.

### Spring의 문제점

| 문제 | 설명 |
|------|------|
| **또 다른 설정 지옥** | XML 설정 파일이 수백~수천 줄까지 늘어남 |
| **환경 구성 복잡** | Tomcat 별도 설치, 라이브러리 버전 충돌 해결을 개발자가 직접 해야 함 |
| **진입 장벽** | 제대로 세팅하려면 알아야 할 것이 너무 많았음 |

---

## 3. Spring Boot

### 한 줄 정의

Spring Framework 위에 올라간 도구로, 복잡한 설정을 자동화해서 바로 실행할 수 있게 만든다.

### Spring Boot가 해결한 것

| 기능 | 설명 |
|------|------|
| **AutoConfiguration** | 프로젝트에 포함된 라이브러리를 감지해서 알맞은 설정을 자동으로 적용 |
| **내장 Tomcat** | 별도 서버 설치 없이 `java -jar app.jar`만으로 실행 |
| **Starter 의존성** | `spring-boot-starter-web` 하나만 추가하면 웹 개발에 필요한 라이브러리가 한번에 들어옴 |
| **설정 최소화** | `application.yml` 파일 몇 줄이면 대부분의 설정이 끝남 |

---

## 4. Servlet vs Spring vs Spring Boot 비교

```
+-------------------------------------------------------------------+
|              Servlet         Spring         Spring Boot            |
+-------------------------------------------------------------------+
| URL 매핑     web.xml         @RequestMapping  @GetMapping 등       |
| 서버         외부 Tomcat      외부 Tomcat      내장 Tomcat           |
| 설정         web.xml          XML / Java      자동 설정             |
| JSON 변환    직접 구현         설정 필요        자동 (Jackson 내장)    |
| 빌드 결과    .war             .war             .jar                 |
| 개발 속도    느림             보통              빠름                  |
+-------------------------------------------------------------------+
```

같은 API를 세 가지 방식으로 만들면:

```java
// === Servlet ===
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        resp.setContentType("application/json; charset=UTF-8");
        resp.getWriter().write("{\"name\":\"홍길동\"}"); // JSON을 직접 문자열로 만듦
    }
}

// === Spring (XML 설정 시대) ===
@Controller
public class UserController {
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @ResponseBody
    public User getUser() {
        return new User("홍길동"); // 별도 MessageConverter 설정 필요
    }
}

// === Spring Boot ===
@RestController
public class UserController {
    @GetMapping("/user")
    public User getUser() {
        return new User("홍길동"); // 끝. 자동으로 JSON 변환.
    }
}
```

---

## 5. POJO (Plain Old Java Object)

### 한 줄 정의

특정 프레임워크에 종속되지 않은 순수한 자바 객체를 말한다.

### 왜 중요한가

과거 EJB(Enterprise JavaBeans) 시절에는 비즈니스 로직을 짜려면 무조건 EJB가 요구하는 인터페이스를 구현하고, 특정 클래스를 상속받아야 했다. 코드가 프레임워크에 완전히 묶여버려서 테스트도 어렵고, 다른 환경으로 옮기기도 힘들었다.

Spring은 **POJO를 그대로 유지하면서도** 어노테이션만 붙이면 프레임워크의 모든 기능을 쓸 수 있도록 설계되었다.

```java
// POJO가 아닌 경우 (프레임워크에 종속)
public class OrderService extends EJBObject implements OrderRemote {
    // EJB 규약에 맞춰야만 동작한다
}

// POJO (Spring 방식)
@Service
public class OrderService {
    // 그냥 평범한 자바 클래스. 어노테이션만 붙였다.
    public Order createOrder(Item item) {
        return new Order(item);
    }
}
```

핵심: Spring에서 `@Service`, `@Controller` 같은 어노테이션은 그 클래스가 POJO임을 유지하면서 Spring이 관리할 수 있게 해주는 **마커(표시)**일 뿐이다.

---

## 6. AOP (Aspect-Oriented Programming)

### 한 줄 정의

핵심 비즈니스 로직과 공통 관심사(로깅, 보안, 트랜잭션 등)를 분리하는 프로그래밍 패러다임이다.

### 문제 상황

```java
// AOP 없이: 모든 서비스 메서드에 로깅 코드가 반복된다
@Service
public class OrderService {

    public Order createOrder(Item item) {
        log.info("createOrder 시작");           // 중복
        long start = System.currentTimeMillis(); // 중복

        Order order = new Order(item);           // <<< 핵심 로직은 이것뿐

        long end = System.currentTimeMillis();   // 중복
        log.info("createOrder 끝. 소요: {}ms", end - start); // 중복
        return order;
    }

    public void cancelOrder(Long orderId) {
        log.info("cancelOrder 시작");            // 또 중복
        long start = System.currentTimeMillis(); // 또 중복

        // ... 취소 로직 ...                      // <<< 핵심 로직

        long end = System.currentTimeMillis();   // 또 중복
        log.info("cancelOrder 끝. 소요: {}ms", end - start); // 또 중복
    }
}
```

### AOP 적용 후

```java
// 공통 관심사를 별도 클래스로 분리
@Aspect
@Component
public class LoggingAspect {

    // OrderService의 모든 메서드 실행 전후에 자동으로 끼어든다
    @Around("execution(* com.example.service.*.*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        log.info("{} 시작", joinPoint.getSignature().getName());
        long start = System.currentTimeMillis();

        Object result = joinPoint.proceed(); // 진짜 메서드 실행

        long end = System.currentTimeMillis();
        log.info("{} 끝. 소요: {}ms", joinPoint.getSignature().getName(), end - start);
        return result;
    }
}

// 핵심 로직만 남은 깔끔한 서비스
@Service
public class OrderService {

    public Order createOrder(Item item) {
        return new Order(item); // 비즈니스 로직만 집중
    }

    public void cancelOrder(Long orderId) {
        // ... 취소 로직만 집중 ...
    }
}
```

### AOP의 동작 원리: 프록시(Proxy)

Spring은 AOP를 구현할 때 소스 코드를 직접 건드리지 않는다. 대신 **가짜 객체(Proxy)**를 만들어 중간에 끼워넣는다.

```
호출자 → [Proxy 객체] → 공통 로직 실행 → [진짜 객체] → 핵심 로직 실행 → 결과 반환
```

`@Transactional`이 대표적인 예시다. 이 어노테이션이 붙은 메서드를 호출하면, 실제로는 Proxy가 먼저 받아서 트랜잭션을 시작하고, 진짜 메서드를 실행하고, 성공하면 커밋 / 실패하면 롤백을 처리해준다.

---

## 7. Web MVC 패턴

### 한 줄 정의

애플리케이션을 Model, View, Controller 세 역할로 분리하는 디자인 패턴이다.

| 역할 | 담당 | 예시 |
|------|------|------|
| **Model** | 데이터와 비즈니스 로직 | `User`, `Order` 같은 엔티티, Service 계층 |
| **View** | 사용자에게 보여지는 화면 | HTML, Thymeleaf 템플릿 (REST API에서는 JSON) |
| **Controller** | 요청을 받아서 Model과 View를 연결 | `@Controller`, `@RestController` 클래스 |

요즘 트렌드(Spring Boot + JPA + React/Vue)에서는 백엔드가 **JSON만 반환**하기 때문에 View 계층이 백엔드에서 사라지고, 프론트엔드가 View를 담당한다. 이때 `@RestController`를 사용한다.

---

## 8. DispatcherServlet과 Spring MVC 동작 원리

### DispatcherServlet이란

Spring MVC의 **프론트 컨트롤러(Front Controller)**다. 클라이언트의 모든 HTTP 요청을 맨 앞에서 받아서, 적절한 Controller에게 분배하는 중앙 안내 데스크 역할이다.

서블릿 시대에는 URL마다 서블릿 클래스를 하나씩 만들어야 했지만, DispatcherServlet 하나가 모든 요청을 중앙에서 관리하면서 이 문제를 해결했다.

### 요청 처리 흐름

`GET /articles/1` 요청이 들어왔을 때:

```
Client (브라우저)
  │
  │ 1. HTTP 요청: GET /articles/1
  ▼
DispatcherServlet (프론트 컨트롤러)
  │
  │ 2. "이 URL 처리할 컨트롤러 찾아줘"
  ▼
HandlerMapping
  │
  │ 3. "ArticleController.getArticle()이 담당합니다"
  ▼
DispatcherServlet
  │
  │ 4. "이 컨트롤러 실행해줘"
  ▼
HandlerAdapter
  │
  │ 5. 파라미터 바인딩 후 컨트롤러 메서드 실행
  ▼
Controller (ArticleController)
  │
  │ 6. Service 호출 → DB 조회 → 결과 반환
  ▼
DispatcherServlet
  │
  ├─ [View 반환 시] ViewResolver → View 렌더링 → HTML 응답
  │
  └─ [@RestController 시] HttpMessageConverter → JSON 변환 → JSON 응답
      │
      │ 7. Article 객체를 {"id":1, "title":"..."} JSON으로 변환
      ▼
Client (브라우저)
```

### REST API에서의 핵심: HttpMessageConverter

`@RestController`를 사용하면 ViewResolver 단계가 생략되고, **HttpMessageConverter**(기본값: Jackson)가 Java 객체를 JSON으로 자동 변환한다.

```java
@RestController
public class ArticleController {

    @GetMapping("/articles/{id}")
    public Article getArticle(@PathVariable Long id) {
        // Article 객체를 그대로 반환하면
        return new Article(id, "Spring 기초", "재밌다!");
    }
    // HttpMessageConverter가 이것을 아래 JSON으로 변환:
    // {"id": 1, "title": "Spring 기초", "content": "재밌다!"}
}
```

---

## 9. Spring Boot 핵심 어노테이션

### @SpringBootApplication

Spring Boot 앱의 **시작점(main 클래스)**에 붙이는 어노테이션이다. 사실 아래 3개를 합친 것이다.

```java
// @SpringBootApplication = 아래 3개의 조합
@SpringBootConfiguration  // "여기가 메인 설정이다"
@EnableAutoConfiguration  // "라이브러리 보고 알아서 설정해라"
@ComponentScan            // "하위 패키지 다 뒤져서 Bean 찾아라"
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

### @Configuration

**"이 클래스는 설정 파일이다"** 라고 Spring에게 알려주는 어노테이션이다.

과거에 XML로 작성하던 설정을 이제는 Java 클래스에 이 어노테이션을 붙여서 대체한다.

```java
// 과거 XML 방식
// <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
//   <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/mydb"/>
// </bean>

// 현재 Java Config 방식
@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        return ds;
    }
}
```

### @SpringBootConfiguration

`@Configuration`과 **기능은 100% 동일**하다. 다만 "이 설정 클래스가 이 Spring Boot 애플리케이션의 메인 설정이다"라는 의미를 부여하기 위해 이름을 다르게 한 것이다.

```
@SpringBootConfiguration
  └── @Configuration    ← 내부적으로 @Configuration을 포함하고 있다
        └── @Component  ← 결국 이것도 Bean으로 등록된다
```

직접 사용할 일은 거의 없고, `@SpringBootApplication` 안에 이미 포함되어 있다.

### @EnableAutoConfiguration

Spring Boot **자동 설정의 핵심**이다. 프로젝트에 추가된 라이브러리를 감지해서 관련 설정을 자동으로 적용한다.

**동작 방식:**

1. `build.gradle`이나 `pom.xml`에 있는 의존성(라이브러리) 목록을 확인한다
2. 각 라이브러리에 맞는 설정 클래스를 자동으로 로딩한다
3. 개발자가 별도로 설정하지 않아도 기본값으로 동작한다

**예시:**

```
spring-boot-starter-web 추가
  → Tomcat 자동 설정 + DispatcherServlet 자동 등록

spring-boot-starter-data-jpa 추가
  → DataSource 자동 설정 + EntityManager 자동 설정

spring-boot-starter-security 추가
  → 기본 보안 필터 자동 설정 + 로그인 페이지 자동 생성
```

### @ComponentScan

메인 클래스가 있는 패키지부터 하위 패키지를 전부 스캔해서, 아래 어노테이션이 붙은 클래스를 찾아 Bean으로 등록한다.

**스캔 대상 어노테이션:**

| 어노테이션 | 용도 |
|-----------|------|
| `@Component` | 일반 컴포넌트 |
| `@Service` | 비즈니스 로직 계층 |
| `@Repository` | 데이터 접근 계층 (DAO) |
| `@Controller` | 웹 요청 처리 (View 반환) |
| `@RestController` | 웹 요청 처리 (JSON 반환) |
| `@Configuration` | 설정 클래스 |

**주의: 패키지 구조**

```
com.example
├── MyApplication.java        ← @SpringBootApplication이 여기 있으면
├── controller/
│   └── UserController.java   ← 스캔됨 (하위 패키지)
├── service/
│   └── UserService.java      ← 스캔됨 (하위 패키지)
└── repository/
    └── UserRepository.java   ← 스캔됨 (하위 패키지)

com.other
└── OtherController.java      ← 스캔 안 됨! (다른 패키지)
```

메인 클래스보다 상위 패키지나 완전히 다른 패키지에 있는 클래스는 스캔되지 않는다. 404 에러의 흔한 원인이니 기억해둘 것.

### @Bean

개발자가 **수동으로 객체를 생성해서 Spring 컨테이너에 등록**할 때 사용한다. 클래스가 아닌 **메서드**에 붙인다.

**언제 사용하는가:**

| 상황 | 사용할 것 |
|------|-----------|
| 내가 만든 클래스 | `@Component`, `@Service` 등 (자동 스캔) |
| 외부 라이브러리 클래스 | `@Bean` (수동 등록) |

외부 라이브러리의 소스코드를 열어서 `@Service`를 붙일 수는 없으니, `@Configuration` 클래스에서 `@Bean` 메서드로 직접 등록하는 것이다.

```java
@Configuration
public class AppConfig {

    // 외부 라이브러리(BCrypt)의 객체를 Bean으로 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 외부 라이브러리(RestTemplate)의 객체를 Bean으로 등록
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

// 이제 어디서든 주입받아 사용 가능
@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    // Spring이 위에서 등록한 Bean을 자동으로 넣어준다 (DI)
    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String encryptPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
```

---

## 10. IoC / DI 핵심 정리

### IoC (Inversion of Control, 제어의 역전)

```java
// IoC 적용 전: 개발자가 직접 객체를 생성하고 관리
public class OrderController {
    private OrderService orderService = new OrderService(); // 직접 new
}

// IoC 적용 후: Spring 컨테이너가 객체를 생성하고 관리
@RestController
public class OrderController {
    private final OrderService orderService;

    // Spring이 만들어둔 OrderService를 알아서 넣어준다
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
}
```

객체를 만들고 관리하는 **"제어권"**이 개발자에서 Spring으로 넘어갔으므로 "제어의 역전"이라고 부른다.

### DI (Dependency Injection, 의존성 주입)

IoC의 구체적인 구현 방법이다. Spring 컨테이너가 Bean을 만들어두고, 필요한 곳에 **자동으로 넣어주는(주입하는)** 것이다.

**DI의 3가지 방식:**

```java
// 1. 생성자 주입 (권장)
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) { // 생성자로 주입
        this.userService = userService;
    }
}

// 2. 필드 주입 (간편하지만 비권장)
@RestController
public class UserController {
    @Autowired
    private UserService userService; // 필드에 직접 주입
}

// 3. Setter 주입 (잘 안 씀)
@RestController
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
```

**생성자 주입이 권장되는 이유**: `final` 키워드를 사용할 수 있어서 불변성을 보장하고, 테스트할 때 Mock 객체를 쉽게 넣을 수 있다.

---

## 11. Spring Bean의 싱글톤(Singleton)

Spring 컨테이너는 기본적으로 하나의 클래스당 **객체 1개만** 만들어서 공유한다.

```
사용자 A의 요청 ──→ [같은 UserService 객체]
사용자 B의 요청 ──→ [같은 UserService 객체]  ← 전부 동일한 1개
사용자 C의 요청 ──→ [같은 UserService 객체]
```

10,000명이 동시에 접속해도 `new UserService()`를 10,000번 하지 않고, 1개를 돌려쓴다.

**주의**: 싱글톤이므로 Bean 클래스에 **상태(전역 변수에 값 저장)**를 두면 안 된다. 동시성 문제가 발생한다.

```java
@Service
public class UserService {
    // 이렇게 하면 안 된다! 모든 사용자가 이 변수를 공유한다.
    private int count = 0;

    public void process() {
        count++; // 사용자 A와 B가 동시에 호출하면 값이 꼬인다
    }
}
```

---

## 12. 실전 예제: Spring Boot REST API 전체 구조

```java
// === 1. 메인 클래스 ===
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// === 2. 데이터 클래스 (POJO) ===
public class Article {
    private Long id;
    private String title;
    private String content;

    public Article(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    // Getter/Setter 생략 (실제로는 필요)
}

// === 3. Controller ===
@RestController
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService; // DI: Spring이 자동 주입
    }

    @GetMapping("/articles/{id}")
    public Article getArticle(@PathVariable Long id) {
        return articleService.findById(id);
        // 반환된 Article 객체는 HttpMessageConverter가 JSON으로 변환
    }
}

// === 4. Service ===
@Service
public class ArticleService {

    public Article findById(Long id) {
        // 실제로는 DB에서 조회하지만, 예제이므로 하드코딩
        return new Article(id, "Spring Boot 입문", "오늘부터 시작!");
    }
}

// === 5. 설정 클래스 (외부 라이브러리 Bean 등록) ===
@Configuration
public class AppConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**요청 흐름:**

```
브라우저: GET /articles/1
  → DispatcherServlet이 요청 수신
    → HandlerMapping이 ArticleController.getArticle() 찾음
      → HandlerAdapter가 @PathVariable로 id=1 바인딩
        → ArticleController → ArticleService.findById(1) 호출
          → Article 객체 반환
            → HttpMessageConverter(Jackson)가 JSON 변환
              → {"id":1, "title":"Spring Boot 입문", "content":"오늘부터 시작!"}
```

---

## 면접 대비 한 줄 요약

| 키워드 | 한 줄 답변 |
|--------|-----------|
| **Servlet** | Java로 HTTP 요청을 처리하는 서버 측 API. web.xml 설정이 필요하고 중복 코드가 많았다 |
| **Spring** | IoC/DI와 AOP를 제공하는 프레임워크. 서블릿의 불편함을 해소했지만 XML 설정이 복잡했다 |
| **Spring Boot** | Spring에 자동 설정과 내장 Tomcat을 더해 빠르게 실행할 수 있게 한 도구 |
| **POJO** | 특정 프레임워크에 종속되지 않은 순수 자바 객체 |
| **AOP** | 공통 관심사를 비즈니스 로직과 분리하는 프로그래밍 패러다임. Proxy 기반으로 동작 |
| **MVC** | Model(데이터), View(화면), Controller(중간 다리)로 역할을 분리하는 패턴 |
| **DispatcherServlet** | 모든 HTTP 요청을 받아 적절한 Controller에 분배하는 프론트 컨트롤러 |
| **@SpringBootApplication** | @SpringBootConfiguration + @EnableAutoConfiguration + @ComponentScan의 조합 |
| **@Configuration** | 이 클래스가 설정 파일임을 선언. @Bean 메서드를 포함할 수 있다 |
| **@EnableAutoConfiguration** | 라이브러리를 감지하여 관련 설정을 자동으로 적용 |
| **@ComponentScan** | 하위 패키지를 스캔해서 @Component 계열 클래스를 Bean으로 자동 등록 |
| **@Bean** | 메서드의 반환 객체를 수동으로 Spring Bean에 등록. 주로 외부 라이브러리에 사용 |
| **IoC** | 객체 생성/관리의 제어권이 개발자에서 Spring 컨테이너로 역전된 것 |
| **DI** | Spring이 필요한 객체를 자동으로 주입해주는 것. 생성자 주입이 권장됨 |
