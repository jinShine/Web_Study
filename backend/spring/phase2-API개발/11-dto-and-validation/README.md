# 11. DTO와 Validation

> **한 줄 정의:** 클라이언트가 보낸 데이터를 DTO로 받고, 유효성 검증(@Valid)으로 잘못된 데이터를 서버에 들어오기 전에 차단한다

---

## 목차
1. [DTO가 왜 필요한가?](#1-dto가-왜-필요한가)
2. [DTO 설계 원칙](#2-dto-설계-원칙)
3. [Request DTO vs Response DTO](#3-request-dto-vs-response-dto)
4. [Validation 기초 — 왜 서버에서도 검증하나?](#4-validation-기초--왜-서버에서도-검증하나)
5. [Bean Validation 설정](#5-bean-validation-설정)
6. [핵심 검증 어노테이션 총정리](#6-핵심-검증-어노테이션-총정리)
7. [@Valid 사용법](#7-valid-사용법)
8. [검증 실패 시 에러 응답 처리](#8-검증-실패-시-에러-응답-처리)
9. [중첩 객체 검증 (@Valid 전파)](#9-중첩-객체-검증-valid-전파)
10. [커스텀 Validator 만들기](#10-커스텀-validator-만들기)
11. [실전 예제: 회원가입 API](#11-실전-예제-회원가입-api)
12. [DTO 변환 위치 — 어디서 하나?](#12-dto-변환-위치--어디서-하나)
13. [면접 대비 한 줄 요약](#13-면접-대비-한-줄-요약)

---

## 1. DTO가 왜 필요한가?

> **한 줄 정의:** Entity를 직접 노출하면 위험하다. DTO로 필요한 데이터만 주고받는다.

### Entity를 그대로 쓰면 생기는 문제

```java
// Entity — DB 테이블과 1:1 매핑
@Getter
@Entity
public class User {
    @Id
    private Long id;
    private String name;
    private String email;
    private String password;      // 🚨 비밀번호!
    private String role;          // 🚨 권한! (ADMIN/USER)
    private LocalDateTime createdAt;
    private boolean deleted;      // 🚨 내부 플래그!
}
```

```java
// ❌ Entity를 직접 반환하면?
@GetMapping("/api/users/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id);
}

// 응답:
// {
//     "id": 1,
//     "name": "Kim",
//     "email": "kim@email.com",
//     "password": "$2a$10$xK3f...",   ← 🚨 비밀번호 노출!
//     "role": "ADMIN",                 ← 🚨 권한 정보 노출!
//     "deleted": false,                ← 🚨 내부 정보 노출!
//     "createdAt": "2026-03-08T..."
// }
```

```java
// ❌ Entity를 직접 요청으로 받으면?
@PostMapping("/api/users")
public User createUser(@RequestBody User user) {
    return userRepository.save(user);
}

// 클라이언트가 이렇게 보내면?
// { "name": "해커", "role": "ADMIN" }   ← 🚨 권한 조작!
// { "id": 999, "name": "Kim" }          ← 🚨 ID 조작!
```

### DTO를 쓰면 해결

```
Client ←→ Controller ←→ Service ←→ Repository ←→ DB
        ↕               ↕
     DTO (필요한       Entity (전체
      것만 포함)        데이터)

→ 클라이언트는 Entity를 절대 직접 만지지 못한다!
```

---

## 2. DTO 설계 원칙

> **한 줄 정의:** 각 API 용도에 맞는 DTO를 따로 만든다

### 원칙 1: 용도별로 분리

```java
// ❌ 하나의 DTO로 모든 걸 처리
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    // 생성할 때도, 응답할 때도, 수정할 때도 이걸 쓰면?
    // → password가 응답에 포함될 수 있음!
}

// ✅ 용도별 DTO 분리
public class UserCreateRequest { ... }   // 생성 요청
public class UserUpdateRequest { ... }   // 수정 요청
public class UserResponse { ... }        // 응답
public class UserListResponse { ... }    // 목록 응답 (간략 정보)
```

### 원칙 2: DTO는 최소한의 데이터만

```java
// 생성 요청 — 클라이언트가 보내야 하는 것만
@Getter
@NoArgsConstructor
public class UserCreateRequest {
    private String name;       // ✅ 필요
    private String email;      // ✅ 필요
    private String password;   // ✅ 필요
    // id?        → 서버가 생성 (❌ 불필요)
    // createdAt? → 서버가 생성 (❌ 불필요)
    // role?      → 서버가 기본값 부여 (❌ 불필요)
}

// 응답 — 클라이언트가 봐야 하는 것만
@Getter
@Builder
public class UserResponse {
    private Long id;           // ✅ 필요
    private String name;       // ✅ 필요
    private String email;      // ✅ 필요
    // password?  → 절대 노출 금지 (❌)
    // deleted?   → 내부 정보 (❌)
}
```

### 원칙 3: 네이밍 컨벤션

| 용도 | 네이밍 패턴 | 예시 |
|---|---|---|
| 생성 요청 | `~CreateRequest` | `UserCreateRequest` |
| 수정 요청 | `~UpdateRequest` | `UserUpdateRequest` |
| 응답 | `~Response` | `UserResponse` |
| 목록 응답 | `~ListResponse` 또는 `~Summary` | `UserListResponse` |
| 검색 조건 | `~SearchCondition` | `UserSearchCondition` |

---

## 3. Request DTO vs Response DTO

### Request DTO — Lombok 추천 조합

```java
@Getter
@NoArgsConstructor   // Jackson 역직렬화용
public class UserCreateRequest {
    private String name;
    private String email;
    private String password;
}

// 왜 이 조합인가?
// @Getter     → Jackson이 직렬화할 때 필요
// @NoArgs     → Jackson이 객체 생성할 때 필요
// @Setter 없음 → Jackson은 리플렉션으로 값 주입 가능, Setter 불필요
```

### Response DTO — Lombok 추천 조합

```java
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;

    // Entity → Response 변환 메서드
    public static UserResponse from(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .createdAt(user.getCreatedAt())
            .build();
    }
}

// 왜 이 조합인가?
// @Getter  → Jackson이 JSON으로 변환할 때 필요
// @Builder → Service에서 깔끔하게 생성
// from()   → Entity→DTO 변환을 DTO 안에 캡슐화
```

### 한눈에 비교

| 비교 | Request DTO | Response DTO |
|---|---|---|
| 데이터 흐름 | 클라이언트 → 서버 | 서버 → 클라이언트 |
| Lombok | `@Getter` `@NoArgsConstructor` | `@Getter` `@Builder` |
| 변환 | Controller에서 자동 (Jackson) | `from()` 메서드로 Entity→DTO |
| 검증 | ✅ Validation 어노테이션 적용 | ❌ 검증 불필요 |

---

## 4. Validation 기초 — 왜 서버에서도 검증하나?

> **한 줄 정의:** 프론트에서 검증해도 서버에서 반드시 다시 검증해야 한다

### 프론트 검증만으로 부족한 이유

```
클라이언트 검증 (JavaScript):
├─ 브라우저에서 disabled → 개발자 도구로 풀 수 있음
├─ 프론트 코드 → 누구나 볼 수 있음
├─ Postman/curl → 프론트를 거치지 않고 직접 API 호출 가능
└─ 결론: 프론트 검증은 "사용자 편의"일 뿐, "보안"이 아님

서버 검증 (Spring Validation):
├─ 어떤 클라이언트가 보내든 반드시 통과해야 함
├─ 코드가 서버에 있으므로 조작 불가
└─ 결론: 서버 검증이 "진짜 방어선"
```

### 검증 없이 받으면?

```java
// ❌ 검증 없는 API
@PostMapping("/api/users")
public UserResponse createUser(@RequestBody UserCreateRequest request) {
    return userService.createUser(request);
}

// 이런 요청이 올 수 있다:
// { "name": "", "email": "이건이메일이아닌데", "password": "1" }
// { "name": null }
// { }  ← 빈 JSON

// → NullPointerException, 잘못된 데이터가 DB에 저장됨!
```

---

## 5. Bean Validation 설정

### 의존성 추가

```groovy
// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-validation'
}
```

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

> ⚠️ Spring Boot 2.3 이전에는 `spring-boot-starter-web`에 포함되어 있었지만, **2.3 이후부터 별도 추가 필요!**

---

## 6. 핵심 검증 어노테이션 총정리

### 필수값 검증

| 어노테이션 | 대상 | 설명 | 예시 |
|---|---|---|---|
| `@NotNull` | 모든 타입 | null 불가 (빈 문자열 허용) | `Integer age` |
| `@NotEmpty` | String, Collection | null + 빈 값 불가 (`""` 불가) | `List<String> tags` |
| `@NotBlank` | String | null + 빈 값 + 공백만 불가 | `String name` |

### 차이점 비교 — 가장 자주 헷갈리는 부분!

```java
// 입력값에 따른 검증 결과

                    @NotNull    @NotEmpty   @NotBlank
null                  ❌           ❌          ❌
""  (빈 문자열)        ✅           ❌          ❌
"   " (공백만)         ✅           ✅          ❌
"Kim" (정상)           ✅           ✅          ✅

// 결론:
// 문자열에는 @NotBlank를 쓰자! (가장 엄격)
// 숫자/객체에는 @NotNull을 쓰자!
```

### 크기/길이 검증

| 어노테이션 | 설명 | 예시 |
|---|---|---|
| `@Size(min=, max=)` | 문자열 길이, 컬렉션 크기 | `@Size(min=2, max=20) String name` |
| `@Min(value)` | 숫자 최솟값 | `@Min(0) int price` |
| `@Max(value)` | 숫자 최댓값 | `@Max(100) int quantity` |

### 형식 검증

| 어노테이션 | 설명 | 예시 |
|---|---|---|
| `@Email` | 이메일 형식 | `@Email String email` |
| `@Pattern(regexp=)` | 정규식 매칭 | `@Pattern(regexp="^010-\\d{4}-\\d{4}$") String phone` |

### 범위/기타 검증

| 어노테이션 | 설명 | 예시 |
|---|---|---|
| `@Positive` | 양수만 | `@Positive int price` |
| `@PositiveOrZero` | 0 이상 | `@PositiveOrZero int stock` |
| `@Past` | 과거 날짜만 | `@Past LocalDate birthDate` |
| `@Future` | 미래 날짜만 | `@Future LocalDate dueDate` |

---

## 7. @Valid 사용법

> **한 줄 정의:** Controller 파라미터에 `@Valid`를 붙이면 DTO의 검증 어노테이션이 동작한다

### Step 1: DTO에 검증 어노테이션 붙이기

```java
@Getter
@NoArgsConstructor
public class UserCreateRequest {

    @NotBlank(message = "이름은 필수입니다")
    @Size(min = 2, max = 20, message = "이름은 2~20자 사이여야 합니다")
    private String name;

    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다")
    @Size(min = 8, max = 100, message = "비밀번호는 8자 이상이어야 합니다")
    private String password;

    @Min(value = 1, message = "나이는 1세 이상이어야 합니다")
    @Max(value = 150, message = "나이는 150세 이하여야 합니다")
    private int age;
}
```

### Step 2: Controller에서 @Valid 붙이기

```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
        @RequestBody @Valid UserCreateRequest request  // ← @Valid 추가!
    ) {
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
```

### 동작 흐름

```
Client: POST /api/users
Body: { "name": "", "email": "abc", "password": "1", "age": -5 }

1. Jackson이 JSON → UserCreateRequest 변환
2. @Valid가 검증 어노테이션 실행
3. 검증 실패 → MethodArgumentNotValidException 발생!
4. Controller 메서드가 실행되지 않음! (Service도 안 탐)
5. Spring이 자동으로 400 Bad Request 응답

→ 잘못된 데이터가 Service/Repository까지 도달하지 못한다!
```

---

## 8. 검증 실패 시 에러 응답 처리

### Spring 기본 에러 응답 (별로)

```json
// @Valid 검증 실패 시 Spring 기본 응답 — 너무 복잡하고 불친절
{
    "timestamp": "2026-03-08T10:30:00",
    "status": 400,
    "error": "Bad Request",
    "path": "/api/users"
}
```

### 커스텀 에러 응답 (06번에서 배운 @RestControllerAdvice 활용!)

```java
// ValidationErrorResponse.java — 검증 에러 전용 응답 형태
@Getter
@Builder
public class ValidationErrorResponse {
    private int status;
    private String message;
    private List<FieldError> errors;

    @Getter
    @Builder
    public static class FieldError {
        private String field;       // 어떤 필드가 실패했는지
        private String value;       // 어떤 값을 보냈는지
        private String reason;      // 왜 실패했는지
    }
}
```

```java
// GlobalExceptionHandler.java — 검증 에러 핸들러 추가
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // @Valid 검증 실패 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
        MethodArgumentNotValidException e
    ) {
        List<ValidationErrorResponse.FieldError> fieldErrors = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> ValidationErrorResponse.FieldError.builder()
                .field(error.getField())
                .value(error.getRejectedValue() != null
                    ? error.getRejectedValue().toString() : "null")
                .reason(error.getDefaultMessage())
                .build()
            )
            .toList();

        ValidationErrorResponse response = ValidationErrorResponse.builder()
            .status(400)
            .message("입력값 검증에 실패했습니다")
            .errors(fieldErrors)
            .build();

        log.warn("Validation 실패: {}", fieldErrors);
        return ResponseEntity.badRequest().body(response);
    }
}
```

### 커스텀 에러 응답 결과

```json
// POST /api/users
// Body: { "name": "", "email": "abc", "password": "1", "age": -5 }

// 응답: 400 Bad Request
{
    "status": 400,
    "message": "입력값 검증에 실패했습니다",
    "errors": [
        {
            "field": "name",
            "value": "",
            "reason": "이름은 필수입니다"
        },
        {
            "field": "email",
            "value": "abc",
            "reason": "올바른 이메일 형식이 아닙니다"
        },
        {
            "field": "password",
            "value": "1",
            "reason": "비밀번호는 8자 이상이어야 합니다"
        },
        {
            "field": "age",
            "value": "-5",
            "reason": "나이는 1세 이상이어야 합니다"
        }
    ]
}
```

> 💡 **프론트엔드 개발자가 이 응답을 보고 어떤 필드가 왜 실패했는지 바로 알 수 있다!**

---

## 9. 중첩 객체 검증 (@Valid 전파)

> **한 줄 정의:** DTO 안에 또 다른 DTO가 있으면, 내부 객체에도 `@Valid`를 붙여야 검증이 전파된다

### 예시: 주문 생성 요청

```java
@Getter
@NoArgsConstructor
public class OrderCreateRequest {

    @NotBlank(message = "주문자 이름은 필수입니다")
    private String ordererName;

    @Valid  // ← 이게 없으면 Address 내부 검증이 동작하지 않음!
    @NotNull(message = "배송 주소는 필수입니다")
    private Address address;

    @Valid
    @NotEmpty(message = "주문 상품은 1개 이상이어야 합니다")
    private List<OrderItem> items;
}

// 중첩 DTO — 주소
@Getter
@NoArgsConstructor
public class Address {

    @NotBlank(message = "도시는 필수입니다")
    private String city;

    @NotBlank(message = "상세 주소는 필수입니다")
    private String detail;

    @NotBlank(message = "우편번호는 필수입니다")
    @Pattern(regexp = "^\\d{5}$", message = "우편번호는 5자리 숫자입니다")
    private String zipCode;
}

// 중첩 DTO — 주문 상품
@Getter
@NoArgsConstructor
public class OrderItem {

    @NotNull(message = "상품 ID는 필수입니다")
    private Long productId;

    @Positive(message = "수량은 1개 이상이어야 합니다")
    private int quantity;
}
```

### 핵심 포인트

```
@Valid를 안 붙이면?
OrderCreateRequest의 address 필드는 @NotNull만 검사
→ address 내부의 city, detail, zipCode 검증은 안 됨!
→ { "address": { "city": "" } } 가 통과해버림!

@Valid를 붙이면?
address 내부의 @NotBlank, @Pattern까지 전부 검증!
→ city가 비어있으면 400 에러!
```

---

## 10. 커스텀 Validator 만들기

> **한 줄 정의:** 기본 어노테이션으로 부족할 때, 직접 검증 로직을 만든다

### 예시: 비속어 필터 검증

#### Step 1: 커스텀 어노테이션 정의

```java
@Target(ElementType.FIELD)           // 필드에 붙이는 어노테이션
@Retention(RetentionPolicy.RUNTIME)  // 런타임에 동작
@Constraint(validatedBy = NoBadWordValidator.class)  // 검증 로직 클래스 지정
public @interface NoBadWord {
    String message() default "부적절한 단어가 포함되어 있습니다";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

#### Step 2: 검증 로직 구현

```java
public class NoBadWordValidator implements ConstraintValidator<NoBadWord, String> {

    private static final List<String> BAD_WORDS = List.of("바보", "멍청이", "나쁜말");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;  // null 체크는 @NotBlank에게 맡김
        }
        return BAD_WORDS.stream()
            .noneMatch(value::contains);
    }
}
```

#### Step 3: 사용

```java
@Getter
@NoArgsConstructor
public class PostCreateRequest {

    @NotBlank(message = "제목은 필수입니다")
    @Size(max = 100, message = "제목은 100자 이하여야 합니다")
    @NoBadWord  // ← 커스텀 검증 적용!
    private String title;

    @NotBlank(message = "내용은 필수입니다")
    @NoBadWord  // ← 내용에도 적용
    private String content;
}
```

### 언제 커스텀 Validator가 필요한가?

| 상황 | 기본 어노테이션 | 커스텀 필요 |
|---|---|---|
| null / 빈 값 체크 | `@NotBlank` | ❌ |
| 이메일 형식 | `@Email` | ❌ |
| 비속어 필터 | ❌ 없음 | ✅ |
| 비밀번호 복잡도 (대/소/숫자/특수) | `@Pattern`으로 가능하지만 복잡 | ✅ 추천 |
| 두 필드 비교 (비밀번호 확인) | ❌ 없음 | ✅ |
| DB 중복 체크 (이메일 중복) | ❌ 없음 | ✅ (또는 Service에서 처리) |

---

## 11. 실전 예제: 회원가입 API

> 지금까지 배운 DTO + Validation + Lombok + 계층 구조를 모두 적용한 예제

### 패키지 구조

```
com.example.demo
├── controller/
│   └── UserController.java
├── service/
│   └── UserService.java
├── repository/
│   └── UserRepository.java
├── dto/
│   ├── UserCreateRequest.java
│   └── UserResponse.java
├── entity/
│   └── User.java
└── exception/
    ├── GlobalExceptionHandler.java
    └── DuplicateEmailException.java
```

### Entity

```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String name;
    private String email;
    private String password;
    private int age;
    private LocalDateTime createdAt;
}
```

### Request DTO (검증 포함)

```java
@Getter
@NoArgsConstructor
public class UserCreateRequest {

    @NotBlank(message = "이름은 필수입니다")
    @Size(min = 2, max = 20, message = "이름은 2~20자 사이여야 합니다")
    private String name;

    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다")
    @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다")
    private String password;

    @Min(value = 1, message = "나이는 1세 이상이어야 합니다")
    @Max(value = 150, message = "나이는 150세 이하여야 합니다")
    private int age;

    // DTO → Entity 변환 메서드
    public User toEntity() {
        return User.builder()
            .name(this.name)
            .email(this.email)
            .password(this.password)  // 실무에서는 암호화 필요!
            .age(this.age)
            .createdAt(LocalDateTime.now())
            .build();
    }
}
```

### Response DTO

```java
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private int age;
    private LocalDateTime createdAt;
    // password는 절대 포함하지 않음!

    public static UserResponse from(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .age(user.getAge())
            .createdAt(user.getCreatedAt())
            .build();
    }
}
```

### Repository

```java
@Repository
public class UserRepository {

    private final Map<Long, User> store = new HashMap<>();
    private Long sequence = 0L;

    public User save(User user) {
        Long id = ++sequence;
        User saved = User.builder()
            .id(id)
            .name(user.getName())
            .email(user.getEmail())
            .password(user.getPassword())
            .age(user.getAge())
            .createdAt(user.getCreatedAt())
            .build();
        store.put(id, saved);
        return saved;
    }

    public Optional<User> findByEmail(String email) {
        return store.values().stream()
            .filter(user -> user.getEmail().equals(email))
            .findFirst();
    }

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }
}
```

### Service

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse createUser(UserCreateRequest request) {
        // 이메일 중복 체크 (비즈니스 검증)
        userRepository.findByEmail(request.getEmail())
            .ifPresent(user -> {
                throw new DuplicateEmailException(request.getEmail());
            });

        // DTO → Entity 변환 → 저장
        User user = request.toEntity();
        User saved = userRepository.save(user);

        log.info("회원가입 완료: id={}, name={}", saved.getId(), saved.getName());

        // Entity → Response DTO 변환
        return UserResponse.from(saved);
    }
}
```

### Controller

```java
@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
        @RequestBody @Valid UserCreateRequest request
    ) {
        log.info("회원가입 요청: email={}", request.getEmail());
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
```

### Exception

```java
public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String email) {
        super("이미 사용 중인 이메일입니다: " + email);
    }
}
```

### 전체 흐름 정리

```
POST /api/users
Body: { "name": "Kim", "email": "kim@email.com", "password": "12345678", "age": 25 }

1. [Controller] Jackson이 JSON → UserCreateRequest 변환
2. [Controller] @Valid → @NotBlank, @Email, @Size, @Min, @Max 검증
   ├─ 성공 → 다음 단계
   └─ 실패 → 400 Bad Request (GlobalExceptionHandler가 처리)
3. [Service] 이메일 중복 체크 (비즈니스 검증)
   ├─ 중복 아님 → 다음 단계
   └─ 중복 → 409 Conflict (DuplicateEmailException)
4. [Service] DTO → Entity 변환 (request.toEntity())
5. [Repository] Entity 저장
6. [Service] Entity → Response DTO 변환 (UserResponse.from())
7. [Controller] 201 Created + UserResponse 반환

→ 검증: @Valid(형식) → Service(비즈니스) 이중 방어!
```

---

## 12. DTO 변환 위치 — 어디서 하나?

> **한 줄 정의:** DTO↔Entity 변환은 Service 계층에서 한다

### 변환 흐름

```
Controller                Service                    Repository
    │                        │                           │
    │  RequestDTO             │                           │
    │──────────────────────→  │                           │
    │                        │  DTO → Entity              │
    │                        │  (request.toEntity())      │
    │                        │                           │
    │                        │  Entity                    │
    │                        │──────────────────────────→ │
    │                        │                           │  save/find
    │                        │  Entity                    │
    │                        │←────────────────────────── │
    │                        │                           │
    │                        │  Entity → DTO              │
    │                        │  (Response.from(entity))   │
    │  ResponseDTO            │                           │
    │←──────────────────────  │                           │
```

### 변환 메서드를 어디에 둘까?

```java
// 방법 1: DTO 안에 static 메서드 (추천 ✅)
public class UserResponse {
    public static UserResponse from(User user) { ... }
}

public class UserCreateRequest {
    public User toEntity() { ... }
}

// 방법 2: Service에서 직접 변환
@Service
public class UserService {
    public UserResponse createUser(UserCreateRequest request) {
        User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .build();
        // ...
    }
}

// 방법 3: 별도 Mapper 클래스 (12번 MapStruct에서 배움)
```

| 방법 | 장점 | 단점 |
|---|---|---|
| **DTO에 from()/toEntity()** | 변환 로직이 DTO에 캡슐화, 간단 | DTO가 Entity를 알아야 함 |
| Service에서 직접 | 명시적 | Service가 길어짐 |
| MapStruct | 자동 생성, 코드 없음 | 학습 비용, 설정 필요 |

> 💡 지금은 **방법 1(DTO에 메서드)**로 연습하고, 나중에 MapStruct를 배우면 자동화한다!

---

## 13. 면접 대비 한 줄 요약

| 질문 | 답변 |
|---|---|
| DTO란? | 계층 간 데이터 전송 전용 객체, Entity 노출 방지 및 API 스펙 분리 |
| Entity를 직접 반환하면? | 비밀번호 등 민감 정보 노출, API 스펙과 DB 스키마 결합, 필드 조작 위험 |
| @NotNull vs @NotEmpty vs @NotBlank? | NotNull: null만 체크, NotEmpty: +빈 값, NotBlank: +공백만 — 문자열에는 @NotBlank 사용 |
| @Valid는 어디에 붙이나? | Controller 파라미터의 @RequestBody 앞에 붙여서 DTO 검증 활성화 |
| @Valid 검증 실패 시? | MethodArgumentNotValidException 발생, @RestControllerAdvice에서 처리 |
| 프론트에서 검증하면 서버는 안 해도 되나? | 절대 안 됨. 프론트 검증은 우회 가능, 서버 검증이 진짜 방어선 |
| 중첩 객체 검증은? | 내부 DTO 필드에 @Valid를 붙여야 검증이 전파됨 |
| DTO 변환은 어디서? | Service 계층에서 수행, DTO에 from()/toEntity() 메서드를 두는 패턴이 일반적 |
| Request DTO와 Response DTO를 왜 분리? | 요청에는 password가 필요하지만 응답에는 포함하면 안 됨 — 용도가 다르면 DTO도 다르게 |
| 커스텀 Validator는 언제? | 비속어 필터, 비밀번호 복잡도, 두 필드 비교 등 기본 어노테이션으로 부족할 때 |

---

## 14. 실습 퀴즈

> 오늘 배운 내용을 직접 코드로 확인해보자!

### 퀴즈 1: 어떤 어노테이션을 써야 할까?

아래 DTO의 각 필드에 적절한 검증 어노테이션을 채워보세요.

```java
@Getter
@NoArgsConstructor
public class ProductCreateRequest {

    // TODO: 상품명 — 필수, 1~50자
    private String name;

    // TODO: 가격 — 0보다 커야 함
    private int price;

    // TODO: 설명 — 선택사항 (비어있어도 OK), 최대 500자
    private String description;

    // TODO: 카테고리 — 필수, 빈 문자열 불가
    private String category;
}
```

<details>
<summary>💡 정답 보기</summary>

```java
@Getter
@NoArgsConstructor
public class ProductCreateRequest {

    @NotBlank(message = "상품명은 필수입니다")
    @Size(min = 1, max = 50, message = "상품명은 1~50자 사이여야 합니다")
    private String name;

    @Positive(message = "가격은 0보다 커야 합니다")
    private int price;

    @Size(max = 500, message = "설명은 500자 이하여야 합니다")
    private String description;
    // 선택사항이니까 @NotBlank 안 붙임!

    @NotBlank(message = "카테고리는 필수입니다")
    private String category;
}
```

**포인트:**
- `description`은 선택이라 `@NotBlank` 없이 `@Size(max=)`만 적용
- 가격은 숫자라서 `@NotBlank` 대신 `@Positive` 사용
- 문자열 필수값에는 항상 `@NotBlank`

</details>

---

### 퀴즈 2: 이 코드의 문제점을 찾아라

```java
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @PostMapping
    public Product createProduct(@RequestBody ProductCreateRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        return productRepository.save(product);
    }
}
```

**문제점을 3개 이상 찾아보세요!**

<details>
<summary>💡 정답 보기</summary>

```
문제 1: @Valid가 없다
└─ ProductCreateRequest에 검증 어노테이션이 있어도 동작 안 함!

문제 2: Controller가 Repository를 직접 호출
└─ Service 계층을 건너뜀 — Layered Architecture 위반! (09번)

문제 3: Entity(Product)를 직접 반환
└─ 내부 필드 전부 노출 — Response DTO를 써야 함!

문제 4: Entity에 @Setter 사용
└─ product.setName() — Builder나 생성자를 써야 함 (10번)

문제 5: ResponseEntity 미사용
└─ 201 Created 상태 코드를 반환해야 하는데 200으로 나감
```

**수정 버전:**
```java
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;  // ✅ Service 사용

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
        @RequestBody @Valid ProductCreateRequest request  // ✅ @Valid 추가
    ) {
        ProductResponse response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);  // ✅ 201
    }
}
```

</details>

---

### 퀴즈 3: @NotNull vs @NotEmpty vs @NotBlank

아래 입력값이 각각 통과(✅)인지 실패(❌)인지 채워보세요.

```
입력값               @NotNull    @NotEmpty    @NotBlank
──────────────────────────────────────────────────────
null                  (  )        (  )         (  )
""                    (  )        (  )         (  )
"   "                 (  )        (  )         (  )
"hello"               (  )        (  )         (  )
```

<details>
<summary>💡 정답 보기</summary>

```
입력값               @NotNull    @NotEmpty    @NotBlank
──────────────────────────────────────────────────────
null                  ❌           ❌           ❌
""                    ✅           ❌           ❌
"   "                 ✅           ✅           ❌
"hello"               ✅           ✅           ✅
```

**기억법:** `@NotBlank`가 가장 엄격! 문자열에는 항상 `@NotBlank`를 쓰자.

</details>

---

### 퀴즈 4: 직접 만들어보기 (도전!)

**미션:** 블로그 게시글 작성 API의 Request DTO를 직접 만들어보세요.

요구사항:
- `title`: 필수, 2~100자
- `content`: 필수, 10자 이상
- `author`: 필수, 이메일 형식
- `tags`: 선택, 있으면 최대 5개까지

```java
@Getter
@NoArgsConstructor
public class PostCreateRequest {
    // 여기에 필드 + 검증 어노테이션을 직접 작성해보세요!
}
```

<details>
<summary>💡 정답 예시</summary>

```java
@Getter
@NoArgsConstructor
public class PostCreateRequest {

    @NotBlank(message = "제목은 필수입니다")
    @Size(min = 2, max = 100, message = "제목은 2~100자 사이여야 합니다")
    private String title;

    @NotBlank(message = "내용은 필수입니다")
    @Size(min = 10, message = "내용은 10자 이상이어야 합니다")
    private String content;

    @NotBlank(message = "작성자 이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String author;

    @Size(max = 5, message = "태그는 최대 5개까지 가능합니다")
    private List<String> tags;
    // 선택이라 @NotEmpty 안 붙임!
    // @Size는 Collection에도 사용 가능 — 리스트 크기 제한
}
```

</details>

---

## 다음 수업 예고

> **12. MapStruct — 객체 매핑 자동화** — @Mapper, @Mapping, Entity↔DTO 자동 변환
>
> 💡 이번에 from(), toEntity()를 직접 다 쳤는데... MapStruct를 쓰면 인터페이스만 만들면 자동으로 변환 코드가 생긴다!
