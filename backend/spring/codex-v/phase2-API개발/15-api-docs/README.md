# 15. API 문서화

> 오늘의 목표: 코드 기반으로 API 문서를 자동 생성하고, 팀이 바로 테스트 가능한 상태까지 만든다.

---

## 오늘 끝나면 되는 것

- OpenAPI와 Swagger UI의 차이를 설명할 수 있다.
- SpringDoc 의존성을 추가해 문서를 띄울 수 있다.
- `@Operation`, `@Schema`, `@Tag`를 사용할 수 있다.
- 운영 환경에서 문서 공개 범위를 어떻게 조절할지 감각이 생긴다.

---

## 머릿속 그림

```text
Controller / DTO 코드
  -> SpringDoc
  -> OpenAPI 스펙 생성
  -> Swagger UI 렌더링
```

즉, 코드를 기준으로 문서를 맞추는 방식입니다.

---

## 용어 정리

- OpenAPI: API 명세 표준
- Swagger UI: 그 명세를 웹 화면으로 보여주는 도구
- SpringDoc: Spring Boot 코드에서 OpenAPI 스펙을 생성해주는 라이브러리

---

## 기본 설정

```groovy
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.6'
```

추가 후 보통 아래 주소로 접근합니다.

- `/swagger-ui.html`
- `/v3/api-docs`

---

## 문서 정보 커스터마이징

```java
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Study API")
                        .description("학습 기록 관리 API")
                        .version("v1.0.0"));
    }
}
```

---

## 컨트롤러에 설명 달기

```java
@Tag(name = "Study", description = "학습 기록 API")
@RestController
@RequestMapping("/studies")
public class StudyController {

    @Operation(summary = "학습 기록 생성", description = "새로운 학습 기록을 등록합니다.")
    @PostMapping
    public ResponseEntity<StudyResponse> create(@RequestBody StudyCreateRequest request) {
        return ResponseEntity.ok(service.create(request));
    }
}
```

DTO 필드는 `@Schema`로 설명할 수 있습니다.

```java
@Getter
public class StudyCreateRequest {

    @Schema(description = "학습 제목", example = "Spring MVC 흐름 정리")
    private String title;
}
```

---

## 문서화에서 중요한 포인트

- 요청 DTO 설명
- 응답 구조 설명
- 에러 코드 설명
- 인증 방식 설명

문서는 단순히 "주소 목록"이 아니라,
사용자가 API를 오해 없이 쓰게 만드는 계약서입니다.

---

## 운영에서의 감각

개발 환경에서는 Swagger UI가 매우 유용합니다.

하지만 운영에서는:

- 인증 없이 열지 않거나
- 아예 비활성화하거나
- 내부망에서만 열도록 제한하기도 합니다

예:

```yaml
springdoc:
  swagger-ui:
    enabled: false
```

---

## 자주 하는 실수

- 문서가 자동 생성되니 설명을 하나도 안 다는 것
- 실제 응답 구조와 문서 예시가 다른 상태로 방치하는 것
- 운영 환경까지 그대로 공개하는 것

---

## 면접 체크

1. OpenAPI와 Swagger의 차이는 무엇인가요?
2. SpringDoc을 사용하는 이유는 무엇인가요?
3. API 문서화에서 중요한 정보는 무엇인가요?

---

## 직접 해보기

1. SpringDoc 의존성을 추가하고 Swagger UI를 띄워보세요.
2. 컨트롤러에 `@Tag`, `@Operation`을 붙여보세요.
3. Request DTO 필드에 `@Schema` 예시값을 넣어보세요.
4. 운영 profile에서 Swagger를 비활성화해보세요.

---

## 다음 주제 연결

이제 기능을 만들고 설명하는 것까지 왔습니다. 마지막으로, 막혔을 때 코드를 추측하지 않고 추적하는 디버깅 방법을 정리합니다.
