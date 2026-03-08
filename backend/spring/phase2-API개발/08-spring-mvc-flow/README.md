# 08. Spring MVC 요청/응답 흐름

> **한 줄 정의:** 클라이언트의 HTTP 요청이 Spring 내부를 어떻게 흘러가서 응답이 되돌아오는지, 그 전체 여정을 이해하는 것

---

## 목차
1. [Spring MVC 전체 흐름 (Big Picture)](#1-spring-mvc-전체-흐름-big-picture)
2. [@RequestMapping과 HTTP 메서드 매핑](#2-requestmapping과-http-메서드-매핑)
3. [@PathVariable — URL 경로에서 값 추출](#3-pathvariable--url-경로에서-값-추출)
4. [@RequestParam — 쿼리 파라미터 받기](#4-requestparam--쿼리-파라미터-받기)
5. [@RequestBody — JSON 요청 본문 받기](#5-requestbody--json-요청-본문-받기)
6. [@ResponseBody와 JSON 응답](#6-responsebody와-json-응답)
7. [@ModelAttribute — 폼 데이터 바인딩](#7-modelattribute--폼-데이터-바인딩)
8. [@RequestHeader / @CookieValue](#8-requestheader--cookievalue)
9. [정리: 어떤 어노테이션을 언제 쓰나?](#9-정리-어떤-어노테이션을-언제-쓰나)
10. [실전 예제: 종합 API Controller](#10-실전-예제-종합-api-controller)
11. [면접 대비 한 줄 요약](#11-면접-대비-한-줄-요약)

---

## 1. Spring MVC 전체 흐름 (Big Picture)

> **한 줄 정의:** 요청이 들어오면 DispatcherServlet이 교통경찰처럼 모든 것을 지휘한다

### 요청 → 응답 전체 흐름도

```
Client (브라우저/Postman)
    │
    │  HTTP Request (GET /api/users/1)
    ▼
┌─────────────────────────────────────────────────┐
│              DispatcherServlet                    │  ← 모든 요청의 입구 (Front Controller)
│                                                   │
│  1️⃣ HandlerMapping에게 물어봄                      │
│     "이 URL 처리할 Controller 누구야?"               │
│                                                   │
│  2️⃣ HandlerAdapter가 실행                         │
│     Controller 메서드를 실제로 호출                   │
│                                                   │
│  3️⃣ Controller → Service → Repository             │
│     비즈니스 로직 처리                               │
│                                                   │
│  4️⃣ HttpMessageConverter                          │
│     Java 객체 → JSON 변환 (@ResponseBody)           │
│                                                   │
│  5️⃣ 응답 반환                                      │
└─────────────────────────────────────────────────┘
    │
    │  HTTP Response (200 OK + JSON)
    ▼
Client
```

### 핵심 구성 요소 한눈에 보기

| 구성 요소 | 역할 | 비유 |
|---|---|---|
| **DispatcherServlet** | 모든 요청을 받아서 적절한 곳으로 분배 | 회사 안내데스크 |
| **HandlerMapping** | URL → Controller 메서드 매핑 정보 관리 | 전화번호부 |
| **HandlerAdapter** | Controller 메서드 실제 실행 | 담당자에게 전화 연결 |
| **HttpMessageConverter** | Java 객체 ↔ JSON/XML 변환 | 통역사 |
| **Controller** | 요청을 받아서 Service에게 위임 | 접수 창구 |

### 왜 이 흐름을 알아야 하나?

```
문제 상황: "JSON이 왜 안 돌아오지?" "404가 왜 뜨지?" "파라미터가 왜 null이지?"

원인 추적:
├─ 404 → HandlerMapping 단계 문제 (URL 매핑이 없음)
├─ 400 → HttpMessageConverter 단계 (JSON 파싱 실패)
├─ 415 → Content-Type 불일치
└─ null 파라미터 → 어노테이션 누락 또는 이름 불일치
```

> 💡 **흐름을 알면 에러 원인을 정확히 짚을 수 있다!**

---

## 2. @RequestMapping과 HTTP 메서드 매핑

> **한 줄 정의:** URL 패턴과 HTTP 메서드를 Controller 메서드에 연결하는 어노테이션

### 기본 사용법

```java
@RestController
@RequestMapping("/api/users")  // 클래스 레벨: 공통 prefix
public class UserController {

    // GET /api/users
    @GetMapping
    public List<User> getUsers() { ... }

    // GET /api/users/{id}
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) { ... }

    // POST /api/users
    @PostMapping
    public User createUser(@RequestBody UserCreateDto dto) { ... }

    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserUpdateDto dto) { ... }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) { ... }
}
```

### @RequestMapping vs 축약 어노테이션

| 어노테이션 | 동일한 표현 | 사용 시점 |
|---|---|---|
| `@GetMapping("/users")` | `@RequestMapping(value="/users", method=GET)` | **GET 요청** — 조회 |
| `@PostMapping("/users")` | `@RequestMapping(value="/users", method=POST)` | **POST 요청** — 생성 |
| `@PutMapping("/users/{id}")` | `@RequestMapping(value="/users/{id}", method=PUT)` | **PUT 요청** — 전체 수정 |
| `@PatchMapping("/users/{id}")` | `@RequestMapping(value="/users/{id}", method=PATCH)` | **PATCH 요청** — 부분 수정 |
| `@DeleteMapping("/users/{id}")` | `@RequestMapping(value="/users/{id}", method=DELETE)` | **DELETE 요청** — 삭제 |

> 💡 **실무에서는 축약 어노테이션을 99% 사용한다.** `@RequestMapping(method=...)` 쓰는 사람 거의 없음!

### @Controller vs @RestController

```java
// @Controller — 뷰(HTML)를 반환할 때
@Controller
public class PageController {
    @GetMapping("/home")
    public String home() {
        return "home";  // → templates/home.html 렌더링
    }
}

// @RestController — JSON 데이터를 반환할 때 (= @Controller + @ResponseBody)
@RestController
public class ApiController {
    @GetMapping("/api/data")
    public Map<String, String> data() {
        return Map.of("key", "value");  // → {"key": "value"} JSON 반환
    }
}
```

| 비교 | @Controller | @RestController |
|---|---|---|
| 반환 타입 | 뷰 이름 (String) | Java 객체 → JSON |
| @ResponseBody | 메서드마다 붙여야 함 | **자동 적용** |
| 주 용도 | SSR (서버사이드 렌더링) | **REST API** |
| 우리가 쓸 것 | ❌ 거의 안 씀 | ✅ **이것만 쓴다** |

---

## 3. @PathVariable — URL 경로에서 값 추출

> **한 줄 정의:** URI 경로의 `{변수}` 부분을 메서드 파라미터로 받는다

### 기본 사용법

```java
// GET /api/users/42
@GetMapping("/api/users/{id}")
public User getUser(@PathVariable Long id) {
    // id = 42
    return userService.findById(id);
}
```

### 변수명이 다를 때

```java
// URL의 {userId}와 파라미터명 id가 다르면 → name 속성으로 매핑
@GetMapping("/api/users/{userId}")
public User getUser(@PathVariable("userId") Long id) {
    return userService.findById(id);
}
```

### 다중 PathVariable

```java
// GET /api/users/42/orders/7
@GetMapping("/api/users/{userId}/orders/{orderId}")
public Order getOrder(
    @PathVariable Long userId,
    @PathVariable Long orderId
) {
    return orderService.findByUserAndId(userId, orderId);
}
```

### 주의사항

```java
// ❌ 이러면 안 됨 — URL에 {id}가 없는데 @PathVariable 쓰면 에러
@GetMapping("/api/users")
public User getUser(@PathVariable Long id) { ... }  // 💥 에러!

// ❌ 타입 불일치 — URL에 문자가 오면 400 에러
// GET /api/users/abc → Long으로 변환 실패 → 400 Bad Request
@GetMapping("/api/users/{id}")
public User getUser(@PathVariable Long id) { ... }
```

---

## 4. @RequestParam — 쿼리 파라미터 받기

> **한 줄 정의:** URL의 `?key=value` 부분을 메서드 파라미터로 받는다

### 기본 사용법

```java
// GET /api/users?name=Kim&age=25
@GetMapping("/api/users")
public List<User> searchUsers(
    @RequestParam String name,    // name = "Kim"
    @RequestParam int age         // age = 25
) {
    return userService.search(name, age);
}
```

### 선택적 파라미터 (required = false)

```java
// GET /api/users             → keyword = null, page = 1
// GET /api/users?keyword=Kim → keyword = "Kim", page = 1
// GET /api/users?page=3      → keyword = null, page = 3
@GetMapping("/api/users")
public List<User> searchUsers(
    @RequestParam(required = false) String keyword,
    @RequestParam(defaultValue = "1") int page
) {
    return userService.search(keyword, page);
}
```

### @RequestParam 속성 정리

| 속성 | 설명 | 기본값 |
|---|---|---|
| `value` / `name` | 쿼리 파라미터 이름 | 메서드 파라미터명과 동일 |
| `required` | 필수 여부 | `true` (없으면 400 에러) |
| `defaultValue` | 없을 때 기본값 | 없음 |

### Map으로 한번에 받기

```java
// GET /api/search?name=Kim&age=25&city=Seoul
@GetMapping("/api/search")
public List<User> search(@RequestParam Map<String, String> params) {
    // params = {name=Kim, age=25, city=Seoul}
    String name = params.get("name");
    String age = params.get("age");
    return userService.search(params);
}
```

> ⚠️ **Map으로 받으면 편하지만, 어떤 파라미터가 오는지 코드만 봐서는 모른다.** 명시적으로 쓰는 게 좋다.

---

## 5. @RequestBody — JSON 요청 본문 받기

> **한 줄 정의:** HTTP Body의 JSON을 Java 객체로 자동 변환(역직렬화)한다

### 동작 원리

```
Client가 보낸 요청:
POST /api/users
Content-Type: application/json

{
    "name": "Kim",
    "email": "kim@example.com",
    "age": 25
}

        ↓ HttpMessageConverter (Jackson)가 JSON → Java 객체로 변환

@PostMapping("/api/users")
public User createUser(@RequestBody UserCreateDto dto) {
    // dto.getName() → "Kim"
    // dto.getEmail() → "kim@example.com"
    // dto.getAge() → 25
}
```

### DTO 클래스

```java
// UserCreateDto.java
public class UserCreateDto {
    private String name;
    private String email;
    private int age;

    // 기본 생성자 필수! (Jackson이 객체 생성할 때 필요)
    public UserCreateDto() {}

    // Getter 필수! (Jackson이 직렬화할 때 필요)
    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getAge() { return age; }

    // Setter는 Jackson 기본 설정에서 필요 (또는 @JsonProperty)
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setAge(int age) { this.age = age; }
}
```

### 자주 하는 실수

```java
// ❌ 실수 1: @RequestBody 빼먹기
@PostMapping("/api/users")
public User createUser(UserCreateDto dto) {
    // dto의 모든 필드가 null! → @RequestBody가 없으면 JSON을 파싱 안 함
}

// ❌ 실수 2: GET 요청에 @RequestBody 쓰기
@GetMapping("/api/users")
public List<User> getUsers(@RequestBody SearchDto dto) {
    // GET 요청은 Body가 없다! → 의미 없음, 관례적으로 쓰지 않음
}

// ❌ 실수 3: Content-Type 누락 (클라이언트 쪽)
// Content-Type: application/json 헤더가 없으면 → 415 Unsupported Media Type
```

### @RequestBody vs @RequestParam vs @PathVariable

```
GET  /api/users/42?sort=name
     └── {42} → @PathVariable
              └── sort=name → @RequestParam

POST /api/users
     Body: {"name":"Kim"} → @RequestBody
```

---

## 6. @ResponseBody와 JSON 응답

> **한 줄 정의:** Java 객체를 HTTP Response Body에 직접 쓴다 (JSON 변환)

### 동작 원리

```
Controller 메서드가 반환:
return new User("Kim", "kim@email.com");

        ↓ HttpMessageConverter (Jackson)가 Java 객체 → JSON 변환

HTTP Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
    "name": "Kim",
    "email": "kim@email.com"
}
```

### @RestController를 쓰면 자동 적용

```java
// @RestController = @Controller + @ResponseBody
// 모든 메서드에 @ResponseBody가 자동으로 붙는다

@RestController
public class UserController {

    @GetMapping("/api/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
        // → Jackson이 User 객체를 JSON으로 변환해서 응답
    }

    @GetMapping("/api/users")
    public List<User> getUsers() {
        return userService.findAll();
        // → List<User>도 JSON 배열로 변환
        // [{"name":"Kim"}, {"name":"Lee"}]
    }
}
```

### Jackson 직렬화/역직렬화

```
직렬화 (Serialization):     Java 객체 → JSON (응답할 때)
역직렬화 (Deserialization): JSON → Java 객체 (요청받을 때)

Spring Boot는 Jackson 라이브러리가 기본 내장되어 있다!
별도 설정 없이 바로 사용 가능.
```

### Jackson 주요 어노테이션 (미리보기)

```java
public class User {
    private String name;

    @JsonIgnore          // JSON에 포함하지 않음 (비밀번호 등)
    private String password;

    @JsonProperty("user_email")  // JSON 필드명 변경
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd")  // 날짜 포맷 지정
    private LocalDate birthDate;
}

// 결과:
// {
//     "name": "Kim",
//     "user_email": "kim@email.com",
//     "birthDate": "1995-03-15"
// }
// → password는 포함되지 않음!
```

---

## 7. @ModelAttribute — 폼 데이터 바인딩

> **한 줄 정의:** HTML 폼의 `key=value` 데이터를 Java 객체에 자동으로 바인딩한다

### 사용 시점

```
@RequestBody → JSON 데이터 (Content-Type: application/json)
@ModelAttribute → 폼 데이터 (Content-Type: application/x-www-form-urlencoded)
```

### 사용 예시

```java
// HTML 폼에서 전송:
// POST /api/users
// Content-Type: application/x-www-form-urlencoded
// name=Kim&email=kim@email.com&age=25

@PostMapping("/api/users")
public User createUser(@ModelAttribute UserCreateDto dto) {
    // dto.getName() → "Kim"
    // dto.getEmail() → "kim@email.com"
    // dto.getAge() → 25
}
```

### @ModelAttribute vs @RequestBody

| 비교 | @ModelAttribute | @RequestBody |
|---|---|---|
| Content-Type | `application/x-www-form-urlencoded` | `application/json` |
| 데이터 형태 | `key=value&key=value` | `{"key":"value"}` |
| 주 사용처 | HTML 폼 전송 | REST API |
| 변환기 | Spring 내부 바인딩 | Jackson (HttpMessageConverter) |
| **우리가 주로 쓸 것** | 거의 안 씀 | ✅ **이것만 쓴다** |

> 💡 REST API 개발에서는 거의 `@RequestBody`만 쓴다. `@ModelAttribute`는 파일 업로드 시에 가끔 쓰는 정도.

---

## 8. @RequestHeader / @CookieValue

> **한 줄 정의:** HTTP 헤더나 쿠키 값을 메서드 파라미터로 받는다

### @RequestHeader

```java
@GetMapping("/api/users")
public List<User> getUsers(
    @RequestHeader("Authorization") String token,
    @RequestHeader(value = "Accept-Language", defaultValue = "ko") String lang
) {
    // token = "Bearer eyJhbGciOi..."
    // lang = "ko"
}
```

### @CookieValue

```java
@GetMapping("/api/dashboard")
public Dashboard getDashboard(
    @CookieValue(value = "sessionId", required = false) String sessionId
) {
    // sessionId = 쿠키에 저장된 세션 ID
}
```

### 실무에서 언제 쓰나?

| 어노테이션 | 실무 사용 빈도 | 대표 사례 |
|---|---|---|
| `@RequestHeader` | ⭐⭐⭐ 높음 | Authorization 토큰, Content-Type 확인 |
| `@CookieValue` | ⭐ 낮음 | 세션 기반 인증 (JWT 쓰면 거의 안 씀) |

---

## 9. 정리: 어떤 어노테이션을 언제 쓰나?

### 데이터 위치별 어노테이션 선택

```
HTTP 요청 구조:

GET /api/users/42?sort=name HTTP/1.1     ← URL
Host: localhost:8080                      ← Header
Authorization: Bearer eyJ...              ← Header
Content-Type: application/json            ← Header
Cookie: sessionId=abc123                  ← Cookie

{                                         ← Body
    "name": "Kim",
    "age": 25
}
```

| 데이터 위치 | 어노테이션 | 예시 |
|---|---|---|
| **URL 경로** `/users/{id}` | `@PathVariable` | 리소스 식별 (ID) |
| **쿼리 스트링** `?key=value` | `@RequestParam` | 검색 조건, 정렬, 페이징 |
| **요청 본문** (JSON) | `@RequestBody` | 생성/수정 데이터 |
| **요청 본문** (폼) | `@ModelAttribute` | HTML 폼 데이터 |
| **헤더** | `@RequestHeader` | 인증 토큰, 메타 정보 |
| **쿠키** | `@CookieValue` | 세션 ID |

### CRUD별 일반적인 조합

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // CREATE — Body에 데이터
    @PostMapping
    public User create(@RequestBody UserCreateDto dto) { }

    // READ (목록) — 쿼리 파라미터로 검색/페이징
    @GetMapping
    public List<User> list(
        @RequestParam(required = false) String keyword,
        @RequestParam(defaultValue = "1") int page
    ) { }

    // READ (단건) — Path에 ID
    @GetMapping("/{id}")
    public User detail(@PathVariable Long id) { }

    // UPDATE — Path에 ID + Body에 데이터
    @PutMapping("/{id}")
    public User update(
        @PathVariable Long id,
        @RequestBody UserUpdateDto dto
    ) { }

    // DELETE — Path에 ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { }
}
```

---

## 10. 실전 예제: 종합 API Controller

> 지금까지 배운 모든 어노테이션을 사용한 실전 코드

```java
package com.example.demo.controller;

import com.example.demo.dto.ProductCreateDto;
import com.example.demo.dto.ProductUpdateDto;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    // 생성자 주입 (04에서 배운 DI!)
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * 상품 목록 조회 (검색 + 페이징)
     * GET /api/products?keyword=노트북&category=electronics&page=1&size=10
     */
    @GetMapping
    public List<Product> getProducts(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String category,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return productService.search(keyword, category, page, size);
    }

    /**
     * 상품 단건 조회
     * GET /api/products/42
     */
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }

    /**
     * 상품 생성
     * POST /api/products
     * Body: {"name": "맥북", "price": 2000000, "category": "electronics"}
     */
    @PostMapping
    public Product createProduct(@RequestBody ProductCreateDto dto) {
        return productService.create(dto);
    }

    /**
     * 상품 수정
     * PUT /api/products/42
     * Body: {"name": "맥북 프로", "price": 2500000}
     */
    @PutMapping("/{id}")
    public Product updateProduct(
        @PathVariable Long id,
        @RequestBody ProductUpdateDto dto
    ) {
        return productService.update(id, dto);
    }

    /**
     * 상품 삭제
     * DELETE /api/products/42
     */
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id);
    }

    /**
     * 특정 카테고리의 가격 범위 상품 조회
     * GET /api/products/category/electronics?minPrice=100000&maxPrice=500000
     *
     * → @PathVariable + @RequestParam 혼합 사용
     */
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(
        @PathVariable String category,
        @RequestParam(defaultValue = "0") int minPrice,
        @RequestParam(defaultValue = "999999999") int maxPrice
    ) {
        return productService.findByCategory(category, minPrice, maxPrice);
    }

    /**
     * 인증된 사용자의 상품 등록
     * POST /api/products/auth
     * Header: Authorization: Bearer eyJ...
     * Body: {"name": "상품명", "price": 10000}
     *
     * → @RequestHeader + @RequestBody 혼합 사용
     */
    @PostMapping("/auth")
    public Product createWithAuth(
        @RequestHeader("Authorization") String token,
        @RequestBody ProductCreateDto dto
    ) {
        // 토큰 검증은 나중에 Spring Security에서 배움 (25번 주제)
        return productService.create(dto);
    }
}
```

### DTO 클래스 예시

```java
// ProductCreateDto.java
public class ProductCreateDto {
    private String name;
    private int price;
    private String category;

    public ProductCreateDto() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}

// ProductUpdateDto.java
public class ProductUpdateDto {
    private String name;
    private Integer price;  // Integer → null 가능 (부분 수정 시)

    public ProductUpdateDto() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }
}
```

---

## 11. 면접 대비 한 줄 요약

| 질문 | 답변 |
|---|---|
| Spring MVC의 요청 처리 흐름은? | DispatcherServlet → HandlerMapping → HandlerAdapter → Controller → HttpMessageConverter → 응답 |
| @Controller와 @RestController 차이는? | @RestController = @Controller + @ResponseBody, JSON 반환 시 사용 |
| @PathVariable은 언제 쓰나? | URI 경로의 변수값 추출 (`/users/{id}`) — 리소스 식별 |
| @RequestParam은 언제 쓰나? | 쿼리 스트링 값 추출 (`?key=value`) — 검색/필터/페이징 |
| @RequestBody는 어떻게 동작하나? | Jackson이 JSON → Java 객체로 역직렬화, 기본 생성자 필수 |
| @ResponseBody는 어떻게 동작하나? | Jackson이 Java 객체 → JSON으로 직렬화, @RestController면 자동 적용 |
| @ModelAttribute vs @RequestBody? | 폼 데이터(key=value) vs JSON, REST API에서는 @RequestBody 사용 |
| JSON 변환은 누가 하나? | HttpMessageConverter (기본 구현체: MappingJackson2HttpMessageConverter) |
| 요청에서 415 에러가 나는 이유는? | Content-Type 헤더가 없거나 서버가 지원하지 않는 미디어 타입 |
| @RequestParam에서 required=false를 안 쓰면? | 파라미터가 없을 때 400 Bad Request 에러 발생 |

---

## 다음 수업 예고

> **09. Layered 아키텍처와 DAO 패턴** — Controller-Service-Repository 계층 구조, DAO 패턴, 의존성 흐름
>
> 💡 이번에 배운 Controller가 왜 Service를 호출하는지, 왜 이렇게 계층을 나누는지 깊게 파헤친다!
