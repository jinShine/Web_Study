# 01. Servlet, Spring, Spring Boot

> 오늘의 목표: `왜 Spring Boot가 편한지`를 느낌이 아니라 구조로 설명할 수 있다.

---

## 오늘 끝나면 되는 것

- Servlet이 직접 처리하던 일이 무엇인지 설명할 수 있다.
- Spring이 해결한 문제와 Spring Boot가 해결한 문제를 구분할 수 있다.
- `@SpringBootApplication`이 어떤 역할 묶음인지 말할 수 있다.
- 요청이 결국은 Servlet 기반 위에서 동작한다는 사실을 이해한다.

---

## 머릿속 그림

```text
브라우저 요청
  -> Tomcat
  -> DispatcherServlet
  -> Controller
  -> Service
  -> 응답(JSON)
```

겉으로는 Spring Boot 앱처럼 보이지만, 맨 아래 기반은 여전히 Servlet입니다.

즉:

- Servlet은 기반 기술
- Spring은 개발 구조를 잡아주는 프레임워크
- Spring Boot는 Spring을 빠르게 실행하게 해주는 도구

---

## 왜 진화했는가

### 1. Servlet 시절

Servlet은 요청과 응답을 직접 다뤄야 해서 저수준 작업이 많았습니다.

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name");
        resp.setContentType("text/plain;charset=UTF-8");
        resp.getWriter().write("hello " + name);
    }
}
```

불편한 점:

- URL 매핑, 파라미터 추출, 인코딩 처리, 응답 작성이 매번 반복된다.
- 비즈니스 로직과 웹 기술 코드가 한 클래스에 섞인다.
- 테스트가 어렵고 구조가 커질수록 유지보수가 힘들어진다.

### 2. Spring 등장

Spring은 객체를 직접 만들지 않고 컨테이너가 관리하게 만들었습니다.

- IoC/DI로 결합도를 낮춤
- AOP로 공통 관심사 분리
- MVC로 웹 구조 정리
- POJO 기반으로 테스트하기 쉬운 구조 제공

### 3. Spring Boot 등장

Spring Boot는 Spring 자체를 바꾼 것이 아니라 설정과 실행 부담을 크게 줄였습니다.

- 내장 Tomcat 제공
- Starter 의존성 제공
- 자동 설정 제공
- 실행 가능한 JAR 제공

---

## `@SpringBootApplication`은 무엇인가

실제로는 3개의 역할을 묶은 합성 어노테이션입니다.

```java
@SpringBootApplication
public class StudyApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudyApplication.class, args);
    }
}
```

내부 감각:

- `@Configuration`: 설정 클래스 등록
- `@ComponentScan`: 하위 패키지에서 Bean 탐색
- `@EnableAutoConfiguration`: 라이브러리 보고 필요한 설정 자동 적용

면접에서는 이렇게 말하면 좋습니다.

> Spring Boot는 Spring Framework 위에서 자동 설정과 실행 편의성을 제공하는 도구이며, 내부 웹 요청 처리는 여전히 Servlet 기반으로 동작합니다.

---

## 코드로 비교하기

### Servlet 방식

```java
public class UserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json;charset=UTF-8");
        resp.getWriter().write("{\"name\":\"buzz\"}");
    }
}
```

### Spring Boot 방식

```java
@RestController
public class UserController {

    @GetMapping("/users/me")
    public Map<String, String> me() {
        return Map.of("name", "buzz");
    }
}
```

Spring Boot에서는 아래가 자동으로 이어집니다.

- 요청 매핑
- JSON 변환
- Tomcat 실행
- 객체 생성과 주입

---

## 자주 하는 실수

- Spring Boot를 "새로운 프레임워크"라고 이해하는 것
- DispatcherServlet과 Servlet을 서로 다른 세계로 보는 것
- Boot가 모든 것을 마법처럼 처리한다고 생각하고 내부 구조를 전혀 보지 않는 것

기억할 한 문장:

> Boot는 복잡함을 숨겨주지만, 없애주지는 않는다.

---

## 면접 체크

1. Servlet, Spring, Spring Boot의 차이를 설명해보세요.
2. `@SpringBootApplication`이 내부적으로 어떤 역할을 하나요?
3. Spring Boot 앱도 결국 Servlet 기반이라고 말할 수 있는 이유는 무엇인가요?

---

## 직접 해보기

1. `@RestController`를 하나 만들고 `GET /hello`를 구현해보세요.
2. 반환 타입을 `String`, `Map`, DTO로 각각 바꿔보고 응답 JSON 차이를 확인해보세요.
3. 실행 로그에서 Tomcat이 뜨는 부분을 찾아보세요.

---

## 다음 주제 연결

이제 애플리케이션이 실행되는 환경을 배웠으니, 다음에는 `resources` 폴더와 설정 파일이 왜 중요한지 봅니다.
