# 03. 첫 번째 REST API 만들기

> 오늘의 목표: 요청을 받고, 데이터를 읽고, JSON으로 응답하는 최소 흐름을 직접 만든다.

---

## 오늘 끝나면 되는 것

- `@RestController`, `@GetMapping`, `@PostMapping` 역할을 설명할 수 있다.
- `@PathVariable`, `@RequestParam`, `@RequestBody` 차이를 구분할 수 있다.
- JSON 응답이 자동으로 만들어지는 과정을 감으로 이해한다.
- Postman이나 curl로 API를 테스트할 수 있다.

---

## 머릿속 그림

```text
클라이언트 요청
  -> Controller
  -> 메서드 실행
  -> 반환 객체
  -> Jackson이 JSON으로 변환
  -> HTTP 응답
```

여기서 중요한 포인트는:

- Controller는 URL과 메서드를 연결한다.
- Jackson은 자바 객체를 JSON으로 바꾼다.
- 브라우저 대신 Postman이나 curl로 테스트해도 된다.

---

## 가장 작은 예제

```java
@RestController
@RequestMapping("/api/studies")
public class StudyController {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        return Map.of("message", "study start");
    }
}
```

호출:

```bash
curl http://localhost:8080/api/studies/hello
```

응답:

```json
{
  "message": "study start"
}
```

---

## 경로 변수 vs 쿼리 파라미터

### `@PathVariable`

리소스 자체를 특정할 때 씁니다.

```java
@GetMapping("/{id}")
public StudyResponse findById(@PathVariable Long id) {
    return new StudyResponse(id, "Spring MVC");
}
```

예:

`GET /api/studies/1`

### `@RequestParam`

조회 조건이나 옵션을 받을 때 씁니다.

```java
@GetMapping
public List<StudyResponse> findAll(@RequestParam(required = false) String keyword) {
    return List.of();
}
```

예:

`GET /api/studies?keyword=spring`

---

## POST 요청과 `@RequestBody`

```java
@PostMapping
public StudyResponse create(@RequestBody StudyCreateRequest request) {
    return new StudyResponse(1L, request.title());
}

public record StudyCreateRequest(String title, String content) {
}
```

요청 본문:

```json
{
  "title": "Spring Boot",
  "content": "today I learned controller"
}
```

핵심 감각:

- JSON -> 자바 객체: 역직렬화
- 자바 객체 -> JSON: 직렬화

둘 다 Jackson이 처리합니다.

---

## 로깅도 같이 시작하자

처음 API를 만들 때부터 로그를 보는 습관이 중요합니다.

```java
@Slf4j
@RestController
@RequestMapping("/api/studies")
public class StudyController {

    @PostMapping
    public StudyResponse create(@RequestBody StudyCreateRequest request) {
        log.info("study created. title={}", request.title());
        return new StudyResponse(1L, request.title());
    }
}
```

로그는 "나중에 붙이는 것"이 아니라, 처음부터 추적 도구로 같이 가는 것이 좋습니다.

---

## 자주 하는 실수

- `@Controller`와 `@RestController`를 혼동하는 것
- `@RequestBody` 없이 JSON 요청이 자동 바인딩된다고 생각하는 것
- `@PathVariable` 이름과 URL 변수 이름을 다르게 써놓고 오류 내는 것
- GET 요청에 본문을 붙여 보내는 것

---

## 면접 체크

1. `@RestController`와 `@Controller`의 차이는 무엇인가요?
2. `@PathVariable`과 `@RequestParam`은 언제 각각 사용하나요?
3. 객체를 반환했을 때 JSON 응답이 만들어지는 과정은 어떻게 되나요?

---

## 직접 해보기

1. `GET /api/studies/{id}`를 만들고 id를 응답에 포함해보세요.
2. `GET /api/studies?category=java`처럼 쿼리 파라미터를 받아보세요.
3. `POST /api/studies`를 만들고 요청 JSON을 DTO로 받아보세요.
4. 잘못된 JSON을 보내보고 어떤 에러가 나는지 확인해보세요.

---

## 다음 주제 연결

API를 만들었지만, 아직 객체 생성과 의존 관계는 직접 관리하고 있습니다. 다음에는 Spring이 왜 컨테이너를 통해 객체를 관리하는지 봅니다.
