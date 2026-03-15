# 11. DTO와 Validation

> 오늘의 목표: 입출력 경계를 DTO로 분리하고, 잘못된 요청을 비즈니스 로직에 들어오기 전에 차단한다.

---

## 오늘 끝나면 되는 것

- Entity를 직접 요청/응답으로 쓰면 왜 위험한지 설명할 수 있다.
- Request DTO와 Response DTO를 분리할 수 있다.
- `@Valid`와 주요 검증 어노테이션을 사용할 수 있다.
- 검증 실패 응답을 일관되게 처리할 수 있다.

---

## 머릿속 그림

```text
클라이언트 <-> DTO <-> Service <-> Entity
```

핵심은:

- 외부 세계와 내부 모델을 분리한다
- 검증은 가능한 한 입구에서 막는다

---

## 왜 DTO가 필요한가

Entity를 그대로 노출하면:

- 민감 정보가 응답에 노출될 수 있음
- 클라이언트가 조작하면 안 되는 필드가 입력으로 들어올 수 있음
- API 스펙 변경이 도메인 모델 변경과 강하게 엮임

예:

```java
public class User {
    private Long id;
    private String email;
    private String password;
    private String role;
}
```

이걸 그대로 응답하면 `password`, `role` 같은 정보가 새어나갈 수 있습니다.

---

## DTO 분리 패턴

### Request DTO

```java
@Getter
@NoArgsConstructor
public class StudyCreateRequest {

    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 50, message = "제목은 50자 이하여야 합니다.")
    private String title;

    @NotBlank(message = "내용은 필수입니다.")
    private String content;
}
```

### Response DTO

```java
@Getter
@Builder
public class StudyResponse {
    private Long id;
    private String title;
    private String content;
}
```

---

## `@Valid`는 어디에 붙이나

```java
@PostMapping("/studies")
public ResponseEntity<StudyResponse> create(@Valid @RequestBody StudyCreateRequest request) {
    return ResponseEntity.ok(service.create(request));
}
```

흐름:

1. JSON -> DTO 바인딩
2. `@Valid` 검사
3. 실패하면 컨트롤러 본문 진입 전 예외 발생

즉, Validation은 서비스 전에 작동합니다.

---

## 자주 쓰는 검증 어노테이션

| 어노테이션 | 용도 |
|---|---|
| `@NotNull` | null 금지 |
| `@NotBlank` | null, 빈 문자열, 공백 금지 |
| `@Size` | 문자열/컬렉션 길이 제한 |
| `@Email` | 이메일 형식 검사 |
| `@Min`, `@Max` | 숫자 범위 검사 |
| `@Pattern` | 정규식 검사 |

---

## 검증 실패 응답 처리

검증 실패를 그대로 두면 프레임워크 기본 응답이 나올 수 있습니다.

그래서 전역 처리기로 정리해주는 편이 좋습니다.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("잘못된 요청입니다.");

        return ResponseEntity.badRequest()
                .body(new ErrorResponse(400, "INVALID_INPUT", message));
    }
}
```

---

## 실무 포인트

- 검증은 Request DTO에 둔다
- 비즈니스 규칙 검증은 Service에서 추가로 한다
- 응답 DTO에는 Validation이 거의 필요 없다
- Entity에 검증을 마구 붙이기보다 API 입력 경계에서 먼저 관리한다

---

## 자주 하는 실수

- Entity를 그대로 `@RequestBody`로 받는 것
- 검증 실패를 서비스 로직에서 처리하려는 것
- `@Valid`를 붙이지 않고 어노테이션만 달아놓는 것
- Request DTO와 Response DTO를 하나로 합치는 것

---

## 면접 체크

1. DTO를 사용하는 이유는 무엇인가요?
2. `@Valid`는 언제 동작하나요?
3. Validation과 비즈니스 검증은 어떻게 구분하나요?

---

## 직접 해보기

1. `StudyCreateRequest`, `StudyUpdateRequest`, `StudyResponse`를 분리해보세요.
2. 제목 길이와 내용 필수 검증을 넣어보세요.
3. 검증 실패 메시지를 공통 응답 포맷으로 내려보세요.

---

## 다음 주제 연결

DTO가 늘어나면 Entity와 DTO 간 변환 코드가 반복됩니다. 다음에는 이 반복을 줄이는 MapStruct를 배웁니다.
