# 01. Servlet → Spring → Spring Boot — 진화의 역사

> **키워드**: `Servlet` `Spring Framework` `Spring Boot` `POJO` `@SpringBootApplication` `@Configuration` `@Bean` `@ComponentScan` `@EnableAutoConfiguration` `AutoConfiguration`

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

### 서블릿의 한계

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

Spring은 서블릿의 저수준 API를 감싸고, 아래 핵심 개념들을 도입해서 개발 생산성을 혁신적으로 높였다.

| 핵심 개념 | 한 줄 설명 | 상세 학습 |
|-----------|-----------|-----------|
| **IoC / DI** | 객체 생성·관리를 개발자가 아닌 Spring 컨테이너가 대신한다 | 📖 [04-ioc-and-di](../04-ioc-and-di/) |
| **AOP** | 로깅·트랜잭션 같은 공통 관심사를 비즈니스 로직에서 분리한다 | 📖 [05-aop](../05-aop/) |
| **POJO 기반** | 프레임워크 종속 없이 순수 자바 객체로 개발한다 | 아래 5번 참고 |
| **MVC 패턴** | Model-View-Controller로 웹 요청 처리 흐름을 구조화한다 | 📖 [08-spring-mvc-flow](../../phase2-API개발/08-spring-mvc-flow/) |

> **핵심 포인트**: 위 개념들은 각각 전용 주제에서 상세히 다룬다. 이 문서에서는 "왜 Servlet에서 Spring이 나왔는지" 흐름에 집중한다.

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

### Spring Boot ≠ 새로운 프레임워크

Spring Boot는 Spring Framework를 **대체하는 것이 아니다**. Spring Framework 위에서 작동하는 **편의 도구**다.

```
┌──────────────────────────────────┐
│           Spring Boot            │  ← 자동 설정, 내장 Tomcat, Starter
│  ┌──────────────────────────┐    │
│  │     Spring Framework     │    │  ← IoC/DI, AOP, MVC, 트랜잭션
│  │  ┌──────────────────┐    │    │
│  │  │     Servlet API   │   │    │  ← HTTP 요청/응답의 기반
│  │  └──────────────────┘    │    │
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

Spring Boot 앱에서 `@RestController`에 요청이 도달하기까지, 내부적으로는 여전히 **DispatcherServlet**(Servlet의 구현체)이 동작한다. 이 흐름은 📖 [08-spring-mvc-flow](../../phase2-API개발/08-spring-mvc-flow/)에서 상세히 다룬다.

---

## 4. Servlet vs Spring vs Spring Boot — 한눈에 비교

### 비교표

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

### 같은 API를 세 가지 방식으로

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

**핵심**: `@Service`, `@Controller` 같은 어노테이션은 그 클래스가 POJO임을 유지하면서 Spring이 관리할 수 있게 해주는 **마커(표시)**일 뿐이다.

---

## 6. @SpringBootApplication 해부

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

### @SpringBootConfiguration

`@Configuration`과 **기능은 100% 동일**하다. "이 설정 클래스가 이 Spring Boot 애플리케이션의 메인 설정이다"라는 의미를 부여하기 위해 이름만 다르게 한 것이다.

```
@SpringBootConfiguration
  └── @Configuration    ← 내부적으로 @Configuration을 포함
        └── @Component  ← 결국 이것도 Bean으로 등록된다
```

직접 사용할 일은 거의 없고, `@SpringBootApplication` 안에 이미 포함되어 있다.

### @EnableAutoConfiguration

Spring Boot **자동 설정의 핵심**이다. 프로젝트에 추가된 라이브러리를 감지해서 관련 설정을 자동으로 적용한다.

**동작 방식:**

1. `build.gradle`에 있는 의존성(라이브러리) 목록을 확인한다
2. 각 라이브러리에 맞는 설정 클래스를 자동으로 로딩한다
3. 개발자가 별도로 설정하지 않아도 기본값으로 동작한다

```
spring-boot-starter-web 추가
  → Tomcat 자동 설정 + DispatcherServlet 자동 등록

spring-boot-starter-data-jpa 추가
  → DataSource 자동 설정 + EntityManager 자동 설정

spring-boot-starter-security 추가
  → 기본 보안 필터 자동 설정 + 로그인 페이지 자동 생성
```

### @ComponentScan

메인 클래스가 있는 패키지부터 하위 패키지를 전부 스캔해서, 아래 어노테이션이 붙은 클래스를 찾아 **Bean으로 자동 등록**한다.

| 어노테이션 | 용도 |
|-----------|------|
| `@Component` | 일반 컴포넌트 |
| `@Service` | 비즈니스 로직 계층 |
| `@Repository` | 데이터 접근 계층 (DAO) |
| `@Controller` / `@RestController` | 웹 요청 처리 |
| `@Configuration` | 설정 클래스 |

> Bean 등록과 주입(DI)에 대한 상세한 설명은 📖 [04-ioc-and-di](../04-ioc-and-di/)에서 다룬다.

### 패키지 구조 주의

```
com.example
├── MyApplication.java        ← @SpringBootApplication이 여기 있으면
├── controller/
│   └── UserController.java   ← 스캔됨 ✅ (하위 패키지)
├── service/
│   └── UserService.java      ← 스캔됨 ✅ (하위 패키지)
└── repository/
    └── UserRepository.java   ← 스캔됨 ✅ (하위 패키지)

com.other
└── OtherController.java      ← 스캔 안 됨 ❌ (다른 패키지)
```

메인 클래스보다 상위 패키지나 완전히 다른 패키지에 있는 클래스는 스캔되지 않는다. **404 에러의 흔한 원인**이니 기억해둘 것.

---

## 7. @Configuration과 @Bean

### @Configuration

**"이 클래스는 설정 파일이다"** 라고 Spring에게 알려주는 어노테이션이다. 과거에 XML로 작성하던 설정을 Java 클래스로 대체한다.

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

### @Bean — 수동 Bean 등록

개발자가 **메서드의 반환 객체를 직접 Spring 컨테이너에 등록**할 때 사용한다.

**핵심 질문: 언제 @Component이고 언제 @Bean인가?**

| 상황 | 사용할 것 | 이유 |
|------|-----------|------|
| 내가 만든 클래스 | `@Component`, `@Service` 등 | 소스코드에 어노테이션을 붙일 수 있으니까 |
| 외부 라이브러리 클래스 | `@Bean` 메서드로 수동 등록 | 남의 소스코드를 열어서 `@Service`를 붙일 수 없으니까 |

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

## 8. Spring Boot 앱이 시작될 때 일어나는 일

`java -jar app.jar`을 실행하면 내부에서 아래 과정이 순서대로 일어난다.

```
1. JVM 시작
   └── MANIFEST.MF에서 Start-Class 확인
       └── MyApplication.main() 실행

2. SpringApplication.run() 호출
   └── Spring 컨테이너(ApplicationContext) 생성

3. @ComponentScan 실행
   └── 하위 패키지의 @Component, @Service, @Controller 등을 찾아 Bean 등록

4. @EnableAutoConfiguration 실행
   └── classpath의 라이브러리를 감지
   └── spring-boot-starter-web이 있으면 → Tomcat + DispatcherServlet 자동 설정
   └── spring-boot-starter-data-jpa가 있으면 → DataSource + JPA 자동 설정

5. @Configuration 클래스 처리
   └── @Bean 메서드 실행 → 수동 등록한 Bean도 컨테이너에 등록

6. application.yml 로딩
   └── 서버 포트, DB 연결 정보, 로그 레벨 등 설정 적용
   └── 📖 설정 파일 상세: [02-resources](../02-resources/)

7. 내장 Tomcat 시작
   └── 설정된 포트(기본 8080)에서 HTTP 요청 대기

8. 앱 준비 완료
   └── "Started MyApplication in 2.345 seconds" 로그 출력
```

### AutoConfiguration이 설정을 찾는 방법

Spring Boot는 `META-INF/spring/` 디렉토리에 있는 설정 목록 파일을 읽어서 어떤 자동 설정 클래스를 로딩할지 결정한다.

```
// Spring Boot 3.x
META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports

// Spring Boot 2.x (레거시)
META-INF/spring.factories
```

직접 건드릴 일은 거의 없지만, "Spring Boot가 어떻게 라이브러리만 추가해도 알아서 설정되는지" 원리를 이해하면 트러블슈팅에 큰 도움이 된다.

---

## 9. 실전: 최소 REST API

Spring Boot로 가장 간단한 REST API를 만들면 이런 구조가 된다.

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
    // Getter 생략 (실무에서는 Lombok @Getter 사용 → 📖 10-lombok 참고)
}

// === 3. Service ===
@Service
public class ArticleService {
    public Article findById(Long id) {
        return new Article(id, "Spring Boot 입문", "오늘부터 시작!");
    }
}

// === 4. Controller ===
@RestController
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService; // DI: Spring이 자동 주입
    }

    @GetMapping("/articles/{id}")
    public Article getArticle(@PathVariable Long id) {
        return articleService.findById(id);
        // 반환된 Article 객체 → HttpMessageConverter(Jackson)가 JSON으로 변환
    }
}
```

**요청 흐름:**

```
브라우저: GET /articles/1
  → 내장 Tomcat이 요청 수신
    → DispatcherServlet이 ArticleController.getArticle() 찾음
      → @PathVariable로 id=1 바인딩
        → ArticleService.findById(1) 호출 → Article 객체 반환
          → Jackson이 JSON 변환: {"id":1, "title":"Spring Boot 입문", ...}
```

> DI(의존성 주입)가 어떻게 동작하는지는 📖 [04-ioc-and-di](../04-ioc-and-di/)에서,
> DispatcherServlet의 요청 처리 흐름은 📖 [08-spring-mvc-flow](../../phase2-API개발/08-spring-mvc-flow/)에서 상세히 다룬다.

---

## 면접 대비 한 줄 요약

| 키워드 | 한 줄 답변 |
|--------|-----------|
| **Servlet** | Java로 HTTP 요청을 처리하는 서버 측 API. web.xml 설정이 필요하고 중복 코드가 많았다 |
| **Spring Framework** | IoC/DI와 AOP를 제공하는 프레임워크. 서블릿의 불편함을 해소했지만 XML 설정이 복잡했다 |
| **Spring Boot** | Spring에 자동 설정과 내장 Tomcat을 더해, 설정 없이 빠르게 실행할 수 있게 한 도구 |
| **Spring Boot와 Spring 관계** | Spring Boot는 Spring Framework를 대체하는 것이 아니라, 그 위에서 작동하는 편의 도구다 |
| **POJO** | 특정 프레임워크에 종속되지 않은 순수 자바 객체. Spring은 POJO + 어노테이션으로 동작한다 |
| **@SpringBootApplication** | @SpringBootConfiguration + @EnableAutoConfiguration + @ComponentScan의 조합 |
| **@Configuration** | 이 클래스가 설정 파일임을 선언. @Bean 메서드를 포함할 수 있다 |
| **@EnableAutoConfiguration** | classpath의 라이브러리를 감지하여 관련 설정을 자동으로 적용 |
| **@ComponentScan** | 하위 패키지를 스캔해서 @Component 계열 클래스를 Bean으로 자동 등록 |
| **@Bean** | 메서드의 반환 객체를 수동으로 Spring Bean에 등록. 주로 외부 라이브러리에 사용 |
| **AutoConfiguration** | META-INF 하위의 설정 목록을 읽어 라이브러리별 기본 설정을 자동 적용하는 메커니즘 |
