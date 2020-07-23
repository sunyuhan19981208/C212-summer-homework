package com.example.serviceexam.controller;

import com.example.serviceexam.entity.Exam;
import com.example.serviceexam.entity.KnowledgePoint;
import com.example.serviceexam.entity.Subject;
import com.example.serviceexam.service.KnowledgePointService;
import com.example.serviceexam.util.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin
public class KnowledgeController {
    private RedisTemplate redisTemplate;
    @Autowired
    private KnowledgePointService knowledgePointService;
    @RequestMapping(value="/getSubject",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getSubject(){
        List<Subject>li=new LinkedList<>();
        li.add(new Subject(1,"语文"));
        li.add(new Subject(2,"数学"));
        li.add(new Subject(3,"英语"));
        return new HashMap<String, Object>(){
            {
                put("respCode","1");
                put("data",li);
            }
        };
    }
    @RequestMapping(value = "/getKnowledgePoint",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getKnowledgePoint(@RequestParam("subjectId")int subjectId,@RequestParam("gradeId")int gradeId){
        List<KnowledgePoint>li=knowledgePointService.getKnowledgePoint(subjectId,gradeId);
        return new HashMap<String,Object>(){
            {
                put("respCode","1");
                put("data",li);
            }
        };
    }
}
