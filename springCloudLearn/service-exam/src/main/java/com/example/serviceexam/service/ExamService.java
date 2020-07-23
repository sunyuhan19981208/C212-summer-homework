package com.example.serviceexam.service;

import com.example.serviceexam.entity.Exam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ExamService {
    public List<Exam> showAllExams();
    public Integer getNewExamId();
    public int createExam(String examName,String startTime,String endTime,int paperId,String className);
    public List<Exam>selectExamByClassName(String className);
}
