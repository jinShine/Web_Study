# 02. Resources 폴더 구조와 설정 파일

> **키워드**: `resources` `static` `templates` `META-INF` `application.yml` `application.properties` `Profile` `@Value` `@ConfigurationProperties` `Jasypt`

---

## 1. Spring Boot 프로젝트 디렉토리 구조

Spring Boot 프로젝트를 생성하면 아래와 같은 구조가 만들어진다.

```
my-project/
├── src/
│   ├── main/
│   │   ├── java/                  ← Java 소스 코드 (Controller, Service, Entity 등)
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   │
│   │   └── resources/             ← ★ 코드가 아닌 모든 것 (설정, 정적 파일, 템플릿)
│   │       ├── static/
│   │       ├── templates/
│   │       ├── META-INF/
│   │       ├── application.yml
│   │       └── logback-spring.xml
│   │
│   └── test/
│       ├── java/                  ← 테스트 코드
│       └── resources/             ← 테스트 전용 리소스
│
├── build.gradle (또는 pom.xml)    ← 빌드 설정, 의존성 관리
└── settings.gradle
```

**핵심**: `src/main/java`에는 코드, `src/main/resources`에는 코드가 아닌 모든 것이 들어간다.

---

## 2. resources/ 상세 구조

```
resources/
├── static/                        ← 정적 파일 (CSS, JS, 이미지)
│   ├── css/
│   ├── js/
│   └── images/
│
├── public/                        ← static과 동일한 역할 (우선순위가 낮음)
│
├── templates/                     ← 서버 사이드 렌더링 템플릿 (Thymeleaf 등)
│   └── index.html
│
├── META-INF/                      ← 메타 정보 (JAR 정보, 자동 설정 등록)
│
├── application.yml                ← 메인 설정 파일 (YAML 형식)
├── application-dev.yml            ← 개발 환경 전용 설정
├── application-prod.yml           ← 운영 환경 전용 설정
├── logback-spring.xml             ← 로깅 상세 설정 (📖 03-logging-and-config 참고)
└── data.sql / schema.sql          ← DB 초기화 스크립트 (선택)
```

---

## 3. static/ — 정적 파일 서빙

### 한 줄 정의

CSS, JavaScript, 이미지 등 **서버가 가공하지 않고 그대로 브라우저에 내려보내는 파일**을 두는 폴더다.

### 특징

- Spring Boot가 이 폴더 안의 파일을 자동으로 웹에서 접근 가능하게 만든다
- 별도의 Controller 없이 URL로 바로 접근할 수 있다
- REST API 서버에서는 잘 사용하지 않지만, 풀스택이나 관리자 페이지에서 활용된다

### 접근 방식

```
파일 위치:   src/main/resources/static/css/style.css
브라우저 URL: http://localhost:8080/css/style.css
                                    ↑
                       static/ 은 URL에 포함되지 않는다!
```

```html
<!-- HTML에서 참조할 때 -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/app.js"></script>
<img src="/images/logo.png" alt="로고">
```

### 정적 리소스 우선순위

같은 경로의 파일이 여러 폴더에 존재하면, Spring Boot는 아래 순서대로 찾는다.

```
1순위:  META-INF/resources/    ← 주로 외부 라이브러리(Swagger UI 등)가 사용
2순위:  static/                ← 가장 많이 사용
3순위:  public/                ← static과 같은 역할, 우선순위만 낮음
```

**실무 팁**: `static/` 폴더 하나만 쓰면 혼란이 없다. `public/`은 관례상 `favicon.ico`나 `robots.txt`에 쓰기도 하지만, `static/`에 넣어도 동일하게 동작한다.

---

## 4. templates/ — 서버 사이드 렌더링

### 한 줄 정의

Thymeleaf, Mustache 같은 **템플릿 엔진이 처리할 HTML 파일**을 두는 폴더다.

### static/ vs templates/ 핵심 차이

| 항목 | static/ | templates/ |
|------|---------|------------|
| 브라우저 직접 접근 | 가능 (`/index.html`) | **불가능** |
| 서버에서 가공 | 안 함 (그대로 전송) | **함** (데이터를 채워서 HTML 생성) |
| 반드시 Controller 필요 | 불필요 | **필요** (`@Controller`로 연결) |
| 용도 | CSS, JS, 이미지 | 동적 HTML 페이지 |

### 동작 방식

```java
@Controller  // @RestController가 아닌 @Controller
public class PageController {

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("username", "홍길동");
        return "home";  // templates/home.html을 찾아서 렌더링
    }
}
```

```html
<!-- src/main/resources/templates/home.html (Thymeleaf) -->
<h1 th:text="'안녕하세요, ' + ${username} + '님!'">안녕하세요</h1>
```

### 요즘 트렌드

Spring Boot + React/Vue 구조에서는 **백엔드가 JSON만 반환**하므로 `templates/`를 사용하지 않는다. 하지만 관리자 페이지, 이메일 템플릿, 서버 렌더링이 필요한 경우에는 여전히 사용한다.

---

## 5. META-INF/ — 메타 정보

### 한 줄 정의

애플리케이션의 메타데이터(JAR 정보, 자동 설정 등록 정보 등)를 담는 **시스템 레벨 디렉토리**다.

### 주요 파일들

| 파일 | 용도 |
|------|------|
| `MANIFEST.MF` | JAR 메타 정보. `java -jar`로 실행할 때 어떤 클래스가 메인인지 알려준다 |
| `resources/` | 정적 파일 서빙 (최우선순위). 주로 외부 라이브러리(Swagger UI 등)가 사용 |
| `spring/...AutoConfiguration.imports` | Spring Boot 3.x 자동 설정 목록. `@EnableAutoConfiguration`이 이 파일을 읽는다 |

직접 건드릴 일은 거의 없지만, 📖 [01번에서 배운 AutoConfiguration](../01-servlet-spring-springboot/)이 동작하는 원리가 바로 이 파일들이다.

---

## 6. 설정 파일: application.yml vs application.properties

### 한 줄 정의

Spring Boot 앱의 **모든 설정(서버 포트, DB 연결, 로그 레벨 등)을 관리**하는 파일이다.

### 두 가지 형식 비교

같은 내용을 두 가지 형식으로 작성할 수 있다. **기능 차이는 없고 문법만 다르다.**

```properties
# application.properties (Key=Value 형식)
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
logging.level.root=info
logging.level.com.example.myapp=debug
```

```yaml
# application.yml (YAML 형식 — 들여쓰기로 계층 표현)
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
    com.example.myapp: debug
```

### 상세 비교표

| 항목 | .properties | .yml |
|------|-------------|------|
| **문법** | `key=value` (1줄 1설정) | 들여쓰기 기반 계층 구조 |
| **중복** | `spring.datasource.`가 계속 반복 | 계층으로 묶어서 중복 제거 |
| **가독성** | 설정 10줄까지는 간단 | 설정이 많을수록 구조가 잘 보임 |
| **실수 위험** | 적음 (단순 key=value) | **들여쓰기 실수 시 에러** (탭 금지!) |
| **리스트** | `list[0]=a`, `list[1]=b` | `- a`, `- b` (직관적) |
| **멀티 프로파일** | 파일을 나눠야 함 | 한 파일에 `---`로 구분 가능 |
| **동시 존재 시** | **properties가 우선** | yml이 나중에 로딩 |

### yml 작성 규칙 (실수 방지)

```yaml
# ✅ 올바른 예 (스페이스 2칸)
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb

# ❌ 에러: 탭(Tab) 사용
spring:
	datasource:      # ← 탭 쓰면 에러!

# ❌ 에러: 콜론 뒤 스페이스 누락
spring:
  datasource:
    url:jdbc:mysql://...   # ← 콜론 뒤에 스페이스 필수!
```

**yml 3대 규칙:**
1. 들여쓰기는 반드시 **스페이스**(보통 2칸). **탭 절대 금지**
2. `key: value`에서 **콜론 뒤에 반드시 스페이스 1칸**
3. 대소문자를 구분한다

### 실무에서는 어떤 걸 쓸까

| 상황 | 권장 |
|------|------|
| 신규 프로젝트 | **yml** (대부분 신규 프로젝트가 채택) |
| 레거시 프로젝트 | properties (이미 쓰고 있으면 굳이 안 바꿈) |
| Spring Boot 공식 문서 | 예제가 대부분 **yml 기준** |

**결론**: 요즘 신규 프로젝트는 **yml이 주류**다. 하지만 properties를 읽을 줄도 알아야 한다.

---

## 7. 프로파일(Profile) — 환경별 설정 분리

### 한 줄 정의

개발·운영 환경에 따라 **다른 설정을 적용**할 수 있게 해주는 Spring Boot 기능이다.

### 왜 필요한가

개발할 때와 실제 서비스할 때 DB 주소, 로그 레벨, 외부 API 키 등이 다르다. 코드를 바꾸지 않고 **설정만 전환**하는 것이 핵심이다.

### 파일 분리 방식

```yaml
# application.yml — 공통 설정
server:
  port: 8080

spring:
  profiles:
    active: dev        # 기본으로 dev 프로파일 사용
```

```yaml
# application-dev.yml — 개발 환경
spring:
  datasource:
    url: jdbc:h2:mem:testdb       # 가벼운 인메모리 DB
    driver-class-name: org.h2.Driver

logging:
  level:
    root: DEBUG                    # 개발 중에는 상세 로그
```

```yaml
# application-prod.yml — 운영 환경
spring:
  datasource:
    url: jdbc:mysql://prod-server:3306/mydb
    username: admin
    password: ${DB_PASSWORD}       # 환경변수에서 읽어옴

logging:
  level:
    root: WARN                     # 운영에서는 경고 이상만
```

### yml 멀티 프로파일 (한 파일에 모두 작성)

```yaml
# application.yml 하나에 전부 작성 가능
server:
  port: 8080
---
spring:
  config:
    activate:
      on-profile: dev
logging:
  level:
    root: debug
---
spring:
  config:
    activate:
      on-profile: prod
logging:
  level:
    root: warn
```

properties는 `application-dev.properties`, `application-prod.properties`처럼 파일을 나눠야 하지만, yml은 `---` 구분자로 한 파일에 넣을 수 있다.

### 활성 프로파일 전환 방법

```bash
# 방법 1: application.yml에서 설정 (개발 시 기본값)
spring.profiles.active=dev

# 방법 2: 실행 시 인자로 전달 (운영 배포 시 주로 사용)
java -jar app.jar --spring.profiles.active=prod

# 방법 3: 환경 변수 (CI/CD, Docker 등에서 활용)
export SPRING_PROFILES_ACTIVE=prod
```

---

## 8. 설정값 읽기: @Value

### 한 줄 정의

`application.yml`의 설정값을 Java 코드에서 **주입받을 때** 사용하는 어노테이션이다.

```yaml
# application.yml
app:
  name: 내 멋진 서비스
  version: 1.0.0
  upload-path: /uploads
```

```java
@Component
public class AppProperties {

    @Value("${app.name}")
    private String appName;

    @Value("${app.version}")
    private String version;

    @Value("${app.upload-path}")
    private String uploadPath;

    // 기본값 지정 (설정이 없으면 이 값을 사용)
    @Value("${app.max-size:10485760}")
    private long maxSize;
}
```

### @Value의 한계

| 문제 | 설명 |
|------|------|
| 타입 안전 없음 | 오타 나면 런타임에서야 에러를 발견한다 |
| 검증 불가 | 값이 비었는지, 범위가 맞는지 확인할 수 없다 |
| 필드가 많으면 번거로움 | 설정이 10개면 `@Value`도 10개 작성해야 한다 |

이 한계를 극복하는 것이 아래의 `@ConfigurationProperties`다.

---

## 9. 설정값 읽기: @ConfigurationProperties (타입 안전 바인딩)

### 한 줄 정의

설정 파일의 값을 **자바 객체에 자동 매핑**해주는 어노테이션이다. `@Value`보다 안전하고 관리하기 편하다.

### @Value vs @ConfigurationProperties

| 항목 | @Value | @ConfigurationProperties |
|------|--------|--------------------------|
| 사용 방식 | 필드마다 `@Value("${key}")` | 클래스 하나에 prefix 지정 |
| 타입 검증 | 런타임 에러 | **컴파일 타임에 감지 가능** |
| 유효성 검증 | 불가 | `@Validated` + Bean Validation 사용 가능 |
| IDE 자동 완성 | 없음 | **있음** (spring-boot-configuration-processor) |
| 추천 상황 | 설정 1~2개 간단히 읽을 때 | 설정이 여러 개, 그룹으로 묶을 때 |

### 사용법

```yaml
# application.yml
app:
  name: 내 멋진 서비스
  version: 1.0.0
  upload:
    path: /uploads
    max-size: 10485760
    allowed-types:
      - image/png
      - image/jpeg
      - application/pdf
```

```java
@Getter
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String name;
    private String version;
    private Upload upload = new Upload();

    @Getter
    @Setter
    public static class Upload {
        private String path;
        private long maxSize;
        private List<String> allowedTypes;
    }
}
```

```java
// 사용하는 쪽: 일반 Bean처럼 주입받아 사용
@Service
public class FileService {

    private final AppProperties appProperties;

    public FileService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public void upload(MultipartFile file) {
        String path = appProperties.getUpload().getPath();
        long maxSize = appProperties.getUpload().getMaxSize();
        // ... 타입 안전하게 설정값 사용
    }
}
```

### Validation 추가

```java
@Getter
@Validated  // ← Bean Validation 활성화
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    @NotBlank
    private String name;

    @NotNull
    private Upload upload;

    @Getter @Setter
    public static class Upload {
        @NotBlank
        private String path;

        @Min(1024)
        @Max(52428800) // 50MB
        private long maxSize;
    }
}
```

앱 시작 시 설정값이 유효하지 않으면 **즉시 실패**한다. 운영 중에 잘못된 설정으로 장애가 나는 것을 방지할 수 있다.

### IDE 자동 완성 설정 (선택)

`build.gradle`에 아래를 추가하면, `application.yml` 작성 시 IDE에서 자동 완성이 동작한다.

```gradle
dependencies {
    annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
}
```

---

## 10. 설정 우선순위

Spring Boot는 여러 곳에서 설정값을 읽을 수 있다. 같은 키가 중복되면 **아래 순서대로 우선 적용**된다.

```
1순위: 커맨드라인 인자          --server.port=9090
2순위: 환경 변수                SERVER_PORT=9090
3순위: application-{profile}.yml  application-prod.yml
4순위: application.yml          기본 설정
5순위: @ConfigurationProperties 기본값
```

**실무에서 이것이 중요한 이유**: 운영 서버에서는 yml 파일을 수정하지 않고, **환경 변수나 커맨드라인 인자**로 설정을 덮어씌운다.

```bash
# yml에는 기본값이 있지만, 운영 배포 시 커맨드라인으로 덮어쓰기
java -jar app.jar \
  --spring.profiles.active=prod \
  --spring.datasource.password=${DB_PASSWORD} \
  --server.port=80
```

---

## 11. Jasypt — 민감 정보 암호화 (개요)

### 한 줄 정의

`application.yml`에 DB 비밀번호 같은 민감 정보를 **암호화해서 저장**할 수 있게 해주는 라이브러리다.

### 문제 상황

```yaml
# ❌ 이렇게 비밀번호를 평문으로 두면 Git에 올라간다!
spring:
  datasource:
    password: mySecret123
```

### Jasypt 적용 후

```yaml
# ✅ 암호화된 값으로 저장
spring:
  datasource:
    password: ENC(G8j2kF9LmN3pQ7rS1tU5vW)
```

### 기본 사용법

```gradle
// build.gradle
dependencies {
    implementation 'com.github.ulisesbocchio:jasypt-spring-boot-starter:3.0.5'
}
```

```yaml
# application.yml
jasypt:
  encryptor:
    password: ${JASYPT_KEY}  # 복호화 키는 환경 변수로!
```

```java
// 암호화할 값 생성 (1회성 유틸리티)
StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
encryptor.setPassword("myJasyptKey");
String encrypted = encryptor.encrypt("mySecret123");
System.out.println(encrypted);  // → G8j2kF9LmN3pQ7rS1tU5vW
```

**핵심**: Jasypt의 복호화 키(`JASYPT_KEY`) 자체는 **환경 변수**로 관리한다. yml에 넣으면 의미가 없다.

> 실무에서는 Jasypt 대신 **환경 변수** + **Secret Manager(AWS, Vault 등)**를 쓰는 추세지만, 소규모 프로젝트에서는 Jasypt가 간편하다.

---

## 12. 커스텀 에러 페이지 (보너스)

`static/error/` 또는 `templates/error/`에 HTTP 상태 코드 이름의 HTML을 넣으면, Spring Boot가 자동으로 에러 페이지로 사용한다.

```
static/error/404.html    ← 404 Not Found 시 자동 표시
static/error/500.html    ← 500 Internal Server Error 시 자동 표시
```

```html
<!-- src/main/resources/static/error/404.html -->
<!DOCTYPE html>
<html>
<body>
    <h1>404 - 페이지를 찾을 수 없습니다</h1>
    <p>요청하신 주소가 올바른지 확인해주세요.</p>
    <a href="/">홈으로 돌아가기</a>
</body>
</html>
```

REST API 서버에서는 📖 [06-exception-handling](../06-exception-handling/)에서 배운 `@RestControllerAdvice`로 JSON 에러 응답을 반환하므로, HTML 에러 페이지는 주로 SSR(서버 사이드 렌더링) 프로젝트에서 사용한다.

---

## 면접 대비 한 줄 요약

| 키워드 | 한 줄 답변 |
|--------|-----------|
| **static/** | 정적 파일(CSS, JS, 이미지)을 두면 브라우저에서 직접 접근 가능. Controller 불필요 |
| **templates/** | Thymeleaf 등 서버 사이드 렌더링용 HTML. 반드시 Controller를 통해서만 접근 가능 |
| **META-INF/** | JAR 메타 정보와 자동 설정 등록 파일이 위치. 직접 건드릴 일은 거의 없다 |
| **application.yml** | Spring Boot 앱의 모든 설정을 관리하는 파일. YAML 계층 구조로 가독성이 좋다 |
| **application.properties** | yml과 동일한 역할의 Key=Value 형식. 두 파일이 공존하면 properties가 우선 |
| **프로파일(Profile)** | application-dev.yml, application-prod.yml로 환경별 설정을 분리하는 기능 |
| **@Value** | application.yml의 설정값을 Java 코드에서 필드에 주입받을 때 사용 |
| **@ConfigurationProperties** | 설정값을 자바 객체에 타입 안전하게 매핑. @Value보다 관리·검증이 편하다 |
| **설정 우선순위** | 커맨드라인 > 환경변수 > profile yml > application.yml 순으로 우선 적용 |
| **Jasypt** | yml에 민감 정보를 암호화해서 저장하는 라이브러리. ENC(암호문) 형식 사용 |
| **정적 리소스 우선순위** | META-INF/resources > static > public 순서로 파일을 찾는다 |
