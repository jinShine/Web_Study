package com.study.my_spring_study_diary.repository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.study.my_spring_study_diary.common.PageRequest;
import com.study.my_spring_study_diary.common.PageResponse;
import com.study.my_spring_study_diary.entity.Category;
import com.study.my_spring_study_diary.entity.StudyLog;
import com.study.my_spring_study_diary.exception.InvalidPageRequestException;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

/**
 * 학습 일지 저장소
 *
 * @Repository 어노테이션 설명: - 이 클래스를 Spring Bean으로 등록합니다 - 데이터 접근 계층임을 명시합니다 - 데이터
 *             접근 관련 예외를 Spring의
 *             DataAccessException으로 변환해줍니다
 *
 *             실제 프로젝트에서는 JPA, MyBatis 등을 사용하지만, 이번 강의에서는 Map을 사용하여 데이터를 저장합니다.
 */

@Repository // ⭐ Spring Bean으로 등록!
public class StudyLogRepository {

    private final Map<Long, StudyLog> database = new HashMap<>();
    private final AtomicLong sequence = new AtomicLong();

    @PostConstruct
    public void init() {
        System.out.println("StudyLogRepository initialized 초기화 완료");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("StudyLogRepository destroyed 종료");
    }

    public StudyLog save(StudyLog studyLog) {
        if (studyLog.getId() == null) {
            studyLog.setId(sequence.getAndIncrement());
        }

        database.put(studyLog.getId(), studyLog);

        return studyLog;
    }

    public List<StudyLog> findAll() {
        return database.values().stream()
                .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
                .collect(Collectors.toList());
    }

    /**
     * 페이징 처리된 학습 일지 조회
     * 
     * @param pageRequest 페이징 요청 정보
     * @return 페이징 처리된 결과
     */
    public PageResponse<StudyLog> findAllWithPaging(PageRequest pageRequest) {

        // 1. 전체 데이터를 정렬
        List<StudyLog> allLogs = database.values().stream()
                .sorted((a, b) -> {
                    // 정렬 기준에 따라 정렬
                    int result = switch (pageRequest.getSortBy()) {
                        case "title" -> a.getTitle().compareTo(b.getTitle());
                        case "studyTime" -> a.getStudyTime().compareTo(b.getStudyTime());
                        case "studyDate" -> a.getStudyDate().compareTo(b.getStudyDate());
                        default -> a.getCreatedAt().compareTo(b.getCreatedAt());
                    };

                    // 정렬 방향 적용
                    return "ASC".equals(pageRequest.getSortDirection()) ? result : -result;
                })
                .collect(Collectors.toList());

        // 2. 전체 개수
        long totalElements = allLogs.size();

        // 3. 총 페이지 수 계산
        int totalPages = calculateTotalPages(totalElements, pageRequest.getSize());

        // 4. 요청한 페이지 번호 유효성 검증
        int requestedPage = pageRequest.getPage();

        if (requestedPage < 0) {
            throw new InvalidPageRequestException(requestedPage, totalPages);
        }

        if (totalElements > 0 && requestedPage >= totalPages) {
            throw new InvalidPageRequestException(requestedPage, totalPages);
        }

        // 5. 페이징 적용
        int start = pageRequest.getOffset();
        int end = Math.min(start + pageRequest.getSize(), allLogs.size());

        List<StudyLog> pagedLogs = allLogs.subList(start, end);

        // 6. PageResponse 생성
        return PageResponse.of(
                pagedLogs,
                pageRequest.getPage(),
                pageRequest.getSize(),
                totalElements);
    }

    public PageResponse<StudyLog> findByCategoryWithPaging(Category category, PageRequest pageRequest) {

        // 1. 카테고리로 필터링 및 정렬
        List<StudyLog> filteredLogs = database.values().stream()
                .filter(log -> log.getCategory() == category)
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());

        // 2. 전체 개수
        long totalElements = filteredLogs.size();

        // 3. 총 페이지 수 계산
        int totalPages = calculateTotalPages(totalElements, pageRequest.getSize());

        // 4. 요청한 페이지 번호 유효성 검증
        int requestedPage = pageRequest.getPage();

        if (requestedPage < 0) {
            throw new InvalidPageRequestException(requestedPage, totalPages);
        }

        if (totalElements > 0 && requestedPage >= totalPages) {
            throw new InvalidPageRequestException(requestedPage, totalPages);
        }

        // 5. 페이징 적용
        int start = pageRequest.getOffset();
        int end = Math.min(start + pageRequest.getSize(), filteredLogs.size());

        List<StudyLog> pagedLogs = filteredLogs.subList(start, end);

        // 6. PageResponse 생성
        return PageResponse.of(
                pagedLogs,
                pageRequest.getPage(),
                pageRequest.getSize(),
                totalElements);
    }

    public Optional<StudyLog> findById(Long id) {
        return Optional.ofNullable(database.get(id));
    }

    public List<StudyLog> findByStudyDate(LocalDate date) {
        return database.values().stream()
                .filter(log -> log.getStudyDate().equals(date))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public List<StudyLog> findByCategory(Category category) {
        return database.values().stream()
                .filter(log -> log.getCategory().equals(category))
                .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public long count() {
        return database.size();
    }

    /**
     * 총 페이지 수 계산
     * 
     * @param totalElements 전체 데이터 개수
     * @param pageSize      페이지 크기
     * @return 총 페이지 수
     */
    private int calculateTotalPages(long totalElements, int pageSize) {
        return (int) Math.ceil((double) totalElements / pageSize);
    }
}
