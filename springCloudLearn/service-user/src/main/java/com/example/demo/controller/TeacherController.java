package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class TeacherController {
    @Autowired
    UserService userService;
    @RequestMapping(value = "/addTeacher",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String ,Object>addTeacher(@RequestParam("username")String username){
        if (userService.selectByUsername(username)!=null)return new HashMap<String,Object>(){
            {
                put("respCode",0);
                put("respMsg","添加失败，已存在用户名");
            }
        };
        int userId=userService.addTeacher(username);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","添加成功，工号为:"+userId);
            }
        };
    }
    @RequestMapping(value = "/deleteUser",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String ,Object>deleteUser(@RequestParam("userId")int userId){
        userService.deleteUser(userId);
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("respMsg","删除成功");
            }
        };
    }
    @RequestMapping(value = "/selectAllTeacher",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String ,Object>selectAllTeacher(){
        List<User>li=userService.selectAllTeacher();
        return new HashMap<String,Object>(){
            {
                put("respCode",1);
                put("total",li.size());
                put("data",li);
            }
        };
    }
    @RequestMapping(value = "/queryTeacherByName",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>queryTeacherByName(@RequestParam("username")String username){
        List<User>list=userService.selectTeacherByName(username);
        return new HashMap<String,Object>(){
            {
                put("respCode", "1");
                put("total",list.size());
                put("data",list);
            }
        };
    }

}
