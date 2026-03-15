# Phase 1~2 Review: 학습 일지 API

> 목표: Phase 1~2에서 배운 16개 주제를 하나의 프로젝트에 연결해서, "각 개념이 왜 필요한지"를 몸으로 이해한다.

---

## 이 프로젝트가 중요한 이유

지금까지는 주제별로 배웠습니다.

- Servlet / Spring Boot
- DI
- AOP
- 예외 처리
- DTO / Validation
- ResponseEntity
- Swagger

그런데 실제 개발은 이렇게 따로 오지 않습니다.

실무에서는 한 API 안에 이 개념들이 동시에 들어옵니다.

그래서 이 복습 프로젝트의 핵심은:

> "기술 하나를 아는 것"이 아니라 "언제 어떤 기술을 붙여야 하는지 아는 것"

입니다.

---

## 프로젝트 주제

`학습 일지 API`

매일 공부한 내용을 기록하고 관리하는 REST API를 만듭니다.

기능 범위:

- 학습 일지 등록
- 학습 일지 목록 조회
- 학습 일지 단건 조회
- 학습 일지 수정/삭제
- 카테고리별 조회
- 첨부 파일 업로드/다운로드
- Swagger 문서 확인

DB는 아직 배우지 않았으므로, 저장소는 메모리 기반으로 갑니다.

> 지금 단계의 목적은 JPA가 아니라 구조와 API 설계입니다.

---

## 복습 포인트 매핑

| 주제 | 프로젝트에서 어디에 적용되는가 |
|---|---|
| 01. Spring Boot 기초 | 프로젝트 생성, 실행 구조 |
| 02. Resources | `application.yml`, profile 분리, 파일 경로 설정 |
| 03. 첫 REST API | Controller 작성, JSON 응답 |
| 04. IoC/DI | Controller -> Service -> Repository 주입 |
| 05. AOP | 요청 로깅, 실행 시간 측정 |
| 06. 예외 처리 | 커스텀 예외 + 전역 예외 처리 |
| 07. HTTP & REST | URI, Method, 상태 코드 설계 |
| 08. Spring MVC | `@RequestBody`, `@PathVariable`, `@RequestParam` |
| 09. Layered Architecture | 패키지/계층 구조 |
| 10. Lombok | DTO, 서비스, 응답 모델 정리 |
| 11. DTO & Validation | 요청/응답 분리, `@Valid` |
| 12. MapStruct | Entity <-> DTO 변환 |
| 13. ResponseEntity | 상태 코드와 공통 응답 포맷 |
| 14. 파일 업로드/다운로드 | `MultipartFile`, `Resource` |
| 15. API 문서화 | SpringDoc, Swagger UI |
| 16. 디버깅 | 브레이크포인트로 흐름 추적 |

---

## 프로젝트 요구사항

### 도메인

학습 일지 한 건은 아래 정보를 가집니다.

- id
- title
- content
- category
- studiedAt
- attachmentFileName
- createdAt

카테고리는 enum으로 시작하면 충분합니다.

예:

- SPRING
- JAVA
- DATABASE
- CS

---

## 추천 패키지 구조

```text
com.example.studydiary
├── StudyDiaryApplication.java
├── studylog
│   ├── controller
│   │   └── StudyLogController.java
│   ├── service
│   │   └── StudyLogService.java
│   ├── repository
│   │   └── StudyLogRepository.java
│   ├── entity
│   │   ├── StudyLog.java
│   │   └── StudyCategory.java
│   ├── dto
│   │   ├── StudyLogCreateRequest.java
│   │   ├── StudyLogUpdateRequest.java
│   │   ├── StudyLogResponse.java
│   │   └── StudyLogSearchCondition.java
│   └── mapper
│       └── StudyLogMapper.java
└── global
    ├── common
    │   └── ApiResponse.java
    ├── config
    │   └── SwaggerConfig.java
    ├── aop
    │   └── LoggingAspect.java
    ├── exception
    │   ├── ErrorCode.java
    │   ├── BusinessException.java
    │   ├── ErrorResponse.java
    │   └── GlobalExceptionHandler.java
    └── file
        └── FileStorageService.java
```

---

## 기술 선택 기준

### 왜 메모리 저장소인가

아직 JPA를 배우지 않았으므로,
지금은 "데이터 저장 기술"보다 "서비스 구조"에 집중하는 편이 좋습니다.

```java
private final Map<Long, StudyLog> store = new HashMap<>();
```

이렇게 가볍게 시작해도 충분합니다.

### 왜 DTO를 먼저 분리하나

프로젝트가 커질수록 제일 먼저 꼬이는 것이 입출력 경계입니다.

그래서 초반부터:

- Request DTO
- Response DTO
- Entity

를 구분하는 습관을 들이는 것이 좋습니다.

---

## 구현 순서

아래 순서를 추천합니다.

### Step 1. 프로젝트 생성과 설정

필수 의존성:

- Spring Web
- Validation
- Lombok
- Spring Boot DevTools
- MapStruct
- SpringDoc

설정 포인트:

- `application.yml`
- `application-dev.yml`
- 파일 업로드 경로
- JSON 날짜 포맷

이 단계에서 복습되는 것:

- Phase 1-01
- Phase 1-02

### Step 2. Entity와 enum 먼저 만들기

```java
@Getter
@Builder
public class StudyLog {
    private Long id;
    private String title;
    private String content;
    private StudyCategory category;
    private LocalDate studiedAt;
    private String attachmentFileName;
    private LocalDateTime createdAt;
}
```

포인트:

- 아직 JPA Entity가 아니어도 괜찮다
- "도메인 모델"이라는 감각이 더 중요하다

### Step 3. Repository 만들기

메모리 저장소를 구현합니다.

필수 메서드 예시:

- save
- findById
- findAll
- delete
- findByCategory

이 단계에서 복습되는 것:

- DI
- 계층 분리

### Step 4. Service에 비즈니스 규칙 넣기

여기가 프로젝트의 중심입니다.

예:

- 제목은 비어 있으면 안 된다
- 없는 id 수정 시 예외
- 첨부 파일명 처리

서비스가 해야 할 일:

- 유즈케이스 수행
- 예외 던지기
- 저장소 조합

### Step 5. DTO + Validation 적용

Request DTO 예시:

```java
@Getter
@NoArgsConstructor
public class StudyLogCreateRequest {

    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 100, message = "제목은 100자 이하여야 합니다.")
    private String title;

    @NotBlank(message = "내용은 필수입니다.")
    private String content;

    @NotNull(message = "카테고리는 필수입니다.")
    private StudyCategory category;
}
```

이 단계에서 중요한 질문:

> "이 검증은 입력 형식 검증인가, 아니면 비즈니스 규칙 검증인가?"

형식 검증은 DTO에서,
도메인 규칙은 Service에서 처리합니다.

### Step 6. MapStruct로 변환 정리

```java
@Mapper(componentModel = "spring")
public interface StudyLogMapper {
    StudyLogResponse toResponse(StudyLog studyLog);
    StudyLog toEntity(StudyLogCreateRequest request);
}
```

매핑을 분리하면 서비스 메서드가 훨씬 읽기 쉬워집니다.

### Step 7. Controller와 REST 설계

권장 API:

| Method | URL | 설명 |
|---|---|---|
| POST | `/api/study-logs` | 학습 일지 생성 |
| GET | `/api/study-logs` | 목록 조회 |
| GET | `/api/study-logs/{id}` | 단건 조회 |
| PATCH | `/api/study-logs/{id}` | 부분 수정 |
| DELETE | `/api/study-logs/{id}` | 삭제 |
| GET | `/api/study-logs?category=SPRING` | 카테고리 필터 조회 |

여기서 복습되는 것:

- REST URI 설계
- HTTP Method
- `@PathVariable`
- `@RequestParam`
- `@RequestBody`

### Step 8. 공통 응답과 예외 처리

응답은 아래 형태를 추천합니다.

```java
@Getter
@Builder
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
}
```

에러는:

```java
public record ErrorResponse(
        int status,
        String code,
        String message
) {
}
```

이렇게 두 갈래로 관리하면 API가 훨씬 읽기 쉬워집니다.

### Step 9. AOP 로깅 추가

추천 용도:

- 컨트롤러 진입 로그
- 서비스 실행 시간 측정

이때 핵심은 로그를 많이 찍는 것이 아니라,
나중에 디버깅할 때 도움이 되는 로그를 남기는 것입니다.

### Step 10. 파일 업로드/다운로드

예시 API:

| Method | URL | 설명 |
|---|---|---|
| POST | `/api/study-logs/{id}/attachment` | 첨부 업로드 |
| GET | `/api/study-logs/{id}/attachment` | 첨부 다운로드 |

주의:

- 파일명 충돌 방지
- 업로드 경로 설정화
- 존재하지 않는 파일 처리

### Step 11. Swagger 문서화

최소 목표:

- 컨트롤러에 `@Tag`, `@Operation`
- DTO 필드에 `@Schema`
- Swagger UI에서 직접 테스트

### Step 12. 디버깅으로 흐름 검증

브레이크포인트 추천 위치:

1. Controller 메서드 진입부
2. Service 메서드 첫 줄
3. Repository 저장 직전
4. GlobalExceptionHandler

이렇게 걸면:

- 요청이 어디까지 왔는지
- 값이 언제 바뀌는지
- 에러가 어디서 발생하는지

를 한 번에 잡을 수 있습니다.

---

## 권장 API 응답 예시

### 생성 성공

```json
{
  "status": 201,
  "message": "학습 일지가 등록되었습니다.",
  "data": {
    "id": 1,
    "title": "Spring MVC 정리",
    "category": "SPRING"
  }
}
```

### 조회 실패

```json
{
  "status": 404,
  "code": "STUDY_LOG_NOT_FOUND",
  "message": "학습 일지를 찾을 수 없습니다."
}
```

---

## 권장 구현 일정

### Day 1

- 프로젝트 생성
- 설정 파일 구성
- 패키지 구조 생성

### Day 2

- Entity, enum, repository
- 기본 조회/등록 서비스

### Day 3

- Controller 연결
- DTO, Validation

### Day 4

- 예외 처리
- ResponseEntity, ApiResponse

### Day 5

- MapStruct
- 카테고리 조회, 수정/삭제

### Day 6

- 파일 업로드/다운로드
- Swagger 문서화

### Day 7

- AOP 로깅
- 디버깅 연습
- 리팩터링

---

## 직접 해보기 미션

### 필수 미션

1. 학습 일지 CRUD를 완성하세요.
2. Validation 실패와 비즈니스 예외를 구분해서 처리하세요.
3. 공통 성공 응답과 공통 에러 응답을 분리하세요.
4. Swagger UI에서 모든 API를 직접 호출해보세요.

### 확장 미션

1. 카테고리 외에 날짜별 조회를 추가하세요.
2. 파일 첨부가 없는 경우와 있는 경우 응답을 다르게 설계해보세요.
3. 검색 키워드 `keyword`를 추가해 제목/내용 포함 검색을 구현해보세요.
4. AOP 로그에 실행 시간과 요청 URI를 함께 남겨보세요.

---

## 스스로 설명할 수 있어야 하는 질문

1. 왜 Controller가 Repository를 직접 호출하면 안 되는가
2. DTO와 Entity를 왜 분리했는가
3. Validation과 BusinessException은 어떻게 역할이 다른가
4. ResponseEntity를 왜 썼는가
5. MapStruct를 붙이니 어떤 코드가 줄었는가
6. 파일 업로드는 왜 yml 설정과 함께 봐야 하는가
7. 이 프로젝트에서 AOP는 어디에 쓰는 것이 적절한가

이 질문들에 답할 수 있으면, 지금까지 배운 내용이 꽤 잘 붙은 상태입니다.

---

## 마지막 체크리스트

- 요청 DTO와 응답 DTO가 분리되어 있는가
- 생성자 주입을 사용하고 있는가
- 전역 예외 처리기가 있는가
- 상태 코드가 API 의미와 맞는가
- 파일 경로가 설정으로 분리되어 있는가
- Swagger UI에서 API가 보이는가
- 브레이크포인트로 흐름을 추적해봤는가

---

## 이 프로젝트 다음에 얻는 것

이 복습 프로젝트를 끝내면 Phase 3에서 DB를 배울 때 훨씬 수월해집니다.

왜냐하면 그때는 "구조"가 아니라 "저장 기술"만 교체하면 되기 때문입니다.

즉:

```text
지금: API 구조와 계층에 집중
다음: 메모리 저장소를 DB/JPA로 교체
```

이 연결 고리가 보이면 학습 효율이 아주 좋아집니다.
