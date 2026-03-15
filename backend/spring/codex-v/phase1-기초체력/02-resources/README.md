# 02. Resources 폴더 구조

> 오늘의 목표: 설정이 왜 코드 바깥에 있어야 하는지 이해하고, `application.yml`과 profile 분리 감각을 익힌다.

---

## 오늘 끝나면 되는 것

- `src/main/resources`가 왜 중요한지 설명할 수 있다.
- `static`, `templates`, `application.yml`의 역할을 구분할 수 있다.
- dev/prod profile을 나눠야 하는 이유를 말할 수 있다.
- 설정값을 코드에 하드코딩하지 않는 습관의 이유를 이해한다.

---

## 머릿속 그림

```text
src/main/java         -> 로직
src/main/resources    -> 설정과 정적 자원
```

백엔드는 코드를 자주 바꾸기도 하지만,
그보다 더 자주 바뀌는 것은 환경입니다.

- 포트
- 로그 레벨
- 파일 저장 위치
- 외부 API 주소
- DB 접속 정보

이런 값이 코드에 박혀 있으면 환경이 바뀔 때마다 배포를 다시 해야 합니다.

---

## 꼭 알아야 할 폴더

### `static`

브라우저가 바로 접근 가능한 정적 파일입니다.

- css
- js
- 이미지

예: `src/main/resources/static/logo.png`
-> `/logo.png`로 접근 가능

### `templates`

서버 사이드 렌더링 템플릿 파일이 들어갑니다.

- Thymeleaf
- Mustache

현재 REST API 중심 학습에서는 자주 쓰지 않지만, 전통적인 MVC에서는 중요합니다.

### `application.yml`

스프링 부트 설정의 중심입니다.

```yaml
spring:
  application:
    name: codex-v-app

server:
  port: 8080

logging:
  level:
    root: INFO
```

---

## Profile 분리 감각 잡기

실무에서는 환경별 설정이 달라집니다.

### 공통 설정

```yaml
# application.yml
spring:
  profiles:
    active: dev
```

### 개발 환경

```yaml
# application-dev.yml
server:
  port: 8080

logging:
  level:
    com.example: DEBUG
```

### 운영 환경

```yaml
# application-prod.yml
server:
  port: 80

logging:
  level:
    root: WARN
```

핵심은 이것입니다.

> 코드는 같고, 설정만 다르다.

---

## 왜 하드코딩이 위험한가

예를 들어 아래 코드는 처음엔 편해 보여도 금방 문제를 만듭니다.

```java
String uploadDir = "/Users/buzz/uploads";
```

문제:

- 다른 개발자 PC에서는 경로가 다름
- 운영 서버에는 해당 디렉터리가 없음
- 테스트 환경에서도 별도 대응이 필요함

설정으로 빼면 이렇게 됩니다.

```yaml
file:
  upload-dir: ./uploads
```

```java
@Value("${file.upload-dir}")
private String uploadDir;
```

나중에는 `@ConfigurationProperties`까지 이어집니다.

---

## 설정 우선순위 감각

아직 깊게 외울 필요는 없지만, 큰 흐름은 알아둡니다.

우선순위 예시:

1. 실행 시 전달한 환경 변수/명령행 인자
2. `application-prod.yml`
3. `application.yml`
4. 코드 기본값

즉, 같은 키라도 더 구체적인 환경 설정이 우선합니다.

---

## 자주 하는 실수

- dev 설정을 운영에도 그대로 쓰는 것
- 비밀번호, API 키를 yml에 그대로 커밋하는 것
- 로그 레벨을 전부 `DEBUG`로 두고 배포하는 것
- 모든 설정값을 `@Value`로 흩뿌려 관리 포인트를 잃는 것

---

## 면접 체크

1. `resources` 폴더는 어떤 용도로 사용하나요?
2. `application.yml`과 `application-dev.yml`을 나누는 이유는 무엇인가요?
3. 설정을 코드에 하드코딩하면 어떤 문제가 생기나요?

---

## 직접 해보기

1. `application.yml`, `application-dev.yml`, `application-prod.yml`을 직접 만들어보세요.
2. dev에서는 8080, prod에서는 9090으로 포트를 다르게 주고 실행해보세요.
3. `logging.level`을 바꿔 로그 출력 차이를 확인해보세요.

---

## 다음 주제 연결

환경이 준비됐으니, 이제 실제로 첫 번째 REST API를 만들어보며 요청과 응답을 손에 익힙니다.
