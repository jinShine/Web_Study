# 06. 예외 처리 전략

> **예외 처리(Exception Handling)** — 에러가 발생했을 때 앱이 죽지 않고, 클라이언트에게 의미 있는 응답을 돌려주는 것

API 서버에서 예외 처리를 안 하면? → 클라이언트가 500 에러에 HTML 스택트레이스를 받는다. 최악이다.

---

## 1. Spring 없이 예외 처리하면 생기는 문제

### try-catch 지옥

```java
@RestController
@RequiredArgsConstructor
public class OrderController {

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        try {
            Order order = orderService.getOrder(id);
            return ResponseEntity.ok(order);
        } catch (OrderNotFoundException e) {
            return ResponseEntity.status(404).body("주문을 찾을 수 없습니다");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("잘못된 요청입니다");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 에러");
        }
    }

    @PostMapping("/api/orders")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            orderService.createOrder(order);
            return ResponseEntity.ok("주문 완료");
        } catch (DuplicateOrderException e) {
            return ResponseEntity.status(409).body("중복 주문입니다");  // 😩 또 try-catch
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 에러");        // 😩 또 반복
        }
    }
}
```

**문제:**
- 모든 Controller 메서드에 try-catch 반복
- 에러 응답 형식이 제각각 (어디는 문자열, 어디는 Map)
- 새로운 예외 추가하면 모든 메서드를 다 수정해야 함

---

## 2. `@ExceptionHandler` — Controller 단위 예외 처리

```java
@RestController
@RequiredArgsConstructor
public class OrderController {

    // 핵심 로직만 깔끔하게!
    @GetMapping("/api/orders/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);  // 예외 발생하면 아래에서 처리
    }

    @PostMapping("/api/orders")
    public String createOrder(@RequestBody Order order) {
        orderService.createOrder(order);
        return "주문 완료";
    }

    // === 이 Controller 안에서 발생하는 예외를 여기서 처리 ===

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<String> handleOrderNotFound(OrderNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
```

**장점:** try-catch 없이 깔끔
**단점:** **이 Controller 안에서만** 동작. 다른 Controller에서는 또 써야 한다.

---

## 3. `@RestControllerAdvice` — 전역 예외 처리 ⭐ 핵심

### @ControllerAdvice vs @RestControllerAdvice

| 구분 | @ControllerAdvice | @RestControllerAdvice |
|------|------------------|----------------------|
| 반환 방식 | View (HTML) | JSON (`@ResponseBody` 포함) |
| 사용처 | 서버사이드 렌더링 (Thymeleaf 등) | **REST API** ⭐ |

> REST API 개발 = `@RestControllerAdvice` 쓴다. 이것만 기억하면 된다.

### 전역 예외 처리기 만들기

```java
@RestControllerAdvice  // 모든 Controller에서 발생하는 예외를 여기서 처리!
@Slf4j
public class GlobalExceptionHandler {

    // 1. 커스텀 예외 — 404
    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleOrderNotFound(OrderNotFoundException e) {
        log.warn("주문 조회 실패: {}", e.getMessage());
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse.of(HttpStatus.NOT_FOUND, e.getMessage()));
    }

    // 2. 잘못된 요청 — 400
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(IllegalArgumentException e) {
        log.warn("잘못된 요청: {}", e.getMessage());
        return ResponseEntity
            .badRequest()
            .body(ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage()));
    }

    // 3. Validation 실패 — 400 (Phase 2에서 자세히 다룸)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.joining(", "));

        log.warn("검증 실패: {}", message);
        return ResponseEntity
            .badRequest()
            .body(ErrorResponse.of(HttpStatus.BAD_REQUEST, message));
    }

    // 4. 그 외 모든 예외 — 500 (최후의 방어선)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("서버 에러 발생", e);  // 스택트레이스 포함 로깅
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다"));
    }
}
```

> **핵심: `Exception.class` 핸들러는 반드시 만들어라.** 예상 못 한 에러도 깔끔한 JSON으로 응답한다.
> 클라이언트에게 스택트레이스를 보여주면 절대 안 된다 (보안 이슈).

---

## 4. ErrorResponse — 공통 에러 응답 형식 설계

### 왜 필요한가?

```json
// ❌ 이러면 안 된다 — 응답 형식이 제각각
"주문을 찾을 수 없습니다"          // 어떤 API는 문자열
{"error": "bad request"}          // 어떤 API는 Map
{"code": 500, "msg": "error"}     // 또 다른 형식
```

```json
// ✅ 모든 에러가 같은 형식 → 프론트엔드가 파싱하기 쉬움
{
    "status": 404,
    "code": "NOT_FOUND",
    "message": "주문을 찾을 수 없습니다"
}
```

### ErrorResponse 클래스

```java
@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private int status;         // HTTP 상태 코드 (404, 400, 500)
    private String code;        // 에러 코드 문자열 ("NOT_FOUND")
    private String message;     // 사람이 읽을 수 있는 메시지

    // 팩토리 메서드 — 간편하게 생성
    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return ErrorResponse.builder()
            .status(httpStatus.value())
            .code(httpStatus.name())
            .message(message)
            .build();
    }
}
```

### 실제 API 응답 예시

```
GET /api/orders/999

HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "status": 404,
    "code": "NOT_FOUND",
    "message": "ID 999번 주문을 찾을 수 없습니다"
}
```

```
POST /api/orders
Body: { "productName": "", "quantity": -1 }

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "status": 400,
    "code": "BAD_REQUEST",
    "message": "productName: 상품명은 필수입니다, quantity: 1 이상이어야 합니다"
}
```

---

## 5. BusinessException — 왜 만드는가?

### 질문 1: BusinessException이 RuntimeException을 상속하는 이유?

Java 예외는 두 종류다:

```
Checked Exception (Exception 상속)
  → 반드시 try-catch를 써야 함. 안 쓰면 컴파일 에러.

Unchecked Exception (RuntimeException 상속) ⭐
  → try-catch 안 써도 됨. 자유롭게 던지고 받을 수 있음.
```

만약 `BusinessException`이 `Exception`(Checked)을 상속했다면:

```java
// ❌ Checked Exception이면 이렇게 된다
public Order getOrder(Long id) throws OrderNotFoundException {  // throws 강제!
    return orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(id));
}

// Controller에서도 throws를 달거나 try-catch를 써야 함
@GetMapping("/{id}")
public Order getOrder(@PathVariable Long id) throws OrderNotFoundException {  // 😩 전파
    return orderService.getOrder(id);
}
```

`RuntimeException`(Unchecked)을 상속하면:

```java
// ✅ Unchecked라서 throws 없이 깔끔
public Order getOrder(Long id) {
    return orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(id));  // 그냥 던지면 됨
}

// Controller도 깔끔
@GetMapping("/{id}")
public Order getOrder(@PathVariable Long id) {
    return orderService.getOrder(id);  // try-catch도 throws도 없다!
}
```

추가 이유: **`@Transactional` 롤백이 자동으로 된다.**
- RuntimeException → 자동 롤백 ✅
- Checked Exception → 기본적으로 롤백 안 됨 ❌

### 질문 2: @RestControllerAdvice가 모든 Controller의 예외를 잡는 원리?

```
[클라이언트] → [DispatcherServlet] → [Controller] → [Service] → 예외 발생!
                                          ↑
                                     예외가 밖으로 던져짐
                                          ↑
                              [DispatcherServlet이 예외를 받음]
                                          ↑
                     [@RestControllerAdvice에서 매칭되는 Handler 찾음]
                                          ↑
                              [@ExceptionHandler 실행 → JSON 응답]
```

Spring의 요청 처리 구조를 떠올려봐 (01번에서 배운 것):
1. 모든 요청은 **DispatcherServlet**을 거친다
2. Controller에서 예외가 터지면 → DispatcherServlet까지 올라온다
3. DispatcherServlet이 `@RestControllerAdvice` 클래스를 찾는다
4. 그 안에서 **예외 타입이 매칭되는** `@ExceptionHandler`를 실행한다

> 그래서 `@RestControllerAdvice`는 **어떤 Controller든** 상관없이 예외를 잡을 수 있다.
> 모든 요청이 DispatcherServlet을 거치기 때문이다.

### 질문 3: 새 예외를 추가해도 GlobalExceptionHandler를 수정 안 해도 되는 이유?

**핵심: Java의 상속과 다형성**

```java
// Handler가 BusinessException.class를 잡는다
@ExceptionHandler(BusinessException.class)
public ResponseEntity<ErrorResponse> handle(BusinessException e) { ... }
```

```
BusinessException (부모)
  ├── OrderNotFoundException      ← BusinessException이다 ✅ 잡힘
  ├── DuplicateOrderException     ← BusinessException이다 ✅ 잡힘
  ├── InsufficientStockException  ← BusinessException이다 ✅ 잡힘
  └── 앞으로 만들 100개의 예외     ← 전부 BusinessException이다 ✅ 전부 잡힘
```

`@ExceptionHandler(BusinessException.class)`는 BusinessException **자신과 모든 자식 클래스**를 잡는다.

그리고 각 예외가 **자기 상태코드와 메시지를 스스로 갖고 있기 때문에**:

```java
// Handler는 그냥 꺼내서 쓰기만 하면 됨
return ResponseEntity
    .status(e.getHttpStatus())    // 각 예외가 404, 409, 400 등을 갖고 있음
    .body(ErrorResponse.of(e.getHttpStatus(), e.getMessage()));
```

```
OrderNotFoundException     → getHttpStatus() = 404, getMessage() = "주문을 찾을 수 없습니다"
DuplicateOrderException    → getHttpStatus() = 409, getMessage() = "이미 주문된 상품입니다"
새로운예외Exception         → getHttpStatus() = ???, getMessage() = "???"  ← 자기가 알아서 갖고 옴
```

> Handler 코드를 건드릴 필요가 없다. 새 예외를 만들 때 `BusinessException`만 상속하고, 상태코드와 메시지만 정해주면 끝.

---

## 6. 커스텀 예외 만들기 (실전)

### 기본 구조

```java
// 비즈니스 예외의 부모 클래스
@Getter
public class BusinessException extends RuntimeException {
    private final HttpStatus httpStatus;

    public BusinessException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
```

```java
// 구체적인 예외들
public class OrderNotFoundException extends BusinessException {
    public OrderNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "ID " + id + "번 주문을 찾을 수 없습니다");
    }
}

public class DuplicateOrderException extends BusinessException {
    public DuplicateOrderException(String productName) {
        super(HttpStatus.CONFLICT, productName + " 상품은 이미 주문되었습니다");
    }
}

public class InsufficientStockException extends BusinessException {
    public InsufficientStockException(String productName, int stock) {
        super(HttpStatus.BAD_REQUEST, productName + " 재고가 부족합니다 (남은 수량: " + stock + ")");
    }
}
```

### GlobalExceptionHandler에서 한번에 처리

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // BusinessException 하나로 모든 커스텀 예외를 잡는다!
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        log.warn("비즈니스 예외: {}", e.getMessage());
        return ResponseEntity
            .status(e.getHttpStatus())
            .body(ErrorResponse.of(e.getHttpStatus(), e.getMessage()));
    }

    // 최후의 방어선
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("서버 에러 발생", e);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다"));
    }
}
```

> **`BusinessException`을 상속하면, 새로운 예외를 아무리 많이 만들어도 GlobalExceptionHandler를 수정할 필요가 없다.**

### Service에서 사용

```java
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public Order getOrder(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new OrderNotFoundException(id));
            // 없으면 → 404 에러가 자동으로 깔끔한 JSON 응답
    }

    public void createOrder(Order order) {
        if (orderRepository.existsByProductName(order.getProductName())) {
            throw new DuplicateOrderException(order.getProductName());
            // 중복이면 → 409 에러
        }
        orderRepository.save(order);
    }
}
```

### Controller는 완전 깔끔

```java
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);  // 예외? GlobalExceptionHandler가 알아서 처리!
    }

    @PostMapping
    public String createOrder(@RequestBody Order order) {
        orderService.createOrder(order);   // try-catch 없다!
        return "주문 완료";
    }
}
```

---

## 7. 예외 처리 흐름 정리

```
1. 클라이언트 → Controller → Service에서 예외 발생!

2. 예외가 Controller 밖으로 던져짐

3. Spring이 @RestControllerAdvice를 찾음

4. 매칭되는 @ExceptionHandler 실행

5. ErrorResponse JSON으로 클라이언트에 응답
```

```
[클라이언트]
    ↓ GET /api/orders/999
[OrderController]
    ↓ orderService.getOrder(999)
[OrderService]
    ↓ orElseThrow → OrderNotFoundException 발생!
    ↓ (Controller로 예외 전파)
[GlobalExceptionHandler]
    ↓ @ExceptionHandler(BusinessException.class) 매칭
    ↓ ErrorResponse 생성
[클라이언트]
    ← 404 { "status": 404, "code": "NOT_FOUND", "message": "ID 999번 주문을 찾을 수 없습니다" }
```

---

## 8. 예외 처리 우선순위

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)   // 1순위: 구체적인 예외
    public ResponseEntity<?> handleOrderNotFound(...) { ... }

    @ExceptionHandler(BusinessException.class)         // 2순위: 부모 예외
    public ResponseEntity<?> handleBusiness(...) { ... }

    @ExceptionHandler(Exception.class)                 // 3순위: 최상위 (최후의 방어선)
    public ResponseEntity<?> handleAll(...) { ... }
}
```

> Spring은 **가장 구체적인 예외 타입**에 매칭되는 핸들러를 먼저 실행한다.
> `OrderNotFoundException`이 발생하면 1순위 → `BusinessException` 핸들러를 건너뛴다.

---

## 9. 자주 쓰는 HTTP 상태 코드와 예외 매핑

| HTTP Status | 의미 | 언제 쓰나 | 예외 예시 |
|------------|------|----------|----------|
| **400** Bad Request | 잘못된 요청 | 파라미터 누락, 유효성 실패 | `IllegalArgumentException`, `MethodArgumentNotValidException` |
| **401** Unauthorized | 인증 실패 | 로그인 안 됨, 토큰 만료 | `AuthenticationException` |
| **403** Forbidden | 권한 없음 | 로그인은 했지만 접근 권한 없음 | `AccessDeniedException` |
| **404** Not Found | 리소스 없음 | ID로 조회했는데 없음 | `OrderNotFoundException` |
| **409** Conflict | 충돌 | 중복 데이터, 동시 수정 | `DuplicateOrderException` |
| **500** Internal Server Error | 서버 에러 | 예상 못 한 에러 전부 | `Exception` (최후의 방어선) |

---

## 10. Checked vs Unchecked 예외

```
         Throwable
         /       \
      Error    Exception
                /       \
    Checked Exception    RuntimeException
    (컴파일러가 강제)       (Unchecked, 자유)
                              ↑
                      BusinessException (우리가 만든 것)
```

| 구분 | Checked Exception | Unchecked Exception (RuntimeException) |
|------|------------------|---------------------------------------|
| **강제 여부** | 반드시 try-catch 또는 throws 선언 | 안 해도 됨 |
| **예시** | `IOException`, `SQLException` | `NullPointerException`, `IllegalArgumentException` |
| **Spring에서** | 거의 안 씀 | ⭐ 이걸 씀 |
| **@Transactional 롤백** | ❌ 기본적으로 안 됨 | ✅ 자동 롤백 |

> **Spring에서 커스텀 예외는 `RuntimeException`을 상속해라.**
> - try-catch 강제 안 당하고
> - `@Transactional` 롤백도 자동으로 되니까

---

## 11. 실전 프로젝트 폴더 구조

```
com.example.myapp/
├── MyApplication.java
├── controller/
│   └── OrderController.java         ← try-catch 없이 깔끔
├── service/
│   └── OrderService.java            ← 비즈니스 예외를 throw
├── repository/
│   └── OrderRepository.java
├── exception/                        ← 예외 관련 클래스 모음
│   ├── BusinessException.java        ← 커스텀 예외 부모
│   ├── OrderNotFoundException.java   ← 구체적인 예외들
│   ├── DuplicateOrderException.java
│   ├── ErrorResponse.java            ← 공통 에러 응답 DTO
│   └── GlobalExceptionHandler.java   ← @RestControllerAdvice
└── dto/
    └── ...
```

---

## 12. 전체 코드 한눈에 보기

```java
// === 1. 예외 부모 클래스 ===
@Getter
public class BusinessException extends RuntimeException {
    private final HttpStatus httpStatus;
    public BusinessException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }
}

// === 2. 구체적인 예외 ===
public class OrderNotFoundException extends BusinessException {
    public OrderNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "ID " + id + "번 주문을 찾을 수 없습니다");
    }
}

// === 3. 에러 응답 DTO ===
@Getter @Builder @AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String code;
    private String message;
    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return ErrorResponse.builder()
            .status(httpStatus.value())
            .code(httpStatus.name())
            .message(message)
            .build();
    }
}

// === 4. 전역 예외 처리기 ===
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) {
        log.warn("비즈니스 예외: {}", e.getMessage());
        return ResponseEntity.status(e.getHttpStatus())
            .body(ErrorResponse.of(e.getHttpStatus(), e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception e) {
        log.error("서버 에러", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다"));
    }
}

// === 5. Service — 예외를 던진다 ===
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    public Order getOrder(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new OrderNotFoundException(id));
    }
}

// === 6. Controller — try-catch 없이 깔끔 ===
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);
    }
}
```

---

## 면접 대비 한 줄 요약

| 질문 | 한 줄 답변 |
|------|-----------|
| `@ExceptionHandler`란? | 특정 예외가 발생했을 때 처리할 메서드를 지정하는 어노테이션 |
| `@RestControllerAdvice`란? | 모든 Controller에서 발생하는 예외를 전역으로 처리하는 클래스에 붙이는 어노테이션 |
| `@ControllerAdvice`와 차이? | `@RestControllerAdvice`는 `@ResponseBody`가 포함되어 JSON으로 응답 |
| 예외 처리 우선순위는? | 가장 구체적인 예외 타입의 핸들러가 먼저 실행됨 |
| 커스텀 예외를 왜 RuntimeException으로 만드나? | try-catch 강제 없이 깔끔하고, `@Transactional` 롤백이 자동으로 됨 |
| ErrorResponse는 왜 만드나? | 모든 API의 에러 응답 형식을 통일하여 클라이언트가 파싱하기 쉽도록 |
| 500 에러 응답에 스택트레이스를 넣어도 되나? | 절대 안 됨. 보안 이슈. 로그에만 남기고 클라이언트에겐 일반 메시지만 |
| `Exception.class` 핸들러는 왜 만드나? | 예상 못 한 에러도 깔끔한 JSON으로 응답하는 최후의 방어선 |
