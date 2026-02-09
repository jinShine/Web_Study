package com.study.my_spring_study_diary.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.my_spring_study_diary.common.ApiResponse;
import com.study.my_spring_study_diary.common.PageRequest;
import com.study.my_spring_study_diary.common.PageResponse;
import com.study.my_spring_study_diary.dto.request.StudyLogCreateRequest;
import com.study.my_spring_study_diary.dto.response.StudyLogResponse;
import com.study.my_spring_study_diary.service.StudyLogService;

@RestController
@RequestMapping("/api/v1/logs")
public class StudyLogController {

    private final StudyLogService studyLogService;

    public StudyLogController(StudyLogService studyLogService) {
        this.studyLogService = studyLogService;
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<StudyLogResponse>> createStudyLog(
            @RequestBody StudyLogCreateRequest request) {
        StudyLogResponse response = studyLogService.createStudyLog(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    @GetMapping("/page")
    public PageResponse<StudyLogResponse> getStudyLogsWithPaging(
            @ModelAttribute PageRequest pageRequest) {
        return studyLogService.getStudyLogsWithPaging(pageRequest);
    }

    @GetMapping("/category/{category}/page")
    public PageResponse<StudyLogResponse> getStudyLogsByCategoryWithPaging(
            @PathVariable String category,
            @ModelAttribute PageRequest pageRequest) {

        return studyLogService.getStudyLogsByCategoryWithPaging(category, pageRequest);
    }

    @GetMapping("/{id}")
    public StudyLogResponse getStudyLogById(@PathVariable Long id) {
        return studyLogService.getStudyLogById(id);
    }

    @GetMapping("/date/{date}")
    public List<StudyLogResponse> getStudyLogByDate(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return studyLogService.getStudyLogsByDate(date);
    }

    @GetMapping("/category/{category}")
    public List<StudyLogResponse> getStudyLogsByCategory(
            @PathVariable String category) {

        // Service 호출하여 카테고리로 학습 일지 조회
        return studyLogService.getStudyLogsByCategory(category);
    }

}
