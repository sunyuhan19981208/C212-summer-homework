package com.example.serviceexam.controller;

import com.example.serviceexam.entity.Paper;
import com.example.serviceexam.entity.PaperInfo;
import com.example.serviceexam.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin
public class PaperController {

    @Autowired
    PaperService paperService;
    @RequestMapping(value = "/getPaperList",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getPaperList(@RequestParam("gradeId")int gradeId,@RequestParam("subjectId")int subjectId){
        List<Paper>paperList=paperService.getPaperList(gradeId,subjectId);
        List<Integer>resList=new LinkedList<>();
        for(Paper p:paperList)resList.add(p.getPaperId());
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",resList);
            }
        };
    }
    @RequestMapping(value = "/addPaper",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> addPaper(@RequestBody PaperInfo paperInfo){
        List<HashMap<String,Object>> questionObjects= paperInfo.getQuestionObjects();
        Integer gradeId=Integer.valueOf( paperInfo.getGradeId());
        Integer subjectId=Integer.valueOf(paperInfo.getSubjectId());
        if(gradeId==null)return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","添加失败:无年级名");
            }
        };
        if(subjectId==null)return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","添加失败:无科目名");
            }
        };
        boolean flag=true;
        HashMap<Integer,Integer>resMap=new HashMap<>();
        for(HashMap<String,Object>qMap:questionObjects){
            int score=(int)qMap.get("score");
            List<Integer>qList=(List<Integer>)qMap.get("questionId");
            for(Integer q:qList){
                if (resMap.containsKey(q))flag=false;
                else resMap.put(q,score);
            }
        }
        if(!flag)return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","添加失败:有重复题目");
            }
        };
        else{
            int paperId=paperService.addPaper(gradeId,subjectId);
            paperService.addQuestion(resMap,paperId);
            return new HashMap<String,Object>(){
                {
                    put("respCode",1);
                    put("respMsg","添加成功,试卷编号为："+paperId);
                }
            };
        }
    }
}
