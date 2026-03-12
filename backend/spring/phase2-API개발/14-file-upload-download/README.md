# 14. 파일 업로드/다운로드

> **한 줄 정의:** Spring의 MultipartFile로 클라이언트 파일을 받고, Resource로 파일을 내려주며, 저장 전략에 따라 로컬/클라우드에 관리한다

---

## 목차
1. [파일 업로드 기본 개념](#1-파일-업로드-기본-개념)
2. [MultipartFile — 업로드 처리](#2-multipartfile--업로드-처리)
3. [파일 저장 전략](#3-파일-저장-전략)
4. [파일명 충돌 방지 — UUID 활용](#4-파일명-충돌-방지--uuid-활용)
5. [파일 다운로드 — Resource와 Content-Disposition](#5-파일-다운로드--resource와-content-disposition)
6. [파일 삭제](#6-파일-삭제)
7. [이미지 미리보기 (Inline 응답)](#7-이미지-미리보기-inline-응답)
8. [다중 파일 업로드](#8-다중-파일-업로드)
9. [파일 업로드 설정 — 크기 제한과 예외 처리](#9-파일-업로드-설정--크기-제한과-예외-처리)
10. [실전 예제: 게시글 첨부파일 API](#10-실전-예제-게시글-첨부파일-api)
11. [저장 전략 비교표](#11-저장-전략-비교표)
12. [실습 퀴즈](#12-실습-퀴즈)
13. [면접 대비 한 줄 요약](#13-면접-대비-한-줄-요약)

---

## 1. 파일 업로드 기본 개념

> **한 줄 정의:** 클라이언트가 `multipart/form-data` 형식으로 파일을 보내면, 서버가 이를 받아서 저장하는 과정

### HTTP 요청 흐름

```
[클라이언트]                          [서버]
    |                                    |
    |  POST /api/files                   |
    |  Content-Type: multipart/form-data |
    |  ┌─────────────────┐               |
    |  │ file: image.png │ ──────────>   | MultipartFile로 수신
    |  │ (binary data)   │               | → 파일 저장
    |  └─────────────────┘               | → 저장 경로 반환
    |                                    |
    |  <── 200 OK {"url": "/files/..."}  |
```

### 왜 `multipart/form-data`인가?

| Content-Type | 용도 | 파일 전송 |
|---|---|---|
| `application/json` | JSON 데이터 | ❌ 바이너리 불가 |
| `application/x-www-form-urlencoded` | 폼 데이터 | ❌ 텍스트만 |
| **`multipart/form-data`** | **폼 + 파일** | **✅ 바이너리 가능** |

---

## 2. MultipartFile — 업로드 처리

> **한 줄 정의:** Spring이 제공하는 업로드 파일 추상화 인터페이스로, 파일명·크기·바이너리 데이터에 접근할 수 있다

### 주요 메서드

| 메서드 | 반환 타입 | 설명 |
|---|---|---|
| `getOriginalFilename()` | `String` | 클라이언트가 보낸 원본 파일명 |
| `getContentType()` | `String` | MIME 타입 (image/png 등) |
| `getSize()` | `long` | 파일 크기 (bytes) |
| `isEmpty()` | `boolean` | 파일이 비어있는지 |
| `getBytes()` | `byte[]` | 파일 바이너리 데이터 |
| `getInputStream()` | `InputStream` | 파일 스트림 |
| `transferTo(File dest)` | `void` | 지정 경로에 파일 저장 |

### 기본 업로드 Controller

```java
@RestController
@RequestMapping("/api/files")
public class FileController {

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file") MultipartFile file) {

        // 1. 빈 파일 체크
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어있습니다");
        }

        // 2. 파일 정보 확인
        String originalName = file.getOriginalFilename();
        String contentType = file.getContentType();
        long size = file.getSize();

        // 3. 저장 (일단 간단하게)
        File dest = new File("/uploads/" + originalName);
        file.transferTo(dest);

        return ResponseEntity.ok("업로드 완료: " + originalName);
    }
}
```

> ⚠️ 위 코드는 이해용! 실전에서는 파일명 충돌, 경로 보안 등 추가 처리가 필요하다

---

## 3. 파일 저장 전략

> **한 줄 정의:** 파일을 어디에, 어떤 구조로 저장할 것인가에 대한 설계

### 전략 1: 로컬 파일 시스템 (개발/소규모)

```java
@Service
public class LocalFileService {

    private final Path uploadDir = Paths.get("uploads");

    @PostConstruct
    public void init() {
        // 애플리케이션 시작 시 uploads 폴더 생성
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("업로드 폴더 생성 실패", e);
        }
    }

    public String save(MultipartFile file) throws IOException {
        // UUID로 고유 파일명 생성
        String savedName = UUID.randomUUID() + getExtension(file.getOriginalFilename());

        // 저장
        Path targetPath = uploadDir.resolve(savedName);
        file.transferTo(targetPath.toFile());

        return savedName;
    }

    private String getExtension(String filename) {
        // "photo.png" → ".png"
        int dotIndex = filename.lastIndexOf(".");
        return (dotIndex == -1) ? "" : filename.substring(dotIndex);
    }
}
```

### 전략 2: 날짜별 디렉토리 (중규모)

```java
public String save(MultipartFile file) throws IOException {
    // 날짜별 폴더: uploads/2026/03/12/
    String datePath = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    Path targetDir = uploadDir.resolve(datePath);
    Files.createDirectories(targetDir);

    String savedName = UUID.randomUUID() + getExtension(file.getOriginalFilename());
    Path targetPath = targetDir.resolve(savedName);
    file.transferTo(targetPath.toFile());

    // "2026/03/12/abc-123.png" 반환
    return datePath + "/" + savedName;
}
```

### 전략 3: 클라우드 스토리지 (대규모/프로덕션)

```java
// AWS S3 예시 (개념만)
@Service
public class S3FileService {

    private final S3Client s3Client;
    private final String bucketName = "my-app-files";

    public String save(MultipartFile file) throws IOException {
        String key = "uploads/" + UUID.randomUUID() + getExtension(file.getOriginalFilename());

        s3Client.putObject(
            PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .build(),
            RequestBody.fromInputStream(file.getInputStream(), file.getSize())
        );

        return key;  // S3 key 반환
    }
}
```

---

## 4. 파일명 충돌 방지 — UUID 활용

> **한 줄 정의:** 원본 파일명 대신 UUID 기반 이름으로 저장하여 중복·보안 문제를 방지한다

### 왜 원본 파일명을 그대로 쓰면 안 되나?

```
❌ 문제 상황
유저A: profile.png 업로드 → /uploads/profile.png
유저B: profile.png 업로드 → /uploads/profile.png  ← 덮어쓰기 발생!
```

```
✅ UUID 사용
유저A: profile.png → /uploads/550e8400-e29b-41d4-a716-446655440000.png
유저B: profile.png → /uploads/6ba7b810-9dad-11d1-80b4-00c04fd430c8.png
```

### 원본 파일명은 어디에?

DB에 저장하고, 다운로드할 때 원래 이름으로 내려준다:

```java
@Entity
public class FileEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalName;   // 원본명: "이력서_최종.pdf"
    private String savedName;      // 저장명: "550e8400-...pdf"
    private String contentType;    // "application/pdf"
    private long fileSize;         // 1048576 (bytes)
    private String filePath;       // "2026/03/12/550e8400-...pdf"
}
```

---

## 5. 파일 다운로드 — Resource와 Content-Disposition

> **한 줄 정의:** 서버의 파일을 Resource로 감싸서, Content-Disposition 헤더로 브라우저의 다운로드 동작을 제어한다

### Resource란?

| 구현체 | 설명 | 용도 |
|---|---|---|
| `FileSystemResource` | 로컬 파일 시스템 | 일반 파일 |
| `UrlResource` | URL 기반 리소스 | 원격/로컬 경로 |
| `ClassPathResource` | classpath 리소스 | 정적 리소스 |
| `InputStreamResource` | InputStream 감싸기 | 스트림 데이터 |
| `ByteArrayResource` | byte[] 감싸기 | 메모리 데이터 |

### Content-Disposition 헤더

| 값 | 동작 |
|---|---|
| `attachment; filename="파일명"` | 다운로드 대화상자 표시 |
| `inline` | 브라우저에서 직접 열기 (이미지, PDF 등) |

### 다운로드 API 구현

```java
@GetMapping("/download/{fileId}")
public ResponseEntity<Resource> download(@PathVariable Long fileId) throws IOException {
    // 1. DB에서 파일 정보 조회
    FileEntity fileEntity = fileRepository.findById(fileId)
            .orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다"));

    // 2. 실제 파일 로드
    Path filePath = Paths.get("uploads").resolve(fileEntity.getFilePath());
    Resource resource = new UrlResource(filePath.toUri());

    if (!resource.exists()) {
        throw new FileNotFoundException("파일이 존재하지 않습니다");
    }

    // 3. 한글 파일명 인코딩 (깨짐 방지)
    String encodedName = URLEncoder.encode(fileEntity.getOriginalName(), StandardCharsets.UTF_8)
            .replace("+", "%20");

    // 4. 다운로드 응답
    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(fileEntity.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename*=UTF-8''" + encodedName)
            .body(resource);
}
```

### 핵심 포인트: `filename*=UTF-8''`

```
❌ filename="이력서.pdf"           → 한글 깨질 수 있음
✅ filename*=UTF-8''%EC%9D%B4...   → RFC 5987 표준, 한글 안전
```

---

## 6. 파일 삭제

> **한 줄 정의:** DB 레코드와 실제 파일을 함께 삭제하여 고아 파일(orphan file)을 방지한다

```java
public void delete(Long fileId) throws IOException {
    // 1. DB에서 파일 정보 조회
    FileEntity fileEntity = fileRepository.findById(fileId)
            .orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다"));

    // 2. 실제 파일 삭제
    Path filePath = Paths.get("uploads").resolve(fileEntity.getFilePath());
    Files.deleteIfExists(filePath);

    // 3. DB 레코드 삭제
    fileRepository.delete(fileEntity);
}
```

> ⚠️ **주의:** DB 삭제 후 파일 삭제가 실패하면 고아 파일이 생긴다. 순서를 **파일 먼저 → DB 나중에** 하거나, 트랜잭션을 고려해야 한다

### 고아 파일 방지 전략

| 전략 | 방식 | 장점 |
|---|---|---|
| 파일 먼저 삭제 | 파일 삭제 → DB 삭제 | 고아 파일 방지 |
| Soft Delete | `deleted = true` 플래그만 설정 | 복구 가능, 안전 |
| 스케줄러 정리 | 주기적으로 DB에 없는 파일 정리 | 깔끔하지만 지연 |

---

## 7. 이미지 미리보기 (Inline 응답)

> **한 줄 정의:** `Content-Disposition: inline`으로 응답하면 브라우저가 파일을 다운로드 대신 직접 표시한다

```java
@GetMapping("/images/{fileId}")
public ResponseEntity<Resource> viewImage(@PathVariable Long fileId) throws IOException {
    FileEntity fileEntity = fileRepository.findById(fileId)
            .orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다"));

    Path filePath = Paths.get("uploads").resolve(fileEntity.getFilePath());
    Resource resource = new UrlResource(filePath.toUri());

    return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(fileEntity.getContentType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline")  // ← 핵심!
            .body(resource);
}
```

### attachment vs inline

```
attachment → 브라우저: "이 파일 다운로드할래요?" (저장 대화상자)
inline     → 브라우저: 직접 보여줌 (이미지, PDF 등)
```

```html
<!-- 프론트에서 이미지 미리보기 활용 -->
<img src="/api/files/images/1" alt="프로필 사진" />
```

---

## 8. 다중 파일 업로드

> **한 줄 정의:** `List<MultipartFile>`로 여러 파일을 한 번에 받아 처리한다

```java
@PostMapping("/upload/multiple")
public ResponseEntity<List<String>> uploadMultiple(
        @RequestParam("files") List<MultipartFile> files) {

    // 빈 파일 필터링
    List<MultipartFile> validFiles = files.stream()
            .filter(f -> !f.isEmpty())
            .toList();

    if (validFiles.isEmpty()) {
        return ResponseEntity.badRequest().build();
    }

    // 각 파일 저장
    List<String> savedNames = new ArrayList<>();
    for (MultipartFile file : validFiles) {
        String savedName = fileService.save(file);
        savedNames.add(savedName);
    }

    return ResponseEntity.ok(savedNames);
}
```

### 파일 + JSON 동시 전송

```java
// 게시글 생성 시 본문(JSON) + 첨부파일을 동시에 받기
@PostMapping(value = "/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<PostResponse> createPost(
        @RequestPart("post") PostCreateRequest request,     // JSON 파트
        @RequestPart(value = "files", required = false)      // 파일 파트 (선택)
                List<MultipartFile> files) {

    PostResponse response = postService.create(request, files);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
```

### @RequestParam vs @RequestPart

| 어노테이션 | 용도 | 설명 |
|---|---|---|
| `@RequestParam` | 단일 파일/값 | 간단한 파라미터 |
| `@RequestPart` | JSON + 파일 혼합 | 각 파트별 Content-Type 지정 가능 |

---

## 9. 파일 업로드 설정 — 크기 제한과 예외 처리

> **한 줄 정의:** application.yml에서 업로드 크기를 제한하고, 초과 시 적절한 에러 응답을 반환한다

### application.yml 설정

```yaml
spring:
  servlet:
    multipart:
      enabled: true               # 멀티파트 활성화 (기본값: true)
      max-file-size: 10MB         # 개별 파일 최대 크기
      max-request-size: 50MB      # 전체 요청 최대 크기 (다중 파일 합산)
      file-size-threshold: 2KB    # 이 크기 이하는 메모리에, 초과하면 임시 파일로
```

### 크기 초과 예외 처리

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 개별 파일 크기 초과
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<Void>> handleMaxSizeException(
            MaxUploadSizeExceededException e) {

        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ApiResponse.error(413, "파일 크기가 제한을 초과했습니다 (최대 10MB)"));
    }
}
```

### 파일 타입 검증

```java
@Service
public class FileService {

    // 허용할 확장자
    private static final Set<String> ALLOWED_EXTENSIONS =
            Set.of(".jpg", ".jpeg", ".png", ".gif", ".pdf", ".docx");

    // 허용할 MIME 타입
    private static final Set<String> ALLOWED_CONTENT_TYPES =
            Set.of("image/jpeg", "image/png", "image/gif",
                   "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    public String save(MultipartFile file) throws IOException {
        // 1. 확장자 검증
        String extension = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new InvalidFileException("허용되지 않는 파일 형식입니다: " + extension);
        }

        // 2. MIME 타입 검증 (확장자만 믿으면 위험!)
        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new InvalidFileException("허용되지 않는 컨텐츠 타입입니다: " + file.getContentType());
        }

        // 3. 저장 진행...
        String savedName = UUID.randomUUID() + extension;
        Path targetPath = uploadDir.resolve(savedName);
        file.transferTo(targetPath.toFile());

        return savedName;
    }
}
```

> ⚠️ **확장자만 검증하면 안 되는 이유:** `malware.exe`를 `photo.jpg`로 이름만 바꿔서 업로드할 수 있다. Content-Type도 같이 확인해야 안전하다

---

## 10. 실전 예제: 게시글 첨부파일 API

> 게시글 CRUD에 파일 첨부 기능을 붙인 실전 구조

### Service 계층

```java
@Service
@RequiredArgsConstructor
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final FileRepository fileRepository;
    private final FileService fileService;

    public PostResponse create(PostCreateRequest request, List<MultipartFile> files) {
        // 1. 게시글 저장
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        postRepository.save(post);

        // 2. 첨부파일 저장
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                String savedName = fileService.save(file);

                FileEntity fileEntity = FileEntity.builder()
                        .originalName(file.getOriginalFilename())
                        .savedName(savedName)
                        .contentType(file.getContentType())
                        .fileSize(file.getSize())
                        .filePath(savedName)
                        .post(post)
                        .build();
                fileRepository.save(fileEntity);
            }
        }

        return PostResponse.from(post);
    }
}
```

### 전체 API 흐름

```
[업로드]
POST /api/posts
Content-Type: multipart/form-data
├── post: {"title": "제목", "content": "내용"}  (JSON)
└── files: image1.png, doc.pdf                   (파일)

    → PostService.create()
    → 게시글 DB 저장
    → 파일 로컬 저장 + FileEntity DB 저장
    → PostResponse 반환

[다운로드]
GET /api/files/download/{fileId}

    → DB에서 FileEntity 조회
    → 로컬 파일을 Resource로 감싸기
    → Content-Disposition: attachment 헤더 설정
    → 파일 스트림 반환

[이미지 미리보기]
GET /api/files/images/{fileId}

    → Content-Disposition: inline
    → 브라우저에서 직접 표시
```

---

## 11. 저장 전략 비교표

| | 로컬 저장 | 날짜별 디렉토리 | 클라우드(S3 등) |
|---|---|---|---|
| **난이도** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **확장성** | ❌ 서버 디스크 한계 | ❌ 동일 | ✅ 무제한 |
| **서버 분산** | ❌ 특정 서버에 종속 | ❌ 동일 | ✅ 어디서든 접근 |
| **비용** | 서버 디스크 비용 | 동일 | 저장량 기반 과금 |
| **백업** | 직접 관리 | 직접 관리 | 자동 백업/복제 |
| **적합한 상황** | 개발/학습 | 중소규모 프로젝트 | 프로덕션 서비스 |

---

## 12. 실습 퀴즈

### Q1. 아래 코드의 보안 문제를 찾아보세요

```java
@PostMapping("/upload")
public String upload(@RequestParam("file") MultipartFile file) throws IOException {
    String filename = file.getOriginalFilename();
    File dest = new File("/uploads/" + filename);
    file.transferTo(dest);
    return "업로드 완료: " + filename;
}
```

<details>
<summary>정답 보기</summary>

1. **파일명 충돌** — 같은 이름 파일 업로드 시 덮어쓰기 발생 → UUID 사용
2. **디렉토리 트래버설** — `filename = "../../etc/passwd"` 같은 악의적 파일명 가능 → 경로 검증 필요
3. **파일 타입 미검증** — 악성 파일(.exe 등) 업로드 가능 → 확장자 + MIME 타입 검증
4. **크기 제한 없음** — 대용량 파일로 서버 디스크 공격 가능 → application.yml에서 제한

</details>

### Q2. 다운로드 시 한글 파일명이 깨지지 않게 하려면?

<details>
<summary>정답 보기</summary>

```java
String encodedName = URLEncoder.encode("이력서.pdf", StandardCharsets.UTF_8)
        .replace("+", "%20");

// RFC 5987 표준 사용
"Content-Disposition: attachment; filename*=UTF-8''" + encodedName
```

`filename*=UTF-8''` 형식이 핵심. 단순 `filename="이력서.pdf"`는 브라우저마다 인코딩 처리가 달라서 깨질 수 있다.

</details>

### Q3. `@RequestParam`과 `@RequestPart`의 차이는?

<details>
<summary>정답 보기</summary>

- `@RequestParam` — 단순 파일/값 파라미터 (기본적인 파일 업로드)
- `@RequestPart` — multipart 요청의 각 파트를 개별 처리 (JSON + 파일 혼합 전송 시 필수)

JSON과 파일을 동시에 보내야 할 때는 `@RequestPart`를 사용한다.

</details>

---

## 13. 면접 대비 한 줄 요약

| 키워드 | 한 줄 요약 |
|---|---|
| **MultipartFile** | Spring이 제공하는 업로드 파일 인터페이스로, 파일명·크기·스트림에 접근할 수 있다 |
| **multipart/form-data** | 바이너리 파일을 HTTP로 전송하기 위한 Content-Type이다 |
| **UUID 파일명** | 원본 파일명 대신 UUID로 저장하여 충돌·보안 문제를 방지한다 |
| **Resource** | 파일을 추상화하는 Spring 인터페이스로, 다운로드 응답에 사용된다 |
| **Content-Disposition** | `attachment`는 다운로드, `inline`은 브라우저 직접 표시를 지정한다 |
| **filename\*=UTF-8''** | RFC 5987 표준으로, 한글 파일명 깨짐을 방지하는 헤더 인코딩 방식이다 |
| **@RequestPart** | multipart 요청에서 JSON과 파일을 각각 파트별로 받을 때 사용한다 |
| **파일 타입 검증** | 확장자뿐 아니라 Content-Type(MIME)도 함께 검증해야 위변조를 방지할 수 있다 |
| **로컬 vs S3** | 개발은 로컬 저장, 프로덕션은 S3 같은 클라우드 스토리지를 사용한다 |
| **고아 파일** | DB 레코드는 삭제됐지만 실제 파일은 남아있는 상태로, Soft Delete나 스케줄러로 방지한다 |
