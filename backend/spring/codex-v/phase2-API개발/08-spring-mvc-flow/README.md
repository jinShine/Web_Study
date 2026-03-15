# 08. Spring MVC 요청/응답 흐름

> 오늘의 목표: 브라우저 요청이 컨트롤러에 도달하고 JSON 응답이 되기까지의 내부 흐름을 설명할 수 있다.

---

## 오늘 끝나면 되는 것

- DispatcherServlet이 무엇인지 설명할 수 있다.
- `@PathVariable`, `@RequestParam`, `@RequestBody`가 내부적으로 어떻게 바인딩되는지 큰 흐름을 안다.
- 반환 객체가 JSON이 되는 과정을 `HttpMessageConverter`와 연결해 이해한다.
- 디버깅할 때 어디를 봐야 할지 감이 생긴다.

---

## 머릿속 그림

```text
HTTP 요청
 -> DispatcherServlet
 -> HandlerMapping
 -> Controller
 -> ArgumentResolver / MessageConverter
 -> ReturnValueHandler / MessageConverter
 -> HTTP 응답
```

Spring MVC는 "아무튼 알아서 된다"가 아니라,
아주 잘게 쪼개진 협력 구조입니다.

---

## DispatcherServlet 한 줄 정의

Spring MVC의 프론트 컨트롤러입니다.

즉:

- 모든 요청을 먼저 받음
- 어떤 컨트롤러가 처리할지 찾음
- 필요한 파라미터를 준비함
- 응답을 최종 HTTP 형태로 변환함

---

## 요청 파라미터는 누가 넣어줄까

### `@PathVariable`

URL 경로의 값을 꺼내 메서드 파라미터로 넣습니다.

```java
@GetMapping("/studies/{id}")
public StudyResponse findById(@PathVariable Long id) {
    return service.findById(id);
}
```

### `@RequestParam`

쿼리 스트링 값을 꺼내 넣습니다.

```java
@GetMapping("/studies")
public List<StudyResponse> findAll(@RequestParam(required = false) String keyword) {
    return service.findAll(keyword);
}
```

### `@RequestBody`

본문 JSON을 객체로 바꿔 넣습니다.

```java
@PostMapping("/studies")
public StudyResponse create(@RequestBody StudyCreateRequest request) {
    return service.create(request);
}
```

이 변환은 `HttpMessageConverter`가 담당합니다.

---

## 응답은 어떻게 JSON이 될까

```java
@GetMapping("/studies/{id}")
public StudyResponse findById(@PathVariable Long id) {
    return new StudyResponse(id, "Spring MVC");
}
```

흐름:

1. 컨트롤러가 객체 반환
2. Spring이 반환 타입과 어노테이션 확인
3. `MappingJackson2HttpMessageConverter`가 동작
4. 자바 객체를 JSON 문자열로 직렬화
5. HTTP 응답 본문에 기록

---

## `@Controller` vs `@RestController`

- `@Controller`: 뷰 이름 반환이 기본
- `@RestController`: 응답 본문 직렬화가 기본

`@RestController`는 사실 `@Controller + @ResponseBody` 조합입니다.

---

## 디버깅 관점에서 중요한 포인트

요청이 이상할 때 순서를 이렇게 보면 좋습니다.

1. URL이 컨트롤러에 매핑되는가
2. 파라미터 바인딩이 실패하는가
3. JSON 역직렬화가 실패하는가
4. Validation에서 막히는가
5. 반환 객체 직렬화에서 깨지는가

이 순서를 알면 "왜 400이 나는지"를 훨씬 빨리 찾습니다.

---

## 자주 하는 실수

- `@RequestBody` 없이 JSON 본문이 자동 바인딩된다고 생각하는 것
- `GET` 요청과 `POST` 요청 파라미터 방식을 구분하지 않는 것
- `@RestController`인데 뷰 이름처럼 문자열을 반환하는 것
- Jackson 변환 에러를 서비스 로직 문제로 오해하는 것

---

## 면접 체크

1. DispatcherServlet의 역할은 무엇인가요?
2. `@RequestBody`는 내부적으로 어떤 과정을 거쳐 객체로 바인딩되나요?
3. 자바 객체를 반환했을 때 JSON 응답이 되는 이유는 무엇인가요?

---

## 직접 해보기

1. `@PathVariable`, `@RequestParam`, `@RequestBody`를 모두 사용하는 API를 각각 하나씩 만들어보세요.
2. 잘못된 JSON을 보내고 어떤 예외가 나는지 확인해보세요.
3. Controller 메서드에 브레이크포인트를 걸고 요청 흐름을 추적해보세요.

---

## 다음 주제 연결

요청 흐름을 이해했으니, 이제 코드 구조를 계층으로 나눠 책임을 분리하는 이유를 살펴봅니다.
