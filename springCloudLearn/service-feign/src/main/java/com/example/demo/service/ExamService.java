package com.example.demo.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;

public class ExamService {
    @FeignClient(value = "service-exam")
    public interface SubmitService{
        @RequestMapping(value="/getScoreByStudentList")
        List<HashMap<String,Object>>getScoreByStudentList(@RequestBody List<HashMap<String,Object>>studentList);
    }
}
