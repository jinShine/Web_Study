# 12. MapStruct

> 오늘의 목표: Entity와 DTO 사이 변환을 반복해서 손으로 쓰지 않고, 컴파일 타임에 안전하게 생성하는 방법을 익힌다.

---

## 오늘 끝나면 되는 것

- MapStruct를 왜 쓰는지 설명할 수 있다.
- `@Mapper` 기반 매퍼를 만들 수 있다.
- 수동 매핑과 MapStruct의 차이를 알 수 있다.
- 업데이트 매핑과 커스텀 필드 매핑 감각을 잡는다.

---

## 머릿속 그림

```text
Entity <-> Mapper <-> DTO
```

MapStruct는 런타임 리플렉션이 아니라,
컴파일 시점에 실제 자바 코드를 생성합니다.

그래서:

- 빠르고
- 타입 안정성이 좋고
- 에러를 빨리 발견할 수 있습니다

---

## 왜 필요한가

DTO가 많아지면 이런 코드가 계속 생깁니다.

```java
public StudyResponse toResponse(Study study) {
    return StudyResponse.builder()
            .id(study.getId())
            .title(study.getTitle())
            .content(study.getContent())
            .build();
}
```

처음엔 괜찮지만,

- DTO가 늘고
- 필드가 많아지고
- 수정/생성 케이스가 분기되면

매핑 코드가 피로해집니다.

---

## 기본 설정

```groovy
implementation 'org.mapstruct:mapstruct:1.6.3'
annotationProcessor 'org.mapstruct:mapstruct-processor:1.6.3'
annotationProcessor 'org.projectlombok:lombok-mapstruct-binding:0.2.0'
```

---

## 가장 기본적인 매퍼

```java
@Mapper(componentModel = "spring")
public interface StudyMapper {

    StudyResponse toResponse(Study study);

    Study toEntity(StudyCreateRequest request);
}
```

`componentModel = "spring"`을 주면 Bean으로 등록되어 주입받아 사용할 수 있습니다.

---

## 필드명이 다를 때

```java
@Mapper(componentModel = "spring")
public interface StudyMapper {

    @Mapping(source = "createdAt", target = "createdDateTime")
    StudyResponse toResponse(Study study);
}
```

---

## 수정 API에서 활용

기존 객체를 새로 만들지 않고 업데이트할 때는 `@MappingTarget`을 씁니다.

```java
@Mapper(componentModel = "spring")
public interface StudyMapper {

    void updateFromRequest(StudyUpdateRequest request, @MappingTarget Study study);
}
```

이 패턴은 나중에 JPA Entity 업데이트 감각과도 이어집니다.

---

## MapStruct를 쓸 때 좋은 점

- 반복 매핑 코드 감소
- 누락 필드 발견 쉬움
- 테스트 포인트 분리 가능
- 서비스 코드 가독성 향상

---

## 자주 하는 실수

- 의존성은 넣었는데 annotation processor 설정이 빠진 것
- `componentModel = "spring"`을 빼서 Bean 주입이 안 되는 것
- 매핑 로직이 복잡한데 무리하게 한 메서드에 몰아넣는 것

MapStruct는 만능 변환기가 아니라,
단순하고 반복적인 매핑에 특히 강합니다.

---

## 면접 체크

1. MapStruct를 사용하는 이유는 무엇인가요?
2. ModelMapper 같은 런타임 매핑과 비교했을 때 장점은 무엇인가요?
3. `@MappingTarget`은 언제 사용하나요?

---

## 직접 해보기

1. Entity와 Response DTO 변환 매퍼를 하나 만들어보세요.
2. Request DTO -> Entity 매핑도 추가해보세요.
3. 필드명이 다른 항목 하나를 `@Mapping`으로 처리해보세요.

---

## 다음 주제 연결

이제 내부 변환이 정리됐으니, 외부로 나가는 응답을 `ResponseEntity`와 공통 응답 포맷으로 정돈해봅니다.
