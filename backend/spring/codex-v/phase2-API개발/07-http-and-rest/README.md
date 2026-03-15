# 07. HTTP 기초와 REST 설계 원칙

> 오늘의 목표: "동작하는 API"를 넘어서 "의미가 맞는 API"를 설계하는 기준을 익힌다.

---

## 오늘 끝나면 되는 것

- HTTP Method 의미를 설명할 수 있다.
- 상태 코드와 응답 의미를 연결할 수 있다.
- URI를 동사 대신 리소스 중심으로 설계할 수 있다.
- 멱등성(idempotent) 개념을 말할 수 있다.

---

## 머릿속 그림

REST를 처음 배울 때 흔히 URL만 예쁘게 만드는 것으로 오해합니다.

하지만 실제 핵심은 아래 3개입니다.

1. 리소스를 URI로 표현한다
2. 행위는 HTTP Method로 표현한다
3. 결과는 상태 코드와 응답 본문으로 표현한다

---

## Method 감각부터 잡기

| Method | 의미 | 예시 |
|---|---|---|
| GET | 조회 | 학습 기록 목록 조회 |
| POST | 생성 | 학습 기록 생성 |
| PUT | 전체 수정 | 게시글 전체 덮어쓰기 |
| PATCH | 부분 수정 | 제목만 변경 |
| DELETE | 삭제 | 학습 기록 삭제 |

핵심 질문:

> "이 요청은 무엇을 하려는가?"가 아니라 "이 요청은 어떤 리소스 상태를 바꾸는가?"로 생각하기

---

## URI는 리소스 중심

### 나쁜 예

- `POST /createStudy`
- `GET /getStudyList`
- `POST /deleteStudy/1`

### 좋은 예

- `POST /studies`
- `GET /studies`
- `GET /studies/{id}`
- `PATCH /studies/{id}`
- `DELETE /studies/{id}`

URI는 명사, 동작은 Method.

이 원칙 하나만 지켜도 API 품질이 많이 올라갑니다.

---

## 상태 코드는 계약이다

| 상황 | 권장 코드 |
|---|---|
| 조회 성공 | 200 OK |
| 생성 성공 | 201 Created |
| 수정 성공 | 200 OK 또는 204 No Content |
| 삭제 성공 | 204 No Content |
| 잘못된 요청 | 400 Bad Request |
| 인증 안 됨 | 401 Unauthorized |
| 권한 없음 | 403 Forbidden |
| 데이터 없음 | 404 Not Found |

예를 들어 생성 API라면:

```java
@PostMapping("/studies")
public ResponseEntity<StudyResponse> create(@RequestBody StudyCreateRequest request) {
    StudyResponse response = service.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
```

---

## 멱등성은 왜 중요할까

같은 요청을 여러 번 보냈을 때 결과가 같다면 멱등하다고 합니다.

- GET: 보통 멱등
- PUT: 멱등
- DELETE: 보통 멱등하게 설계
- POST: 일반적으로 비멱등

면접에서 자주 나옵니다.

> PUT은 같은 요청을 여러 번 보내도 같은 상태를 만든다는 점에서 멱등하지만, POST는 보통 새 리소스를 계속 만들기 때문에 비멱등합니다.

---

## REST를 너무 엄격하게 볼 필요는 없다

실무에서는 완벽한 REST보다 "일관성"이 더 중요합니다.

예:

- `/users/{id}/profile-image`
- `/orders/{id}/cancel`

이런 URI도 도메인에 따라 충분히 합리적일 수 있습니다.

핵심은:

- 팀 내 규칙이 일관적인가
- 소비자 입장에서 예측 가능한가

---

## 자주 하는 실수

- URI에 동사를 넣는 것
- 생성 API에 200만 무조건 쓰는 것
- 조회 실패를 200과 빈 문자열로 처리하는 것
- PUT/PATCH 차이를 전혀 고려하지 않는 것

---

## 면접 체크

1. RESTful API란 무엇인가요?
2. GET과 POST의 차이는 무엇인가요?
3. 멱등성이란 무엇이고 왜 중요한가요?
4. `POST /users/create`보다 `POST /users`가 좋은 이유는 무엇인가요?

---

## 직접 해보기

1. 임의의 "학습 기록 API"를 REST 스타일로 다시 설계해보세요.
2. 각 API에 적절한 상태 코드를 붙여보세요.
3. PUT과 PATCH를 둘 다 설계해보고 차이를 문장으로 설명해보세요.

---

## 다음 주제 연결

REST 원칙을 알았다면, 이제 Spring MVC가 실제로 요청을 어떻게 받아서 컨트롤러 메서드에 연결하는지 이해할 차례입니다.
