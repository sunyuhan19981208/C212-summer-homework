package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.UserService;
import com.example.demo.util.CookieUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class UserInfoController {
    @Autowired
    private UserService userService;
    @Autowired
    private RedisTemplate redisTemplate;
    @RequestMapping("/getUsername")
    public String getUsername(HttpServletRequest request){
        String sessionId= CookieUtil.getSessionIdByCookie(request);
        System.out.println(sessionId);
        String userId=(String)redisTemplate.opsForValue().get(sessionId);
        System.out.println(userId);
        String username=userService.selectByUserId(userId).getUsername();
        return username;
    }
    @RequestMapping(value="/addStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> addStudent(@RequestParam("username")String username,@RequestParam("className")String className){
        if(userService.selectByUsername(username)!=null)return new HashMap<String, Object>() {
            {
                put("respCode", "2");
                put("respMsg", "该用户名已存在");
            }
        };
        String uid=userService.getNewUserId();
        userService.addUser(username,"123456","学生");
        userService.addStudent(uid,className);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "添加成功，学号为:"+uid);
            }
        };
    }
    @RequestMapping(value="/getAllStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object> getAllStudent(){
        HashMap<String,Object>mp=new HashMap<>();
        mp.put("respCode",1);
        List<Student>list=userService.selectAllStudent();
        mp.put("data",list);
        mp.put("total",list.size());
        return mp;
    }
    @RequestMapping(value = "/queryStudentByName",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>queryStudentByName(@RequestParam("username")String username){
        List<Student>list=userService.queryUserByName(username);
        return new HashMap<String,Object>(){
            {
                put("respCode", "1");
                put("total",list.size());
                put("data",list);
            }
        };
    }
    @RequestMapping(value="/updateStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>update(@RequestParam("userId")String userId,@RequestParam("username")String username,
                                        @RequestParam("password")String password,@RequestParam("className")String className){
        userService.updateStudent(userId,className);
        userService.updateUser(userId,username,password);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "修改成功，学号为:"+userId);
            }
        };
    }
    @RequestMapping(value = "/deleteStudent",produces = {MediaType.APPLICATION_JSON_VALUE})
    public HashMap<String,Object>deleteStudent(@RequestParam("userId")String userId){
        if(userService.selectByUserId(userId)==null)
            return new HashMap<String, Object>() {
                {
                    put("respCode", "1");
                    put("respMsg", "删除失败，无该用户");
                }
            };
        userService.deleteUser(userId);
        userService.deleteStudent(userId);
        return new HashMap<String, Object>() {
            {
                put("respCode", "1");
                put("respMsg", "删除成功，学号为:"+userId);
            }
        };
    }
}
