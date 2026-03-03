# 03. Logging (@Slf4j)과 설정 파일 심화

> **날짜**: 2026-02-24
> **키워드**: `SLF4J` `Logback` `@Slf4j` `Log Level` `logging.level` `logging.pattern` `application.properties` `application.yml` `Profile`

---

## 1. 로깅(Logging)이란

### 한 줄 정의

애플리케이션이 실행되는 동안 발생하는 이벤트를 **기록**하는 행위다.

### System.out.println()을 쓰면 안 되는 이유

처음 자바를 배울 때는 `System.out.println()`으로 디버깅했다. 하지만 실무에서는 절대 사용하지 않는다.

| 항목 | System.out.println() | Logger |
|------|---------------------|--------|
| 출력 위치 | 콘솔에만 출력 | 콘솔 + **파일** + 외부 시스템 등 |
| 레벨 구분 | 없음 (전부 출력하거나 전부 안 하거나) | **5단계**로 구분 (필요한 것만 출력 가능) |
| 성능 | 느림 (I/O 블로킹) | 비동기 처리 가능, 훨씬 빠름 |
| 시간 정보 | 없음 (직접 찍어야 함) | **자동**으로 시간, 스레드명, 클래스명 포함 |
| 운영 환경 | 끄려면 코드를 직접 삭제해야 함 | **설정 파일 한 줄**로 On/Off |
| 파일 저장 | 불가 (별도 구현 필요) | 설정만 하면 **자동으로 파일에 저장** |

```java
// 나쁜 예 — 운영에 배포하면 이 코드를 전부 찾아서 지워야 한다
System.out.println("주문 생성 시작: userId=" + userId);
System.out.println("주문 완료: orderId=" + order.getId());

// 좋은 예 — 설정 파일에서 레벨만 바꾸면 출력 여부가 결정된다
log.info("주문 생성 시작: userId={}", userId);
log.info("주문 완료: orderId={}", order.getId());
```

---

## 2. SLF4J와 Logback

### 구조

```
+---------------------------------------------+
|            내가 쓰는 코드                       |
|         log.info("안녕하세요");                 |
+---------------------------------------------+
                    ↓ 호출
+---------------------------------------------+
|         SLF4J  (인터페이스, 규약)                |
|    "로그를 어떻게 남길지"의 표준 API               |
+---------------------------------------------+
                    ↓ 구현
+---------------------------------------------+
|         Logback  (실제 구현체)                   |
|    "실제로 콘솔/파일에 로그를 남기는 엔진"           |
+---------------------------------------------+
```

| 역할 | 이름 | 설명 |
|------|------|------|
| **인터페이스** | SLF4J (Simple Logging Facade for Java) | 로깅 API의 표준 규약. "이렇게 호출하면 된다"만 정의 |
| **구현체** | Logback | SLF4J 규약을 실제로 구현한 로깅 엔진 |

Spring Boot는 `spring-boot-starter-web`만 추가하면 **SLF4J + Logback이 자동으로 포함**된다. 별도로 설치할 필요가 없다.

### 왜 인터페이스와 구현체를 분리했을까

나중에 Logback 대신 Log4j2 같은 다른 로깅 엔진으로 바꾸고 싶을 때, **내 코드는 한 줄도 안 바꾸고** 의존성(라이브러리)만 교체하면 된다. 01번에서 배운 POJO, IoC 철학과 같은 맥락이다.

---

## 3. @Slf4j (Lombok)

### 한 줄 정의

Lombok 라이브러리가 제공하는 어노테이션으로, 클래스에 붙이면 **`log` 변수를 자동 생성**해준다.

### @Slf4j 없이 vs 있이

```java
// === @Slf4j 없이: 직접 Logger 생성 ===
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {
    // 매 클래스마다 이 한 줄을 반복해야 한다
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public void createOrder() {
        log.info("주문 생성");
    }
}

// === @Slf4j 사용: 어노테이션 하나로 끝 ===
import lombok.extern.slf4j.Slf4j;

@Slf4j   // 이 한 줄이 위의 Logger 선언을 대신한다
@Service
public class OrderService {

    public void createOrder() {
        log.info("주문 생성");  // log 변수를 바로 사용 가능
    }
}
```

`@Slf4j`를 붙이면 컴파일 시점에 Lombok이 `private static final Logger log = LoggerFactory.getLogger(OrderService.class);`를 자동으로 생성해준다.

### Lombok 의존성 추가

`@Slf4j`를 사용하려면 `build.gradle`에 Lombok이 있어야 한다.

```gradle
dependencies {
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}
```

Spring Initializr에서 프로젝트 생성 시 Lombok을 체크하면 자동 추가된다.

---

## 4. Log Level 5단계

### 한 줄 정의

로그의 **심각도(중요도)**를 나타내는 등급이다. 설정한 레벨 이상의 로그만 출력된다.

### 5단계 구조

```
낮음 (상세)                                          높음 (심각)
  ←─────────────────────────────────────────────────→
  TRACE     DEBUG     INFO      WARN      ERROR
  모든 흐름   개발 중    운영에서도  주의 필요   에러 발생
  추적       디버깅     남길 정보
```

**레벨을 INFO로 설정하면 → INFO, WARN, ERROR만 출력된다.** (TRACE, DEBUG는 무시)

### 각 레벨별 용도와 예제

```java
@Slf4j
@Service
public class PaymentService {

    public void processPayment(Long orderId, int amount) {

        // TRACE — 가장 상세한 흐름 추적. 개발 중에도 거의 안 씀
        log.trace("processPayment() 메서드 진입");

        // DEBUG — 개발 중 디버깅용. 변수 값 확인 등
        log.debug("결제 요청: orderId={}, amount={}", orderId, amount);

        // INFO — 정상적인 주요 이벤트. 운영에서도 남기는 로그
        log.info("결제 처리 시작: orderId={}", orderId);

        try {
            // ... 결제 로직 ...

            // INFO — 성공 기록
            log.info("결제 완료: orderId={}, amount={}원", orderId, amount);

        } catch (InsufficientBalanceException e) {
            // WARN — 에러는 아니지만 주의가 필요한 상황
            log.warn("잔액 부족으로 결제 실패: orderId={}, 현재잔액={}", orderId, e.getBalance());

        } catch (Exception e) {
            // ERROR — 시스템 에러. 즉시 확인이 필요한 상황
            log.error("결제 중 시스템 오류 발생: orderId={}", orderId, e);
        }
    }
}
```

### 레벨별 정리표

| 레벨 | 용도 | 언제 사용 | 예시 |
|------|------|----------|------|
| **TRACE** | 아주 세밀한 흐름 추적 | 거의 안 씀. 극한의 디버깅 시에만 | 메서드 진입/종료 |
| **DEBUG** | 개발 중 디버깅 | 개발 환경에서만 | 변수 값, SQL 쿼리, 요청 파라미터 |
| **INFO** | 주요 비즈니스 이벤트 | 개발 + 운영 모두 | 서버 시작, 주문 완료, 결제 성공 |
| **WARN** | 잠재적 문제 | 개발 + 운영 모두 | 잔액 부족, 재시도 발생, 느린 쿼리 |
| **ERROR** | 시스템 에러 | 개발 + 운영 모두 | 예외 발생, DB 연결 실패, 외부 API 장애 |

### 로그 메시지 작성 팁: `{}` 플레이스홀더

```java
// 나쁜 예 — 문자열 결합 (+)을 사용
log.debug("사용자 조회: userId=" + userId + ", name=" + name);
// → 로그 레벨이 DEBUG보다 높으면 출력 안 되는데도, 문자열 결합 연산이 먼저 실행됨 (성능 낭비)

// 좋은 예 — {} 플레이스홀더 사용
log.debug("사용자 조회: userId={}, name={}", userId, name);
// → 로그가 실제로 출력될 때만 {} 자리에 값을 채움 (성능 최적화)
```

---

## 5. 로깅 설정 상세

수업에서 배운 설정값들을 하나씩 뜯어보자.

### 기본 설정 (application.properties)

```properties
# 1. 전체 로그 레벨 설정
logging.level.root=info

# 2. 특정 패키지만 다른 레벨 적용
logging.level.org.springframework=warn
logging.level.com.example.myapp=debug

# 3. 로그를 파일로 저장
logging.file.name=logs/application.log

# 4. 콘솔 출력 포맷
logging.pattern.console=%d{HH:mm:ss.SSS} %-5level %logger{36} - %msg%n

# 5. 파일 출력 포맷
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
```

### 각 설정 해석

#### `logging.level.root=info`

**모든 로거**의 기본 레벨을 INFO로 설정한다. INFO 이상(INFO, WARN, ERROR)만 출력된다.

```
logging.level.root=info
              ↑
         "root" = 모든 패키지에 적용되는 기본값
```

#### `logging.level.org.springframework=warn`

Spring 프레임워크 내부 로그는 **WARN 이상만** 출력한다. Spring이 내부적으로 찍는 DEBUG/INFO 로그가 많아서, 이걸 안 하면 콘솔이 Spring 로그로 도배된다.

```
logging.level.org.springframework=warn    ← Spring 내부: WARN 이상만
logging.level.com.example.myapp=debug     ← 내 코드: DEBUG 이상 (더 상세하게)
```

#### `logging.file.name=logs/application.log`

콘솔뿐만 아니라 **파일에도 로그를 저장**한다. 프로젝트 루트에 `logs/` 폴더가 자동 생성되고, 그 안에 `application.log` 파일이 만들어진다.

운영 서버에서는 반드시 파일 로그를 남겨야 한다. 서버가 재시작되면 콘솔 로그는 사라지기 때문이다.

#### `logging.pattern.console` 포맷 해석

```
%d{HH:mm:ss.SSS}  %-5level  %logger{36}         -  %msg%n
│                  │         │                   │  │    │
│                  │         │                   │  │    └─ 줄바꿈
│                  │         │                   │  └─ 실제 로그 메시지
│                  │         │                   └─ 구분자
│                  │         └─ 로거 이름 (최대 36자로 축약)
│                  └─ 로그 레벨 (5자리 왼쪽 정렬)
└─ 시간 (시:분:초.밀리초)
```

**실제 출력 예시:**

```
14:23:45.123 INFO  c.e.myapp.service.OrderService   - 주문 생성 완료: orderId=42
14:23:45.456 ERROR c.e.myapp.service.PaymentService  - 결제 실패: orderId=42
```

#### `logging.pattern.file` 포맷 해석

```
%d{yyyy-MM-dd HH:mm:ss}  [%thread]        %-5level  %logger{36}  -  %msg%n
│                         │                │         │             │  │
│                         │                │         │             │  └─ 메시지 + 줄바꿈
│                         │                │         └─ 로거 이름
│                         │                └─ 로그 레벨
│                         └─ 스레드 이름 (어떤 요청인지 구분)
└─ 날짜 + 시간 (파일은 날짜 정보도 필요)
```

**실제 파일 출력 예시:**

```
2026-02-24 14:23:45 [http-nio-8080-exec-1] INFO  c.e.myapp.service.OrderService   - 주문 생성 완료: orderId=42
2026-02-24 14:23:45 [http-nio-8080-exec-3] ERROR c.e.myapp.service.PaymentService  - 결제 실패: orderId=42
```

파일 로그에는 **날짜(`yyyy-MM-dd`)와 스레드(`[%thread]`)**가 추가된다. 나중에 로그 파일을 분석할 때 "언제, 어떤 요청에서 에러가 났는지" 추적할 수 있어야 하기 때문이다.

### 주요 포맷 패턴 요소 정리

| 패턴 | 의미 | 출력 예시 |
|------|------|----------|
| `%d{패턴}` | 날짜/시간 | `14:23:45.123` 또는 `2026-02-24 14:23:45` |
| `%-5level` | 로그 레벨 (5칸 왼쪽 정렬) | `INFO `, `ERROR` |
| `%logger{36}` | 로거(클래스) 이름. 36자 넘으면 축약 | `c.e.myapp.service.OrderService` |
| `%msg` | 로그 메시지 본문 | `주문 생성 완료: orderId=42` |
| `%n` | 줄바꿈 | (개행) |
| `%thread` | 현재 스레드 이름 | `http-nio-8080-exec-1` |
| `%class` | 전체 클래스명 | `com.example.myapp.service.OrderService` |
| `%method` | 메서드 이름 | `createOrder` |

---

## 6. 개발 vs 운영 로깅 전략

### 왜 환경별로 로그 레벨을 다르게 해야 할까

| 환경 | 목적 | 권장 레벨 |
|------|------|----------|
| **개발 (dev)** | 디버깅, 문제 원인 파악 | `DEBUG` (상세하게) |
| **운영 (prod)** | 성능 유지, 핵심 이벤트만 기록 | `WARN` 또는 `INFO` |

운영 서버에서 DEBUG 레벨로 남기면:
- 로그 파일이 하루에 수십 GB씩 쌓인다
- 디스크 용량 부족으로 서버가 죽을 수 있다
- 너무 많은 로그에 정작 중요한 에러를 못 찾는다

### 프로파일별 설정 분리

```properties
# application.properties — 공통 설정
spring.profiles.active=dev
```

```properties
# application-dev.properties — 개발 환경
logging.level.root=debug
logging.level.com.example.myapp=debug
logging.level.org.springframework=info
logging.pattern.console=%d{HH:mm:ss.SSS} %-5level %logger{36} - %msg%n

# 개발에서는 파일 저장 안 해도 됨 (콘솔로 바로 확인)
```

```properties
# application-prod.properties — 운영 환경
logging.level.root=warn
logging.level.com.example.myapp=info
logging.level.org.springframework=warn

# 운영에서는 반드시 파일에 저장
logging.file.name=logs/application.log
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
```

**배포할 때 프로파일 전환:**

```bash
# 개발 서버에서 실행
java -jar app.jar --spring.profiles.active=dev

# 운영 서버에서 실행 — 이 한 줄만 다르다
java -jar app.jar --spring.profiles.active=prod
```

코드는 하나도 안 바꾸고, **실행할 때 프로파일만 바꾸면** 로깅 설정이 자동으로 바뀐다.

---

## 7. application.properties vs application.yml 심화 비교

### 같은 설정을 두 형식으로 비교

```properties
# application.properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
logging.level.root=info
logging.level.org.springframework=warn
logging.level.com.example.myapp=debug
logging.file.name=logs/application.log
```

```yaml
# application.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: 1234
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

logging:
  level:
    root: info
    org.springframework: warn
    com.example.myapp: debug
  file:
    name: logs/application.log
```

### 상세 비교표

| 항목 | .properties | .yml |
|------|-------------|------|
| **문법** | `key=value` (1줄 1설정) | 들여쓰기 기반 계층 구조 |
| **중복** | `spring.datasource.`가 계속 반복 | 계층으로 묶어서 중복 제거 |
| **가독성** | 설정 10줄까지는 간단 | 설정이 많을수록 구조가 잘 보임 |
| **실수 위험** | 적음 (단순 key=value) | **들여쓰기 실수 시 에러** (탭 금지, 스페이스만!) |
| **리스트 표현** | `list[0]=a`, `list[1]=b` | `- a`, `- b` (직관적) |
| **멀티 프로파일** | 파일을 나눠야 함 | 한 파일에 `---`로 구분 가능 |
| **동시 존재 시** | **properties가 우선** | yml이 나중에 로딩 |

### yml에서 멀티 프로파일 (한 파일에 다 넣기)

```yaml
# application.yml 하나에 전부 작성 가능
server:
  port: 8080

logging:
  level:
    root: info

---
# 개발 환경
spring:
  config:
    activate:
      on-profile: dev

logging:
  level:
    root: debug
    com.example.myapp: debug

---
# 운영 환경
spring:
  config:
    activate:
      on-profile: prod

logging:
  level:
    root: warn
  file:
    name: logs/application.log
```

properties는 `application-dev.properties`, `application-prod.properties`처럼 파일을 나눠야 하지만, yml은 `---` 구분자로 한 파일에 다 넣을 수 있다.

### yml 들여쓰기 주의사항

```yaml
# 올바른 예 (스페이스 2칸)
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb

# 에러나는 예 (탭 사용)
spring:
	datasource:      # ← 탭(Tab)을 쓰면 에러!
		url: ...

# 에러나는 예 (콜론 뒤 스페이스 누락)
spring:
  datasource:
    url:jdbc:mysql://localhost:3306/mydb   # ← 콜론 뒤에 스페이스가 없으면 에러!
```

**yml 작성 규칙:**
1. 들여쓰기는 반드시 **스페이스**(보통 2칸). **탭 절대 금지**
2. `key: value`에서 **콜론 뒤에 반드시 스페이스 1칸**
3. 대소문자 구분함

### 실무에서는 어떤 걸 쓸까

| 상황 | 권장 |
|------|------|
| **신규 프로젝트** | **yml** (대부분의 신규 프로젝트가 yml을 채택) |
| **기존 레거시 프로젝트** | properties (이미 쓰고 있으면 굳이 안 바꿈) |
| **설정이 단순한 경우** | 어떤 것이든 상관없음 |
| **설정이 복잡한 경우** | **yml** (계층 구조로 관리가 편함) |
| **Spring Boot 공식 문서** | 예제가 대부분 **yml 기준** |
| **부트캠프 / 실무 교육** | **yml**을 먼저 가르치는 추세 |

**결론**: 요즘 신규 프로젝트는 **yml이 주류**다. 하지만 properties를 읽을 줄도 알아야 한다. 레거시 코드나 외부 라이브러리 문서에서 properties 형식을 자주 만나기 때문이다.

---

## 8. 실전 예제: 로깅이 적용된 Service 클래스

```java
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(Long id) {
        log.debug("사용자 조회 요청: id={}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("존재하지 않는 사용자 조회 시도: id={}", id);
                    return new RuntimeException("사용자를 찾을 수 없습니다: id=" + id);
                });

        log.info("사용자 조회 완료: id={}, name={}", id, user.getName());
        return user;
    }

    public User createUser(String name, String email) {
        log.info("사용자 생성 시작: name={}, email={}", name, email);

        // 이메일 중복 체크
        if (userRepository.existsByEmail(email)) {
            log.warn("중복 이메일로 가입 시도: email={}", email);
            throw new RuntimeException("이미 사용 중인 이메일입니다");
        }

        try {
            User user = new User(name, email);
            User saved = userRepository.save(user);
            log.info("사용자 생성 완료: id={}, name={}", saved.getId(), saved.getName());
            return saved;
        } catch (Exception e) {
            log.error("사용자 생성 중 시스템 에러: name={}, email={}", name, email, e);
            throw e;
        }
    }
}
```

**로그 레벨 사용 기준:**
- `log.debug()` → 상세 디버깅 정보 (개발 환경에서만 보임)
- `log.info()` → 정상적인 비즈니스 이벤트 (운영에서도 남김)
- `log.warn()` → 에러는 아니지만 주의할 상황
- `log.error()` → 시스템 에러, 마지막 인자로 **예외 객체(e)**를 넘기면 스택트레이스도 함께 출력

---

## 면접 대비 한 줄 요약

| 키워드 | 한 줄 답변 |
|--------|-----------|
| **SLF4J** | 자바 로깅 API의 표준 인터페이스. 구현체(Logback 등)를 갈아끼울 수 있게 해준다 |
| **Logback** | SLF4J의 기본 구현체. Spring Boot에 내장되어 별도 설정 없이 바로 사용 가능 |
| **@Slf4j** | Lombok 어노테이션. 클래스에 붙이면 `log` 변수가 자동 생성된다 |
| **Log Level** | TRACE < DEBUG < INFO < WARN < ERROR. 설정한 레벨 이상만 출력된다 |
| **logging.level.root** | 모든 패키지에 적용되는 기본 로그 레벨 설정 |
| **logging.level.패키지** | 특정 패키지만 별도 레벨 지정. 내 코드는 DEBUG, 프레임워크는 WARN 등으로 분리 가능 |
| **logging.file.name** | 로그를 파일로 저장할 경로 지정. 운영 환경에서는 필수 |
| **logging.pattern** | 로그 출력 형식 정의. `%d` 시간, `%level` 레벨, `%logger` 클래스명, `%msg` 메시지 |
| **{} 플레이스홀더** | 문자열 결합(+) 대신 사용. 성능 최적화 효과가 있다 |
| **application.properties** | Key=Value 형식의 설정 파일. 간단하고 실수가 적다 |
| **application.yml** | YAML 계층 구조의 설정 파일. 가독성이 좋고 신규 프로젝트에서 주로 사용 |
| **프로파일(Profile)** | 환경별(dev, prod) 설정을 분리하는 기능. 코드 변경 없이 설정만 전환 |
