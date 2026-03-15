# Phase 1 복습 실습

> 목표: Phase 1에서 배운 개념만으로 작은 REST API를 직접 조립해보며 "기초 체력"을 손에 붙인다.

---

## 프로젝트 주제

`학습 메모 API`

기능은 단순하게 가져갑니다.

- 메모 등록
- 메모 단건 조회
- 메모 목록 조회
- 없는 메모 조회 시 예외 처리

DB 없이 메모리 저장소로 충분합니다.

---

## 이 실습에서 복습하는 것

| 주제 | 적용 포인트 |
|---|---|
| 01 | Spring Boot 프로젝트 실행 구조 이해 |
| 02 | `application.yml`, 로그 레벨 분리 |
| 03 | `@RestController`, `@GetMapping`, `@PostMapping` |
| 04 | `@Service`, `@Repository`, 생성자 주입 |
| 05 | 요청 로깅 또는 실행 시간 측정 Aspect |
| 06 | `@RestControllerAdvice` 기반 공통 예외 처리 |

---

## 추천 패키지 구조

```text
com.example.studymemo
├── StudyMemoApplication.java
├── memo
│   ├── controller
│   │   └── MemoController.java
│   ├── service
│   │   └── MemoService.java
│   ├── repository
│   │   └── MemoRepository.java
│   └── model
│       └── Memo.java
└── global
    ├── aop
    │   └── LoggingAspect.java
    └── exception
        ├── GlobalExceptionHandler.java
        ├── BusinessException.java
        └── ErrorResponse.java
```

---

## 구현 순서

### 1. 가장 먼저 컨트롤러부터 만들지 말기

순서 추천:

1. 모델
2. 저장소
3. 서비스
4. 컨트롤러
5. 예외 처리
6. AOP

이 순서가 좋은 이유는 책임이 아래에서 위로 쌓이기 때문입니다.

### 2. 저장소는 메모리로 충분

```java
@Repository
public class MemoRepository {
    private final Map<Long, Memo> store = new HashMap<>();
}
```

지금은 DB가 목적이 아니라 구조가 목적입니다.

### 3. 예외는 일찍 넣기

조회 API를 만들 때 없는 ID에 대한 예외를 같이 넣으세요.

이 습관이 나중에 훨씬 중요합니다.

---

## 필수 API

| Method | URL | 설명 |
|---|---|---|
| POST | `/api/memos` | 메모 등록 |
| GET | `/api/memos/{id}` | 메모 단건 조회 |
| GET | `/api/memos` | 메모 목록 조회 |

---

## 체크리스트

- `@RestController`를 사용했는가
- 생성자 주입을 사용했는가
- 컨트롤러가 저장소를 직접 호출하지 않는가
- 없는 데이터 조회 시 404 응답을 주는가
- 로그 또는 AOP가 최소 1개 들어갔는가

---

## 직접 해보기

1. 메모 생성 시 제목 길이가 1 이상인지 직접 검사해보세요.
2. 실행 시간 측정 Aspect를 붙여보세요.
3. 에러 응답을 `{status, code, message}` 형태로 맞춰보세요.
4. 메모 목록 조회에 `keyword` 쿼리 파라미터를 추가해보세요.

---

## 이 실습의 의미

이 단계에서 중요한 것은 기능 수가 아닙니다.

> "Spring 애플리케이션을 구조적으로 조립할 수 있는가"가 핵심입니다.

이 감각이 생기면 Phase 2에서 DTO, Validation, ResponseEntity 같은 기술이 자연스럽게 붙습니다.
