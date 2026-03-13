# 03. 첫 번째 REST API 만들기

> **키워드**: `Spring Initializr` `@RestController` `@GetMapping` `@PostMapping` `@PathVariable` `@RequestBody` `@Slf4j` `Logging` `Postman`

---

## 1. Spring Initializr로 프로젝트 생성

### [start.spring.io](https://start.spring.io) 접속

| 항목 | 설정값 |
|------|--------|
| Project | **Gradle - Groovy** |
| Language | **Java** |
| Spring Boot | **최신 안정 버전** (SNAPSHOT 제외) |
| Group | `com.example` |
| Artifact | `first-api` |
| Packaging | **Jar** |
| Java | **17** 이상 |

### 의존성 추가

| 의존성 | 이유 |
|--------|------|
| **Spring Web** | REST API 개발의 핵심. 내장 Tomcat + DispatcherServlet 포함 |
| **Lombok** | @Slf4j, @Getter 등 반복 코드 자동 생성 |

> Generate → 다운로드 → 압축 해제 → IntelliJ에서 열기

### build.gradle 핵심 부분

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

- `spring-boot-starter-web`: 이 하나로 Spring MVC + 내장 Tomcat + Jackson(JSON 변환) 전부 들어옴
- `lombok`: 📖 [10-lombok](../../phase2-API개발/10-lombok/)에서 상세히 다룸. 지금은 `@Slf4j`만 사용

---

## 2. 프로젝트 실행 확인

### main 클래스 실행

```java
@SpringBootApplication
public class FirstApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(FirstApiApplication.class, args);
    }
}
```

IntelliJ에서 ▶ 버튼을 누르면 콘솔에 Spring Boot 배너가 뜬다:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

Started FirstApiApplication in 1.892 seconds
```

### 브라우저에서 확인

`http://localhost:8080` 접속 → **Whitelabel Error Page**가 뜨면 **성공**이다.

```
Whitelabel Error Page
This application has no explicit mapping for /error
```

아직 아무 API도 안 만들었으니 에러 페이지가 정상이다. 서버가 실행되고 있다는 뜻.

> 📖 여기서 일어나는 일은 [01번 - Spring Boot 앱이 시작될 때](../01-servlet-spring-springboot/)에서 배웠다.

---

## 3. Hello World API

### @RestController + @GetMapping

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "안녕하세요! 첫 번째 API입니다.";
    }
}
```

브라우저에서 `http://localhost:8080/hello` 접속:

```
안녕하세요! 첫 번째 API입니다.
```

### 핵심 어노테이션

| 어노테이션 | 역할 |
|-----------|------|
| `@RestController` | "이 클래스는 REST API를 처리하는 컨트롤러다" (JSON 반환이 기본) |
| `@GetMapping("/hello")` | "GET /hello 요청이 오면 이 메서드를 실행해라" |

### 객체를 반환하면 자동으로 JSON이 된다

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "안녕하세요!");
        response.put("status", "success");
        return response;
    }
}
```

```json
{
    "message": "안녕하세요!",
    "status": "success"
}
```

Java 객체 → JSON 변환은 **Jackson 라이브러리**가 자동으로 해준다. `spring-boot-starter-web`에 이미 포함되어 있다.

---

## 4. Logging — 개발자의 눈

API를 만들었으면, **무슨 일이 일어나는지 기록**해야 한다. 이것이 로깅(Logging)이다.

### System.out.println()을 쓰면 안 되는 이유

| 항목 | System.out.println() | Logger |
|------|---------------------|--------|
| 출력 위치 | 콘솔에만 | 콘솔 + **파일** + 외부 시스템 |
| 레벨 구분 | 없음 | **5단계**로 구분 (필요한 것만 출력) |
| 성능 | 느림 (I/O 블로킹) | 비동기 처리 가능 |
| 시간 정보 | 없음 | **자동** 포함 |
| 운영 환경 | 끄려면 코드를 삭제해야 함 | **설정 한 줄**로 On/Off |

### @Slf4j — 한 줄로 Logger 생성

```java
@Slf4j          // ← Lombok이 log 변수를 자동 생성
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        log.info("Hello API 호출됨");     // ← 바로 사용 가능
        return "안녕하세요!";
    }
}
```

콘솔 출력:

```
2026-03-13 14:23:45 INFO  c.e.firstapi.HelloController - Hello API 호출됨
```

### Log Level 5단계

```
낮음 (상세)                                          높음 (심각)
  ←─────────────────────────────────────────────────→
  TRACE     DEBUG     INFO      WARN      ERROR
  모든 흐름   개발 중    운영에서도  주의 필요   에러 발생
  추적       디버깅     남길 정보
```

**설정한 레벨 이상만 출력된다.** INFO로 설정하면 → INFO, WARN, ERROR만 출력.

```java
log.trace("아주 세밀한 추적");          // 거의 안 씀
log.debug("개발 중 디버깅: id={}", id); // 개발 환경에서만
log.info("주문 완료: orderId={}", id);  // 운영에서도 남김
log.warn("재시도 발생: count={}", cnt); // 주의 필요
log.error("결제 실패: orderId={}", id, e); // 즉시 확인 필요
```

### {} 플레이스홀더 — 성능 최적화

```java
// ❌ 문자열 결합: 로그가 안 찍혀도 결합 연산이 먼저 실행됨
log.debug("사용자: " + userId + ", 이름: " + name);

// ✅ 플레이스홀더: 로그가 실제로 출력될 때만 값을 채움
log.debug("사용자: {}, 이름: {}", userId, name);
```

### application.yml에서 로그 레벨 설정

```yaml
# src/main/resources/application.yml
logging:
  level:
    root: info                     # 전체 기본: INFO 이상만
    org.springframework: warn      # Spring 내부: WARN 이상만 (안 하면 도배됨)
    com.example.firstapi: debug    # 내 코드: DEBUG까지 상세하게
```

> 설정 파일(yml) 형식과 프로파일 분리에 대해서는 📖 [02-resources](../02-resources/)에서 상세히 다룬다.

---

## 5. 학생 관리 CRUD API 만들기

이론은 여기까지. 이제 **진짜 API**를 만들어보자.

> **CRUD** = Create(생성), Read(조회), Update(수정), Delete(삭제)

### 5-1. Student 클래스

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Long id;
    private String name;
    private String email;
    private int grade;
}
```

> `@Getter`, `@Setter` 등은 📖 [10-lombok](../../phase2-API개발/10-lombok/)에서 상세히 다룬다. 지금은 "getter/setter를 자동 생성해주는 어노테이션" 정도로 이해하면 된다.

### 5-2. Controller — 전체 코드

```java
@Slf4j
@RestController
@RequestMapping("/students")   // 이 컨트롤러의 모든 URL 앞에 /students 붙음
public class StudentController {

    // 임시 저장소 (DB 대신 HashMap 사용)
    private final Map<Long, Student> studentMap = new HashMap<>();
    private Long nextId = 1L;

    // ===== CREATE: 학생 등록 =====
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        student.setId(nextId++);
        studentMap.put(student.getId(), student);
        log.info("학생 등록 완료: id={}, name={}", student.getId(), student.getName());
        return student;
    }

    // ===== READ: 전체 조회 =====
    @GetMapping
    public List<Student> getAllStudents() {
        log.debug("전체 학생 조회: 총 {}명", studentMap.size());
        return new ArrayList<>(studentMap.values());
    }

    // ===== READ: 단건 조회 =====
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        Student student = studentMap.get(id);
        if (student == null) {
            log.warn("존재하지 않는 학생 조회: id={}", id);
            throw new RuntimeException("학생을 찾을 수 없습니다: id=" + id);
        }
        log.info("학생 조회: id={}, name={}", id, student.getName());
        return student;
    }

    // ===== UPDATE: 학생 수정 =====
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student student) {
        if (!studentMap.containsKey(id)) {
            log.warn("존재하지 않는 학생 수정 시도: id={}", id);
            throw new RuntimeException("학생을 찾을 수 없습니다: id=" + id);
        }
        student.setId(id);
        studentMap.put(id, student);
        log.info("학생 수정 완료: id={}, name={}", id, student.getName());
        return student;
    }

    // ===== DELETE: 학생 삭제 =====
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        Student removed = studentMap.remove(id);
        if (removed == null) {
            log.warn("존재하지 않는 학생 삭제 시도: id={}", id);
            throw new RuntimeException("학생을 찾을 수 없습니다: id=" + id);
        }
        log.info("학생 삭제 완료: id={}, name={}", id, removed.getName());
        return "삭제 완료: " + removed.getName();
    }
}
```

---

## 6. HTTP 메서드와 어노테이션 매핑

### 요청 매핑 어노테이션

| HTTP 메서드 | 어노테이션 | 용도 |
|------------|-----------|------|
| **GET** | `@GetMapping` | 데이터 **조회** |
| **POST** | `@PostMapping` | 데이터 **생성** |
| **PUT** | `@PutMapping` | 데이터 **전체 수정** |
| **DELETE** | `@DeleteMapping` | 데이터 **삭제** |

> HTTP 메서드와 REST API 설계 원칙은 📖 [07-http-and-rest](../../phase2-API개발/07-http-and-rest/)에서 깊이 있게 다룬다.

### @PathVariable — URL 경로 변수

```java
// /students/42 → id에 42가 들어온다
@GetMapping("/{id}")
public Student getStudent(@PathVariable Long id) { ... }
```

URL의 `{id}` 자리에 들어온 값을 메서드 파라미터로 바인딩한다.

### @RequestBody — 요청 본문 (JSON → Java 객체)

```java
// 클라이언트가 JSON을 보내면 → Java 객체로 자동 변환
@PostMapping
public Student createStudent(@RequestBody Student student) { ... }
```

클라이언트가 보낸 JSON:

```json
{
    "name": "홍길동",
    "email": "hong@example.com",
    "grade": 3
}
```

Jackson이 이 JSON을 Student 객체로 자동 변환해준다.

### @RequestParam — 쿼리 파라미터

```java
// /students?grade=3 → grade에 3이 들어온다
@GetMapping
public List<Student> search(@RequestParam(required = false) Integer grade) { ... }
```

URL 뒤에 `?key=value` 형태로 전달되는 값을 받는다.

### @RequestMapping — 공통 URL 접두사

```java
@RestController
@RequestMapping("/students")  // 모든 API 앞에 /students가 자동으로 붙음
public class StudentController {

    @GetMapping          // → GET /students
    @GetMapping("/{id}") // → GET /students/{id}
    @PostMapping         // → POST /students
}
```

---

## 7. Postman으로 API 테스트

브라우저는 GET 요청만 가능하다. POST, PUT, DELETE를 테스트하려면 **Postman** 같은 도구가 필요하다.

### 설치

[Postman 다운로드](https://www.postman.com/downloads/) → 설치 후 실행

### 테스트 시나리오

#### 1) 학생 등록 (POST)

```
POST http://localhost:8080/students
Headers: Content-Type: application/json
Body (raw → JSON):
{
    "name": "홍길동",
    "email": "hong@example.com",
    "grade": 3
}
```

응답:

```json
{
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "grade": 3
}
```

#### 2) 전체 조회 (GET)

```
GET http://localhost:8080/students
```

#### 3) 단건 조회 (GET)

```
GET http://localhost:8080/students/1
```

#### 4) 학생 수정 (PUT)

```
PUT http://localhost:8080/students/1
Body:
{
    "name": "홍길동",
    "email": "hong_new@example.com",
    "grade": 4
}
```

#### 5) 학생 삭제 (DELETE)

```
DELETE http://localhost:8080/students/1
```

### 콘솔 로그 확인

API를 호출할 때마다 콘솔에 로그가 찍힌다:

```
14:23:45 INFO  c.e.firstapi.StudentController - 학생 등록 완료: id=1, name=홍길동
14:23:50 DEBUG c.e.firstapi.StudentController - 전체 학생 조회: 총 1명
14:23:55 INFO  c.e.firstapi.StudentController - 학생 조회: id=1, name=홍길동
14:24:00 INFO  c.e.firstapi.StudentController - 학생 수정 완료: id=1, name=홍길동
14:24:05 INFO  c.e.firstapi.StudentController - 학생 삭제 완료: id=1, name=홍길동
```

---

## 8. 지금까지 한 일 돌아보기

축하한다! 첫 번째 REST API를 완성했다. 지금 만든 코드에는 **앞으로 배울 것들의 씨앗**이 담겨 있다.

| 지금 코드 | 문제점 | 이후 학습 |
|-----------|--------|----------|
| `new HashMap<>()`으로 직접 저장소 생성 | Spring이 관리하는 객체가 아님 | 📖 [04. IoC와 DI](../04-ioc-and-di/) |
| 모든 메서드에 `log.info()` 직접 작성 | API가 100개면 로깅도 100번 | 📖 [05. AOP](../05-aop/) |
| `throw new RuntimeException()` | 에러 응답 형식이 통일되지 않음 | 📖 [06. 예외 처리](../06-exception-handling/) |
| HTTP 메서드를 "그냥" 사용 | REST 설계 원칙을 모름 | 📖 [07. HTTP와 REST](../../phase2-API개발/07-http-and-rest/) |
| `@GetMapping` 동작 원리를 모름 | DispatcherServlet 흐름 이해 부족 | 📖 [08. Spring MVC](../../phase2-API개발/08-spring-mvc-flow/) |
| 모든 코드가 Controller에 몰려있음 | 계층 분리가 안 됨 | 📖 [09. 계층형 아키텍처](../../phase2-API개발/09-layered-architecture-dao/) |
| getter/setter를 Lombok으로만 처리 | Lombok 활용법을 모름 | 📖 [10. Lombok](../../phase2-API개발/10-lombok/) |
| Student 객체를 그대로 반환 | 내부 엔티티 노출 위험 | 📖 [11. DTO와 Validation](../../phase2-API개발/11-dto-and-validation/) |

**지금은 이 문제들이 뭔지 몰라도 괜찮다.** 04번부터 하나씩 배우면서 "아, 03에서 만든 코드가 이래서 문제였구나!" 하고 체감하게 될 것이다.

---

## 부록: Logging 심화 (나중에 참고)

아래 내용은 지금 당장 알 필요는 없다. 나중에 운영 환경을 세팅하거나 프로젝트를 진행할 때 돌아와서 참고하자.

### SLF4J와 Logback 관계

```
내 코드 (log.info)  →  SLF4J (인터페이스)  →  Logback (실제 구현체)
```

SLF4J는 로깅 API의 **표준 인터페이스**이고, Logback은 그것을 **실제로 구현한 엔진**이다. Spring Boot의 `spring-boot-starter-web`에 둘 다 자동 포함된다.

나중에 Logback 대신 Log4j2로 교체해도 내 코드는 한 줄도 안 바꿔도 된다.

### logback-spring.xml — 고급 로깅 설정

`application.yml`로는 표현할 수 없는 세밀한 설정(파일 롤링, ERROR 전용 파일, 프로파일별 조건 분기)은 이 파일로 한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- 콘솔 출력 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 파일 출력 (날짜별 롤링, 30일 보관, 총 3GB 제한) -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/application.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/application-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 프로파일별 설정 -->
    <springProfile name="dev">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>

    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="FILE"/>
        </root>
    </springProfile>

</configuration>
```

> `logback.xml`이 아닌 **`logback-spring.xml`**을 써야 `<springProfile>` 태그가 동작한다.

### MDC (Mapped Diagnostic Context) — 요청 추적

동시에 100명이 요청하면 로그가 뒤섞인다. MDC로 요청마다 **고유 ID**를 부여하면 추적이 가능하다.

```java
@Component
public class MdcFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse resp,
                         FilterChain chain) throws IOException, ServletException {
        try {
            MDC.put("requestId", UUID.randomUUID().toString().substring(0, 8));
            chain.doFilter(req, resp);
        } finally {
            MDC.clear();  // 반드시 정리 (메모리 누수 방지)
        }
    }
}
```

```
// logback 패턴에 %X{requestId} 추가하면:
14:23:45 [abc12345] INFO  OrderService  - 주문 생성     ← 같은 요청
14:23:45 [abc12345] INFO  PaymentService - 결제 처리    ← 같은 요청!
14:23:45 [xyz67890] INFO  OrderService  - 주문 생성     ← 다른 요청
```

### JSON 로깅

ELK Stack 등 로그 분석 시스템을 쓸 때는 로그를 JSON으로 출력한다.

```json
{"@timestamp":"2026-03-13T14:23:45","level":"INFO","message":"주문 생성","requestId":"abc12345"}
```

> 이 심화 내용들은 Phase 6 미니 프로젝트에서 실제로 적용하게 된다.

---

## 면접 대비 한 줄 요약

| 키워드 | 한 줄 답변 |
|--------|-----------|
| **@RestController** | @Controller + @ResponseBody의 조합. JSON을 반환하는 REST API 컨트롤러에 사용 |
| **@GetMapping** | HTTP GET 요청을 처리하는 메서드에 붙이는 어노테이션 |
| **@PostMapping** | HTTP POST 요청을 처리. 주로 데이터 생성(Create)에 사용 |
| **@PathVariable** | URL 경로의 `{변수}`를 메서드 파라미터로 바인딩 |
| **@RequestBody** | HTTP 요청 본문(JSON)을 Java 객체로 자동 변환. Jackson이 처리 |
| **@RequestParam** | URL 쿼리 파라미터(`?key=value`)를 메서드 파라미터로 바인딩 |
| **@RequestMapping** | 클래스 레벨에 붙여서 공통 URL 접두사를 설정 |
| **SLF4J** | 자바 로깅 API의 표준 인터페이스. 구현체를 교체해도 코드 변경 불필요 |
| **@Slf4j** | Lombok 어노테이션. 클래스에 붙이면 `log` 변수가 자동 생성 |
| **Log Level** | TRACE < DEBUG < INFO < WARN < ERROR. 설정한 레벨 이상만 출력 |
| **{} 플레이스홀더** | 문자열 결합(+) 대신 사용. 성능 최적화 효과 |
| **Postman** | REST API를 테스트하는 도구. GET, POST, PUT, DELETE 요청 가능 |
