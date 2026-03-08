# 10. Lombok 활용

> **한 줄 정의:** 반복적인 보일러플레이트 코드(Getter, Setter, 생성자 등)를 어노테이션 하나로 자동 생성해주는 라이브러리

---

## 목차
1. [Lombok이 왜 필요한가?](#1-lombok이-왜-필요한가)
2. [설치 방법](#2-설치-방법)
3. [@Getter / @Setter](#3-getter--setter)
4. [@NoArgsConstructor / @AllArgsConstructor](#4-noargsconstructor--allargsconstructor)
5. [@RequiredArgsConstructor — DI의 베스트 프렌드](#5-requiredargsconstructor--di의-베스트-프렌드)
6. [@Builder — 객체 생성의 끝판왕](#6-builder--객체-생성의-끝판왕)
7. [@Data — 만능? 주의!](#7-data--만능-주의)
8. [@ToString / @EqualsAndHashCode](#8-tostring--equalsandhashcode)
9. [@Slf4j — 로깅 간소화](#9-slf4j--로깅-간소화)
10. [실전: Lombok 적용 Before & After](#10-실전-lombok-적용-before--after)
11. [Lombok 주의사항과 안티패턴](#11-lombok-주의사항과-안티패턴)
12. [실무 추천 조합](#12-실무-추천-조합)
13. [면접 대비 한 줄 요약](#13-면접-대비-한-줄-요약)

---

## 1. Lombok이 왜 필요한가?

> **한 줄 정의:** Java는 보일러플레이트가 너무 많다. Lombok이 대신 써준다.

### 09번 실전 예제를 돌아보면...

```java
// 09번에서 만든 Bookmark Entity — 필드 4개뿐인데 코드가 이렇게 길다
public class Bookmark {
    private Long id;
    private String title;
    private String url;
    private String memo;

    public Bookmark() {}                                          // 기본 생성자
    public Bookmark(String title, String url, String memo) {      // 파라미터 생성자
        this.title = title;
        this.url = url;
        this.memo = memo;
    }

    public Long getId() { return id; }                            // Getter x4
    public void setId(Long id) { this.id = id; }                 // Setter x4
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
}
// 필드 4개인데 코드 25줄... 필드가 10개면?
```

### Lombok을 쓰면?

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark {
    private Long id;
    private String title;
    private String url;
    private String memo;
}
// 끝! 위의 25줄이 이게 전부. 동일한 기능.
```

### Lombok의 동작 원리

```
Java 소스 코드 (.java)
    │
    │  컴파일 시점
    ▼
Lombok 어노테이션 프로세서가 개입
    │
    │  Getter/Setter/생성자 등을 AST(추상 구문 트리)에 자동 삽입
    ▼
바이트코드 (.class) — Getter, Setter, 생성자가 다 들어있음

→ 런타임에 동작하는 게 아니라 "컴파일 시점"에 코드를 생성!
→ 성능 영향 제로!
```

---

## 2. 설치 방법

### Spring Boot (Gradle — build.gradle)

```groovy
dependencies {
    // Lombok
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}
```

### Spring Boot (Maven — pom.xml)

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

### IntelliJ 설정 (필수!)

```
1. Lombok 플러그인 설치
   Settings → Plugins → "Lombok" 검색 → Install

2. Annotation Processing 활성화
   Settings → Build → Compiler → Annotation Processors
   → ✅ "Enable annotation processing" 체크

이거 안 하면 IDE에서 빨간 줄 뜸! (컴파일은 되지만 IDE가 인식 못 함)
```

> ⚠️ Spring Initializr(start.spring.io)에서 프로젝트 만들 때 **Lombok을 Dependencies에 추가**하면 자동으로 설정됨!

---

## 3. @Getter / @Setter

> **한 줄 정의:** 모든 필드의 Getter/Setter 메서드를 자동 생성

### 클래스 레벨

```java
@Getter  // 모든 필드의 getter 생성
@Setter  // 모든 필드의 setter 생성
public class User {
    private Long id;
    private String name;
    private String email;
}

// 자동으로 생성되는 메서드:
// getId(), getName(), getEmail()
// setId(), setName(), setEmail()
```

### 필드 레벨 (선택적 적용)

```java
@Getter  // 모든 필드에 Getter
public class User {
    private Long id;
    private String name;

    @Setter  // email만 Setter 생성
    private String email;

    // password는 Getter만 있고 Setter 없음 (외부에서 변경 불가)
    private String password;
}
```

### 접근 제한자 지정

```java
public class User {
    @Getter
    @Setter(AccessLevel.PROTECTED)  // setter를 protected로 제한
    private String internalCode;

    @Getter(AccessLevel.NONE)  // getter 자체를 생성하지 않음
    private String secret;
}
```

### boolean 필드 주의

```java
@Getter
public class User {
    private boolean active;    // → isActive()  (boolean은 is~)
    private Boolean deleted;   // → getDeleted() (Boolean 래퍼는 get~)
}
```

---

## 4. @NoArgsConstructor / @AllArgsConstructor

> **한 줄 정의:** 파라미터 없는 생성자 / 모든 필드를 받는 생성자를 자동 생성

### @NoArgsConstructor — 기본 생성자

```java
@NoArgsConstructor  // public User() {} 자동 생성
public class User {
    private Long id;
    private String name;
    private String email;
}

// 사용:
User user = new User();  // ← 이게 가능해짐
```

**언제 필요한가?**
```
- JPA Entity → 기본 생성자 필수 (@Entity 사용 시)
- Jackson (JSON 변환) → 기본 생성자 필요
- 프레임워크가 리플렉션으로 객체를 생성할 때 필요
```

### @AllArgsConstructor — 전체 필드 생성자

```java
@AllArgsConstructor  // public User(Long id, String name, String email) {} 자동 생성
public class User {
    private Long id;
    private String name;
    private String email;
}

// 사용:
User user = new User(1L, "Kim", "kim@email.com");
```

### 실전에서의 조합

```java
@Getter
@NoArgsConstructor       // JPA, Jackson용 기본 생성자
@AllArgsConstructor      // 테스트/빌더용 전체 생성자
public class User {
    private Long id;
    private String name;
    private String email;
}
```

### access 속성 — 생성자 접근 제한

```java
// JPA Entity에서 자주 쓰는 패턴
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 외부에서 new User() 못하게
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
}

// User user = new User();  ← 컴파일 에러! (protected라서)
// → 의도: "기본 생성자는 JPA만 쓰게 하고, 개발자는 의미 있는 생성자를 써라"
```

---

## 5. @RequiredArgsConstructor — DI의 베스트 프렌드

> **한 줄 정의:** `final` 필드만 파라미터로 받는 생성자를 자동 생성

### 04번에서 배운 DI 코드를 다시 보자

```java
// ❌ Lombok 없이 — 생성자 주입을 직접 작성
@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    // 생성자를 직접 작성해야 함
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // ... 비즈니스 로직
}
```

```java
// ✅ Lombok 사용 — @RequiredArgsConstructor
@Service
@RequiredArgsConstructor  // final 필드로 생성자 자동 생성!
public class UserService {

    private final UserRepository userRepository;    // final → 생성자에 포함
    private final EmailService emailService;        // final → 생성자에 포함

    // 생성자 안 써도 됨! Lombok이 자동 생성:
    // public UserService(UserRepository userRepository, EmailService emailService) {
    //     this.userRepository = userRepository;
    //     this.emailService = emailService;
    // }

    // ... 비즈니스 로직
}
```

### 왜 @Autowired가 아니라 이걸 쓰나?

```java
// ❌ 필드 주입 — 테스트하기 어렵고, 불변성 보장 안 됨
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}

// ✅ 생성자 주입 (@RequiredArgsConstructor) — 실무 표준
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;  // final = 불변!
}
```

| 비교 | @Autowired (필드 주입) | @RequiredArgsConstructor (생성자 주입) |
|---|---|---|
| 불변성 | ❌ 런타임에 변경 가능 | ✅ final → 변경 불가 |
| 테스트 | ❌ 리플렉션 필요 | ✅ new로 직접 생성 가능 |
| 순환 참조 감지 | ❌ 런타임에 발견 | ✅ 컴파일 시점에 발견 |
| 실무 사용 | ❌ 비추천 | ✅ **표준** |

### final vs 일반 필드

```java
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;  // ✅ 생성자에 포함 (final)
    private final EmailService emailService;      // ✅ 생성자에 포함 (final)
    private int retryCount;                       // ❌ 생성자에 미포함 (final 아님)
}

// 생성된 생성자:
// public UserService(UserRepository userRepository, EmailService emailService) { ... }
// retryCount는 포함 안 됨!
```

---

## 6. @Builder — 객체 생성의 끝판왕

> **한 줄 정의:** 빌더 패턴을 자동으로 구현해주어 가독성 좋은 객체 생성이 가능

### 문제: 필드가 많은 객체를 만들 때

```java
// ❌ 생성자 방식 — 순서 헷갈림, 가독성 최악
User user = new User(1L, "Kim", "kim@email.com", 25, "Seoul", "010-1234-5678", true);
// 이 true가 뭐지? 25는 뭐지? 순서 바꾸면 버그!
```

### @Builder로 해결

```java
@Getter
@Builder
public class User {
    private Long id;
    private String name;
    private String email;
    private int age;
    private String city;
    private String phone;
    private boolean active;
}

// ✅ Builder 사용 — 필드명이 보이니까 읽기 좋고, 순서 상관없음!
User user = User.builder()
    .name("Kim")
    .email("kim@email.com")
    .age(25)
    .city("Seoul")
    .phone("010-1234-5678")
    .active(true)
    .build();
```

### @Builder.Default — 기본값 설정

```java
@Getter
@Builder
public class Order {
    private Long id;
    private String productName;

    @Builder.Default
    private String status = "PENDING";  // 기본값: "PENDING"

    @Builder.Default
    private int quantity = 1;           // 기본값: 1
}

// 사용:
Order order = Order.builder()
    .productName("맥북")
    .build();
// order.getStatus() → "PENDING"
// order.getQuantity() → 1
```

### @Builder를 특정 생성자에만 적용

```java
@Getter
@NoArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;

    @Builder  // 이 생성자에만 빌더 적용
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}

// id를 뺀 빌더만 사용 가능:
User user = User.builder()
    .name("Kim")
    .email("kim@email.com")
    .build();
```

---

## 7. @Data — 만능? 주의!

> **한 줄 정의:** @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor 한번에 적용

### @Data가 생성하는 것

```java
@Data
public class User {
    private Long id;
    private String name;
    private String email;
}

// 위 코드는 아래와 동일:
@Getter
@Setter
@ToString
@EqualsAndHashCode
@RequiredArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;
}
```

### ⚠️ @Data를 쓰면 안 되는 곳

```java
// ❌ JPA Entity에 @Data 쓰면 위험!
@Data  // ← 위험!
@Entity
public class User {
    @Id
    private Long id;
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;  // 연관관계
}

// 문제 1: @EqualsAndHashCode가 orders를 포함
//   → 양방향 연관관계에서 무한 루프 발생! (StackOverflow)
//
// 문제 2: @Setter가 전체 적용
//   → id까지 바꿀 수 있음 (Entity의 ID는 불변이어야 함)
//
// 문제 3: @ToString이 orders를 출력
//   → Lazy Loading 강제 실행 → 불필요한 DB 쿼리 발생
```

### @Data 사용 가이드

| 사용처 | @Data 사용 | 이유 |
|---|---|---|
| **DTO (Request/Response)** | ✅ 써도 됨 | 단순 데이터 전달 객체, 연관관계 없음 |
| **JPA Entity** | ❌ **절대 금지** | 무한 루프, Lazy Loading 문제 |
| **VO (Value Object)** | ⚠️ 주의 | @EqualsAndHashCode 동작 확인 필요 |

---

## 8. @ToString / @EqualsAndHashCode

### @ToString

```java
@ToString
public class User {
    private Long id;
    private String name;
    private String email;
}

System.out.println(user);
// 출력: User(id=1, name=Kim, email=kim@email.com)
```

### 특정 필드 제외

```java
@ToString(exclude = "password")  // password는 로그에 안 찍히게
public class User {
    private Long id;
    private String name;
    private String password;
}
// 출력: User(id=1, name=Kim)
```

### @EqualsAndHashCode

```java
@EqualsAndHashCode
public class User {
    private Long id;
    private String name;
}

// equals()와 hashCode()가 자동 생성됨
User a = new User(1L, "Kim");
User b = new User(1L, "Kim");
a.equals(b);  // true (필드 값이 같으면 같은 객체로 판단)
```

### JPA Entity에서 조심!

```java
// ✅ Entity에서는 ID만으로 비교
@EqualsAndHashCode(of = "id")  // id만으로 equals/hashCode 판단
@Entity
public class User {
    @Id
    private Long id;
    private String name;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;  // ← 이걸 포함하면 무한 루프!
}
```

---

## 9. @Slf4j — 로깅 간소화

> **한 줄 정의:** Logger 객체를 자동으로 생성해준다 (03번에서 배운 내용!)

### Before (03번에서 배운 방식)

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    public User getUser(Long id) {
        log.info("유저 조회: id={}", id);
        // ...
    }
}
```

### After (Lombok)

```java
@Slf4j  // log 변수 자동 생성!
@Service
public class UserService {

    public User getUser(Long id) {
        log.info("유저 조회: id={}", id);  // 바로 사용 가능
        // ...
    }
}
```

> 💡 `@Slf4j`는 `private static final Logger log = LoggerFactory.getLogger(현재클래스.class);`를 자동 생성한다. 03번에서 배운 그 코드!

---

## 10. 실전: Lombok 적용 Before & After

> 09번의 Bookmark 예제를 Lombok으로 리팩토링

### Entity — Before (25줄)

```java
public class Bookmark {
    private Long id;
    private String title;
    private String url;
    private String memo;

    public Bookmark() {}
    public Bookmark(String title, String url, String memo) {
        this.title = title;
        this.url = url;
        this.memo = memo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
}
```

### Entity — After (8줄)

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark {
    private Long id;
    private String title;
    private String url;
    private String memo;
}
```

### DTO — Before (20줄)

```java
public class BookmarkCreateRequest {
    private String title;
    private String url;
    private String memo;

    public BookmarkCreateRequest() {}
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getMemo() { return memo; }
    public void setMemo(String memo) { this.memo = memo; }
}

public class BookmarkResponse {
    private Long id;
    private String title;
    private String url;
    private String memo;
    // ... Getter 4개 + 생성자 + from() 메서드
}
```

### DTO — After (12줄)

```java
@Getter
@NoArgsConstructor
public class BookmarkCreateRequest {
    private String title;
    private String url;
    private String memo;
}

@Getter
@Builder
public class BookmarkResponse {
    private Long id;
    private String title;
    private String url;
    private String memo;

    public static BookmarkResponse from(Bookmark bookmark) {
        return BookmarkResponse.builder()
            .id(bookmark.getId())
            .title(bookmark.getTitle())
            .url(bookmark.getUrl())
            .memo(bookmark.getMemo())
            .build();
    }
}
```

### Service — Before vs After

```java
// Before — 생성자 직접 작성
@Service
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }
}

// After — @RequiredArgsConstructor
@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    // 생성자 자동 생성! + log 자동 생성!
}
```

### Controller — After

```java
@Slf4j
@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;
    // 생성자 자동 생성!

    @PostMapping
    public ResponseEntity<BookmarkResponse> create(@RequestBody BookmarkCreateRequest request) {
        log.info("북마크 생성 요청: title={}", request.getTitle());
        BookmarkResponse response = bookmarkService.createBookmark(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
```

---

## 11. Lombok 주의사항과 안티패턴

### ⚠️ 주의 1: @Setter 남용 금지

```java
// ❌ 모든 곳에 @Setter — 누구나 아무 값이나 바꿀 수 있음
@Getter
@Setter
public class Order {
    private Long id;
    private String status;
    private int totalPrice;
}

// 어디서든 이렇게 할 수 있음:
order.setStatus("아무거나");     // 유효하지 않은 상태로 변경 가능
order.setTotalPrice(-10000);    // 음수 가격도 가능

// ✅ Setter 대신 의미 있는 메서드 제공
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {
    private Long id;
    private String status;
    private int totalPrice;

    // 상태 변경은 비즈니스 메서드를 통해서만!
    public void cancel() {
        if (!"PENDING".equals(this.status)) {
            throw new IllegalStateException("PENDING 상태에서만 취소 가능합니다");
        }
        this.status = "CANCELLED";
    }
}
```

### ⚠️ 주의 2: @AllArgsConstructor 단독 사용 주의

```java
// ❌ 필드 순서가 바뀌면 버그 발생
@AllArgsConstructor
public class User {
    private String name;
    private String email;
}

User user = new User("Kim", "kim@email.com");  // OK

// 나중에 필드 순서를 바꿨다면?
@AllArgsConstructor
public class User {
    private String email;  // ← 순서 변경!
    private String name;
}

User user = new User("Kim", "kim@email.com");
// user.email = "Kim", user.name = "kim@email.com" → 값이 뒤바뀜! 😱
// 컴파일 에러 없이 버그 발생!

// ✅ 해결: @Builder 사용 → 필드명으로 지정하니까 순서 무관
User user = User.builder()
    .name("Kim")
    .email("kim@email.com")
    .build();
```

### ⚠️ 주의 3: Entity에 @Data 금지 (재강조)

```
JPA Entity에서 @Data가 위험한 이유:

1. @EqualsAndHashCode → 연관관계 필드 포함 → 무한 루프
2. @Setter           → ID, 연관관계 필드까지 변경 가능
3. @ToString         → Lazy Loading 강제 실행

✅ Entity에서는:
   @Getter
   @NoArgsConstructor(access = AccessLevel.PROTECTED)
   @EqualsAndHashCode(of = "id")  ← 필요할 때만, id만 사용
```

---

## 12. 실무 추천 조합

### Entity (JPA용 — Phase 3에서 사용 예정)

```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
}
// ✅ Setter 없음 → 불변성
// ✅ 기본 생성자 protected → JPA만 사용
// ✅ Builder → 가독성 좋은 객체 생성
```

### Request DTO

```java
@Getter
@NoArgsConstructor
public class UserCreateRequest {
    private String name;
    private String email;
}
// ✅ Setter 없음 → Jackson이 리플렉션으로 주입
// ✅ 기본 생성자 → Jackson이 객체 생성할 때 필요
```

### Response DTO

```java
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;

    public static UserResponse from(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .build();
    }
}
// ✅ Builder → 깔끔한 변환
// ✅ Setter 없음 → 응답 데이터 변조 방지
```

### Service

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
}
// ✅ @Slf4j → 로깅
// ✅ @RequiredArgsConstructor → 생성자 주입
```

### Controller

```java
@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
}
// ✅ 동일한 3종 세트: @Slf4j + @RequiredArgsConstructor + @RestController
```

### 한눈에 정리

| 클래스 종류 | 추천 어노테이션 | 절대 쓰지 마 |
|---|---|---|
| **Entity** | `@Getter` `@NoArgsConstructor(PROTECTED)` `@Builder` | `@Data` `@Setter` |
| **Request DTO** | `@Getter` `@NoArgsConstructor` | `@Data` (과하다) |
| **Response DTO** | `@Getter` `@Builder` | `@Setter` |
| **Service** | `@Slf4j` `@RequiredArgsConstructor` | - |
| **Controller** | `@Slf4j` `@RequiredArgsConstructor` | - |

---

## 13. 면접 대비 한 줄 요약

| 질문 | 답변 |
|---|---|
| Lombok이란? | 컴파일 시점에 Getter/Setter/생성자 등 보일러플레이트를 자동 생성하는 라이브러리 |
| Lombok의 동작 원리는? | 어노테이션 프로세서가 컴파일 시 AST를 조작하여 코드 삽입, 런타임 성능 영향 없음 |
| @RequiredArgsConstructor는? | final 필드만 파라미터로 받는 생성자 자동 생성, DI 생성자 주입에 사용 |
| @Data를 Entity에 쓰면? | @EqualsAndHashCode가 연관관계 포함 → 무한 루프, @Setter로 불변성 깨짐, @ToString으로 Lazy Loading 강제 |
| @Builder의 장점은? | 필드명 기반 객체 생성으로 가독성 좋고, 필드 순서 변경에 안전 |
| 필드 주입 vs 생성자 주입? | 생성자 주입(@RequiredArgsConstructor) 권장 — 불변성, 테스트 용이, 순환참조 감지 |
| @Setter를 왜 안 쓰나? | 무분별한 상태 변경 가능 → 비즈니스 메서드로 의미 있는 변경만 허용해야 함 |
| @NoArgsConstructor(PROTECTED)는 왜? | 기본 생성자는 JPA/프레임워크만 쓰게 하고, 개발자는 의미 있는 생성자/빌더 사용 유도 |

---

## 다음 수업 예고

> **11. DTO와 Validation** — @Valid, @NotNull, @Size, @Email, BindingResult, 커스텀 Validator
>
> 💡 이번에 배운 Lombok DTO에 "입력값 검증"을 추가한다. 빈 이름, 잘못된 이메일을 서버에서 잡아내는 법!
