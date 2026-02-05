package com.study.my_spring_study_diary.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.study.my_spring_study_diary.entity.StudyLog;

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

    public StudyLog save(StudyLog studyLog) {
        if (studyLog.getId() == null) {
            studyLog.setId(sequence.getAndIncrement());
        }

        database.put(studyLog.getId(), studyLog);

        return studyLog;
    }

}
