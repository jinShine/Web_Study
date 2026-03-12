# 13. ResponseEntity와 API 응답 표준화

> **한 줄 정의:** 모든 API가 동일한 응답 구조를 갖도록 공통 포맷을 설계하고, ResponseEntity로 HTTP 상태 코드까지 제어한다

---

## 목차
1. [왜 응답 표준화가 필요한가?](#1-왜-응답-표준화가-필요한가)
2. [ResponseEntity 기초](#2-responseentity-기초)
3. [ResponseEntity 다양한 생성 방법](#3-responseentity-다양한-생성-방법)
4. [공통 응답 포맷 설계](#4-공통-응답-포맷-설계)
5. [성공 응답 처리](#5-성공-응답-처리)
6. [실패 응답 처리 — @RestControllerAdvice 연동](#6-실패-응답-처리--restcontrolleradvice-연동)
7. [페이징 응답 설계](#7-페이징-응답-설계)
8. [실전 예제: 주문 API 응답 표준화](#8-실전-예제-주문-api-응답-표준화)
9. [응답 설계 시 주의할 점](#9-응답-설계-시-주의할-점)
10. [실습 퀴즈](#10-실습-퀴즈)
11. [면접 대비 한 줄 요약](#11-면접-대비-한-줄-요약)

---

## 1. 왜 응답 표준화가 필요한가?

> **한 줄 정의:** API마다 응답 형태가 다르면 프론트엔드가 매번 다른 파싱 로직을 짜야 한다

### 표준화 전 — 각 API마다 응답이 제각각

```json
// GET /api/users/1 — 유저 조회
{
    "id": 1,
    "name": "김철수",
    "email": "kim@test.com"
}

// GET /api/orders — 주문 목록
{
    "orders": [...],
    "totalCount": 15
}

// POST /api/users — 유저 생성 실패
{
    "error": "이메일이 중복됩니다"
}

// DELETE /api/users/1 — 삭제 성공
(빈 응답? 메시지? 뭘 줘야 하지?)
```

### 문제점

```
프론트엔드 입장:
├─ "성공이면 data를 꺼내면 되나? 아니면 바로 객체가 오나?"
├─ "에러면 error 필드를 보면 되나? message 필드를 보면 되나?"
├─ "목록이면 배열이 바로 오나? 객체 안에 있나?"
└─ API마다 파싱 코드가 다 다름... 지옥!
```

### 표준화 후 — 모든 API가 같은 구조

```json
// 성공 (단건)
{
    "status": "SUCCESS",
    "data": {
        "id": 1,
        "name": "김철수",
        "email": "kim@test.com"
    },
    "message": null
}

// 성공 (목록)
{
    "status": "SUCCESS",
    "data": [...],
    "message": null
}

// 실패
{
    "status": "ERROR",
    "data": null,
    "message": "이메일이 중복됩니다"
}
```

```
프론트엔드 입장:
├─ response.status === "SUCCESS" → response.data 사용
├─ response.status === "ERROR"   → response.message 표시
└─ 모든 API가 동일! 공통 유틸 하나로 처리 가능!
```

---

## 2. ResponseEntity 기초

> **한 줄 정의:** HTTP 응답의 상태 코드, 헤더, 바디를 모두 제어할 수 있는 Spring의 응답 객체

### ResponseEntity 구조

```
HTTP 응답 = 상태 코드 + 헤더 + 바디

ResponseEntity<T>
├─ HttpStatus (200, 201, 404, 500...)
├─ HttpHeaders (Content-Type, Location...)
└─ Body (응답 데이터 — T 타입)
```

### @ResponseBody vs ResponseEntity

```java
// 방법 1: @ResponseBody — 바디만 제어 (상태 코드는 항상 200)
@GetMapping("/users/{id}")
@ResponseBody
public UserResponse getUser(@PathVariable Long id) {
    return userService.getUser(id);  // 항상 200 OK
}

// 방법 2: ResponseEntity — 상태 코드 + 바디 모두 제어
@GetMapping("/users/{id}")
public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
    UserResponse user = userService.getUser(id);
    return ResponseEntity.ok(user);  // 200 OK + 바디
}
```

### 왜 ResponseEntity를 써야 하나?

```
@ResponseBody만 쓰면:
├─ 생성 성공 → 200 OK (201 Created가 맞는데...)
├─ 삭제 성공 → 200 OK (204 No Content가 맞는데...)
├─ 조회 실패 → 200 OK (404 Not Found가 맞는데...)
└─ 상태 코드를 바꿀 수 없음!

ResponseEntity를 쓰면:
├─ 생성 → 201 Created
├─ 삭제 → 204 No Content
├─ 조회 실패 → 404 Not Found
└─ REST API 설계 원칙에 맞는 응답!
```

---

## 3. ResponseEntity 다양한 생성 방법

> **한 줄 정의:** ResponseEntity는 정적 메서드와 빌더 패턴 두 가지 방식으로 만든다

### 방법 1: 정적 메서드 (간결)

```java
// 200 OK + 바디
return ResponseEntity.ok(user);

// 201 Created (바디 없이)
return ResponseEntity.created(URI.create("/api/users/" + user.getId())).build();

// 204 No Content
return ResponseEntity.noContent().build();

// 404 Not Found
return ResponseEntity.notFound().build();

// 400 Bad Request
return ResponseEntity.badRequest().body(errorResponse);
```

### 방법 2: status() 빌더 (유연)

```java
// 상태 코드를 자유롭게 지정
return ResponseEntity.status(HttpStatus.CREATED).body(user);
return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
return ResponseEntity.status(HttpStatus.CONFLICT).body(error);  // 409
```

### 방법 3: 헤더까지 제어

```java
// 커스텀 헤더 추가
HttpHeaders headers = new HttpHeaders();
headers.add("X-Custom-Header", "custom-value");

return ResponseEntity
    .status(HttpStatus.OK)
    .headers(headers)
    .body(user);
```

### CRUD별 권장 상태 코드

| 작업 | HTTP 메서드 | 성공 상태 코드 | ResponseEntity |
|---|---|---|---|
| 조회 (단건) | GET | 200 OK | `ResponseEntity.ok(data)` |
| 조회 (목록) | GET | 200 OK | `ResponseEntity.ok(list)` |
| 생성 | POST | 201 Created | `ResponseEntity.status(CREATED).body(data)` |
| 수정 | PUT/PATCH | 200 OK | `ResponseEntity.ok(data)` |
| 삭제 | DELETE | 204 No Content | `ResponseEntity.noContent().build()` |

---

## 4. 공통 응답 포맷 설계

> **한 줄 정의:** 모든 API 응답을 감싸는 공통 껍데기(Wrapper)를 만든다

### ApiResponse 설계

```java
@Getter
@Builder
@AllArgsConstructor
public class ApiResponse<T> {

    private final String status;   // "SUCCESS" 또는 "ERROR"
    private final T data;          // 실제 응답 데이터
    private final String message;  // 에러 메시지 (성공 시 null)

    // 성공 응답 (데이터 있음)
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
            .status("SUCCESS")
            .data(data)
            .message(null)
            .build();
    }

    // 성공 응답 (데이터 없음 — 삭제 등)
    public static <T> ApiResponse<T> success() {
        return ApiResponse.<T>builder()
            .status("SUCCESS")
            .data(null)
            .message(null)
            .build();
    }

    // 실패 응답
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
            .status("ERROR")
            .data(null)
            .message(message)
            .build();
    }
}
```

### 응답 구조 시각화

```
모든 API 응답:
┌─────────────────────────────────┐
│  {                              │
│    "status": "SUCCESS | ERROR", │ ← 항상 존재
│    "data": { ... } | null,      │ ← 성공 시 데이터, 실패 시 null
│    "message": "..." | null      │ ← 실패 시 메시지, 성공 시 null
│  }                              │
└─────────────────────────────────┘
```

### 제네릭 `<T>`의 역할

```java
ApiResponse<UserResponse>         // data가 UserResponse 타입
ApiResponse<List<UserResponse>>   // data가 List<UserResponse> 타입
ApiResponse<OrderResponse>        // data가 OrderResponse 타입
ApiResponse<Void>                 // data가 없음 (삭제 등)

→ 어떤 응답이든 같은 ApiResponse로 감쌀 수 있다!
```

---

## 5. 성공 응답 처리

> **한 줄 정의:** Controller에서 ApiResponse.success()로 감싸서 반환한다

### Controller 적용

```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 단건 조회 — 200 OK
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable Long id) {
        UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // 목록 조회 — 200 OK
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    // 생성 — 201 Created
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
        @RequestBody @Valid UserCreateRequest request
    ) {
        UserResponse user = userService.createUser(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success(user));
    }

    // 수정 — 200 OK
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
        @PathVariable Long id,
        @RequestBody @Valid UserUpdateRequest request
    ) {
        UserResponse user = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // 삭제 — 204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 실제 응답 예시

```json
// GET /api/users/1 → 200 OK
{
    "status": "SUCCESS",
    "data": {
        "id": 1,
        "name": "김철수",
        "email": "kim@test.com",
        "age": 25,
        "createdAt": "2026-03-11T10:30:00"
    },
    "message": null
}

// POST /api/users → 201 Created
{
    "status": "SUCCESS",
    "data": {
        "id": 2,
        "name": "이영희",
        "email": "lee@test.com",
        "age": 28,
        "createdAt": "2026-03-11T11:00:00"
    },
    "message": null
}

// DELETE /api/users/1 → 204 No Content
(응답 바디 없음)
```

> 💡 **삭제 응답은 두 가지 스타일이 있다:**
> - `204 No Content` + 빈 바디 (REST 원칙에 충실)
> - `200 OK` + `ApiResponse.success()` (프론트엔드가 편한 방식)
> - 팀 컨벤션에 따라 선택!

---

## 6. 실패 응답 처리 — @RestControllerAdvice 연동

> **한 줄 정의:** 06번에서 배운 예외 처리와 ApiResponse를 결합해 에러도 통일된 포맷으로 내려준다

### ErrorResponse 설계

```java
@Getter
@Builder
public class ErrorResponse {
    private final String code;         // 에러 코드 (ex: "USER_NOT_FOUND")
    private final String message;      // 에러 메시지
    private final List<FieldError> errors;  // Validation 에러 상세 (선택)

    @Getter
    @Builder
    public static class FieldError {
        private final String field;    // 에러 필드명
        private final String value;    // 입력된 값
        private final String reason;   // 에러 사유
    }
}
```

### GlobalExceptionHandler에 ApiResponse 적용

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 커스텀 비즈니스 예외
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException e) {
        return ResponseEntity
            .status(e.getHttpStatus())
            .body(ApiResponse.error(e.getMessage()));
    }

    // Validation 실패 (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<List<ErrorResponse.FieldError>>> handleValidation(
        MethodArgumentNotValidException e
    ) {
        List<ErrorResponse.FieldError> fieldErrors = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> ErrorResponse.FieldError.builder()
                .field(error.getField())
                .value(String.valueOf(error.getRejectedValue()))
                .reason(error.getDefaultMessage())
                .build())
            .toList();

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ApiResponse.error("입력값 검증에 실패했습니다"));
    }

    // 그 외 예상치 못한 예외
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponse.error("서버 내부 오류가 발생했습니다"));
    }
}
```

### 비즈니스 예외 클래스 (복습)

```java
@Getter
public class BusinessException extends RuntimeException {

    private final HttpStatus httpStatus;

    public BusinessException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}

// 구체적인 예외
public class UserNotFoundException extends BusinessException {
    public UserNotFoundException(Long id) {
        super("유저를 찾을 수 없습니다. id=" + id, HttpStatus.NOT_FOUND);
    }
}

public class DuplicateEmailException extends BusinessException {
    public DuplicateEmailException(String email) {
        super("이미 사용 중인 이메일입니다: " + email, HttpStatus.CONFLICT);
    }
}
```

### 에러 응답 예시

```json
// GET /api/users/999 → 404 Not Found
{
    "status": "ERROR",
    "data": null,
    "message": "유저를 찾을 수 없습니다. id=999"
}

// POST /api/users (Validation 실패) → 400 Bad Request
{
    "status": "ERROR",
    "data": null,
    "message": "입력값 검증에 실패했습니다"
}

// 서버 에러 → 500 Internal Server Error
{
    "status": "ERROR",
    "data": null,
    "message": "서버 내부 오류가 발생했습니다"
}
```

### 전체 흐름 정리

```
클라이언트 요청
    │
    ▼
Controller
    │
    ├─ 정상 → Service 호출 → ApiResponse.success(data) → 200/201
    │
    └─ 예외 발생!
         │
         ▼
    GlobalExceptionHandler
         │
         ├─ BusinessException    → ApiResponse.error(message) → 404/409/...
         ├─ ValidationException  → ApiResponse.error(message) → 400
         └─ Exception            → ApiResponse.error(message) → 500

→ 성공이든 실패든 항상 같은 ApiResponse 구조!
```

---

## 7. 페이징 응답 설계

> **한 줄 정의:** 목록 조회 시 전체 데이터를 한 번에 주지 않고, 페이지 단위로 잘라서 응답한다

### 왜 페이징이 필요한가?

```
GET /api/users → 유저 10,000명을 한 번에?

문제:
├─ 서버: 메모리 폭발, DB 부하
├─ 네트워크: 거대한 JSON 전송
├─ 프론트: 10,000개 렌더링 → 브라우저 멈춤
└─ 해결: 한 페이지에 20개씩만 보내자!
```

### PageResponse 설계

```java
@Getter
@Builder
public class PageResponse<T> {
    private final List<T> content;     // 현재 페이지 데이터
    private final int page;            // 현재 페이지 번호 (0부터)
    private final int size;            // 페이지 크기
    private final long totalElements;  // 전체 데이터 수
    private final int totalPages;      // 전체 페이지 수
    private final boolean first;       // 첫 페이지 여부
    private final boolean last;        // 마지막 페이지 여부

    // Spring의 Page 객체로부터 변환
    public static <T> PageResponse<T> from(Page<T> page) {
        return PageResponse.<T>builder()
            .content(page.getContent())
            .page(page.getNumber())
            .size(page.getSize())
            .totalElements(page.getTotalElements())
            .totalPages(page.getTotalPages())
            .first(page.isFirst())
            .last(page.isLast())
            .build();
    }
}
```

### Controller에서 사용

```java
@GetMapping
public ResponseEntity<ApiResponse<PageResponse<UserResponse>>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size
) {
    PageResponse<UserResponse> users = userService.getUsers(page, size);
    return ResponseEntity.ok(ApiResponse.success(users));
}
```

### Service에서 사용

```java
public PageResponse<UserResponse> getUsers(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
    Page<User> userPage = userRepository.findAll(pageable);

    // Entity Page → DTO Page → PageResponse
    Page<UserResponse> responsePage = userPage.map(userMapper::toResponse);
    return PageResponse.from(responsePage);
}
```

### 페이징 응답 예시

```json
// GET /api/users?page=0&size=3 → 200 OK
{
    "status": "SUCCESS",
    "data": {
        "content": [
            { "id": 1, "name": "김철수", "email": "kim@test.com" },
            { "id": 2, "name": "이영희", "email": "lee@test.com" },
            { "id": 3, "name": "박민수", "email": "park@test.com" }
        ],
        "page": 0,
        "size": 3,
        "totalElements": 15,
        "totalPages": 5,
        "first": true,
        "last": false
    },
    "message": null
}
```

### 페이징 파라미터 정리

| 파라미터 | 설명 | 기본값 | 예시 |
|---|---|---|---|
| `page` | 조회할 페이지 번호 (0부터 시작) | 0 | `?page=2` (3번째 페이지) |
| `size` | 한 페이지에 담을 데이터 수 | 20 | `?size=10` |
| `sort` | 정렬 기준 | - | `?sort=createdAt,desc` |

---

## 8. 실전 예제: 주문 API 응답 표준화

> 12번까지 만든 주문 API에 응답 표준화를 적용

### Controller (표준화 적용)

```java
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 주문 생성 — 201 Created
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> create(
        @RequestBody @Valid OrderCreateRequest request
    ) {
        OrderResponse order = orderService.createOrder(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success(order));
    }

    // 단건 조회 — 200 OK
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable Long id) {
        OrderResponse order = orderService.getOrder(id);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    // 목록 조회 (페이징) — 200 OK
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getOrders(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        PageResponse<OrderResponse> orders = orderService.getOrders(page, size);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    // 주문 수정 — 200 OK
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrder(
        @PathVariable Long id,
        @RequestBody @Valid OrderUpdateRequest request
    ) {
        OrderResponse order = orderService.updateOrder(id, request);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    // 주문 삭제 — 204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Before vs After 비교

```java
// ❌ Before — 표준화 전
@PostMapping
public OrderResponse create(@RequestBody @Valid OrderCreateRequest request) {
    return orderService.createOrder(request);
    // 항상 200 OK, 응답 포맷 불명확
}

// ✅ After — 표준화 후
@PostMapping
public ResponseEntity<ApiResponse<OrderResponse>> create(
    @RequestBody @Valid OrderCreateRequest request
) {
    OrderResponse order = orderService.createOrder(request);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.success(order));
    // 201 Created, 통일된 응답 포맷
}
```

---

## 9. 응답 설계 시 주의할 점

### 주의 1: null vs 빈 컬렉션

```java
// ❌ 나쁜 예 — 결과 없으면 null
{
    "status": "SUCCESS",
    "data": null          // 프론트에서 null 체크 필요 → 실수하면 NPE
}

// ✅ 좋은 예 — 결과 없으면 빈 배열
{
    "status": "SUCCESS",
    "data": []            // 프론트에서 바로 forEach 가능
}
```

### 주의 2: 에러 메시지에 민감 정보 노출 금지

```java
// ❌ 나쁜 예
"message": "SQL Error: Table 'users' column 'password' ..."
"message": "NullPointerException at UserService.java:45"

// ✅ 좋은 예
"message": "서버 내부 오류가 발생했습니다"
// → 상세 에러는 서버 로그에만 남긴다!
```

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
    log.error("서버 내부 오류", e);  // 상세 에러는 로그에!
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ApiResponse.error("서버 내부 오류가 발생했습니다"));  // 클라이언트엔 간략하게
}
```

### 주의 3: HTTP 상태 코드를 정확히 사용

```
❌ 모든 응답에 200 OK를 쓰는 것:
   200 OK + { "status": "ERROR", "message": "유저를 찾을 수 없습니다" }
   → HTTP 클라이언트 도구가 "성공"으로 인식 → 혼란

✅ HTTP 상태 코드와 응답 바디를 일치시키기:
   404 Not Found + { "status": "ERROR", "message": "유저를 찾을 수 없습니다" }
   → HTTP 레벨에서도 실패, 바디에서도 실패 → 명확!
```

### 주의 4: 타임스탬프 포맷 통일

```java
// ❌ 나쁜 예 — 포맷이 제각각
"createdAt": "2026-03-11T10:30:00"        // ISO 8601
"orderedAt": "2026/03/11 10:30"           // 다른 포맷
"date": 1741674600000                      // Unix timestamp

// ✅ 좋은 예 — ISO 8601로 통일
"createdAt": "2026-03-11T10:30:00"
"orderedAt": "2026-03-11T10:30:00"
```

```yaml
# application.yml — Jackson 날짜 포맷 전역 설정
spring:
  jackson:
    date-format: yyyy-MM-dd'T'HH:mm:ss
    time-zone: Asia/Seoul
```

---

## 10. 실습 퀴즈

### 퀴즈 1: ApiResponse 만들기

아래 요구사항에 맞는 ApiResponse를 완성하세요.

```
요구사항:
- 성공/실패 구분 가능
- 성공 시 데이터 포함
- 실패 시 에러 메시지 포함
- 제네릭으로 어떤 타입이든 감쌀 수 있어야 함
```

<details>
<summary>💡 정답 보기</summary>

```java
@Getter
@Builder
@AllArgsConstructor
public class ApiResponse<T> {
    private final String status;
    private final T data;
    private final String message;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
            .status("SUCCESS")
            .data(data)
            .message(null)
            .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
            .status("ERROR")
            .data(null)
            .message(message)
            .build();
    }
}
```

</details>

---

### 퀴즈 2: 이 Controller의 문제점을 찾아라

```java
@PostMapping
public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreateRequest request) {
    UserResponse user = userService.createUser(request);
    return ApiResponse.success(user);
}
```

<details>
<summary>💡 정답 보기</summary>

```
문제: ResponseEntity를 안 쓰고 있어서 항상 200 OK가 반환됨

생성(POST)은 201 Created가 맞다!

해결:
@PostMapping
public ResponseEntity<ApiResponse<UserResponse>> createUser(
    @RequestBody @Valid UserCreateRequest request
) {
    UserResponse user = userService.createUser(request);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.success(user));
}
```

</details>

---

### 퀴즈 3: 페이징 응답 구현

아래 Service 코드에서 페이징을 적용해보세요.

```java
// 현재 코드 — 전체 조회
public List<OrderResponse> getAllOrders() {
    List<Order> orders = orderRepository.findAll();
    return orderMapper.toResponseList(orders);
}

// TODO: 페이징 적용
public PageResponse<OrderResponse> getOrders(int page, int size) {
    // 여기에 구현!
}
```

<details>
<summary>💡 정답 보기</summary>

```java
public PageResponse<OrderResponse> getOrders(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("orderedAt").descending());
    Page<Order> orderPage = orderRepository.findAll(pageable);
    Page<OrderResponse> responsePage = orderPage.map(orderMapper::toResponse);
    return PageResponse.from(responsePage);
}
```

**포인트:**
- `PageRequest.of(page, size)` — 페이징 조건 생성
- `findAll(pageable)` — JPA가 자동으로 LIMIT/OFFSET 쿼리
- `page.map(mapper::toResponse)` — Entity Page → DTO Page 변환
- `PageResponse.from(page)` — 공통 응답 포맷으로 변환

</details>

---

## 11. 면접 대비 한 줄 요약

| 질문 | 답변 |
|---|---|
| ResponseEntity란? | HTTP 응답의 상태 코드, 헤더, 바디를 모두 제어할 수 있는 Spring 응답 객체 |
| 왜 ResponseEntity를 쓰나? | @ResponseBody만으로는 HTTP 상태 코드를 제어할 수 없기 때문 |
| API 응답 표준화란? | 모든 API가 동일한 구조(status, data, message)로 응답하도록 공통 포맷을 설계하는 것 |
| ApiResponse의 제네릭 T는? | 응답 데이터의 타입을 유연하게 처리하기 위한 것 (User, Order, List 등 뭐든 가능) |
| 에러 응답도 같은 포맷? | 그렇다. 성공/실패 모두 ApiResponse로 감싸서 프론트엔드가 일관되게 처리할 수 있게 함 |
| 페이징은 왜 필요한가? | 대량 데이터를 한 번에 보내면 서버/네트워크/클라이언트 모두 부하가 걸리므로, 페이지 단위로 나눠서 전달 |
| HTTP 상태 코드는 왜 중요한가? | HTTP 클라이언트 도구, 프론트엔드 인터셉터 등이 상태 코드로 성공/실패를 판단하기 때문 |
| 에러 메시지에 뭘 담으면 안 되나? | SQL 에러, 스택 트레이스 등 서버 내부 정보. 보안 취약점이 될 수 있음 |

---

## 다음 수업 예고

> **14. 파일 업로드/다운로드** — MultipartFile, Resource, Content-Disposition, 저장 전략
>
> 💡 프로필 이미지, 첨부 파일 같은 걸 API로 어떻게 주고받을까?
