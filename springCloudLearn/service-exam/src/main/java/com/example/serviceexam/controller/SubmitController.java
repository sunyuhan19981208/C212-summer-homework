package com.example.serviceexam.controller;

import com.example.serviceexam.service.SubmitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class SubmitController {
    @Autowired
    SubmitService submitService;
    @RequestMapping(value = "/submit",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>submit(@RequestBody HashMap<String,Object>mp){
        System.out.println(mp.get("userId"));
        List<HashMap<String,Object>>answerList=(List)mp.get("answerList");
        for(HashMap<String,Object> answerMap:answerList){
            int questionId=(Integer)answerMap.get("questionId");
            String answer=(String)answerMap.get("answer");
        }
        return null;
    }
}
