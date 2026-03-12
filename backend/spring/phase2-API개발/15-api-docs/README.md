# 15. API 문서화

> **한 줄 정의:** 코드에 어노테이션만 달면 API 명세서가 자동 생성되고, 브라우저에서 바로 테스트까지 할 수 있게 해주는 도구

---

## 목차
1. [왜 API 문서화가 필요한가?](#1-왜-api-문서화가-필요한가)
2. [OpenAPI 3.0과 Swagger의 관계](#2-openapi-30과-swagger의-관계)
3. [SpringDoc 설정하기](#3-springdoc-설정하기)
4. [Swagger UI 살펴보기](#4-swagger-ui-살펴보기)
5. [@Operation — API 설명 달기](#5-operation--api-설명-달기)
6. [@Schema — DTO 필드 설명 달기](#6-schema--dto-필드-설명-달기)
7. [@Tag — API 그룹핑](#7-tag--api-그룹핑)
8. [응답 코드 문서화 — @ApiResponse](#8-응답-코드-문서화--apiresponse)
9. [인증 헤더 설정 (JWT 등)](#9-인증-헤더-설정-jwt-등)
10. [API 문서에서 숨기기](#10-api-문서에서-숨기기)
11. [Swagger 트러블슈팅](#11-swagger-트러블슈팅)
12. [실전 예제: 주문 API 문서화](#12-실전-예제-주문-api-문서화)
13. [실습 퀴즈](#13-실습-퀴즈)
14. [면접 대비 한 줄 요약](#14-면접-대비-한-줄-요약)

---

## 1. 왜 API 문서화가 필요한가?

> **한 줄 정의:** 프론트엔드 개발자가 "이 API 어떻게 쓰는 거야?"라고 물어보지 않아도 되게 하는 것

### 문서화 없을 때

```
프론트: "주문 API 주소가 뭐야?"
백엔드: "/api/orders 야"
프론트: "파라미터 뭐 보내야 해?"
백엔드: "잠깐만... 코드 열어볼게"
프론트: "에러 코드는?"
백엔드: "........"
```

### 문서화 있을 때

```
백엔드: "Swagger UI 주소 줄게 → http://localhost:8080/swagger-ui.html"
프론트: (API 목록, 파라미터, 응답 형태, 에러 코드 전부 확인 가능)
프론트: (브라우저에서 바로 테스트까지 가능)
```

### API 문서가 담아야 할 정보

| 항목 | 예시 |
|---|---|
| **URL** | `POST /api/orders` |
| **HTTP Method** | POST, GET, PUT, DELETE |
| **요청 파라미터** | `{ "productId": 1, "quantity": 3 }` |
| **응답 형태** | `{ "status": 200, "data": { ... } }` |
| **에러 코드** | 400: 잘못된 요청, 404: 주문 없음 |
| **인증 필요 여부** | Bearer Token 필요 |

---

## 2. OpenAPI 3.0과 Swagger의 관계

> **한 줄 정의:** OpenAPI는 API를 설명하는 **표준 스펙**, Swagger는 그 스펙을 **보여주는 도구**

### 흔한 혼동 정리

```
OpenAPI 3.0  = API 명세 표준 (JSON/YAML 포맷)
Swagger UI   = OpenAPI 스펙을 예쁘게 보여주는 웹 화면
Swagger Editor = OpenAPI 스펙을 편집하는 도구
SpringDoc    = Spring Boot에서 OpenAPI 스펙을 자동 생성해주는 라이브러리
```

### 비유

```
OpenAPI 3.0 = 악보 (표준 규격)
Swagger UI  = 악보를 보여주는 뷰어
SpringDoc   = 코드를 읽고 악보를 자동으로 써주는 작곡가
```

### Springfox vs SpringDoc

| | Springfox | SpringDoc |
|---|---|---|
| **스펙** | Swagger 2.0 (구버전) | OpenAPI 3.0 (최신) |
| **유지보수** | ❌ 2020년 이후 중단 | ✅ 활발히 유지 |
| **Spring Boot 3** | ❌ 미지원 | ✅ 지원 |
| **결론** | ~~사용 금지~~ | **이것만 쓰면 됨** |

> ⚠️ 구글에 "Spring Swagger" 검색하면 Springfox 글이 많이 나오는데, **전부 무시하고 SpringDoc만 쓰자**

---

## 3. SpringDoc 설정하기

> **한 줄 정의:** 의존성 하나 추가하면 자동으로 API 문서가 생성된다

### Step 1: 의존성 추가

```groovy
// build.gradle
dependencies {
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.6'
}
```

> 이것만 추가하면 끝! 별도 설정 없이 바로 동작한다

### Step 2: 접속 확인

```
Swagger UI  → http://localhost:8080/swagger-ui.html
OpenAPI JSON → http://localhost:8080/v3/api-docs
OpenAPI YAML → http://localhost:8080/v3/api-docs.yaml
```

### Step 3: application.yml 커스터마이징 (선택)

```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui.html          # Swagger UI 경로 (기본값)
    tags-sorter: alpha               # 태그 알파벳 정렬
    operations-sorter: method        # HTTP 메서드별 정렬
  api-docs:
    path: /v3/api-docs               # OpenAPI 스펙 경로 (기본값)
  default-consumes-media-type: application/json
  default-produces-media-type: application/json
```

### Step 4: API 정보 설정 (선택)

```java
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("주문 관리 API")
                        .description("Spring Boot 기반 주문 관리 시스템 API 문서")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("개발팀")
                                .email("dev@example.com")));
    }
}
```

---

## 4. Swagger UI 살펴보기

> **한 줄 정의:** 브라우저에서 API 목록을 보고, 직접 요청을 보내볼 수 있는 인터랙티브 문서

### Swagger UI 구조

```
┌─────────────────────────────────────────────┐
│  주문 관리 API  v1.0.0                       │
│  Spring Boot 기반 주문 관리 시스템 API 문서     │
├─────────────────────────────────────────────┤
│                                             │
│  📦 주문 API (Order)                         │
│  ├── POST   /api/orders        주문 생성     │
│  ├── GET    /api/orders        주문 목록     │
│  ├── GET    /api/orders/{id}   주문 상세     │
│  ├── PUT    /api/orders/{id}   주문 수정     │
│  └── DELETE /api/orders/{id}   주문 삭제     │
│                                             │
│  👤 회원 API (Member)                        │
│  ├── POST   /api/members       회원가입      │
│  └── GET    /api/members/{id}  회원 조회     │
│                                             │
└─────────────────────────────────────────────┘
```

### 각 API를 펼치면

```
┌─────────────────────────────────────────────┐
│  POST /api/orders  — 주문 생성               │
├─────────────────────────────────────────────┤
│                                             │
│  Parameters:  (없음)                         │
│                                             │
│  Request Body:                              │
│  {                                          │
│    "productId": 1,                          │
│    "quantity": 3,                           │
│    "address": "서울시 강남구"                  │
│  }                                          │
│                                             │
│  Responses:                                 │
│    201 Created  → { "id": 1, ... }          │
│    400 Bad Request → { "error": "..." }     │
│                                             │
│  [ Try it out ] ← 클릭하면 직접 테스트 가능!   │
└─────────────────────────────────────────────┘
```

> Swagger UI = **Postman 없이도 API 테스트 가능**

---

## 5. @Operation — API 설명 달기

> **한 줄 정의:** 각 API 엔드포인트에 제목과 설명을 다는 어노테이션

### 기본 사용법

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Operation(
        summary = "주문 생성",                              // 제목 (한 줄)
        description = "새로운 주문을 생성합니다. 상품 ID와 수량이 필수입니다."  // 상세 설명
    )
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody OrderCreateRequest request) {
        // ...
    }

    @Operation(summary = "주문 상세 조회")
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long id) {
        // ...
    }
}
```

### Swagger UI에 보이는 결과

```
POST /api/orders  — 주문 생성
  "새로운 주문을 생성합니다. 상품 ID와 수량이 필수입니다."

GET /api/orders/{id}  — 주문 상세 조회
```

### 파라미터 설명 — @Parameter

```java
@Operation(summary = "주문 목록 조회")
@GetMapping
public ResponseEntity<List<OrderResponse>> getOrders(
        @Parameter(description = "주문 상태 필터", example = "CONFIRMED")
        @RequestParam(required = false) OrderStatus status,

        @Parameter(description = "페이지 번호 (0부터 시작)", example = "0")
        @RequestParam(defaultValue = "0") int page) {
    // ...
}
```

---

## 6. @Schema — DTO 필드 설명 달기

> **한 줄 정의:** DTO의 각 필드에 설명, 예시값, 필수 여부를 명시하는 어노테이션

### 요청 DTO

```java
@Schema(description = "주문 생성 요청")
public record OrderCreateRequest(

        @Schema(description = "상품 ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotNull
        Long productId,

        @Schema(description = "주문 수량", example = "3", minimum = "1")
        @Min(1)
        Integer quantity,

        @Schema(description = "배송 주소", example = "서울시 강남구 테헤란로 123")
        @NotBlank
        String address
) {}
```

### 응답 DTO

```java
@Schema(description = "주문 응답")
public record OrderResponse(

        @Schema(description = "주문 ID", example = "1")
        Long id,

        @Schema(description = "상품명", example = "맥북 프로 16인치")
        String productName,

        @Schema(description = "주문 상태", example = "CONFIRMED", allowableValues = {"PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"})
        String status,

        @Schema(description = "주문 일시", example = "2026-03-12T14:30:00")
        LocalDateTime orderedAt
) {}
```

### Swagger UI에서 보이는 모습

```
OrderCreateRequest {
  productId*    integer($int64)   상품 ID          예시: 1
  quantity*     integer($int32)   주문 수량         예시: 3    최소: 1
  address*      string            배송 주소         예시: 서울시 강남구 테헤란로 123
}
```

> `*` 표시 = 필수 필드 (requiredMode = REQUIRED)

---

## 7. @Tag — API 그룹핑

> **한 줄 정의:** 관련된 API들을 하나의 그룹으로 묶어서 Swagger UI에서 보기 좋게 정리한다

### 사용법

```java
@Tag(name = "주문", description = "주문 관련 API")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    // 이 컨트롤러의 모든 API가 "주문" 그룹에 표시
}

@Tag(name = "회원", description = "회원 관련 API")
@RestController
@RequestMapping("/api/members")
public class MemberController {
    // "회원" 그룹에 표시
}
```

### 결과

```
Swagger UI:

📦 주문 — 주문 관련 API
  ├── POST   /api/orders
  ├── GET    /api/orders
  └── ...

👤 회원 — 회원 관련 API
  ├── POST   /api/members
  └── ...
```

### @Tag 없으면?

```
컨트롤러 클래스명으로 자동 그룹핑됨
→ "order-controller" 이런 식으로 보여서 보기 안 좋음
```

---

## 8. 응답 코드 문서화 — @ApiResponse

> **한 줄 정의:** 각 API가 반환할 수 있는 HTTP 상태 코드와 응답 형태를 명시한다

### 사용법

```java
@Operation(summary = "주문 상세 조회")
@ApiResponses(value = {
    @ApiResponse(
        responseCode = "200",
        description = "조회 성공",
        content = @Content(schema = @Schema(implementation = OrderResponse.class))
    ),
    @ApiResponse(
        responseCode = "404",
        description = "주문을 찾을 수 없음",
        content = @Content(schema = @Schema(implementation = ErrorResponse.class))
    )
})
@GetMapping("/{id}")
public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
    // ...
}
```

### @ExampleObject — 상세 응답 예제 추가

> 실제 JSON 응답이 어떻게 생겼는지 Swagger UI에서 바로 보여줄 수 있다

```java
@io.swagger.v3.oas.annotations.responses.ApiResponse(
    responseCode = "201",
    description = "생성 성공",
    content = @Content(
        mediaType = "application/json",
        examples = @ExampleObject(
            name = "성공 예제",
            value = """
                {
                  "status": 201,
                  "data": {
                    "id": 1,
                    "productName": "맥북 프로",
                    "status": "PENDING",
                    "orderedAt": "2026-03-12T14:30:00"
                  }
                }
                """
        )
    )
)
```

> **팁:** `"string"` 같은 의미 없는 예시 대신 **실제처럼 보이는 값**을 넣어야 프론트 개발자가 이해하기 쉽다

### Swagger UI 결과

```
Responses:
  200  조회 성공      → OrderResponse { id, productName, status, ... }
  404  주문을 찾을 수 없음 → ErrorResponse { code, message }
```

### 주의: Swagger의 @ApiResponse vs 우리의 ApiResponse

```
io.swagger.v3.oas.annotations.responses.ApiResponse  ← Swagger 어노테이션 (문서용)
com.example.common.ApiResponse<T>                     ← 13번에서 만든 공통 응답 DTO

이름이 같지만 완전히 다른 것!
```

> ⚠️ **Java는 import alias를 지원하지 않는다!** Kotlin처럼 `import ... as SwaggerApiResponse` 불가능

### 이름 충돌 해결법 — Fully Qualified Name

```java
// ❌ Java에서는 이렇게 못 함 (Kotlin 문법)
import io.swagger.v3.oas.annotations.responses.ApiResponse as SwaggerApiResponse;

// ✅ Fully Qualified Name으로 직접 써야 함
@io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
    @io.swagger.v3.oas.annotations.responses.ApiResponse(
        responseCode = "200",
        description = "조회 성공"
    ),
    @io.swagger.v3.oas.annotations.responses.ApiResponse(
        responseCode = "404",
        description = "주문을 찾을 수 없음"
    )
})
```

> 실무에서 공통 응답 래퍼(`ApiResponse<T>`)를 쓰면 **반드시** 마주치는 문제. 당황하지 말고 FQN 사용!

---

## 9. 인증 헤더 설정 (JWT 등)

> **한 줄 정의:** Swagger UI에서 JWT 토큰을 입력하면 인증이 필요한 API도 테스트할 수 있다

### SwaggerConfig에 보안 설정 추가

```java
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        // JWT 보안 스킴 정의
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .name("Authorization");

        // 전역 보안 요구사항
        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("BearerAuth");

        return new OpenAPI()
                .info(new Info().title("주문 관리 API").version("v1.0.0"))
                .addSecurityItem(securityRequirement)
                .components(new Components()
                        .addSecuritySchemes("BearerAuth", securityScheme));
    }
}
```

### Swagger UI에서 사용

```
1. 우측 상단 [Authorize 🔒] 버튼 클릭
2. Value에 JWT 토큰 입력 (Bearer 접두사 없이)
3. [Authorize] 클릭
4. 이후 모든 요청에 Authorization: Bearer {token} 헤더가 자동 포함
```

> 이 설정은 Phase 4에서 JWT를 배운 후에 적용하면 됨. 지금은 "이런 게 가능하구나" 정도만!

---

## 10. API 문서에서 숨기기

> **한 줄 정의:** 내부용 API나 관리자 API를 Swagger 문서에서 제외할 수 있다

### 특정 API 숨기기

```java
@Operation(hidden = true)  // Swagger에서 숨김
@GetMapping("/internal/health")
public String healthCheck() {
    return "OK";
}
```

### 특정 컨트롤러 전체 숨기기

```java
@Hidden  // 이 컨트롤러의 모든 API가 Swagger에서 숨겨짐
@RestController
@RequestMapping("/internal")
public class InternalController {
    // ...
}
```

### application.yml로 경로 필터링

```yaml
springdoc:
  paths-to-match:
    - /api/**              # /api/로 시작하는 것만 문서에 포함
  paths-to-exclude:
    - /internal/**         # /internal/은 제외
  packages-to-scan:
    - com.example.controller  # 이 패키지만 스캔
```

---

## 11. Swagger 트러블슈팅

> **한 줄 정의:** Swagger 설정 시 자주 만나는 에러와 해결법

### 문제 1: Swagger UI 접속 안 됨 (404)

```
원인: 의존성이 잘못됨
```

```groovy
// ❌ Spring Boot 3에서 이거 쓰면 안 됨 (구버전)
implementation 'org.springdoc:springdoc-openapi-ui:1.x.x'

// ✅ Spring Boot 3용
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.6'
```

### 문제 2: Spring Security가 Swagger를 막음

```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                // Swagger 경로 허용
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()
                .anyRequest().authenticated()
        );
        return http.build();
    }
}
```

### 문제 3: LocalDateTime이 이상하게 표시됨

```yaml
# application.yml
spring:
  jackson:
    serialization:
      write-dates-as-timestamps: false  # 타임스탬프 대신 ISO 포맷
```

### 문제 4: Enum 값이 안 보임

```java
// @Schema에 allowableValues로 명시
@Schema(description = "주문 상태", allowableValues = {"PENDING", "CONFIRMED", "SHIPPED"})
private OrderStatus status;
```

### 문제 5: 운영 환경에서 Swagger 비활성화

```yaml
# application-prod.yml (운영 프로필)
springdoc:
  api-docs:
    enabled: false        # OpenAPI 스펙 비활성화
  swagger-ui:
    enabled: false        # Swagger UI 비활성화
```

> ⚠️ **운영에서는 반드시 비활성화!** API 명세가 외부에 노출되면 보안 위협이 된다

### 문제 6: Spring Boot & SpringDoc 버전 호환성

```
NoSuchMethodError: 'void org.springframework.web.method.ControllerAdviceBean.<init>...'
```

> Spring Boot 버전에 맞는 SpringDoc 버전을 써야 한다

| Spring Boot | SpringDoc | 상태 |
|---|---|---|
| 3.2.x | 2.3.0 | ✅ 안정 |
| 3.3.x | 2.5.0 | ✅ 안정 |
| 3.4.x | 2.6.0+ | ✅ 권장 |
| 3.5.x (SNAPSHOT) | 2.6.0+ | ⚠️ 테스트 필요 |

```groovy
// 버전 불일치 시 → SpringDoc 최신 버전으로 업그레이드
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.6'
```

### 문제 7: JWT 필터가 Swagger 요청도 가로챔 (401)

```
Swagger UI는 열리는데, "Try it out" 하면 전부 401
→ JWT 필터에서 Swagger 경로를 스킵하지 않아서
```

```java
// JwtAuthenticationFilter에서 Swagger 경로 스킵
@Override
protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getRequestURI();
    return path.startsWith("/swagger-ui")
        || path.startsWith("/v3/api-docs");
}
```

---

## 12. 실전 예제: 주문 API 문서화

> 지금까지 배운 어노테이션을 전부 적용한 실전 코드

### Controller

```java
@Tag(name = "주문", description = "주문 CRUD API")
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "주문 생성", description = "새로운 주문을 생성합니다")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "생성 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청",
                content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody OrderCreateRequest request) {

        OrderResponse response = orderService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response));
    }

    @Operation(summary = "주문 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrders(
            @Parameter(description = "주문 상태 필터")
            @RequestParam(required = false) OrderStatus status) {

        List<OrderResponse> responses = orderService.findAll(status);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    @Operation(summary = "주문 상세 조회")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "조회 성공"),
        @ApiResponse(responseCode = "404", description = "주문을 찾을 수 없음")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(
            @Parameter(description = "주문 ID", example = "1")
            @PathVariable Long id) {

        OrderResponse response = orderService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
```

### application.yml 실전 설정 (복붙용)

```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha               # 태그(그룹) 알파벳 정렬
    operations-sorter: method        # HTTP 메서드별 정렬 (DELETE → GET → POST → PUT)
    display-request-duration: true   # API 호출 소요 시간 표시
    disable-swagger-default-url: true # 샘플 URL 제거
  api-docs:
    path: /v3/api-docs
  packages-to-scan: com.example      # 내 패키지만 스캔
  show-actuator: false               # Actuator 엔드포인트 문서에서 제외
```

### 어노테이션 요약 — 어디에 뭘 쓰나?

| 어노테이션 | 위치 | 역할 |
|---|---|---|
| `@Tag` | 클래스 | API 그룹 이름 |
| `@Operation` | 메서드 | API 제목/설명 |
| `@ApiResponse` | 메서드 | 응답 코드별 설명 |
| `@Parameter` | 파라미터 | 파라미터 설명/예시 |
| `@Schema` | DTO 필드 | 필드 설명/예시/제약조건 |
| `@Hidden` | 클래스/메서드 | 문서에서 숨기기 |

---

## 13. 실습 퀴즈

### Q1. Springfox 대신 SpringDoc을 써야 하는 이유는?

<details>
<summary>정답 보기</summary>

- Springfox는 2020년 이후 유지보수가 중단됨
- Spring Boot 3을 지원하지 않음
- SpringDoc은 OpenAPI 3.0 표준을 지원하고, 활발히 유지보수되고 있음

</details>

### Q2. 운영 환경에서 Swagger를 비활성화해야 하는 이유는?

<details>
<summary>정답 보기</summary>

API 명세가 외부에 노출되면 공격자가 엔드포인트, 파라미터 구조, 에러 형태 등을 파악할 수 있어 보안 위협이 된다. `application-prod.yml`에서 `springdoc.api-docs.enabled: false`로 비활성화한다.

</details>

### Q3. @Schema와 @Operation의 차이는?

<details>
<summary>정답 보기</summary>

- `@Operation` — Controller 메서드에 붙여서 **API 자체**를 설명 (제목, 설명)
- `@Schema` — DTO 필드에 붙여서 **데이터 구조**를 설명 (필드명, 예시, 타입)

</details>

---

## 14. 면접 대비 한 줄 요약

| 키워드 | 한 줄 요약 |
|---|---|
| **OpenAPI 3.0** | REST API를 설명하는 표준 스펙으로, JSON/YAML 형태로 API 명세를 정의한다 |
| **Swagger UI** | OpenAPI 스펙을 시각화하고 브라우저에서 API를 테스트할 수 있는 웹 도구이다 |
| **SpringDoc** | Spring Boot에서 코드 기반으로 OpenAPI 스펙을 자동 생성해주는 라이브러리이다 |
| **Springfox** | 유지보수 중단된 구버전 라이브러리로, Spring Boot 3에서는 사용할 수 없다 |
| **@Operation** | Controller 메서드에 붙여서 API의 제목과 설명을 명시한다 |
| **@Schema** | DTO 필드에 붙여서 데이터 구조의 설명, 예시값, 제약조건을 명시한다 |
| **@Tag** | 관련 API를 그룹핑하여 Swagger UI에서 보기 좋게 정리한다 |
| **@ApiResponse** | API가 반환할 수 있는 HTTP 상태 코드와 응답 구조를 문서화한다 |
| **@Hidden** | 내부용 API를 Swagger 문서에서 제외할 때 사용한다 |
| **운영 비활성화** | 보안을 위해 운영 환경에서는 반드시 Swagger를 비활성화해야 한다 |
| **@ExampleObject** | 실제 JSON 응답 예제를 Swagger UI에 직접 보여줄 수 있다 |
| **이름 충돌 (FQN)** | 프로젝트의 ApiResponse와 Swagger의 @ApiResponse가 충돌하면 Fully Qualified Name으로 해결한다 |
| **버전 호환성** | Spring Boot 버전에 맞는 SpringDoc 버전을 사용해야 하며, 불일치 시 NoSuchMethodError가 발생한다 |
