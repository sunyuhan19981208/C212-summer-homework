package com.example.demo.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;

public class UserService {
    @FeignClient(value = "service-user")
    public interface StudentService{
        @RequestMapping(value = "/getStudentByClassName",method = RequestMethod.GET)
        HashMap<String,Object>getStudentByClassName(@RequestParam("className")String className);
        @RequestMapping(value = "/getStudentByUserId")
        HashMap<String,Object>getStudentByUserId(@RequestParam("userId")int userId);
        @RequestMapping(value = "/getStudentByUsername")
        HashMap<String,Object>getStudentByUsername(@RequestParam("username")String username);
    }
}
