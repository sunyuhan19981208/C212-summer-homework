package com.example.serviceexam.controller;

import com.example.serviceexam.entity.Question;
import com.example.serviceexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.util.HashMap;
import java.util.List;
@CrossOrigin
@RestController
public class QuestionController {
    @Autowired
    QuestionService questionService;
    @RequestMapping(value="/addQuestion",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>addQuestion(@RequestParam("questionStem")String questionStem, @RequestParam("type")int type, @RequestParam("choiceType")int choiceType,
                                              @RequestParam("answer")String answer, @RequestParam("pointId")int pointId, @RequestParam("choice")String choice){
        String[] chs=choice.split(",");
        int qid=questionService.addQuestion(questionStem,type,choiceType,answer,pointId);
        for(String ch:chs)if(!ch.equals(""))questionService.addChoice(qid,ch);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","添加题目成功 题目ID为:"+qid);
            }
        };
    }
//    @RequestMapping(value="/addQuestion",produces = {MediaType.APPLICATION_JSON_VALUE})
//    public HashMap<String,Object>addQuestion(@RequestParam("questionStem")String questionStem, @RequestParam("type")int type,
//                                             @RequestParam("choiceType")int choiceType, @RequestParam("pointId")int pointId){
//        Integer qid=questionService.addQuestion(questionStem,type,choiceType,"",pointId);
//        return new HashMap<String,Object>(){
//            {
//                put("respCode",1);
//                put("respMsg","添加题目成功 题目ID为:"+qid);
//            }
//        };
//    }
    @RequestMapping(value="/getQuestion",produces = {MediaType.APPLICATION_JSON_VALUE})
    HashMap<String,Object>getQuestion(@RequestParam("pointId")int pointId){
        List<Question>li=questionService.selectQuestionByPointId(pointId);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",li);
            }
        };
    }
}
