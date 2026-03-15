# 14. 파일 업로드/다운로드

> 오늘의 목표: JSON만 다루던 API에서 벗어나 파일을 안전하게 업로드하고 다운로드하는 기본기를 익힌다.

---

## 오늘 끝나면 되는 것

- `MultipartFile`이 무엇인지 설명할 수 있다.
- 업로드 파일을 저장할 때 UUID 파일명 전략을 사용할 수 있다.
- `Resource`를 이용한 다운로드 응답을 만들 수 있다.
- 경로 조작(Path Traversal) 같은 기본 보안 포인트를 이해한다.

---

## 머릿속 그림

```text
업로드:
클라이언트 -> multipart/form-data -> MultipartFile -> 저장

다운로드:
파일 경로 -> Resource -> HTTP 응답
```

---

## 업로드 기본 예제

```java
@PostMapping("/files")
public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
    String storedFileName = fileService.store(file);
    return ResponseEntity.status(HttpStatus.CREATED).body(storedFileName);
}
```

서비스 예시:

```java
public String store(MultipartFile file) {
    String originalName = file.getOriginalFilename();
    String storedName = UUID.randomUUID() + "_" + originalName;
    Path target = Paths.get(uploadDir).resolve(storedName);
    file.transferTo(target);
    return storedName;
}
```

---

## 왜 UUID 파일명을 쓰나

원본 파일명 그대로 저장하면:

- 같은 이름 충돌
- 특수문자 문제
- 보안상 위험 가능

그래서 보통:

- 원본 이름은 메타데이터로 보관
- 실제 저장 이름은 UUID로 별도 생성

---

## 다운로드 기본 예제

```java
@GetMapping("/files/{fileName}")
public ResponseEntity<Resource> download(@PathVariable String fileName) throws MalformedURLException {
    Resource resource = fileService.loadAsResource(fileName);
    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
            .body(resource);
}
```

`Content-Disposition`이 있어야 브라우저가 다운로드 파일로 인식하기 쉽습니다.

---

## 설정도 같이 봐야 한다

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 20MB
```

파일 업로드는 코드뿐 아니라 설정도 중요합니다.

---

## 보안 관점 기본 체크

- 파일명 그대로 경로 합치지 않기
- `../` 같은 경로 조작 문자 검사하기
- 허용 가능한 확장자/용량 제한하기
- 실행 파일 업로드에 주의하기

처음부터 완벽한 보안까지 갈 필요는 없지만,
기본 위험은 알아야 합니다.

---

## 자주 하는 실수

- 업로드 디렉터리를 하드코딩하는 것
- 원본 파일명 그대로 저장하는 것
- 다운로드 시 파일 존재 여부를 확인하지 않는 것
- 파일 크기 제한 없이 받는 것

---

## 면접 체크

1. `MultipartFile`은 무엇인가요?
2. 파일 저장 시 UUID 전략을 쓰는 이유는 무엇인가요?
3. 파일 다운로드 응답에서 중요한 헤더는 무엇인가요?
4. 파일 업로드에서 기본적으로 주의해야 할 보안 포인트는 무엇인가요?

---

## 직접 해보기

1. 단일 파일 업로드 API를 구현해보세요.
2. 원본 파일명과 저장 파일명을 분리해 관리해보세요.
3. 존재하지 않는 파일 다운로드 요청에 404 응답을 주도록 해보세요.

---

## 다음 주제 연결

API가 많아지면 직접 설명하기 어려워집니다. 다음에는 Swagger UI와 SpringDoc으로 문서와 테스트 환경을 같이 만듭니다.
