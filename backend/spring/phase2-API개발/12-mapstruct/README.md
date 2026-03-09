# 12. MapStruct — 객체 매핑 자동화

> **한 줄 정의:** Entity↔DTO 변환 코드를 컴파일 시점에 자동 생성해주는 매핑 라이브러리

---

## 목차
1. [왜 MapStruct가 필요한가?](#1-왜-mapstruct가-필요한가)
2. [MapStruct 동작 원리](#2-mapstruct-동작-원리)
3. [설치 및 설정](#3-설치-및-설정)
4. [기본 사용법 — @Mapper](#4-기본-사용법--mapper)
5. [필드명이 다를 때 — @Mapping](#5-필드명이-다를-때--mapping)
6. [여러 객체 → 하나로 합치기](#6-여러-객체--하나로-합치기)
7. [컬렉션 매핑 (List 변환)](#7-컬렉션-매핑-list-변환)
8. [커스텀 변환 로직](#8-커스텀-변환-로직)
9. [무시할 필드 — ignore](#9-무시할-필드--ignore)
10. [Update 매핑 — 기존 객체에 덮어쓰기](#10-update-매핑--기존-객체에-덮어쓰기)
11. [MapStruct vs 수동 매핑 vs ModelMapper](#11-mapstruct-vs-수동-매핑-vs-modelmapper)
12. [실전 예제: 주문 API에 적용](#12-실전-예제-주문-api에-적용)
13. [실습 퀴즈](#13-실습-퀴즈)
14. [면접 대비 한 줄 요약](#14-면접-대비-한-줄-요약)

---

## 1. 왜 MapStruct가 필요한가?

> **한 줄 정의:** DTO↔Entity 변환 코드가 반복적이고 지루하다. 자동으로 해주면 좋겠다!

### 11번에서 했던 수동 매핑 코드

```java
// Request DTO → Entity (수동)
public User toEntity() {
    return User.builder()
        .name(this.name)
        .email(this.email)
        .password(this.password)
        .age(this.age)
        .createdAt(LocalDateTime.now())
        .build();
}

// Entity → Response DTO (수동)
public static UserResponse from(User user) {
    return UserResponse.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .age(user.getAge())
        .createdAt(user.getCreatedAt())
        .build();
}
```

### 문제점

```
필드 4개 → 매핑 코드 4줄
필드 10개 → 매핑 코드 10줄
필드 20개 → 매핑 코드 20줄 + 실수 가능성 UP

문제 1: 필드 추가 시 매핑 코드도 수정해야 함 (빠뜨리면 null)
문제 2: 여러 DTO마다 반복 작성 (Create, Update, Response...)
문제 3: 필드명이 다르면 헷갈림 (userName vs name)
```

### MapStruct를 쓰면?

```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
    User toEntity(UserCreateRequest request);
}
// 끝! 구현 코드를 MapStruct가 자동 생성!
```

---

## 2. MapStruct 동작 원리

> **한 줄 정의:** 컴파일할 때 인터페이스를 보고 구현 클래스를 자동으로 만들어준다

### 동작 흐름

```
개발자가 작성하는 것:
┌─────────────────────────────────────┐
│  @Mapper                             │
│  public interface UserMapper {       │
│      UserResponse toResponse(User);  │
│  }                                   │
└─────────────────────────────────────┘
            │
            │  컴파일 시점 (javac)
            │  MapStruct 어노테이션 프로세서가 개입
            ▼
MapStruct가 자동 생성하는 것:
┌─────────────────────────────────────────────────┐
│  public class UserMapperImpl implements UserMapper {  │
│                                                       │
│      @Override                                        │
│      public UserResponse toResponse(User user) {     │
│          if (user == null) return null;               │
│          return UserResponse.builder()                │
│              .id(user.getId())                        │
│              .name(user.getName())                    │
│              .email(user.getEmail())                  │
│              .build();                                │
│      }                                               │
│  }                                                   │
└─────────────────────────────────────────────────┘

→ Lombok과 같은 원리! 컴파일 시점에 코드 생성, 런타임 성능 영향 없음!
```

### 자동 생성된 코드 확인 위치

```
프로젝트/build/generated/sources/annotationProcessor/...
└─ UserMapperImpl.java  ← 여기서 생성된 코드를 직접 볼 수 있다!
```

---

## 3. 설치 및 설정

### Gradle (build.gradle)

```groovy
dependencies {
    // MapStruct
    implementation 'org.mapstruct:mapstruct:1.5.5.Final'
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.5.Final'

    // Lombok + MapStruct 같이 쓸 때 (순서 중요!)
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok-mapstruct-binding:0.2.0'
}
```

### Maven (pom.xml)

```xml
<dependencies>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.5.5.Final</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>1.5.5.Final</version>
                    </path>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </path>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok-mapstruct-binding</artifactId>
                        <version>0.2.0</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

> ⚠️ **Lombok과 MapStruct를 같이 쓸 때 `lombok-mapstruct-binding`이 필수!** 없으면 Lombok이 생성한 Getter/Builder를 MapStruct가 인식 못 함.

---

## 4. 기본 사용법 — @Mapper

> **한 줄 정의:** 인터페이스에 `@Mapper`를 붙이면 매핑 구현체가 자동 생성된다

### Entity와 DTO

```java
// Entity
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

// Request DTO
@Getter
@NoArgsConstructor
public class UserCreateRequest {
    private String name;
    private String email;
    private String password;
    private int age;
}

// Response DTO
@Getter
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private int age;
    private LocalDateTime createdAt;
}
```

### Mapper 인터페이스

```java
@Mapper(componentModel = "spring")  // Spring Bean으로 등록
public interface UserMapper {

    // Entity → Response DTO
    UserResponse toResponse(User user);

    // Request DTO → Entity
    User toEntity(UserCreateRequest request);
}
```

### 사용법 (Service에서)

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;  // MapStruct Mapper 주입!

    public UserResponse createUser(UserCreateRequest request) {
        // DTO → Entity (MapStruct가 자동 변환)
        User user = userMapper.toEntity(request);

        User saved = userRepository.save(user);

        // Entity → Response DTO (MapStruct가 자동 변환)
        return userMapper.toResponse(saved);
    }
}
```

### 자동 생성되는 코드 (빌드 후 확인 가능)

```java
// MapStruct가 자동으로 만들어주는 UserMapperImpl.java
@Component  // ← componentModel = "spring" 덕분에 Spring Bean!
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        return UserResponse.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .age(user.getAge())
            .createdAt(user.getCreatedAt())
            .build();
    }

    @Override
    public User toEntity(UserCreateRequest request) {
        if (request == null) {
            return null;
        }
        return User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(request.getPassword())
            .age(request.getAge())
            .build();
    }
}
```

> 💡 **필드명이 같으면 자동으로 매핑!** `user.getName()` → `response.setName()` 자동 연결.

### componentModel 옵션

| 옵션 | 설명 | 사용법 |
|---|---|---|
| `"spring"` | Spring Bean으로 등록 (@Component) | `@RequiredArgsConstructor`로 주입 |
| `"default"` | 기본값, `Mappers.getMapper()` 사용 | Spring 없이 사용할 때 |

> 💡 Spring 프로젝트에서는 항상 `componentModel = "spring"` 사용!

---

## 5. 필드명이 다를 때 — @Mapping

> **한 줄 정의:** 소스와 타겟의 필드명이 다르면 `@Mapping`으로 명시적으로 연결한다

### 예시: Entity 필드명 ≠ DTO 필드명

```java
// Entity — userName으로 저장
@Getter
@Builder
public class Member {
    private Long id;
    private String userName;      // ← Entity는 userName
    private String userEmail;     // ← Entity는 userEmail
    private LocalDateTime regDate;
}

// Response DTO — name으로 응답
@Getter
@Builder
public class MemberResponse {
    private Long id;
    private String name;          // ← DTO는 name
    private String email;         // ← DTO는 email
    private LocalDateTime createdAt;
}
```

### @Mapping으로 연결

```java
@Mapper(componentModel = "spring")
public interface MemberMapper {

    @Mapping(source = "userName", target = "name")       // userName → name
    @Mapping(source = "userEmail", target = "email")     // userEmail → email
    @Mapping(source = "regDate", target = "createdAt")   // regDate → createdAt
    MemberResponse toResponse(Member member);
}
```

### @Mapping 속성 정리

| 속성 | 설명 | 예시 |
|---|---|---|
| `source` | 소스 객체의 필드명 | `source = "userName"` |
| `target` | 타겟 객체의 필드명 | `target = "name"` |
| `ignore` | 해당 필드 매핑 무시 | `ignore = true` |
| `constant` | 상수 값 지정 | `constant = "ACTIVE"` |
| `expression` | Java 표현식 사용 | `expression = "java(LocalDateTime.now())"` |
| `defaultValue` | null일 때 기본값 | `defaultValue = "Unknown"` |

---

## 6. 여러 객체 → 하나로 합치기

> **한 줄 정의:** 두 개 이상의 소스 객체를 하나의 DTO로 합칠 수 있다

```java
@Getter
@Builder
public class User {
    private Long id;
    private String name;
}

@Getter
@Builder
public class Address {
    private String city;
    private String zipCode;
}

@Getter
@Builder
public class UserDetailResponse {
    private Long id;
    private String name;
    private String city;
    private String zipCode;
}
```

```java
@Mapper(componentModel = "spring")
public interface UserDetailMapper {

    @Mapping(source = "user.id", target = "id")
    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "address.city", target = "city")
    @Mapping(source = "address.zipCode", target = "zipCode")
    UserDetailResponse toDetailResponse(User user, Address address);
}
```

```java
// Service에서 사용
UserDetailResponse detail = userDetailMapper.toDetailResponse(user, address);
```

---

## 7. 컬렉션 매핑 (List 변환)

> **한 줄 정의:** 단건 매핑 메서드만 정의하면 List 매핑도 자동!

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    // 단건 매핑
    UserResponse toResponse(User user);

    // List 매핑 — 내부적으로 위의 toResponse()를 반복 호출!
    List<UserResponse> toResponseList(List<User> users);
}
```

```java
// Service에서 사용
public List<UserResponse> getAllUsers() {
    List<User> users = userRepository.findAll();
    return userMapper.toResponseList(users);  // 한 줄로 전체 변환!
}
```

> 💡 **단건 매핑 메서드가 있으면 List 매핑은 자동으로 그걸 재사용한다!** 따로 로직을 쓸 필요 없음.

---

## 8. 커스텀 변환 로직

> **한 줄 정의:** 단순 필드 복사가 아닌, 가공이 필요한 경우 직접 로직을 넣는다

### 방법 1: expression 사용

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "status", constant = "ACTIVE")
    User toEntity(UserCreateRequest request);
}
```

### 방법 2: @AfterMapping으로 후처리

```java
@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderResponse toResponse(Order order);

    // 매핑 후 추가 로직 실행
    @AfterMapping
    default void setDisplayPrice(Order order, @MappingTarget OrderResponse response) {
        // 가격에 원(₩) 포맷 추가
        response.setDisplayPrice("₩" + String.format("%,d", order.getPrice()));
    }
}
```

### 방법 3: default 메서드

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    // 커스텀 변환이 필요한 경우 default 메서드 구현
    default UserSummary toSummary(User user) {
        return UserSummary.builder()
            .id(user.getId())
            .displayName(user.getName() + " (" + user.getEmail() + ")")
            .build();
    }
}
```

---

## 9. 무시할 필드 — ignore

> **한 줄 정의:** 특정 필드를 매핑에서 제외한다

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)   // password 매핑 안 함
    @Mapping(target = "createdAt", ignore = true)  // createdAt 매핑 안 함
    @Mapping(target = "id", ignore = true)         // id는 DB에서 자동 생성
    User toEntity(UserCreateRequest request);
}
```

### 언제 ignore를 쓰나?

```
Entity에는 있지만 DTO에 없는 필드:
├─ id → DB가 자동 생성
├─ createdAt → 서버에서 설정
├─ password → Response에 포함하면 안 됨
└─ 이런 필드들을 ignore 처리
```

> ⚠️ **ignore를 안 하면?** MapStruct가 컴파일 시 경고(warning)를 낸다: "타겟에 매핑되지 않는 필드가 있습니다"

---

## 10. Update 매핑 — 기존 객체에 덮어쓰기

> **한 줄 정의:** 새 객체를 만들지 않고, 기존 Entity의 필드를 업데이트한다

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    // 기존 user 객체에 request의 값을 덮어쓰기
    @Mapping(target = "id", ignore = true)         // id는 변경 안 함
    @Mapping(target = "createdAt", ignore = true)  // 생성일도 변경 안 함
    void updateFromRequest(UserUpdateRequest request, @MappingTarget User user);
}
```

```java
// Service에서 사용
public UserResponse updateUser(Long id, UserUpdateRequest request) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));

    // 기존 user 객체를 직접 수정 (새 객체 안 만듦)
    userMapper.updateFromRequest(request, user);

    User saved = userRepository.save(user);
    return userMapper.toResponse(saved);
}
```

### @MappingTarget이란?

```
일반 매핑:    Request → 새 Entity 생성 (toEntity)
Update 매핑:  Request → 기존 Entity 수정 (@MappingTarget)

@MappingTarget = "이 객체에 값을 덮어써라"
```

---

## 11. MapStruct vs 수동 매핑 vs ModelMapper

### 비교표

| 비교 | 수동 매핑 (from/toEntity) | MapStruct | ModelMapper |
|---|---|---|---|
| **변환 시점** | 직접 코드 작성 | 컴파일 시점 자동 생성 | 런타임 리플렉션 |
| **성능** | ⭐⭐⭐ 최고 | ⭐⭐⭐ 최고 (직접 코드와 동일) | ⭐ 느림 (리플렉션) |
| **타입 안전성** | ✅ 컴파일 에러로 잡힘 | ✅ 컴파일 에러로 잡힘 | ❌ 런타임에 발견 |
| **코드량** | 많음 (필드마다 작성) | 적음 (인터페이스만) | 적음 (설정만) |
| **디버깅** | 쉬움 | 쉬움 (생성 코드 확인 가능) | 어려움 (블랙박스) |
| **학습 비용** | 없음 | 약간 | 약간 |
| **실무 사용** | 소규모 프로젝트 | ✅ **대규모 프로젝트 표준** | 레거시 |

### 결론

```
필드 3~5개 → 수동 매핑도 충분
필드 10개+ → MapStruct 추천
런타임 매핑 → ModelMapper (비추, 레거시)

실무 트렌드: MapStruct가 압도적 1위
이유: 컴파일 타임 안전성 + 성능 + 코드 자동 생성
```

---

## 12. 실전 예제: 주문 API에 적용

> 11번에서 배운 DTO + Validation에 MapStruct까지 결합

### Entity

```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Order {
    private Long id;
    private String productName;
    private int price;
    private int quantity;
    private String status;
    private LocalDateTime orderedAt;

    public int getTotalPrice() {
        return price * quantity;
    }
}
```

### DTO

```java
// Request
@Getter
@NoArgsConstructor
public class OrderCreateRequest {

    @NotBlank(message = "상품명은 필수입니다")
    private String productName;

    @Positive(message = "가격은 0보다 커야 합니다")
    private int price;

    @Min(value = 1, message = "수량은 1개 이상이어야 합니다")
    private int quantity;
}

// Response
@Getter
@Builder
public class OrderResponse {
    private Long id;
    private String productName;
    private int price;
    private int quantity;
    private int totalPrice;
    private String status;
    private LocalDateTime orderedAt;
}
```

### Mapper

```java
@Mapper(componentModel = "spring")
public interface OrderMapper {

    // Request → Entity (id, status, orderedAt은 서버에서 설정)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "orderedAt", expression = "java(java.time.LocalDateTime.now())")
    Order toEntity(OrderCreateRequest request);

    // Entity → Response (totalPrice는 getTotalPrice() 자동 매핑)
    OrderResponse toResponse(Order order);

    // List 변환
    List<OrderResponse> toResponseList(List<Order> orders);
}
```

### Service

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;  // MapStruct!

    public OrderResponse createOrder(OrderCreateRequest request) {
        Order order = orderMapper.toEntity(request);      // 자동 변환!
        Order saved = orderRepository.save(order);
        log.info("주문 생성: id={}, product={}", saved.getId(), saved.getProductName());
        return orderMapper.toResponse(saved);             // 자동 변환!
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orderMapper.toResponseList(orders);        // List도 자동!
    }
}
```

### Controller

```java
@Slf4j
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(
        @RequestBody @Valid OrderCreateRequest request
    ) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
```

### Before vs After 비교

```java
// ❌ Before (수동 매핑) — Service가 변환 코드로 가득
public OrderResponse createOrder(OrderCreateRequest request) {
    Order order = Order.builder()
        .productName(request.getProductName())
        .price(request.getPrice())
        .quantity(request.getQuantity())
        .status("PENDING")
        .orderedAt(LocalDateTime.now())
        .build();
    Order saved = orderRepository.save(order);
    return OrderResponse.builder()
        .id(saved.getId())
        .productName(saved.getProductName())
        .price(saved.getPrice())
        .quantity(saved.getQuantity())
        .totalPrice(saved.getTotalPrice())
        .status(saved.getStatus())
        .orderedAt(saved.getOrderedAt())
        .build();
}

// ✅ After (MapStruct) — Service는 비즈니스 로직에만 집중
public OrderResponse createOrder(OrderCreateRequest request) {
    Order order = orderMapper.toEntity(request);
    Order saved = orderRepository.save(order);
    return orderMapper.toResponse(saved);
}
```

---

## 13. 실습 퀴즈

### 퀴즈 1: Mapper 인터페이스 완성하기

아래 Entity와 DTO가 주어졌을 때, Mapper를 완성해보세요.

```java
// Entity
@Getter @Builder
public class Product {
    private Long id;
    private String productName;
    private int productPrice;
    private String category;
    private LocalDateTime registeredAt;
}

// Response DTO
@Getter @Builder
public class ProductResponse {
    private Long id;
    private String name;       // ← productName과 다름!
    private int price;         // ← productPrice와 다름!
    private String category;
    private LocalDateTime registeredAt;
}

// TODO: Mapper를 작성하세요
@Mapper(componentModel = "spring")
public interface ProductMapper {
    // 여기에 메서드를 작성!
}
```

<details>
<summary>💡 정답 보기</summary>

```java
@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "productName", target = "name")
    @Mapping(source = "productPrice", target = "price")
    ProductResponse toResponse(Product product);

    List<ProductResponse> toResponseList(List<Product> products);
}
```

**포인트:**
- `productName → name`, `productPrice → price`는 이름이 다르므로 `@Mapping` 필수
- `category`, `registeredAt`은 이름이 같으므로 자동 매핑
- List 변환은 단건 메서드를 재사용

</details>

---

### 퀴즈 2: 이 Mapper의 문제점을 찾아라

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserCreateRequest request);

    UserResponse toResponse(User user);
}
```

Entity에는 `id`, `createdAt`, `password` 필드가 있고, UserCreateRequest에는 없습니다.

<details>
<summary>💡 정답 보기</summary>

```
문제: toEntity()에서 id, createdAt이 매핑되지 않아 컴파일 경고 발생

해결:
@Mapping(target = "id", ignore = true)
@Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
User toEntity(UserCreateRequest request);

toResponse()에서도 password가 UserResponse에 없다면:
→ 자동으로 무시되므로 OK (타겟에 없는 필드는 매핑 안 함)
→ 하지만 소스(User)에 password가 있고 타겟(UserResponse)에 없으면
   경고가 날 수 있음 → 명시적으로 ignore 하는 게 깔끔
```

</details>

---

### 퀴즈 3: 수동 매핑을 MapStruct로 바꿔보기

아래 수동 매핑 코드를 MapStruct Mapper로 변환해보세요.

```java
// 수동 매핑 — 이걸 MapStruct로 바꿔보세요
public static BookResponse from(Book book) {
    return BookResponse.builder()
        .id(book.getId())
        .title(book.getBookTitle())      // 필드명 다름!
        .author(book.getAuthorName())    // 필드명 다름!
        .price(book.getPrice())
        .publishedAt(book.getPublishedAt())
        .build();
}
```

<details>
<summary>💡 정답 보기</summary>

```java
@Mapper(componentModel = "spring")
public interface BookMapper {

    @Mapping(source = "bookTitle", target = "title")
    @Mapping(source = "authorName", target = "author")
    BookResponse toResponse(Book book);
}
```

**포인트:**
- `bookTitle → title`, `authorName → author`만 `@Mapping` 필요
- `id`, `price`, `publishedAt`은 이름이 같으므로 자동

</details>

---

## 14. 면접 대비 한 줄 요약

| 질문 | 답변 |
|---|---|
| MapStruct란? | 컴파일 시점에 DTO↔Entity 변환 코드를 자동 생성하는 매핑 라이브러리 |
| MapStruct의 동작 원리는? | 어노테이션 프로세서가 컴파일 시 Mapper 인터페이스를 보고 구현 클래스를 자동 생성 |
| MapStruct vs ModelMapper? | MapStruct는 컴파일 타임(빠르고 안전), ModelMapper는 런타임 리플렉션(느리고 위험) |
| @Mapping은 언제 쓰나? | 소스와 타겟의 필드명이 다를 때 명시적으로 매핑 지정 |
| @MappingTarget은? | 새 객체를 만들지 않고 기존 객체의 필드를 업데이트할 때 사용 |
| componentModel = "spring"은? | 생성된 Mapper를 Spring Bean으로 등록, @RequiredArgsConstructor로 주입 |
| Lombok과 같이 쓸 때 주의점? | lombok-mapstruct-binding 의존성 추가 필수, 어노테이션 프로세서 순서 중요 |
| 필드가 적을 때도 MapStruct를 써야 하나? | 필드 3~5개면 수동 매핑도 충분, 10개 이상이면 MapStruct 권장 |

---

## 다음 수업 예고

> **13. ResponseEntity와 API 응답 표준화** — 공통 응답 포맷, 성공/실패 통일, 페이징 응답 설계
>
> 💡 지금까지 API마다 응답 형태가 달랐는데... 모든 API가 같은 포맷으로 응답하게 만든다!
