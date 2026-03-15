# 10. Lombok 활용

> 오늘의 목표: Lombok을 "편한 마법"이 아니라, 생성되는 코드를 알고 선택적으로 쓰는 도구로 이해한다.

---

## 오늘 끝나면 되는 것

- Lombok이 어떤 코드를 대신 생성하는지 설명할 수 있다.
- `@Getter`, `@Builder`, `@RequiredArgsConstructor`, `@Slf4j`를 실무적으로 사용할 수 있다.
- `@Data`를 아무 데나 쓰면 왜 위험한지 말할 수 있다.
- Entity와 DTO에서 추천 조합이 다르다는 걸 이해한다.

---

## 머릿속 그림

Lombok은 코드를 "없애는" 것이 아니라,
컴파일 시점에 "생성해주는" 것입니다.

즉:

- 눈에 안 보일 뿐 코드가 존재한다
- 그래서 생성되는 내용을 모르면 사고 난다

---

## 자주 쓰는 어노테이션

### `@Getter`

```java
@Getter
public class StudyResponse {
    private Long id;
    private String title;
}
```

### `@RequiredArgsConstructor`

```java
@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
}
```

`final` 필드나 `@NonNull` 필드만 생성자에 포함됩니다.

### `@Builder`

```java
@Getter
@Builder
public class StudyResponse {
    private Long id;
    private String title;
}
```

### `@Slf4j`

```java
@Slf4j
public class StudyController {
}
```

---

## 추천 조합

### Request DTO

- `@Getter`
- `@NoArgsConstructor`

### Response DTO

- `@Getter`
- `@Builder`

### Service / Controller

- `@RequiredArgsConstructor`
- `@Slf4j`

### Entity

무조건 외우기보다 원칙으로 생각합니다.

- 꼭 필요한 어노테이션만
- `@Setter` 남발 금지
- `@Data` 지양

---

## 왜 `@Data`를 조심해야 하나

`@Data`는 아래를 한 번에 생성합니다.

- getter
- setter
- toString
- equals
- hashCode
- requiredArgsConstructor

편해 보이지만:

- 객체가 너무 쉽게 변경됨
- 양방향 연관관계가 있으면 `toString` 문제 가능
- equals/hashCode가 의도와 다르게 동작할 수 있음

초급 단계에서는 DTO에 한정적으로 쓰는 경우도 있지만,
Entity에는 특히 더 조심하는 것이 좋습니다.

---

## Lombok과 디버깅

가끔 "분명 생성자 없는데 왜 주입되지?" 같은 혼란이 옵니다.

그럴 때는 기억하세요.

> Lombok이 대신 생성했을 뿐, 없는 코드가 아니다.

IDE에서 Delombok 기능이나 생성된 메서드 힌트를 보는 습관이 좋습니다.

---

## 자주 하는 실수

- `@Data`를 Entity, DTO, 설정 클래스에 전부 붙이는 것
- `@Builder` 때문에 기본 생성자가 사라지는 문제를 이해하지 못하는 것
- Lombok을 썼더니 안 보인다는 이유로 구조를 더 깊게 이해하지 않는 것

---

## 면접 체크

1. Lombok을 사용하는 이유는 무엇인가요?
2. `@RequiredArgsConstructor`가 생성하는 대상은 무엇인가요?
3. `@Data`를 조심해야 하는 이유는 무엇인가요?

---

## 직접 해보기

1. `@RequiredArgsConstructor`를 이용해 서비스 주입 코드를 정리해보세요.
2. Response DTO를 `@Builder` 기반으로 만들어보세요.
3. DTO에 `@Data`를 붙였다가 필요한 어노테이션만 남기는 방식으로 바꿔보세요.

---

## 다음 주제 연결

이제 코드를 덜 쓰는 도구를 알았으니, 다음에는 클라이언트와 주고받는 데이터를 더 안전하게 분리하는 DTO와 Validation으로 넘어갑니다.
