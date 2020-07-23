package com.example.demo.controller;

import com.example.demo.entity.ClassInfo;
import com.example.demo.service.ClassInfoService;
import org.apache.ibatis.annotations.Delete;
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
public class ClassInfoController {
    @Autowired
    private ClassInfoService classInfoService;
    @RequestMapping(value="/getAllClass",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>getALLClass(){
        HashMap<String,Object>resp=new HashMap<>();
        List<ClassInfo>list=classInfoService.selectAllClassInfo();
        resp.put("data",list);
        resp.put("respCode",1);
        resp.put("total",list.size());
        return resp;
    }
    @RequestMapping(value="/addClass",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> addClass(@RequestParam("className")String className){
        if(classInfoService.selectByClassName(className)!=null)return new HashMap<String, Object>() {
            {
                put("respCode", "2");
                put("respMsg", "该班级已存在");
            }
        };
        classInfoService.addClass(className);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "添加成功");
            }
        };
    }
    @RequestMapping(value="/queryClassByName",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>queryClassByName(@RequestParam("className")String className){
        List<ClassInfo> classList=classInfoService.queryByClassName(className);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("total", classList.size());
                put("data",classList);
            }
        };
    }
    @RequestMapping(value = "/updateClass",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>updateClass(@RequestParam("className")String className,
                                             @RequestParam("status")int status){
        HashMap<String,Object>successMsg=new HashMap<>();
        successMsg.put("respCode","1");
        successMsg.put("respMsg","修改成功");
        classInfoService.updateClassStatus(className,status);
        return successMsg;
    }
    @RequestMapping(value = "/deleteClass",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>deleteClass(@RequestParam("className")String className){
        classInfoService.deleteClass(className);
        return new HashMap<String,Object>(){
            {
                put("respCode","1");
                put("respMsg","删除成功");
            }
        };
    }
}
