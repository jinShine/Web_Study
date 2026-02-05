package com.study.my_spring_study_diary.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudyLog {
    private Long id;
    private String title;
    private String content;
    private Category category;
    private Understanding understanding;
    private Integer studyTime;
    private LocalDate studyDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 전체 필드 생성자
    public StudyLog(
            Long id,
            String title,
            String content,
            Category category,
            Understanding understanding,
            Integer studyTime,
            LocalDate studyDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.understanding = understanding;
        this.studyTime = studyTime;
        this.studyDate = studyDate;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
