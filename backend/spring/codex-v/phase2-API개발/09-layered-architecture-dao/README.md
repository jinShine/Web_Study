# 09. Layered 아키텍처와 DAO 패턴

> 오늘의 목표: 컨트롤러, 서비스, 저장소를 왜 나누는지 "예쁘게 보이려고"가 아니라 책임 분리 관점에서 이해한다.

---

## 오늘 끝나면 되는 것

- Controller, Service, Repository 계층의 책임을 구분할 수 있다.
- Controller가 Repository를 직접 호출하면 왜 위험한지 설명할 수 있다.
- DAO와 Repository 용어 차이를 큰 흐름에서 이해한다.
- 패키지 구조를 왜 기능 기준으로 나누는지 감각이 생긴다.

---

## 머릿속 그림

```text
Controller -> Service -> Repository
```

의존 방향은 위에서 아래로만 갑니다.

- Controller: HTTP 입구
- Service: 비즈니스 규칙
- Repository/DAO: 데이터 접근

---

## 계층을 나누는 이유

### Controller 역할

- 요청 받기
- DTO 바인딩
- 응답 반환
- HTTP 의미 다루기

### Service 역할

- 유즈케이스 처리
- 검증과 규칙 적용
- 여러 저장소/외부 시스템 조합

### Repository 역할

- 데이터 저장/조회
- DB, 파일, 메모리 저장소 같은 인프라 접근

---

## 나쁜 구조 예시

```java
@RestController
public class StudyController {

    private final StudyRepository repository;

    @PostMapping("/studies")
    public Study create(@RequestBody Study request) {
        if (request.getTitle().length() < 2) {
            throw new IllegalArgumentException("title too short");
        }
        return repository.save(request);
    }
}
```

문제:

- HTTP 처리와 비즈니스 규칙이 섞임
- 검증 재사용이 어려움
- 테스트 포인트가 뒤엉킴

---

## 더 나은 구조

```java
@RestController
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;

    @PostMapping("/studies")
    public StudyResponse create(@RequestBody StudyCreateRequest request) {
        return studyService.create(request);
    }
}
```

```java
@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;

    public StudyResponse create(StudyCreateRequest request) {
        if (request.title().length() < 2) {
            throw new BusinessException(ErrorCode.INVALID_INPUT);
        }
        return studyRepository.save(request.toEntity());
    }
}
```

---

## DAO vs Repository

초급 단계에서는 거의 비슷하게 봐도 됩니다.

- DAO: 데이터 접근 로직에 초점
- Repository: 도메인 관점에서 컬렉션처럼 다루는 느낌

실무에서는 팀 문화에 따라 섞어 쓰기도 합니다.

중요한 건 이름보다 책임입니다.

---

## 패키지 구조 감각

기능 중심 패키지가 보통 유지보수에 유리합니다.

```text
studylog
├── controller
├── service
├── repository
├── dto
└── entity
```

기능별로 묶으면 같은 도메인 파일을 찾기 쉽습니다.

---

## 자주 하는 실수

- Controller에서 비즈니스 규칙을 처리하는 것
- Service가 HTTP 세부사항까지 아는 것
- Repository에서 비즈니스 판단을 하는 것
- 계층은 나눴지만 실제로는 한 계층이 모든 걸 하는 것

---

## 면접 체크

1. Layered Architecture를 왜 사용하나요?
2. Controller, Service, Repository 각각의 책임은 무엇인가요?
3. Controller가 Repository를 직접 호출하면 어떤 문제가 생기나요?
4. DAO와 Repository는 어떻게 다르게 이해하면 되나요?

---

## 직접 해보기

1. 하나의 API를 계층 없이 먼저 만든 뒤, 계층 구조로 다시 나눠보세요.
2. Service에서만 비즈니스 예외를 던지도록 구조를 정리해보세요.
3. Controller 테스트와 Service 테스트가 어떻게 달라지는지 생각해보세요.

---

## 다음 주제 연결

계층 구조가 잡히면 보일러플레이트 코드가 많아집니다. 다음에는 Lombok으로 반복 코드를 줄이되, 어디까지 써야 안전한지 봅니다.
