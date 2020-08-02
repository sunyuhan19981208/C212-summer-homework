package com.example.serviceexam.controller;

import com.example.serviceexam.service.SubmitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin
public class SubmitController {
    @Autowired
    SubmitService submitService;
    @RequestMapping(value = "/submit",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>submit(@RequestBody HashMap<String,Object>mp){
//        System.out.println(mp.get("userId"));
        int userId=(Integer)mp.get("userId");
        int examId=(Integer) mp.get("examId");
        int submitId=submitService.initSubmit(examId,userId);
        List<HashMap<String,Object>>answerList=(List)mp.get("answerList");
        for(HashMap<String,Object> answerMap:answerList){
            int questionId=(Integer)answerMap.get("questionId");
            String answer=(String)answerMap.get("answer");
            submitService.insertQIS(submitId,questionId,answer);
        }
        return new HashMap<String,Object>(){
            {
                put("respMsg","提交成功，提交编号为:"+submitId);
                put("respCode",1);
            }
        };
    }
    @RequestMapping(value = "/getSubmitByExamId",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getSubmitByExamId(@RequestParam("examId")int examId){
        List<HashMap<String,Object>>data=submitService.selectSubmitByExamId(examId);
        return new HashMap<String,Object>(){
            {
                put("data",data);
                put("respCode",1);
            }
        };
    }
    @RequestMapping(value = "/getAnswerBySubmitId",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getAnswerBySubmitId(@RequestParam("submitId")int submitId){
        List<HashMap<String,Object>>data=submitService.selectAnswerBySubmitId(submitId);
        return new HashMap<String,Object>(){
            {
                put("data",data);
                put("respCode",1);
            }
        };
    }
    @RequestMapping(value = "/judge",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>judge(@RequestBody HashMap<String,Object>mp){
        List<HashMap<Integer,Integer>>li=(List<HashMap<Integer,Integer>>)mp.get("scoreList");
        int submitId=(int)mp.get("submitId");
        submitService.judge(li,submitId);
        return new HashMap<String, Object>(){
            {
                put("respCode",1);
                put("respMsg","批改提交成功");
            }
        };
    }
    @RequestMapping(value="/getScoreByStudentList")
    public List<HashMap<String,Object>>getScoreByStudentList(@RequestBody List<HashMap<String,Object>>studentList){
        List<HashMap<String,Object>>resList=new LinkedList<>();
        for(HashMap<String,Object> student:studentList){
            int userId=(int)student.get("userId");
            String className=(String)student.get("className");
            String username=(String)student.get("username");
            List<HashMap<String,Object>>submitList=submitService.selectSubmitByUserId(userId);
            for(HashMap<String,Object>submit:submitList){
                if((int)submit.get("status")==1)continue;
                int submitId=(int)submit.get("submitId");
                HashMap<String,Object>line=new HashMap<>();
                line.put("submitId",submitId);
                int score=submitService.getScoreBySubmitId(submitId);
                line.put("score",score);
                line.put("userId",userId);
                line.put("username",username);
                line.put("className",className);
                line.put("examName",submit.get("examName"));
                resList.add(line);
            }
        }
        return resList;
    }
}
