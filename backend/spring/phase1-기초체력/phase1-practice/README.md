# Phase 1 복습 — 주문 API 직접 만들기

> Phase 1에서 배운 핵심만 뽑아서, **코드를 직접 치면서** 복습한다.
> DB 없이 메모리(HashMap)로 동작하는 간단한 주문 API를 단계별로 만든다.

---

## 복습 대상 (실무에서 진짜 쓰는 것만)

| Phase 1 주제 | 이 실습에서 복습하는 것 |
|-------------|---------------------|
| 01. Servlet/Spring Boot | 프로젝트 생성, `@SpringBootApplication` |
| 02. Resources | `application.yml` 설정 |
| 03. Logging | `@Slf4j`, `log.info()`, `log.error()` |
| 04. IoC/DI | `@RestController`, `@Service`, `@Repository`, `@RequiredArgsConstructor` |
| 05. AOP | `@Aspect`, `@Around`, 실행 시간 측정 |
| 06. 예외 처리 | `@RestControllerAdvice`, `BusinessException`, `ErrorResponse` |

---

## Step 0: 프로젝트 생성

[Spring Initializr](https://start.spring.io/)에서 프로젝트 생성:

```
- Project: Gradle - Groovy
- Language: Java
- Spring Boot: 3.x (최신)
- Group: com.example
- Artifact: order-api
- Packaging: Jar
- Java: 17
- Dependencies:
    ✅ Spring Web
    ✅ Lombok
```

> AOP는 나중에 직접 추가한다 (Step 5)

---

## Step 1: 프로젝트 구조 만들기

> 복습 포인트: **계층 구조** (Controller → Service → Repository)

```
src/main/java/com/example/orderapi/
├── OrderApiApplication.java          ← 이미 있음
├── controller/
│   └── OrderController.java          ← 새로 만들 것
├── service/
│   └── OrderService.java             ← 새로 만들 것
├── repository/
│   └── OrderRepository.java          ← 새로 만들 것
├── domain/
│   └── Order.java                    ← 새로 만들 것
├── exception/
│   ├── BusinessException.java        ← 새로 만들 것
│   ├── OrderNotFoundException.java   ← 새로 만들 것
│   ├── ErrorResponse.java            ← 새로 만들 것
│   └── GlobalExceptionHandler.java   ← 새로 만들 것
└── aspect/
    └── ExecutionTimeAspect.java      ← Step 5에서 만들 것
```

먼저 **패키지(폴더)부터 전부 만들어라.** 파일은 아직 안 만들어도 된다.

---

## Step 2: Domain 클래스 만들기

> 복습 포인트: 없음 (새로운 개념). 그냥 데이터를 담는 클래스.

### 📁 `domain/Order.java`

직접 쳐보기:

```java
package com.example.orderapi.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Order {
    private Long id;
    private String productName;
    private int quantity;
    private int price;
}
```

> `@Getter`, `@Setter`는 Lombok이 getter/setter를 자동 생성해준다.
> 04번에서 배운 `@RequiredArgsConstructor`와 같은 Lombok 기능.

---

## Step 3: Repository → Service → Controller 순서로 만들기

> 복습 포인트: **IoC/DI** — `@Repository`, `@Service`, `@RestController`, `@RequiredArgsConstructor`, `private final`

### 왜 이 순서인가?

```
Repository가 없으면 → Service가 동작 안 함
Service가 없으면   → Controller가 동작 안 함

그래서: Repository → Service → Controller 순서로 만든다
```

### 계층별 메서드 네이밍 관례

각 계층마다 **관례적인 네이밍**이 다르다. 공식 규칙은 아니지만 거의 모든 프로젝트가 이렇게 쓴다:

**Repository** — "데이터를 어떻게 찾고 저장하나" (Spring Data JPA 메서드 이름 기반)

| 동작 | 네이밍 | 예시 |
|------|--------|------|
| 저장 | `save` | `save(order)` |
| 단건 조회 | `findById` | `findById(1L)` |
| 조건 조회 | `findBy~` | `findByProductName("맥북")` |
| 전체 조회 | `findAll` | `findAll()` |
| 삭제 | `deleteById` | `deleteById(1L)` |
| 존재 확인 | `existsById` | `existsById(1L)` |

> Phase 3에서 `JpaRepository`를 쓰면 이 이름 그대로 메서드가 자동 생성된다. 미리 익숙해지면 편해.

**Service** — "비즈니스에서 뭘 하나" (동작 중심)

| 동작 | 네이밍 | 예시 |
|------|--------|------|
| 생성 | `create~` | `createOrder(order)` |
| 단건 조회 | `get~` | `getOrder(id)` |
| 목록 조회 | `get~s` / `getAll~` | `getAllOrders()` |
| 수정 | `update~` | `updateOrder(id, request)` |
| 삭제 | `delete~` | `deleteOrder(id)` |
| 검색 | `search~` | `searchOrders(keyword)` |
| 비즈니스 동작 | 동사로 표현 | `cancelOrder()`, `processPayment()` |

**Controller** — Service와 비슷, HTTP 메서드와 매핑

```java
@PostMapping          → createOrder()
@GetMapping("/{id}")  → getOrder()
@GetMapping           → getAllOrders()
@PutMapping("/{id}")  → updateOrder()
@DeleteMapping("/{id}") → deleteOrder()
```

**계층 간 흐름:**
```
Controller: createOrder()  →  Service: createOrder()  →  Repository: save()
Controller: getOrder()     →  Service: getOrder()     →  Repository: findById()
Controller: deleteOrder()  →  Service: deleteOrder()  →  Repository: deleteById()
```

---

### 📁 `repository/OrderRepository.java`

DB가 없으니 **HashMap으로 가짜 저장소**를 만든다.

직접 쳐보기:

```java
package com.example.orderapi.repository;

import com.example.orderapi.domain.Order;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository  // ← 빈 등록 (04번 복습: @Component의 파생 어노테이션)
public class OrderRepository {

    private final Map<Long, Order> store = new HashMap<>();
    private Long sequence = 0L;  // ID 자동 증가용

    public Order save(Order order) {
        order.setId(++sequence);
        store.put(order.getId(), order);
        return order;
    }

    public Optional<Order> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Order> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(Long id) {
        store.remove(id);
    }

    public boolean existsById(Long id) {
        return store.containsKey(id);
    }
}
```

**자가 체크:**
- [ ] `@Repository` 붙였는가?
- [ ] 이 클래스는 Spring 컨테이너가 빈으로 관리한다 (IoC)

---

### 📁 `service/OrderService.java`

직접 쳐보기:

```java
package com.example.orderapi.service;

import com.example.orderapi.domain.Order;
import com.example.orderapi.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service                     // ← 빈 등록
@RequiredArgsConstructor     // ← final 필드 생성자 자동 생성 (04번 복습)
@Slf4j                       // ← 로거 자동 생성 (03번 복습)
public class OrderService {

    private final OrderRepository orderRepository;  // ← DI (04번 복습)

    public Order createOrder(Order order) {
        log.info("주문 생성 요청: 상품={}, 수량={}", order.getProductName(), order.getQuantity());
        Order saved = orderRepository.save(order);
        log.info("주문 생성 완료: id={}", saved.getId());
        return saved;
    }

    public Order getOrder(Long id) {
        log.info("주문 조회 요청: id={}", id);
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("주문을 찾을 수 없습니다"));
                // ⚠️ 일단 RuntimeException으로! Step 4에서 커스텀 예외로 바꿀 것
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("삭제할 주문을 찾을 수 없습니다");
            // ⚠️ 이것도 Step 4에서 바꿀 것
        }
        orderRepository.deleteById(id);
        log.info("주문 삭제 완료: id={}", id);
    }
}
```

**자가 체크:**
- [ ] `@RequiredArgsConstructor` + `private final` 조합을 사용했는가?
- [ ] `@Autowired` 없이 생성자 주입이 되는 이유를 설명할 수 있는가?
- [ ] `log.info()`로 로그를 남기고 있는가?

> 💡 `@Autowired`가 없는 이유: Lombok이 생성자를 만들어주고, 생성자가 1개면 `@Autowired`가 자동 적용 (04번)

---

### 📁 `controller/OrderController.java`

직접 쳐보기:

```java
package com.example.orderapi.controller;

import com.example.orderapi.domain.Order;
import com.example.orderapi.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController                       // ← @Controller + @ResponseBody (01번 복습)
@RequiredArgsConstructor              // ← DI
@RequestMapping("/api/orders")        // ← 공통 경로
public class OrderController {

    private final OrderService orderService;  // ← DI

    // 주문 생성 — POST /api/orders
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order created = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 주문 단건 조회 — GET /api/orders/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = orderService.getOrder(id);
        return ResponseEntity.ok(order);
    }

    // 주문 전체 조회 — GET /api/orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // 주문 삭제 — DELETE /api/orders/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();  // 204 No Content
    }
}
```

**자가 체크:**
- [ ] `@RestController` = `@Controller` + `@ResponseBody`임을 알고 있는가?
- [ ] `@RequestBody`는 JSON → Java 객체 변환을 해준다
- [ ] `@PathVariable`은 URL의 `{id}` 값을 가져온다

---

### 🧪 여기서 한번 실행하고 테스트해보기!

```bash
./gradlew bootRun
```

터미널이나 Postman으로 테스트:

```bash
# 주문 생성
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"productName": "맥북", "quantity": 1, "price": 2500000}'

# 전체 조회
curl http://localhost:8080/api/orders

# 단건 조회
curl http://localhost:8080/api/orders/1

# 없는 주문 조회 (에러 발생!)
curl http://localhost:8080/api/orders/999

# 삭제
curl -X DELETE http://localhost:8080/api/orders/1
```

> `/api/orders/999` 를 호출하면 지금은 **500 에러 + 지저분한 JSON**이 나올 것이다.
> 이걸 Step 4에서 깔끔하게 고친다!

---

## Step 4: 예외 처리 추가하기

> 복습 포인트: **06번** — `BusinessException`, `ErrorResponse`, `@RestControllerAdvice`

### 📁 `exception/BusinessException.java`

직접 쳐보기:

```java
package com.example.orderapi.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BusinessException extends RuntimeException {
    private final HttpStatus httpStatus;

    public BusinessException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
```

### 📁 `exception/OrderNotFoundException.java`

```java
package com.example.orderapi.exception;

import org.springframework.http.HttpStatus;

public class OrderNotFoundException extends BusinessException {
    public OrderNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "ID " + id + "번 주문을 찾을 수 없습니다");
    }
}
```

### 📁 `exception/ErrorResponse.java`

```java
package com.example.orderapi.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@AllArgsConstructor
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
```

### 📁 `exception/GlobalExceptionHandler.java`

```java
package com.example.orderapi.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        log.warn("비즈니스 예외: {}", e.getMessage());
        return ResponseEntity
                .status(e.getHttpStatus())
                .body(ErrorResponse.of(e.getHttpStatus(), e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("서버 에러 발생", e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다"));
    }
}
```

### 📁 `service/OrderService.java` 수정

`RuntimeException` → `OrderNotFoundException`으로 교체:

```java
// 변경 전
.orElseThrow(() -> new RuntimeException("주문을 찾을 수 없습니다"));

// 변경 후
.orElseThrow(() -> new OrderNotFoundException(id));
```

```java
// 변경 전
throw new RuntimeException("삭제할 주문을 찾을 수 없습니다");

// 변경 후
throw new OrderNotFoundException(id);
```

### 🧪 테스트하기

다시 실행하고 없는 주문을 조회해보기:

```bash
curl http://localhost:8080/api/orders/999
```

**Before (Step 3):**
```json
{
    "timestamp": "2026-03-04T...",
    "status": 500,
    "error": "Internal Server Error",
    "path": "/api/orders/999"
}
```

**After (Step 4):**
```json
{
    "status": 404,
    "code": "NOT_FOUND",
    "message": "ID 999번 주문을 찾을 수 없습니다"
}
```

> 이 차이를 직접 눈으로 확인해야 한다. 이게 예외 처리의 가치다.

**자가 체크:**
- [ ] `BusinessException`이 `RuntimeException`을 상속하는 이유를 설명할 수 있는가?
- [ ] `@RestControllerAdvice`가 모든 Controller의 예외를 잡는 원리를 아는가?
- [ ] 새 예외(예: `DuplicateOrderException`)를 추가해도 `GlobalExceptionHandler`를 수정 안 해도 되는 이유?

---

## Step 5: AOP 추가하기

> 복습 포인트: **05번** — `@Aspect`, `@Around`, 커스텀 어노테이션

### build.gradle에 의존성 추가

```groovy
dependencies {
    // 기존 것들...
    implementation 'org.springframework.boot:spring-boot-starter-aop'  // 추가!
}
```

### 📁 어노테이션 만들기 (annotation 패키지 새로 생성)

`annotation/LogExecutionTime.java`:

```java
package com.example.orderapi.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecutionTime {
}
```

### 📁 `aspect/ExecutionTimeAspect.java`

```java
package com.example.orderapi.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class ExecutionTimeAspect {

    @Around("@annotation(com.example.orderapi.annotation.LogExecutionTime)")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().toShortString();
        long start = System.currentTimeMillis();

        try {
            return joinPoint.proceed();
        } finally {
            long time = System.currentTimeMillis() - start;
            if (time > 1000) {
                log.warn("🐢 SLOW: {} ({}ms)", methodName, time);
            } else {
                log.info("⚡ {} ({}ms)", methodName, time);
            }
        }
    }
}
```

### Controller에 어노테이션 붙이기

```java
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    @LogExecutionTime     // ← 추가!
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) { ... }

    @LogExecutionTime     // ← 추가!
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) { ... }

    // getAllOrders, deleteOrder에도 붙여보기
}
```

### 🧪 테스트하기

실행 후 API 호출하면 콘솔에:

```
⚡ OrderController.createOrder(..) (23ms)
⚡ OrderController.getOrder(..) (5ms)
```

**자가 체크:**
- [ ] `@Aspect` + `@Component` 둘 다 붙여야 동작하는 이유?
- [ ] `proceed()`를 빼면 어떻게 되는가?
- [ ] `@LogExecutionTime`을 Service 메서드에도 붙여보기

---

## Step 6: application.yml 설정

> 복습 포인트: **02번, 03번** — Resources 구조, 로깅 설정

### 📁 `src/main/resources/application.yml`

기존 `application.properties` 삭제하고 `application.yml`로 변경:

```yaml
server:
  port: 8080

spring:
  application:
    name: order-api

# 로깅 설정 (03번 복습)
logging:
  level:
    root: INFO
    com.example.orderapi: DEBUG              # 우리 패키지는 DEBUG 레벨
    com.example.orderapi.repository: TRACE   # Repository는 더 상세하게
  pattern:
    console: "%d{HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

**자가 체크:**
- [ ] `root: INFO`와 패키지별 레벨 설정의 차이를 설명할 수 있는가?
- [ ] `.properties`와 `.yml`의 차이점을 아는가?

---

## 최종 프로젝트 구조

```
src/main/java/com/example/orderapi/
├── OrderApiApplication.java
├── annotation/
│   └── LogExecutionTime.java            ← AOP 커스텀 어노테이션
├── aspect/
│   └── ExecutionTimeAspect.java         ← AOP 실행 시간 측정
├── controller/
│   └── OrderController.java             ← REST API 엔드포인트
├── service/
│   └── OrderService.java                ← 비즈니스 로직 + 로깅
├── repository/
│   └── OrderRepository.java             ← 데이터 저장 (메모리)
├── domain/
│   └── Order.java                       ← 데이터 클래스
└── exception/
    ├── BusinessException.java           ← 커스텀 예외 부모
    ├── OrderNotFoundException.java      ← 구체적인 예외
    ├── ErrorResponse.java               ← 공통 에러 응답
    └── GlobalExceptionHandler.java      ← 전역 예외 처리

src/main/resources/
└── application.yml                      ← 서버/로깅 설정
```

---

## 완성 후 체크리스트

### 기능 테스트
- [ ] `POST /api/orders` — 주문 생성 후 201 응답
- [ ] `GET /api/orders` — 전체 주문 목록 조회
- [ ] `GET /api/orders/1` — 단건 조회 성공
- [ ] `GET /api/orders/999` — 404 에러 + 깔끔한 JSON
- [ ] `DELETE /api/orders/1` — 삭제 후 204 응답
- [ ] `DELETE /api/orders/999` — 404 에러

### 개념 확인 (스스로 답해보기)
- [ ] `@RestController`와 `@Controller`의 차이?
- [ ] `@RequiredArgsConstructor`가 `@Autowired`를 대체하는 원리?
- [ ] `@Repository`, `@Service`, `@RestController`가 전부 빈으로 등록되는 이유?
- [ ] `@RestControllerAdvice`가 Controller의 예외를 잡을 수 있는 이유?
- [ ] `@Aspect`에서 `proceed()`를 호출하지 않으면?
- [ ] Singleton 빈에 상태(필드)를 두면 안 되는 이유?

---

## 🎯 도전 과제 (여유 있으면)

### 1. `DuplicateOrderException` 추가
같은 `productName`으로 주문하면 409 에러를 던지도록 만들어보기.

힌트:
```java
public class DuplicateOrderException extends BusinessException {
    public DuplicateOrderException(String productName) {
        super(HttpStatus.CONFLICT, productName + "은(는) 이미 주문된 상품입니다");
    }
}
```

### 2. `execution` 방식 AOP 추가
`ApiLoggingAspect`를 만들어서 모든 Controller 메서드의 요청/응답을 자동 로깅해보기.

### 3. Profile 설정
`application-dev.yml`과 `application-prod.yml`을 만들어서 로깅 레벨을 다르게 설정해보기.
