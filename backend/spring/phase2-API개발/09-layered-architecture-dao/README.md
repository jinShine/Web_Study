# 09. Layered 아키텍처와 DAO 패턴

> **한 줄 정의:** 코드를 역할별로 계층(Layer)으로 나누고, 각 계층이 자기 일만 하게 만드는 설계 원칙

---

## 목차
1. [왜 계층을 나누는가?](#1-왜-계층을-나누는가)
2. [Layered Architecture 전체 구조](#2-layered-architecture-전체-구조)
3. [Controller 계층](#3-controller-계층)
4. [Service 계층](#4-service-계층)
5. [Repository 계층](#5-repository-계층)
6. [DAO 패턴이란?](#6-dao-패턴이란)
7. [DAO vs Repository — 뭐가 다른가?](#7-dao-vs-repository--뭐가-다른가)
8. [의존성 방향의 법칙](#8-의존성-방향의-법칙)
9. [패키지 구조 잡기](#9-패키지-구조-잡기)
10. [실전 예제: 전체 계층 코드](#10-실전-예제-전체-계층-코드)
11. [자주 하는 실수 모음](#11-자주-하는-실수-모음)
12. [면접 대비 한 줄 요약](#12-면접-대비-한-줄-요약)

---

## 1. 왜 계층을 나누는가?

> **한 줄 정의:** 한 파일에 모든 코드를 때려 넣으면 유지보수 지옥이 된다

### 계층 없이 코드를 짜면?

```java
// ❌ 모든 걸 Controller 하나에 때려 넣은 코드
@RestController
public class UserController {

    @GetMapping("/api/users/{id}")
    public Map<String, Object> getUser(@PathVariable Long id) {
        // 1. DB 연결
        Connection conn = DriverManager.getConnection("jdbc:mysql://...");

        // 2. SQL 실행
        PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
        ps.setLong(1, id);
        ResultSet rs = ps.executeQuery();

        // 3. 비즈니스 로직 (나이 계산)
        rs.next();
        int birthYear = rs.getInt("birth_year");
        int age = 2026 - birthYear;

        // 4. 응답 생성
        Map<String, Object> result = new HashMap<>();
        result.put("name", rs.getString("name"));
        result.put("age", age);

        // 5. 리소스 정리
        rs.close();
        ps.close();
        conn.close();

        return result;
    }
}
```

### 이게 왜 문제인가?

```
문제 1: 코드 수정이 무섭다
└─ DB를 MySQL → PostgreSQL로 바꾸면? → Controller 전부 수정해야 함

문제 2: 중복 코드 폭발
└─ 다른 API에서도 유저 조회 필요 → 같은 SQL 코드를 복붙

문제 3: 테스트 불가능
└─ 비즈니스 로직만 테스트하고 싶은데 DB가 연결되어야 함

문제 4: 협업 충돌
└─ 한 파일에 모든 게 있으니 → Git 충돌 지옥
```

### 계층을 나누면?

```
각 계층이 자기 일만 한다:

Controller: "요청 받고 응답 줄게"
Service:    "비즈니스 로직 처리할게"
Repository: "DB에서 데이터 꺼내줄게"

→ DB 바꿔? Repository만 수정
→ 로직 바꿔? Service만 수정
→ 응답 형태 바꿔? Controller만 수정
```

---

## 2. Layered Architecture 전체 구조

> **한 줄 정의:** Presentation → Business → Persistence 3계층이 기본

### 3-Layer 구조도

```
┌─────────────────────────────────────────────────────────┐
│  Client (브라우저 / Postman / 프론트엔드)                   │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP Request
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Presentation Layer (표현 계층)                │
│                                                          │
│  @RestController                                         │
│  - HTTP 요청/응답 처리                                     │
│  - 파라미터 검증 (11번에서 배울 예정)                          │
│  - 응답 포맷 결정 (ResponseEntity)                         │
│                                                          │
│  ❌ 비즈니스 로직 금지                                      │
│  ❌ DB 접근 금지                                           │
└──────────────────────────┬──────────────────────────────┘
                           │ DTO
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Business Layer (비즈니스 계층)                 │
│                                                          │
│  @Service                                                │
│  - 핵심 비즈니스 로직                                       │
│  - 트랜잭션 관리 (@Transactional)                          │
│  - 여러 Repository 조합                                    │
│  - 예외 발생 (BusinessException)                           │
│                                                          │
│  ❌ HTTP 관련 코드 금지 (Request, Response 모름)             │
│  ❌ 직접 SQL 작성 금지                                      │
└──────────────────────────┬──────────────────────────────┘
                           │ Entity
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Persistence Layer (영속 계층)                  │
│                                                          │
│  @Repository                                             │
│  - 데이터 저장/조회/수정/삭제                                │
│  - DB 접근 로직                                            │
│  - SQL / JPA 쿼리                                         │
│                                                          │
│  ❌ 비즈니스 로직 금지                                      │
│  ❌ HTTP 관련 코드 금지                                     │
└──────────────────────────┬──────────────────────────────┘
                           │ SQL / JPA
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Database (MySQL, PostgreSQL 등)               │
└─────────────────────────────────────────────────────────┘
```

### 각 계층의 역할 비교

| 계층 | 어노테이션 | 역할 | 비유 |
|---|---|---|---|
| **Controller** | `@RestController` | 요청 접수 & 응답 반환 | 카페 캐셔 (주문 받기) |
| **Service** | `@Service` | 비즈니스 로직 처리 | 바리스타 (커피 만들기) |
| **Repository** | `@Repository` | DB 접근 | 창고 관리자 (재료 꺼내기) |

> 💡 **캐셔가 직접 커피를 만들지 않고, 바리스타가 직접 창고에 가지 않는다.** 각자 역할이 있다!

---

## 3. Controller 계층

> **한 줄 정의:** HTTP 세계와 Java 세계의 경계에 서 있는 관문

### Controller가 하는 일

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ Controller의 일: 요청 받고, Service에게 위임하고, 응답 반환
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserCreateRequest request) {
        UserResponse created = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

### Controller에서 하면 안 되는 것

```java
// ❌ Controller에서 비즈니스 로직 처리
@GetMapping("/{id}")
public UserResponse getUser(@PathVariable Long id) {
    User user = userRepository.findById(id);      // ❌ Repository 직접 호출
    if (user.getAge() > 19) {                     // ❌ 비즈니스 로직
        user.setAdult(true);
    }
    int discount = user.isVip() ? 20 : 0;         // ❌ 비즈니스 로직
    return new UserResponse(user, discount);
}

// ✅ Service에게 위임
@GetMapping("/{id}")
public UserResponse getUser(@PathVariable Long id) {
    return userService.getUserById(id);  // 끝! 깔끔!
}
```

---

## 4. Service 계층

> **한 줄 정의:** 비즈니스 로직의 본거지 — "왜"를 처리하는 곳

### Service가 하는 일

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ 비즈니스 로직 처리
    public UserResponse getUserById(Long id) {
        // 1. 데이터 조회 (Repository에게 위임)
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));

        // 2. 비즈니스 로직 처리
        // (Entity → DTO 변환도 여기서)
        return UserResponse.from(user);
    }

    // ✅ 여러 Repository를 조합하는 복합 로직
    public OrderResponse createOrder(OrderCreateRequest request) {
        // 유저 확인
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new UserNotFoundException(request.getUserId()));

        // 상품 확인
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new ProductNotFoundException(request.getProductId()));

        // 재고 확인 (비즈니스 규칙)
        if (product.getStock() < request.getQuantity()) {
            throw new InsufficientStockException(product.getName());
        }

        // 주문 생성
        Order order = Order.create(user, product, request.getQuantity());
        Order saved = orderRepository.save(order);

        // 재고 차감
        product.decreaseStock(request.getQuantity());

        return OrderResponse.from(saved);
    }
}
```

### Service 핵심 규칙

```
✅ 해야 하는 것:
├─ 비즈니스 로직 (계산, 조건 판단, 규칙 적용)
├─ 예외 발생 (throw new BusinessException)
├─ 트랜잭션 관리 (@Transactional)
├─ 여러 Repository 조합
└─ Entity ↔ DTO 변환

❌ 하면 안 되는 것:
├─ HttpServletRequest, HttpServletResponse 사용 (HTTP 몰라야 함)
├─ @PathVariable, @RequestParam 등 사용 (Controller 영역)
├─ 직접 SQL 작성 (Repository 영역)
└─ JSON 변환 (Controller + Jackson 영역)
```

---

## 5. Repository 계층

> **한 줄 정의:** 데이터 저장소(DB)와의 대화를 담당하는 계층

### Repository가 하는 일

```java
// 지금은 HashMap으로 구현 (나중에 JPA로 교체)
@Repository
public class UserRepository {

    private final Map<Long, User> store = new HashMap<>();
    private Long sequence = 0L;

    public User save(User user) {
        user.setId(++sequence);
        store.put(user.getId(), user);
        return user;
    }

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<User> findAll() {
        return new ArrayList<>(store.values());
    }

    public void deleteById(Long id) {
        store.remove(id);
    }
}
```

### 나중에 JPA를 쓰면? (미리보기)

```java
// JPA를 쓰면 이렇게 간단해진다 (Phase 3에서 배움)
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 끝! save, findById, findAll, deleteById 자동 제공

    // 커스텀 쿼리만 추가하면 됨
    List<User> findByNameContaining(String keyword);
}
```

> 💡 **지금은 HashMap으로 연습하고, Phase 3(JPA)에서 진짜 DB로 교체한다.** 계층을 잘 나눠놓으면 Repository만 바꾸면 된다!

### Repository 메서드 네이밍 관례

| 메서드 | 의미 | 예시 |
|---|---|---|
| `save` | 저장 (INSERT/UPDATE) | `save(user)` |
| `findById` | ID로 단건 조회 | `findById(1L)` |
| `findAll` | 전체 조회 | `findAll()` |
| `findBy~` | 조건 조회 | `findByName("Kim")` |
| `deleteById` | ID로 삭제 | `deleteById(1L)` |
| `existsById` | 존재 여부 확인 | `existsById(1L)` |
| `count` | 전체 개수 | `count()` |

---

## 6. DAO 패턴이란?

> **한 줄 정의:** Data Access Object — DB 접근 로직을 캡슐화한 디자인 패턴

### DAO 패턴 구조

```
Service ──→ DAO (Interface) ←── DAOImpl (구현체)
                                     │
                                     ▼
                                  Database
```

### DAO 패턴 코드

```java
// 1. DAO 인터페이스 — "어떤 동작이 가능한지" 정의
public interface UserDao {
    User insert(User user);
    User selectById(Long id);
    List<User> selectAll();
    void update(User user);
    void deleteById(Long id);
}

// 2. DAO 구현체 — "실제로 어떻게 DB에 접근하는지" 구현
@Repository
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public User selectById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }

    @Override
    public User insert(User user) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, user.getName(), user.getEmail());
        return user;
    }

    // ... 나머지 구현
}

// 3. Service에서 사용
@Service
public class UserService {
    private final UserDao userDao;  // 인터페이스에 의존!

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public User getUser(Long id) {
        return userDao.selectById(id);
    }
}
```

### DAO 패턴의 핵심 아이디어

```
Service는 UserDao 인터페이스만 알고 있다.
구현체가 JDBC든, MyBatis든, JPA든 → Service 코드는 안 바뀐다!

UserDao ←── JdbcUserDaoImpl   (JDBC로 구현)
        ←── MyBatisUserDaoImpl (MyBatis로 구현)
        ←── JpaUserDaoImpl     (JPA로 구현)

→ 기술을 교체해도 Service 코드는 그대로!
  (04번에서 배운 DI 원리 — 인터페이스에 의존!)
```

---

## 7. DAO vs Repository — 뭐가 다른가?

> **한 줄 정의:** 같은 역할이지만 초점이 다르다 — DAO는 DB 기술 중심, Repository는 도메인 중심

### 비교표

| 비교 | DAO | Repository |
|---|---|---|
| **초점** | DB 접근 기술 (SQL, JDBC) | 도메인 객체 관리 (Entity) |
| **메서드명** | `insert`, `select`, `update`, `delete` | `save`, `findById`, `findAll`, `deleteById` |
| **네이밍 관점** | SQL 동작 기반 | 컬렉션(저장소) 비유 |
| **인터페이스** | 직접 정의 | Spring Data JPA가 제공 |
| **기술 종속** | JDBC, MyBatis 등 구체 기술에 가까움 | 추상화 수준이 더 높음 |
| **Spring에서** | 전통적 방식 | ✅ **현재 표준** |

### 실무에서는?

```
2010년대 초반: DAO 패턴이 주류
   └─ JDBC, MyBatis 사용 시 DAO + Impl 구조

2015년 이후: Repository 패턴이 표준
   └─ Spring Data JPA의 JpaRepository 사용
   └─ 인터페이스만 만들면 구현체 자동 생성

현재 (2026년): Repository가 압도적 주류
   └─ JpaRepository, CrudRepository 상속
   └─ DAO는 레거시 프로젝트에서만 볼 수 있음
```

### 결론

```
DAO를 알아야 하는 이유:
├─ 레거시 코드에 DAO가 아직 많다
├─ 면접에서 "DAO vs Repository 차이" 자주 나온다
└─ Repository가 DAO 패턴에서 발전한 것임을 이해

실무에서 쓸 것:
└─ ✅ Repository (@Repository + JpaRepository)
```

---

## 8. 의존성 방향의 법칙

> **한 줄 정의:** 위에서 아래로만 의존한다. 아래에서 위로 올라가면 안 된다!

### 의존성 방향

```
Controller ──→ Service ──→ Repository ──→ Database
   (위)           (중간)        (아래)

✅ 올바른 방향:
Controller → Service     (Controller가 Service를 안다)
Service → Repository     (Service가 Repository를 안다)

❌ 잘못된 방향:
Service → Controller     (Service가 Controller를 알면 안 됨!)
Repository → Service     (Repository가 Service를 알면 안 됨!)
```

### 왜 이 방향이 중요한가?

```java
// ✅ 올바른 의존성 — Service는 Repository만 안다
@Service
public class UserService {
    private final UserRepository userRepository;  // ✅ 아래 계층만 의존
}

// ❌ 잘못된 의존성 — Repository가 Service를 알고 있다
@Repository
public class UserRepository {
    private final UserService userService;  // ❌ 위 계층에 의존! 순환 참조!
}

// ❌ 잘못된 의존성 — Service가 Controller를 알고 있다
@Service
public class UserService {
    private final UserController userController;  // ❌ 위 계층에 의존!
}
```

### 의존성 방향을 지키면 좋은 점

```
1. 교체가 쉽다
   └─ Repository를 HashMap → JPA로 바꿔도 Service는 안 바뀜

2. 테스트가 쉽다
   └─ Service 테스트 시 Repository를 Mock으로 대체 가능

3. 순환 참조 방지
   └─ A→B→A 이런 상황이 안 생김

4. 코드 읽기 쉽다
   └─ 위에서 아래로 따라가면 전체 흐름이 보임
```

---

## 9. 패키지 구조 잡기

> **한 줄 정의:** 프로젝트 폴더를 어떻게 나눌지 정하는 것

### 방법 1: 계층별 분류 (Layer-Based) — 입문자 추천 ✅

```
com.example.demo
├── controller/
│   ├── UserController.java
│   ├── ProductController.java
│   └── OrderController.java
├── service/
│   ├── UserService.java
│   ├── ProductService.java
│   └── OrderService.java
├── repository/
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   └── OrderRepository.java
├── dto/
│   ├── UserCreateRequest.java
│   ├── UserResponse.java
│   ├── ProductCreateRequest.java
│   └── ProductResponse.java
├── entity/
│   ├── User.java
│   ├── Product.java
│   └── Order.java
└── exception/
    ├── GlobalExceptionHandler.java
    ├── BusinessException.java
    └── UserNotFoundException.java
```

### 방법 2: 기능별 분류 (Feature-Based) — 중급 이상

```
com.example.demo
├── user/
│   ├── UserController.java
│   ├── UserService.java
│   ├── UserRepository.java
│   ├── User.java
│   ├── UserCreateRequest.java
│   └── UserResponse.java
├── product/
│   ├── ProductController.java
│   ├── ProductService.java
│   ├── ProductRepository.java
│   └── ...
├── order/
│   ├── OrderController.java
│   ├── OrderService.java
│   └── ...
└── common/
    ├── exception/
    └── config/
```

### 어떤 걸 써야 하나?

| 비교 | 계층별 (Layer) | 기능별 (Feature) |
|---|---|---|
| 파일 찾기 | "Service 폴더 가면 다 있어" | "User 폴더 가면 다 있어" |
| 규모 작을 때 | ✅ 깔끔 | 과한 구조 |
| 규모 클 때 | controller/ 에 파일 50개... | ✅ 기능별로 잘 나뉨 |
| 입문자 | ✅ **추천** | 나중에 전환 |

> 💡 **지금은 계층별 분류(방법 1)로 연습하고, 프로젝트가 커지면 기능별로 전환하면 된다!**

---

## 10. 실전 예제: 전체 계층 코드

> 북마크 관리 API — Controller → Service → Repository 전체 흐름

### Entity (도메인 객체)

```java
package com.example.demo.entity;

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

    // Getter & Setter
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

### DTO (요청/응답 객체)

```java
// BookmarkCreateRequest.java — 클라이언트가 보내는 데이터
package com.example.demo.dto;

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

// BookmarkResponse.java — 클라이언트에게 보내는 데이터
package com.example.demo.dto;

public class BookmarkResponse {
    private Long id;
    private String title;
    private String url;
    private String memo;

    // Entity → DTO 변환 메서드
    public static BookmarkResponse from(Bookmark bookmark) {
        BookmarkResponse response = new BookmarkResponse();
        response.id = bookmark.getId();
        response.title = bookmark.getTitle();
        response.url = bookmark.getUrl();
        response.memo = bookmark.getMemo();
        return response;
    }

    // Getter
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getUrl() { return url; }
    public String getMemo() { return memo; }
}
```

### Repository (데이터 접근 계층)

```java
package com.example.demo.repository;

import com.example.demo.entity.Bookmark;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class BookmarkRepository {

    private final Map<Long, Bookmark> store = new HashMap<>();
    private Long sequence = 0L;

    public Bookmark save(Bookmark bookmark) {
        bookmark.setId(++sequence);
        store.put(bookmark.getId(), bookmark);
        return bookmark;
    }

    public Optional<Bookmark> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Bookmark> findAll() {
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

### Service (비즈니스 로직 계층)

```java
package com.example.demo.service;

import com.example.demo.dto.BookmarkCreateRequest;
import com.example.demo.dto.BookmarkResponse;
import com.example.demo.entity.Bookmark;
import com.example.demo.exception.BookmarkNotFoundException;
import com.example.demo.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    // 생성자 주입 (04번에서 배운 DI!)
    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    // CREATE
    public BookmarkResponse createBookmark(BookmarkCreateRequest request) {
        // DTO → Entity 변환
        Bookmark bookmark = new Bookmark(
            request.getTitle(),
            request.getUrl(),
            request.getMemo()
        );

        // 저장
        Bookmark saved = bookmarkRepository.save(bookmark);

        // Entity → DTO 변환 후 반환
        return BookmarkResponse.from(saved);
    }

    // READ (단건)
    public BookmarkResponse getBookmarkById(Long id) {
        Bookmark bookmark = bookmarkRepository.findById(id)
            .orElseThrow(() -> new BookmarkNotFoundException(id));

        return BookmarkResponse.from(bookmark);
    }

    // READ (전체)
    public List<BookmarkResponse> getAllBookmarks() {
        return bookmarkRepository.findAll()
            .stream()
            .map(BookmarkResponse::from)   // 각 Entity를 DTO로 변환
            .collect(Collectors.toList());
    }

    // DELETE
    public void deleteBookmark(Long id) {
        if (!bookmarkRepository.existsById(id)) {
            throw new BookmarkNotFoundException(id);
        }
        bookmarkRepository.deleteById(id);
    }
}
```

### Controller (표현 계층)

```java
package com.example.demo.controller;

import com.example.demo.dto.BookmarkCreateRequest;
import com.example.demo.dto.BookmarkResponse;
import com.example.demo.service.BookmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    // POST /api/bookmarks
    @PostMapping
    public ResponseEntity<BookmarkResponse> create(@RequestBody BookmarkCreateRequest request) {
        BookmarkResponse response = bookmarkService.createBookmark(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /api/bookmarks
    @GetMapping
    public ResponseEntity<List<BookmarkResponse>> getAll() {
        return ResponseEntity.ok(bookmarkService.getAllBookmarks());
    }

    // GET /api/bookmarks/{id}
    @GetMapping("/{id}")
    public ResponseEntity<BookmarkResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(bookmarkService.getBookmarkById(id));
    }

    // DELETE /api/bookmarks/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookmarkService.deleteBookmark(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Exception

```java
// BookmarkNotFoundException.java
package com.example.demo.exception;

public class BookmarkNotFoundException extends RuntimeException {
    public BookmarkNotFoundException(Long id) {
        super("북마크를 찾을 수 없습니다. ID: " + id);
    }
}
```

### 전체 흐름 정리

```
POST /api/bookmarks  {"title":"Spring Docs", "url":"https://spring.io", "memo":"공식 문서"}

1. Controller  │ @RequestBody로 JSON → BookmarkCreateRequest 변환
               │ bookmarkService.createBookmark(request) 호출
               ▼
2. Service     │ BookmarkCreateRequest → Bookmark Entity 변환
               │ bookmarkRepository.save(bookmark) 호출
               │ Bookmark → BookmarkResponse 변환하여 반환
               ▼
3. Repository  │ HashMap에 Bookmark 저장
               │ ID 자동 부여 후 반환
               ▼
4. Controller  │ ResponseEntity.status(201).body(response) 반환

→ Response: 201 Created  {"id":1, "title":"Spring Docs", "url":"https://spring.io", "memo":"공식 문서"}
```

---

## 11. 자주 하는 실수 모음

### 실수 1: Controller에서 Repository 직접 호출

```java
// ❌ Controller → Repository 직접 접근
@RestController
public class UserController {
    private final UserRepository userRepository;  // ❌ Service를 건너뜀!

    @GetMapping("/api/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

// ✅ Controller → Service → Repository
@RestController
public class UserController {
    private final UserService userService;  // ✅ Service를 통해 접근

    @GetMapping("/api/users/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
```

### 실수 2: Service에서 HTTP 관련 코드 사용

```java
// ❌ Service에서 ResponseEntity 사용
@Service
public class UserService {
    public ResponseEntity<User> getUser(Long id) {  // ❌ ResponseEntity는 Controller 영역!
        User user = userRepository.findById(id);
        return ResponseEntity.ok(user);
    }
}

// ✅ Service는 비즈니스 로직만
@Service
public class UserService {
    public UserResponse getUser(Long id) {  // ✅ DTO만 반환
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
        return UserResponse.from(user);
    }
}
```

### 실수 3: Entity를 그대로 응답으로 반환

```java
// ❌ Entity를 직접 반환 — 내부 구조가 클라이언트에 노출됨
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id);  // ❌ password 같은 민감 정보도 노출!
}

// ✅ DTO로 변환해서 반환 — 필요한 데이터만 보냄
@GetMapping("/{id}")
public UserResponse getUser(@PathVariable Long id) {
    return userService.getUserById(id);  // ✅ DTO에는 password 없음
}
```

### 실수 4: 순환 참조

```java
// ❌ 순환 참조 — Spring이 Bean 생성 불가!
@Service
public class UserService {
    private final OrderService orderService;  // User → Order
}

@Service
public class OrderService {
    private final UserService userService;  // Order → User  ← 순환!
}

// ✅ 해결: 공통 로직을 별도 Service로 분리
@Service
public class UserOrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    // 둘 다 Repository만 의존 → 순환 없음
}
```

---

## 12. 면접 대비 한 줄 요약

| 질문 | 답변 |
|---|---|
| Layered Architecture란? | 코드를 역할별(표현/비즈니스/영속) 계층으로 분리하는 설계 패턴 |
| 왜 계층을 나누나? | 관심사 분리 → 유지보수성, 테스트 용이성, 코드 재사용성 향상 |
| Controller의 역할은? | HTTP 요청/응답 처리, 파라미터 검증, Service에게 위임 |
| Service의 역할은? | 비즈니스 로직 처리, 트랜잭션 관리, 여러 Repository 조합 |
| Repository의 역할은? | 데이터 접근(CRUD), DB와의 통신 담당 |
| DAO 패턴이란? | DB 접근 로직을 캡슐화한 패턴, 인터페이스 + 구현체 구조 |
| DAO vs Repository 차이? | DAO는 SQL 중심(insert/select), Repository는 도메인 중심(save/findBy), 현재는 Repository가 표준 |
| 의존성 방향은? | Controller → Service → Repository, 위에서 아래로만 의존 |
| Entity를 직접 반환하면 안 되는 이유? | 내부 구조 노출, 민감 정보 유출, API 스펙과 DB 스키마 결합 |
| 순환 참조가 뭔가? | A→B→A로 서로 의존하는 상태, Spring이 Bean 생성 불가 |

---

## 다음 수업 예고

> **10. Lombok 활용** — @Getter, @Setter, @Builder, @RequiredArgsConstructor, @Data, @Slf4j
>
> 💡 이번 예제에서 Getter/Setter/생성자를 일일이 다 쳤는데... Lombok을 쓰면 한 줄로 끝난다!
