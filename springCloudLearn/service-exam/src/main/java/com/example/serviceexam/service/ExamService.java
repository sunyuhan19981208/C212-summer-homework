package com.example.serviceexam.service;

import com.example.serviceexam.entity.Exam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ExamService {
    List<Exam> showAllExams();
    Integer getNewExamId();
    int createExam(String examName,String startTime,String endTime,int paperId,String className);
    List<Exam>selectExamByClassName(String className);
    void relateExamToTeacher(int examId,int userId);
}
