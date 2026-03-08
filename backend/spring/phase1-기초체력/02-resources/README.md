# 02. Spring Boot 프로젝트의 Resources 폴더 구조

> **날짜**: 2026-02-23
> **키워드**: `resources` `static` `public` `templates` `META-INF` `application.yml` `application.properties` `프로파일(Profile)`

---

## 1. Spring Boot 프로젝트 전체 디렉토리 구조

Spring Boot 프로젝트를 생성하면 아래와 같은 구조가 만들어진다.

```
my-project/
├── src/
│   ├── main/
│   │   ├── java/                  ← Java 소스 코드 (Controller, Service, Entity 등)
│   │   │   └── com/example/demo/
│   │   │       └── DemoApplication.java
│   │   │
│   │   └── resources/             ← ★ 오늘 배울 핵심 폴더
│   │       ├── static/
│   │       ├── public/
│   │       ├── templates/
│   │       ├── META-INF/
│   │       ├── application.yml
│   │       └── application.properties
│   │
│   └── test/
│       ├── java/                  ← 테스트 코드
│       └── resources/             ← 테스트 전용 리소스
│
├── build.gradle (또는 pom.xml)    ← 빌드 설정, 의존성 관리
└── settings.gradle
```

**핵심**: `src/main/java`에는 코드, `src/main/resources`에는 코드가 아닌 모든 것(설정 파일, 정적 파일, 템플릿 등)이 들어간다.

---

## 2. `src/main/resources` 상세 구조

```
resources/
├── static/                        ← 정적 파일 (CSS, JS, 이미지)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── logo.png
│
├── public/                        ← static과 동일한 역할 (우선순위가 다름)
│   └── favicon.ico
│
├── templates/                     ← 서버 사이드 렌더링 템플릿 (Thymeleaf 등)
│   └── index.html
│
├── META-INF/                      ← 메타 정보
│   ├── resources/                 ← 정적 파일 서빙 가능 (우선순위 가장 높음)
│   └── MANIFEST.MF               ← JAR 메타 정보
│
├── application.yml                ← 메인 설정 파일 (YAML 형식)
├── application.properties         ← 메인 설정 파일 (Key=Value 형식)
├── application-dev.yml            ← 개발 환경 전용 설정
├── application-prod.yml           ← 운영 환경 전용 설정
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

```
파일 위치:   src/main/resources/static/images/logo.png
브라우저 URL: http://localhost:8080/images/logo.png
```

### 예제

```css
/* src/main/resources/static/css/style.css */
body {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #f5f5f5;
}
```

```html
<!-- HTML에서 참조할 때 -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/app.js"></script>
<img src="/images/logo.png" alt="로고">
```

---

## 4. public/ — static과 같은 역할

### 한 줄 정의

`static/`과 동일하게 정적 파일을 서빙하지만, **우선순위가 다르다.**

### static/ vs public/ 차이

| 항목 | static/ | public/ |
|------|---------|---------|
| 역할 | 정적 파일 서빙 | 정적 파일 서빙 |
| 기능 차이 | 없음 | 없음 |
| **우선순위** | **2순위** | **3순위** |
| 관례 | CSS, JS, 이미지 등 대부분의 정적 파일 | favicon.ico, robots.txt 등 루트 파일 |

같은 경로의 파일이 두 폴더에 모두 존재하면, 우선순위가 높은 쪽이 서빙된다.

### 실무에서의 사용

대부분의 프로젝트에서는 **`static/` 하나만 사용**한다. `public/`은 관례상 `favicon.ico`나 `robots.txt`처럼 웹 루트에 바로 놓이는 파일을 두기도 하지만, `static/`에 넣어도 동일하게 동작한다.

---

## 5. templates/ — 서버 사이드 렌더링 템플릿

### 한 줄 정의

Thymeleaf, Mustache 같은 **템플릿 엔진이 처리할 HTML 파일**을 두는 폴더다.

### static/과의 핵심 차이

| 항목 | static/ | templates/ |
|------|---------|------------|
| 브라우저 직접 접근 | 가능 (`/index.html`) | **불가능** |
| 서버에서 가공 | 안 함 (그대로 전송) | **함** (데이터를 채워서 HTML 생성) |
| 용도 | CSS, JS, 이미지 | 동적 HTML 페이지 |
| 반드시 Controller 필요 | 불필요 | **필요** |

### 동작 방식

```java
// Controller가 반드시 있어야 templates/ 안의 HTML이 동작한다
@Controller  // @RestController가 아닌 @Controller
public class PageController {

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("username", "홍길동");
        model.addAttribute("items", List.of("사과", "바나나", "포도"));
        return "home";  // templates/home.html을 찾아서 렌더링
    }
}
```

```html
<!-- src/main/resources/templates/home.html (Thymeleaf) -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>홈페이지</title>
    <link rel="stylesheet" href="/css/style.css">  <!-- static/ 참조 -->
</head>
<body>
    <!-- 서버에서 넘어온 데이터를 HTML에 삽입 -->
    <h1 th:text="'안녕하세요, ' + ${username} + '님!'">안녕하세요</h1>

    <ul>
        <!-- 리스트를 반복하며 HTML 생성 -->
        <li th:each="item : ${items}" th:text="${item}">아이템</li>
    </ul>
</body>
</html>
```

**브라우저가 받는 최종 결과:**

```html
<h1>안녕하세요, 홍길동님!</h1>
<ul>
    <li>사과</li>
    <li>바나나</li>
    <li>포도</li>
</ul>
```

### 요즘 트렌드에서의 위치

Spring Boot + JPA + React/Vue 구조에서는 **백엔드가 JSON만 반환**하므로 `templates/`를 사용하지 않는다. 하지만 관리자 페이지, 이메일 템플릿, 서버 렌더링이 필요한 경우에는 여전히 사용한다.

---

## 6. META-INF/ — 메타 정보

### 한 줄 정의

애플리케이션의 메타데이터(JAR 정보, 자동 설정 등록 정보 등)를 담는 **시스템 레벨 디렉토리**다.

### 주요 파일들

```
META-INF/
├── MANIFEST.MF                           ← JAR 파일 메타 정보
├── resources/                            ← 정적 파일 서빙 (최우선순위)
│   └── index.html
├── spring.factories                      ← (Spring Boot 2.x) 자동 설정 등록
└── spring/
    └── org.springframework.boot.autoconfigure.AutoConfiguration.imports
                                          ← (Spring Boot 3.x) 자동 설정 등록
```

### MANIFEST.MF

JAR 파일로 빌드할 때 자동 생성되며, 메인 클래스 정보 등이 담긴다.

```
Manifest-Version: 1.0
Main-Class: org.springframework.boot.loader.JarLauncher
Start-Class: com.example.demo.DemoApplication
```

`java -jar app.jar`로 실행할 때 여기에 적힌 `Start-Class`를 찾아서 앱을 시작한다.

### META-INF/resources/

이 폴더도 정적 파일을 서빙할 수 있으며, **우선순위가 가장 높다.** 하지만 직접 사용할 일은 거의 없고, 주로 외부 라이브러리(Swagger UI 등)가 자신의 정적 파일을 여기에 넣어서 제공한다.

### spring.factories와 자동 설정의 비밀

01번에서 배운 `@EnableAutoConfiguration`이 자동 설정을 찾는 방법이 바로 이 파일이다.

```
# META-INF/spring.factories (Spring Boot 2.x)
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.example.MyAutoConfiguration,\
  com.example.DatabaseAutoConfiguration
```

Spring Boot는 앱 시작 시 이 파일을 읽어서 "어떤 자동 설정 클래스들을 로딩할지" 결정한다. Spring Boot 3.x부터는 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 파일로 방식이 바뀌었다.

직접 건드릴 일은 거의 없지만, **Spring Boot의 자동 설정이 돌아가는 원리**를 이해하려면 알아둬야 한다.

---

## 7. application.yml / application.properties — 설정 파일

### 한 줄 정의

Spring Boot 앱의 **모든 설정(서버 포트, DB 연결, 로그 레벨 등)을 관리**하는 파일이다.

### 두 가지 형식

같은 내용을 두 가지 형식으로 작성할 수 있다. **기능 차이는 없고 문법만 다르다.**

```properties
# application.properties (Key=Value 형식)
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update
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
```

### properties vs yml 비교

| 항목 | .properties | .yml |
|------|-------------|------|
| 문법 | `key=value` | 들여쓰기 기반 계층 구조 |
| 가독성 | 설정이 많으면 복잡해짐 | 계층이 보여서 읽기 편함 |
| 중복 | 접두사가 계속 반복됨 | 계층으로 묶어서 중복 없음 |
| 주의점 | 간단하고 실수가 적음 | **들여쓰기 실수하면 에러** (탭 사용 금지, 스페이스만) |
| 트렌드 | 레거시 프로젝트에서 많이 사용 | **최근 프로젝트에서 선호** |

두 파일이 동시에 존재하면 `.properties`가 우선 적용된다.

### 프로파일(Profile)로 환경 분리

개발할 때와 실제 서비스할 때 DB 주소, 로그 레벨 등이 다르다. 프로파일을 사용하면 환경별 설정을 분리할 수 있다.

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
    url: jdbc:mysql://prod-server:3306/mydb   # 실제 DB
    username: admin
    password: ${DB_PASSWORD}                   # 환경변수에서 읽어옴

logging:
  level:
    root: WARN                     # 운영에서는 경고 이상만
```

**활성 프로파일 전환 방법:**

```bash
# 방법 1: application.yml에서 설정
spring.profiles.active=dev

# 방법 2: 실행 시 인자로 전달 (운영 배포 시 주로 사용)
java -jar app.jar --spring.profiles.active=prod

# 방법 3: 환경 변수
export SPRING_PROFILES_ACTIVE=prod
```

---

## 8. 정적 리소스 우선순위

같은 경로의 파일이 여러 폴더에 존재하면, Spring Boot는 아래 순서대로 찾는다.

```
1순위:  META-INF/resources/    ← 가장 먼저 (주로 외부 라이브러리용)
2순위:  static/                ← 가장 많이 사용
3순위:  public/
4순위:  resources/             ← (src/main/resources/resources/ 라는 뜻, 거의 안 씀)
```

예를 들어 `index.html`이 `static/`과 `public/` 두 곳 모두에 있으면, `static/index.html`이 서빙된다.

**실무 팁**: 우선순위를 외울 필요는 없다. **`static/` 폴더 하나만 쓰면** 혼란이 없다.

---

## 9. 실전 예제

### 예제 1: 프로젝트 구조 잡기

```
src/main/resources/
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── logo.png
├── templates/
│   └── error/
│       └── 404.html          ← 커스텀 에러 페이지
├── application.yml
├── application-dev.yml
└── application-prod.yml
```

### 예제 2: 커스텀 에러 페이지

`static/error/` 또는 `templates/error/` 폴더에 HTTP 상태 코드 이름의 HTML을 넣으면, Spring Boot가 자동으로 에러 페이지로 사용한다.

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

### 예제 3: 설정값을 코드에서 읽기

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

    public void printInfo() {
        System.out.println(appName);     // "내 멋진 서비스"
        System.out.println(version);     // "1.0.0"
        System.out.println(uploadPath);  // "/uploads"
    }
}
```

---

## 10. 전체 요약: resources 폴더 한눈에 보기

```
resources/
│
├── static/          → 정적 파일 (CSS, JS, 이미지). 브라우저에서 직접 접근 가능.
│
├── public/          → static과 같은 역할. 우선순위만 다름. 실무에서 잘 안 씀.
│
├── templates/       → 서버 사이드 템플릿 (Thymeleaf). Controller를 통해서만 접근.
│
├── META-INF/        → 메타 정보. JAR 정보, 자동 설정 등록 파일.
│                      직접 건드릴 일 거의 없음.
│
├── application.yml  → 앱 설정 파일. 서버 포트, DB 연결, 로그 레벨 등.
│
└── application-{profile}.yml → 환경별 설정 분리 (dev, prod, test).
```

---

## 면접 대비 한 줄 요약

| 키워드 | 한 줄 답변 |
|--------|-----------|
| **static/** | 정적 파일(CSS, JS, 이미지)을 두면 브라우저에서 직접 접근 가능. Controller 불필요 |
| **public/** | static과 동일한 역할이지만 우선순위가 낮다. 실무에서는 static만 주로 사용 |
| **templates/** | Thymeleaf 등 서버 사이드 렌더링용 HTML. 반드시 Controller를 통해서만 접근 가능 |
| **META-INF/** | JAR 메타 정보와 자동 설정 등록 파일이 위치. @EnableAutoConfiguration이 이 안의 설정을 읽는다 |
| **META-INF/resources/** | 정적 파일 서빙 최우선순위. 주로 외부 라이브러리(Swagger 등)가 사용 |
| **application.yml** | Spring Boot 앱의 모든 설정을 관리하는 파일. YAML 계층 구조로 가독성이 좋다 |
| **application.properties** | yml과 동일한 역할. Key=Value 형식. 두 파일이 공존하면 properties가 우선 |
| **프로파일(Profile)** | application-dev.yml, application-prod.yml로 환경별 설정을 분리하는 기능 |
| **정적 리소스 우선순위** | META-INF/resources > static > public > resources 순서로 파일을 찾는다 |
| **@Value** | application.yml의 설정값을 Java 코드에서 주입받을 때 사용하는 어노테이션 |
