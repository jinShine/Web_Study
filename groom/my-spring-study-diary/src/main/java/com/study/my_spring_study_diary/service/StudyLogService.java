package com.study.my_spring_study_diary.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.study.my_spring_study_diary.dto.request.StudyLogCreateRequest;
import com.study.my_spring_study_diary.dto.response.StudyLogResponse;
import com.study.my_spring_study_diary.entity.Category;
import com.study.my_spring_study_diary.entity.StudyLog;
import com.study.my_spring_study_diary.entity.Understanding;
import com.study.my_spring_study_diary.repository.StudyLogRepository;

@Service
public class StudyLogService {

    private final StudyLogRepository studyLogRepository;

    public StudyLogService(StudyLogRepository studyLogRepository) {
        this.studyLogRepository = studyLogRepository;
    }

    public StudyLogResponse createStudyLog(StudyLogCreateRequest request) {
        // 1. 요청 데이터 유효성 검증
        validateCreateRequest(request);

        // 2. DTO -> Entity 변환
        StudyLog studyLog = new StudyLog(
                null, // ID는 Repository에서 자동 생성
                request.getTitle(),
                request.getContent(),
                Category.valueOf(request.getCategory()),
                Understanding.valueOf(request.getUnderstanding()),
                request.getStudyTime(),
                request.getStudyDate() != null ? request.getStudyDate() : LocalDate.now());

        // 3. 저장
        StudyLog savedStudyLog = studyLogRepository.save(studyLog);

        // 4. Entity ->
        return StudyLogResponse.from(savedStudyLog);

    }

    private void validateCreateRequest(StudyLogCreateRequest request) {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("제목은 필수 입니다. =")
        }

        if (request.getTitle().length() > 100) {
            throw new IllegalArgumentException("학습 주제는 100자를 초과할 수 업습니다.")
        }

        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("학습 내용은 필수 입니다.");
        }

        if (request.getContent().length() > 1000) {
            throw new IllegalArgumentException("학습 내용은 1000자를 초과할 수 없습니다.");
        }

        if (request.getStudyTime() == null || request.getStudyTime() < 1) {
            throw new IllegalArgumentException("학습 시간은 1분 이상이어야 합니다.");
        }
    }
}
