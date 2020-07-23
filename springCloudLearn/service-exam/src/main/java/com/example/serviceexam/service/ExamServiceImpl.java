package com.example.serviceexam.service;

import com.example.serviceexam.entity.Exam;
import com.example.serviceexam.mapper.ExamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
@Service
public class ExamServiceImpl implements ExamService{
    @Autowired
    private ExamMapper examMapper;

    @Override
    public List<Exam> showAllExams() {
        return examMapper.showAllExams();
    }

    @Override
    public Integer getNewExamId() {
        return examMapper.getMaxExamId()+1;
    }

    @Override
    public int createExam(String examName, String startTime, String endTime, int paperId, String className) {
        Integer examId=getNewExamId();
        if(examId==null)examId=1;
        examMapper.createExam(examId,examName,startTime,endTime,paperId,className);
        return examId;
    }

    @Override
    public List<Exam> selectExamByClassName(String className) {
        return examMapper.selectExamByClassName(className);
    }

}
