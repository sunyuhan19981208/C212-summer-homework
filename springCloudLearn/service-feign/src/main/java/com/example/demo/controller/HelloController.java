package com.example.demo.controller;

import com.example.demo.service.ExamService;
import com.example.demo.service.HelloService;
import com.example.demo.service.UserService;
import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
@CrossOrigin
@RestController
public class HelloController {
    @Autowired
    UserService.StudentService studentService;
    @Autowired
    ExamService.SubmitService submitService;
    @GetMapping(value="/getStudentScoreByClassName",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> getStudentScoreByClassName(@RequestParam("className") String className){
        HashMap<String,Object>mp=studentService.getStudentByClassName(className);
        List<HashMap<String, Object>> studentList=(List<HashMap<String, Object>>)mp.get("data");
        List<HashMap<String, Object>>scoreList=submitService.getScoreByStudentList(studentList);
        System.out.println("getStudentScoreByClassName");
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",scoreList);
            }
        };
    }
    @GetMapping(value="/getStudentScoreByUserId",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> getStudentScoreByClassName(@RequestParam("userId") int userId){
        HashMap<String,Object>mp=studentService.getStudentByUserId(userId);
        List<HashMap<String, Object>> studentList=(List<HashMap<String, Object>>)mp.get("data");
        List<HashMap<String, Object>>scoreList=submitService.getScoreByStudentList(studentList);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",scoreList);
            }
        };
    }
    @GetMapping(value="/getStudentScoreByUsername",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> getStudentScoreByUsername(@RequestParam("username") String username){
        HashMap<String,Object>mp=studentService.getStudentByUsername(username);
        List<HashMap<String, Object>> studentList=(List<HashMap<String, Object>>)mp.get("data");
        List<HashMap<String, Object>>scoreList=submitService.getScoreByStudentList(studentList);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("data",scoreList);
            }
        };
    }
}
