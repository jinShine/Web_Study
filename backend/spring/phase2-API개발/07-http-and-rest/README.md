# 07. HTTP 기초와 REST 설계 원칙

> **HTTP(HyperText Transfer Protocol)** — 클라이언트와 서버가 데이터를 주고받는 통신 규약
> **REST(Representational State Transfer)** — HTTP를 활용해 자원(Resource)을 CRUD하는 API 설계 스타일

Phase 2 시작이다. 지금부터 실제 API를 만드는 법을 배운다.
API를 "만드는 것"은 쉬운데, "잘 만드는 것"은 이 챕터에 달려 있다.

---

## 1. HTTP 기본 구조

### 요청(Request)과 응답(Response)

```
[클라이언트]                              [서버]
     │                                      │
     │  ─── HTTP 요청 (Request) ──────→     │
     │       GET /api/orders/1              │
     │       Host: localhost:8080           │
     │       Accept: application/json       │
     │                                      │
     │  ←── HTTP 응답 (Response) ──────     │
     │       200 OK                         │
     │       Content-Type: application/json │
     │       { "id": 1, "productName": "맥북" }
     │                                      │
```

### 요청 구조

```http
POST /api/orders HTTP/1.1          ← 요청 라인 (Method + URI + Version)
Host: localhost:8080                ← 헤더 시작
Content-Type: application/json
Authorization: Bearer eyJhbGci...
                                    ← 빈 줄 (헤더와 본문 구분)
{                                   ← 본문 (Body)
  "productName": "맥북",
  "quantity": 1
}
```

| 구성 요소 | 역할 | 예시 |
|----------|------|------|
| **Method** | 어떤 동작을 할지 | GET, POST, PUT, DELETE |
| **URI** | 어떤 자원에 대한 요청인지 | `/api/orders/1` |
| **Header** | 요청의 부가 정보 | Content-Type, Authorization |
| **Body** | 전송할 데이터 | JSON, Form 데이터 |

### 응답 구조

```http
HTTP/1.1 200 OK                    ← 상태 라인 (Version + Status Code)
Content-Type: application/json      ← 헤더
Content-Length: 52

{                                   ← 본문 (Body)
  "id": 1,
  "productName": "맥북"
}
```

---

## 2. HTTP Method — "뭘 하고 싶은지"

| Method | 역할 | CRUD | Body 있음? | 멱등성 | 안전성 |
|--------|------|------|-----------|--------|--------|
| **GET** | 조회 | Read | ❌ | ✅ | ✅ |
| **POST** | 생성 | Create | ✅ | ❌ | ❌ |
| **PUT** | 전체 수정 | Update | ✅ | ✅ | ❌ |
| **PATCH** | 부분 수정 | Update | ✅ | ❌ | ❌ |
| **DELETE** | 삭제 | Delete | ❌ | ✅ | ❌ |

### 멱등성(Idempotent)이란?

> 같은 요청을 여러 번 보내도 **결과가 같은가?**

```
GET /api/orders/1   → 맥북 (1번 호출)
GET /api/orders/1   → 맥북 (100번 호출해도 같은 결과) → ✅ 멱등

DELETE /api/orders/1 → 삭제됨 (1번 호출)
DELETE /api/orders/1 → 이미 없음 (결과적으로 같은 상태) → ✅ 멱등

POST /api/orders    → 주문 생성 (id=1)
POST /api/orders    → 주문 또 생성 (id=2, 다른 결과!) → ❌ 비멱등
```

### PUT vs PATCH

```json
// 원본 데이터
{ "id": 1, "productName": "맥북", "quantity": 1, "price": 2500000 }

// PUT — 전체 교체 (빠진 필드는 null이 됨)
PUT /api/orders/1
{ "productName": "맥북 프로", "quantity": 1, "price": 3500000 }
// 결과: 전체가 새 데이터로 교체됨

// PATCH — 부분 수정 (보낸 필드만 변경)
PATCH /api/orders/1
{ "price": 3500000 }
// 결과: price만 변경, 나머지는 그대로
```

> 실무에서는 **PUT보다 PATCH를 더 많이 쓴다.** 전체를 다 보내는 건 비효율적이니까.
> 하지만 많은 프로젝트에서 PUT으로 부분 수정도 처리하는 경우가 많다 (엄격하게 구분 안 하는 경우).

---

## 3. HTTP Status Code — "결과가 어떻게 됐는지"

### 외워야 하는 핵심 상태 코드

| 코드 | 이름 | 의미 | 언제 쓰나 |
|------|------|------|----------|
| **200** | OK | 성공 | 조회, 수정 성공 |
| **201** | Created | 생성됨 | POST로 리소스 생성 성공 |
| **204** | No Content | 성공, 본문 없음 | DELETE 성공 |
| **400** | Bad Request | 잘못된 요청 | 파라미터 누락, 유효성 실패 |
| **401** | Unauthorized | 인증 실패 | 로그인 안 됨, 토큰 만료 |
| **403** | Forbidden | 권한 없음 | 로그인했지만 접근 불가 |
| **404** | Not Found | 리소스 없음 | 존재하지 않는 ID |
| **405** | Method Not Allowed | 메서드 불가 | GET만 되는데 POST 요청 |
| **409** | Conflict | 충돌 | 중복 데이터 |
| **500** | Internal Server Error | 서버 에러 | 예상 못 한 버그 |

### 상태 코드 범위

```
1xx — 정보 (거의 안 씀)
2xx — 성공 ✅
3xx — 리다이렉트 (서버가 다른 URL로 보냄)
4xx — 클라이언트 에러 (요청이 잘못됨) ← 클라이언트 탓
5xx — 서버 에러 (서버가 처리 실패) ← 서버 탓
```

> **4xx는 클라이언트가 잘못한 것, 5xx는 서버가 잘못한 것.**
> API 개발자로서 5xx가 나오면 너의 버그다.

---

## 4. REST란 무엇인가?

### 핵심 개념: "자원(Resource)을 URI로 표현하고, HTTP Method로 행위를 구분한다"

```
자원(Resource) = 주문(Order)
URI            = /api/orders
행위(Verb)     = GET, POST, PUT, DELETE
```

### REST 하지 않은 API vs REST한 API

```
❌ REST하지 않은 설계 (동사가 URL에 포함)
GET    /getOrder?id=1
POST   /createOrder
POST   /deleteOrder?id=1
GET    /getOrderList
POST   /updateOrderStatus

✅ REST한 설계 (명사 URL + HTTP Method로 구분)
GET    /api/orders/1        → 주문 단건 조회
POST   /api/orders          → 주문 생성
DELETE /api/orders/1        → 주문 삭제
GET    /api/orders          → 주문 목록 조회
PATCH  /api/orders/1/status → 주문 상태 수정
```

> **URL에는 동사를 쓰지 마라.** 행위는 HTTP Method가 담당한다.

---

## 5. URI 설계 규칙

### 기본 규칙

| 규칙 | 좋은 예 ✅ | 나쁜 예 ❌ | 이유 |
|------|-----------|-----------|------|
| 명사 사용 | `/api/orders` | `/api/getOrders` | 행위는 Method가 담당 |
| 복수형 사용 | `/api/orders` | `/api/order` | 컬렉션을 다루니까 |
| 소문자 사용 | `/api/orders` | `/api/Orders` | URL은 대소문자 구분됨 |
| 하이픈(-) 사용 | `/api/order-items` | `/api/order_items` | URL 관례 |
| 계층 관계 표현 | `/api/orders/1/items` | `/api/orderItems?orderId=1` | 소속 관계가 명확 |
| 마지막 슬래시 X | `/api/orders` | `/api/orders/` | 불필요한 슬래시 |

### 자주 쓰는 URI 패턴

```
# 기본 CRUD
GET    /api/orders          → 전체 조회 (목록)
GET    /api/orders/{id}     → 단건 조회
POST   /api/orders          → 생성
PUT    /api/orders/{id}     → 수정
DELETE /api/orders/{id}     → 삭제

# 검색/필터링 — 쿼리 파라미터 사용
GET    /api/orders?status=pending         → 상태로 필터링
GET    /api/orders?page=0&size=20         → 페이징
GET    /api/orders?sort=createdAt,desc    → 정렬
GET    /api/orders?keyword=맥북           → 검색

# 하위 자원 (계층 관계)
GET    /api/orders/1/items       → 1번 주문의 상품 목록
POST   /api/orders/1/items       → 1번 주문에 상품 추가
DELETE /api/orders/1/items/3     → 1번 주문의 3번 상품 삭제

# 특정 행위 (동사가 어쩔 수 없이 필요한 경우)
POST   /api/orders/1/cancel      → 주문 취소
POST   /api/orders/1/refund      → 환불 요청
```

> 쿼리 파라미터(`?key=value`)는 **필터링, 검색, 페이징, 정렬**에 사용한다.
> 경로 변수(`/{id}`)는 **특정 자원을 식별**할 때 사용한다.

---

## 6. Spring에서 HTTP 매핑 — 실전 코드

### 기본 매핑

```java
@RestController
@RequestMapping("/api/orders")     // 공통 경로
public class OrderController {

    // GET /api/orders
    @GetMapping
    public List<Order> getAllOrders() { ... }

    // GET /api/orders/1
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) { ... }

    // POST /api/orders
    @PostMapping
    public Order createOrder(@RequestBody OrderCreateRequest request) { ... }

    // PUT /api/orders/1
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id,
                             @RequestBody OrderUpdateRequest request) { ... }

    // PATCH /api/orders/1
    @PatchMapping("/{id}")
    public Order patchOrder(@PathVariable Long id,
                            @RequestBody Map<String, Object> updates) { ... }

    // DELETE /api/orders/1
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) { ... }
}
```

### 파라미터 받는 방법 총정리

```java
// 1. @PathVariable — URL 경로에서 값 추출
// GET /api/orders/1
@GetMapping("/{id}")
public Order getOrder(@PathVariable Long id) { ... }
// id = 1

// 2. @RequestParam — 쿼리 파라미터에서 값 추출
// GET /api/orders?status=pending&page=0
@GetMapping
public List<Order> searchOrders(
    @RequestParam String status,
    @RequestParam(defaultValue = "0") int page) { ... }
// status = "pending", page = 0

// 3. @RequestBody — JSON 본문을 객체로 변환
// POST /api/orders  Body: {"productName":"맥북","quantity":1}
@PostMapping
public Order createOrder(@RequestBody OrderCreateRequest request) { ... }
// request.getProductName() = "맥북"

// 4. @RequestHeader — 헤더 값 추출
@GetMapping
public Order getOrder(@RequestHeader("Authorization") String token) { ... }
```

### @PathVariable vs @RequestParam 구분

| | @PathVariable | @RequestParam |
|---|---|---|
| **위치** | URL 경로 안 | URL `?` 뒤 |
| **용도** | 자원 식별 (ID) | 필터링, 검색, 페이징 |
| **필수 여부** | 항상 필수 | `required = false` 가능 |
| **예시** | `/api/orders/1` | `/api/orders?status=pending` |

---

## 7. ResponseEntity — 응답을 직접 제어

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    // 200 OK + 본문
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = orderService.getOrder(id);
        return ResponseEntity.ok(order);
    }

    // 201 Created + 본문
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderCreateRequest request) {
        Order created = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 204 No Content (본문 없음)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
```

### ResponseEntity 자주 쓰는 패턴

```java
// 200 OK
ResponseEntity.ok(body)
ResponseEntity.ok().build()

// 201 Created
ResponseEntity.status(HttpStatus.CREATED).body(body)

// 204 No Content
ResponseEntity.noContent().build()

// 400 Bad Request
ResponseEntity.badRequest().body(error)

// 404 Not Found
ResponseEntity.notFound().build()

// 커스텀 상태코드
ResponseEntity.status(HttpStatus.CONFLICT).body(error)
```

---

## 8. Content-Type과 Accept — 데이터 형식 협상

```
클라이언트 → 서버:  "나는 JSON으로 보낼게"     → Content-Type: application/json
클라이언트 → 서버:  "나는 JSON으로 받고 싶어"   → Accept: application/json
```

| 헤더 | 방향 | 의미 |
|------|------|------|
| `Content-Type` | 요청/응답 | 본문(Body)의 데이터 형식 |
| `Accept` | 요청 | 클라이언트가 원하는 응답 형식 |

### 자주 쓰는 Content-Type

| Content-Type | 용도 |
|-------------|------|
| `application/json` | JSON 데이터 ⭐ (REST API 표준) |
| `application/x-www-form-urlencoded` | HTML Form 데이터 |
| `multipart/form-data` | 파일 업로드 |
| `text/plain` | 일반 텍스트 |

> REST API에서는 **거의 100% `application/json`**을 쓴다.

### Spring에서 설정

```java
// JSON으로만 받겠다고 명시 (생략해도 기본이 JSON)
@PostMapping(consumes = "application/json")
public Order createOrder(@RequestBody Order order) { ... }

// JSON으로만 응답하겠다고 명시
@GetMapping(produces = "application/json")
public Order getOrder(@PathVariable Long id) { ... }
```

> Spring Boot + `@RestController`는 기본이 JSON이라 대부분 생략해도 된다.

---

## 9. REST API 설계 체크리스트

실전에서 API를 설계할 때 이 순서로 생각해라:

```
1. 자원(Resource)이 뭔지 정한다         → "주문", "상품", "유저"
2. URI를 설계한다                       → /api/orders, /api/products
3. HTTP Method를 매핑한다              → GET, POST, PUT, DELETE
4. 요청/응답 데이터 형식을 정한다         → JSON (DTO 설계)
5. 상태 코드를 정한다                    → 200, 201, 404, 409
6. 에러 응답 형식을 통일한다             → ErrorResponse (06번에서 배운 것)
```

### 실전 예시 — 주문 API 명세서

| Method | URI | 설명 | Request Body | Response | Status |
|--------|-----|------|-------------|----------|--------|
| GET | `/api/orders` | 주문 목록 조회 | - | `List<Order>` | 200 |
| GET | `/api/orders/{id}` | 주문 단건 조회 | - | `Order` | 200 / 404 |
| POST | `/api/orders` | 주문 생성 | `OrderCreateRequest` | `Order` | 201 |
| PUT | `/api/orders/{id}` | 주문 수정 | `OrderUpdateRequest` | `Order` | 200 / 404 |
| DELETE | `/api/orders/{id}` | 주문 삭제 | - | - | 204 / 404 |
| GET | `/api/orders?status=pending` | 상태별 필터 | - | `List<Order>` | 200 |
| POST | `/api/orders/{id}/cancel` | 주문 취소 | - | `Order` | 200 / 404 |

---

## 면접 대비 한 줄 요약

| 질문 | 한 줄 답변 |
|------|-----------|
| HTTP란? | 클라이언트와 서버가 데이터를 주고받기 위한 통신 프로토콜 |
| REST란? | URI로 자원을 표현하고, HTTP Method로 행위를 구분하는 API 설계 스타일 |
| GET vs POST 차이? | GET은 조회(멱등, Body 없음), POST는 생성(비멱등, Body 있음) |
| PUT vs PATCH 차이? | PUT은 전체 교체, PATCH는 부분 수정 |
| 멱등성이란? | 같은 요청을 여러 번 보내도 결과가 동일한 성질 (GET, PUT, DELETE는 멱등) |
| 200 vs 201 차이? | 200은 일반 성공, 201은 새 리소스가 생성된 성공 |
| 401 vs 403 차이? | 401은 인증 실패(누군지 모름), 403은 권한 없음(누군진 알지만 접근 불가) |
| URI 설계 규칙? | 명사+복수형+소문자, 동사는 HTTP Method가 담당 |
| @PathVariable vs @RequestParam? | PathVariable은 자원 식별(/orders/1), RequestParam은 필터링(?status=pending) |
| @RequestBody는? | HTTP 요청 본문(JSON)을 Java 객체로 자동 변환해주는 어노테이션 |
| Content-Type이란? | HTTP 본문의 데이터 형식을 명시하는 헤더 (REST API는 주로 application/json) |
