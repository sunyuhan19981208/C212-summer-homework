package com.example.serviceexam.controller;

import com.example.serviceexam.entity.Exam;
import com.example.serviceexam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class ExamController {
    @Autowired
    ExamService examService;
    @RequestMapping(value="/createExam",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>createExam(@RequestParam("className")String className,@RequestParam("paperId")int paperId,@RequestParam("startTime")String startTime,
                                     @RequestParam("endTime")String endTime,@RequestParam("examName")String examName,@RequestParam("teacherId")int teacherId){
        int examId=examService.createExam(examName,startTime,endTime,paperId,className);
        examService.relateExamToTeacher(examId,teacherId);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","试卷添加成功");
            }
        };
    }
    @RequestMapping(value = "/getExamByClass",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getExamByClass(@RequestParam("className")String className){
        List<Exam> list=examService.selectExamByClassName(className);
        for(Exam exam:list){
            System.out.println(exam.getExamName());
        }
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",list);
            }
        };
    }
}
