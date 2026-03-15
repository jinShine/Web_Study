# 13. ResponseEntity와 API 응답 표준화

> 오늘의 목표: 상태 코드, 헤더, 본문을 명확하게 제어하고 팀 차원의 응답 포맷을 설계할 수 있다.

---

## 오늘 끝나면 되는 것

- `ResponseEntity`를 왜 쓰는지 설명할 수 있다.
- 상태 코드와 헤더를 직접 제어할 수 있다.
- 공통 응답 래퍼(`ApiResponse<T>`)를 설계할 수 있다.
- 성공 응답과 에러 응답을 같은 철학으로 맞출 수 있다.

---

## 머릿속 그림

단순 객체 반환:

```text
본문만 신경 씀
```

`ResponseEntity` 반환:

```text
상태 코드 + 헤더 + 본문을 모두 명시적으로 제어
```

---

## 언제 쓰면 좋은가

- 생성 시 201을 내려야 할 때
- 삭제 시 204를 내려야 할 때
- Location 헤더를 넣고 싶을 때
- 공통 응답 포맷을 유지하고 싶을 때

---

## 기본 예제

```java
@GetMapping("/studies/{id}")
public ResponseEntity<StudyResponse> findById(@PathVariable Long id) {
    return ResponseEntity.ok(service.findById(id));
}
```

생성 API:

```java
@PostMapping("/studies")
public ResponseEntity<StudyResponse> create(@RequestBody StudyCreateRequest request) {
    StudyResponse response = service.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
```

삭제 API:

```java
@DeleteMapping("/studies/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
}
```

---

## 공통 응답 포맷 만들기

```java
@Getter
@Builder
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
}
```

사용 예:

```java
return ResponseEntity.ok(
        ApiResponse.<StudyResponse>builder()
                .status(200)
                .message("조회 성공")
                .data(response)
                .build()
);
```

장점:

- 프론트엔드가 일관된 구조를 기대할 수 있음
- 메시지와 메타데이터를 같이 담기 쉬움

단점도 있습니다.

- 너무 무겁게 만들면 단순 API까지 과해질 수 있음

그래서 팀 기준이 중요합니다.

---

## 헤더를 다뤄보자

생성 API에서는 `Location` 헤더도 자주 씁니다.

```java
URI location = URI.create("/studies/" + response.getId());
return ResponseEntity.created(location).body(response);
```

이런 부분이 REST 설계 감각과 연결됩니다.

---

## 자주 하는 실수

- 모든 API를 무조건 `ResponseEntity.ok()`로 감싸는 것
- 생성 API인데 200만 사용하는 것
- 에러 응답 포맷과 성공 응답 포맷 철학이 다른 것
- `ApiResponse`를 너무 복잡하게 설계하는 것

---

## 면접 체크

1. `ResponseEntity`를 왜 사용하나요?
2. 단순 객체 반환과 `ResponseEntity` 반환은 어떤 차이가 있나요?
3. 공통 응답 포맷을 사용하는 이유와 주의점은 무엇인가요?

---

## 직접 해보기

1. 조회, 생성, 삭제 API를 각각 다른 상태 코드로 반환해보세요.
2. `ApiResponse<T>`를 만들어서 성공 응답을 감싸보세요.
3. 생성 API에 `Location` 헤더를 넣어보세요.

---

## 다음 주제 연결

이제 JSON 중심 응답 외에도 바이너리 데이터를 주고받는 파일 업로드/다운로드로 영역을 넓혀봅니다.
