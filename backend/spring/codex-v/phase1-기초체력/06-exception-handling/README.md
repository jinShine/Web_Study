# 06. 예외 처리 전략

> 오늘의 목표: 실패 상황을 "에러가 났다" 수준이 아니라, 클라이언트가 이해할 수 있는 응답으로 설계할 수 있다.

---

## 오늘 끝나면 되는 것

- 예외를 컨트롤러마다 직접 처리하지 않아야 하는 이유를 안다.
- `@ExceptionHandler`, `@RestControllerAdvice` 역할을 설명할 수 있다.
- 비즈니스 예외와 시스템 예외를 나눠 생각할 수 있다.
- 공통 에러 응답 포맷을 설계할 수 있다.

---

## 머릿속 그림

```text
요청
 -> Controller
 -> Service
 -> 예외 발생
 -> GlobalExceptionHandler
 -> 일관된 JSON 에러 응답
```

핵심은:

- 예외는 던지고
- 한 곳에서 모아서
- 일관된 형태로 응답한다

---

## 왜 필요한가

컨트롤러마다 try-catch를 넣기 시작하면 금방 망가집니다.

```java
@GetMapping("/{id}")
public ResponseEntity<?> findById(@PathVariable Long id) {
    try {
        return ResponseEntity.ok(service.findById(id));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
```

문제:

- 중복 많음
- 응답 포맷 제각각
- 예외 정책 변경이 어려움

---

## 공통 예외 처리 구조

### 비즈니스 예외

```java
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
```

### 에러 코드

```java
public enum ErrorCode {
    STUDY_NOT_FOUND(404, "STUDY_NOT_FOUND", "학습 기록을 찾을 수 없습니다."),
    INVALID_INPUT(400, "INVALID_INPUT", "잘못된 입력입니다.");

    private final int status;
    private final String code;
    private final String message;
}
```

### 공통 응답

```java
public record ErrorResponse(
        int status,
        String code,
        String message
) {
}
```

### 전역 처리기

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getStatus())
                .body(new ErrorResponse(
                        errorCode.getStatus(),
                        errorCode.getCode(),
                        errorCode.getMessage()
                ));
    }
}
```

---

## 언제 어떤 예외를 던질까

- 입력값 검증 실패: 400
- 리소스 없음: 404
- 권한 없음: 403
- 서버 내부 오류: 500

중요한 것은 "예외 클래스 이름"보다 "HTTP 의미가 맞는가"입니다.

---

## `@ExceptionHandler`와 `@RestControllerAdvice`

- `@ExceptionHandler`: 특정 예외를 처리하는 메서드
- `@RestControllerAdvice`: 여러 컨트롤러에 전역 적용

면접에서는 이렇게 정리하면 깔끔합니다.

> 예외는 비즈니스 로직에서 발생시키고, 응답 변환은 `@RestControllerAdvice`에서 일괄 처리해 응답 형식을 표준화했습니다.

---

## 자주 하는 실수

- `Exception`을 전부 한 군데서 뭉뚱그려 처리하는 것
- 메시지만 반환하고 코드나 상태값을 주지 않는 것
- 도메인 예외와 시스템 예외를 구분하지 않는 것
- 로그를 handler와 service 양쪽에서 중복으로 남기는 것

---

## 면접 체크

1. `@RestControllerAdvice`는 왜 필요한가요?
2. 커스텀 예외를 만드는 이유는 무엇인가요?
3. 예외 응답 포맷을 통일하면 어떤 장점이 있나요?

---

## 직접 해보기

1. `NOT_FOUND`, `INVALID_INPUT` 정도만 가진 `ErrorCode`를 직접 만들어보세요.
2. 서비스에서 `BusinessException`을 던져보세요.
3. Postman으로 없는 ID를 조회해서 404 응답을 확인해보세요.
4. 에러 응답에 `timestamp`를 추가해보세요.

---

## 다음 주제 연결

이제 Phase 1 핵심 개념은 갖췄습니다. 다음 실습에서 작은 프로젝트로 조립해보고, 이후 Phase 2에서는 "더 좋은 API"를 만드는 기술로 넘어갑니다.
