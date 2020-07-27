package com.example.serviceexam.controller;

import com.example.serviceexam.entity.Choice;
import com.example.serviceexam.entity.Question;
import com.example.serviceexam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        int cnt=0;
        for(String ch:chs) {
            if (!ch.equals("")) {
                String option=String.valueOf((char)('A'+(cnt++)));
                questionService.addChoice(option,ch,qid);
            }
        }
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","添加题目成功 题目ID为:"+qid);
            }
        };
    }
    @RequestMapping(value="/getQuestion",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getQuestion(@RequestParam("pointId")int pointId,@RequestParam("type")int qType){
        int type=0;
        int choiceType=0;
        switch (qType){
            case 1:type=2;choiceType=0;break;
            case 2:type=2;choiceType=1;break;
            case 3:type=1;break;
            case 4:type=5;
        }
        List<Question>li=questionService.selectQuestionByPointId(pointId,type,choiceType);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",li);
            }
        };
    }
    @RequestMapping(value = "/getQuestionById",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getQuestionById(@RequestParam("questionId")int questionId){
        HashMap<String,Object>data=new HashMap<>();
        Question question=questionService.selectQuestionById(questionId);
        data.put("stem",question.getQuestionStem());
        List<Choice>chList=questionService.selectChoiceByQid(questionId);
        data.put("choice",chList);
        if(chList!=null)data.put("total",chList.size());
        return new HashMap<String,Object>(){
            {
                put("data",data);
                put("respCode",1);
                put("type",question.getType());
                put("choiceType",question.getChoiceType());
            }
        };
    }
    @RequestMapping(value = "/getQuestionList",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getQuestionList(@RequestParam("paperId")int paperId){
        return new HashMap<String,Object>(){
            {
                put("data", questionService.selectQuestionByPaperId(paperId));
                put("respCode",1);
            }
        };
    }
}
